import express from 'express';

import { validationResult } from 'express-validator';
import { getRepository, Repository } from 'typeorm';

import { validarJwt } from '../../../middleware/jwt.middleware';

import { retrieveConnection } from '../../../utils/conn.utils';
import { getError } from '../../../utils/error.utils';

import { ValidationException } from '../../../error/validator.error';
import { validacaoAnotacao, validacaoIniciarConsulta, validacaoObservacao } from '../../../validator/consulta.validator';

import { Consulta } from '../../../database/entity/Consulta';
import { ConsultaAnotacao } from '../../../database/entity/ConsultaAnotacao';

// Todas as rotas protegidas pelo JWT
const router = express.Router();
router.use(validarJwt);

// Rotas

// [OK] Postman
// [OK] Jest
router.post('/:agendamento/iniciar', validacaoIniciarConsulta, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            const errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Persiste e retorna
            const consulta:Consulta = await getRepository(Consulta).save(req.body);
            return res.status(201).send(consulta);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.get('/:consulta', async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            const errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Busca e retorna
            const consulta:Consulta = await getRepository(Consulta).findOneOrFail(req.params.consulta, { "relations": [ "agendamento", "agendamento.paciente" ] });
            return res.status(200).send(consulta);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.put('/:consulta', validacaoObservacao, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            const errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Buscar na base
            const repositorio:Repository<Consulta> = getRepository(Consulta);
            let consulta:Consulta = await repositorio.findOneOrFail(req.params.consulta);

            // Persiste e retorna
            consulta = await repositorio.save({ "id":consulta.id, "observacao":req.body.observacao });
            return res.status(201).send(consulta);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.post('/:consulta/anotacao', validacaoAnotacao, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            const errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Persiste e retorna
            const anotacao:ConsultaAnotacao = await getRepository(ConsultaAnotacao).save(req.body);
            return res.status(201).send(anotacao);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

module.exports = router;