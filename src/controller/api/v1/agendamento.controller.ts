import express from 'express';
import moment from 'moment';

import { validationResult } from 'express-validator';
import { getRepository, Repository } from 'typeorm';

import { validarJwt } from '../../../middleware/jwt.middleware';

import { retrieveConnection } from '../../../utils/conn.utils';
import { getError } from '../../../utils/error.utils';

import { ValidationException } from '../../../error/validator.error';
import { validacaoAgendamento } from '../../../validator/agendamento.validator';

import { Agendamento } from '../../../database/entity/Agendamento';

// Todas as rotas protegidas pelo JWT
const router = express.Router();
router.use(validarJwt);

// Rotas

// [OK] Postman
// [OK] Jest
router.get('/', async (req, res) => {
    retrieveConnection().then(async () => {

        let agendamentos:Agendamento[] = await getRepository(Agendamento).find();
        return res.status(200).send(agendamentos);

    });
});

// [OK] Postman
// [OK] Jest
router.post('/', validacaoAgendamento, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            let errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // TimeZone
            req.body.horario = moment(req.body.horario).format("YYYY-MM-DD hh:mm:ss");

            // Persistir agendamento
            let agendamento:Agendamento = await getRepository(Agendamento).save(req.body);
            return res.status(201).send(agendamento);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.get('/:agendamento', async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            let agendamento:Agendamento = await getRepository(Agendamento).findOneOrFail(req.params.agendamento);
            return res.status(200).send(agendamento);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.put('/:agendamento', validacaoAgendamento, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            let errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Busca na base para garantir que o agendamento existe
            let repositorio:Repository<Agendamento> = getRepository(Agendamento);
            let agendamento:Agendamento = await repositorio.findOneOrFail(req.params.agendamento);

            // TimeZone
            req.body.horario = moment(req.body.horario).format("YYYY-MM-DD hh:mm:ss");

            // Persiste e retorna
            repositorio.save(req.body);
            return res.status(201).send(agendamento);
        }
        catch (e) {
            console.log(e);
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.delete('/:agendamento', async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Busca na base para garantir que o agendamento existe
            let repositorio:Repository<Agendamento> = getRepository(Agendamento);
            let agendamento:Agendamento = await repositorio.findOneOrFail(req.params.agendamento);

            // Persiste e retorna
            await repositorio.softDelete(agendamento.id);
            return res.status(410).send(agendamento);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

module.exports = router;