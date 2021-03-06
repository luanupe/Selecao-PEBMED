import express from 'express';

import { validationResult } from 'express-validator';
import { getRepository, Repository } from 'typeorm';

import { validarJwt } from '../../../middleware/jwt.middleware';

import { retrieveConnection } from '../../../utils/conn.utils';
import { validarHashSenha } from '../../../utils/hash.utils';
import { getError } from '../../../utils/error.utils';

import { ValidationException } from '../../../error/validator.error';
import { validacaoLogin } from '../../../validator/autenticar.validor';

import { Medico } from '../../../database/entity/Medico';
import { MedicoToken } from '../../../database/entity/MedicoToken';

const router = express.Router();
import jwt from 'jsonwebtoken';

// [OK] Postman
// [OK] Jest
router.post('/login', validacaoLogin, async (req, res) => {
    retrieveConnection().then(async (conn) => {

        try {
            // Validar payload
            const errors = validationResult(req);
            if (!(errors.isEmpty())) throw new ValidationException(errors);

            // Buscar médico com o email informado
            const medico:Medico = await conn.getRepository(Medico).findOneOrFail({ where: { email:req.body.email } });

            // Validar senha
            const senha:boolean = await validarHashSenha(req.body.senha, medico.senha);
            if (!(senha)) throw new Error('Senha não corresponde');

            // Autoriza o JWT
            const token = jwt.sign({ medicoId:medico.id }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRES });
            await getRepository(MedicoToken).save({ 'token':token, 'ip':req.ip, 'medico':medico });

            // Manda pro client
            return res.status(200).json({ 'token':token, medicoId:medico.id });
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

// [OK] Postman
// [OK] Jest
router.post('/logout', validarJwt, async (req, res) => {
    retrieveConnection().then(async () => {

        try {
            // Recuperar repositorio
            const repositorio:Repository<MedicoToken> = getRepository(MedicoToken);

            // Buscar sessão
            const token:string = String(req.headers['x-access-token']);
            const sessao:MedicoToken = await repositorio.findOne({ 'token':token });

            // Soft delete
            await repositorio.softDelete(sessao.id);
            return res.status(410).json({ 'token':token});
        }
        catch (e) {
            return res.status(401).json({ 'error':getError(e) }).end();
        }

    });
});

module.exports = router;