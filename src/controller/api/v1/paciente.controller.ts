import express from 'express';

import { validationResult } from 'express-validator';
import { getRepository, Repository } from 'typeorm';

import { validarJwt } from '../../../middleware/jwt.middleware';

import { retrieveConnection } from '../../../utils/conn.utils';
import { getError } from '../../../utils/error.utils';

import { ValidationException } from '../../../error/validator.error';
import { validacaoPaciente } from '../../../validator/paciente.validator';

import { Paciente } from '../../../database/entity/Paciente';

// Todas as rotas protegidas pelo JWT
const router = express.Router();
router.use(validarJwt);

// Rotas

// [OK] Postman
// [OK] Jest
router.get('/', async (req, res) => {
    retrieveConnection().then(async () => {

        const pacientes:Paciente[] = await getRepository(Paciente).find({ withDeleted: true });
        return res.send(pacientes);

    });
});

// [OK] Postman
// [OK] Jest
router.post('/', validacaoPaciente, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            const errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Persistir paciente
            const paciente:Paciente = await getRepository(Paciente).save(req.body);
            return res.status(201).send(paciente);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.get('/:paciente', async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            const paciente:Paciente = await getRepository(Paciente).findOneOrFail(req.params.paciente);
            return res.send(paciente);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.put('/:paciente', validacaoPaciente, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Validar payload
            const errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Busca na base para garantir que o paciente existe
            const repositorio:Repository<Paciente> = getRepository(Paciente);
            let paciente:Paciente = await getRepository(Paciente).findOneOrFail(req.params.paciente);

            // Persiste e retorna
            paciente = await repositorio.save(req.body);
            return res.status(201).send(paciente);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.delete('/:paciente', async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Busca na base para garantir que o paciente existe
            const repositorio:Repository<Paciente> = getRepository(Paciente);
            let paciente:Paciente = await repositorio.findOneOrFail(req.params.paciente);

            // Remove dados sensitivos
            const data = { id:paciente.id, email:null, nome:null, nascimento:null, sexo:null, peso:null, altura:null, telefone:null };
            paciente = await repositorio.save(data);

            // Persiste e retorna
            await repositorio.softDelete(paciente.id);
            return res.status(410).send(paciente);
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

module.exports = router;