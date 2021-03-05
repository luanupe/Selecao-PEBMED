import express from "express";

import { Repository, getRepository } from "typeorm";

import { retrieveConnection } from '../utils/conn.utils';
import { getError } from "../utils/error.utils";

import { MedicoToken } from "../database/entity/MedicoToken";

const jwt = require('jsonwebtoken');

export async function validarJwt(req:express.Request, res:express.Response, next:Function) {
    retrieveConnection().then(async () => {
        try {
            // Converter header em string
            let token:string = String(req.headers['x-access-token']);

            // Validar o access token
            await validarToken(token, req);
            return next();
        }
        catch (e) {
            return res.status(401).send({ 'error': getError(e) }).end();
        }
    });
}

async function validarToken(token:string, req:express.Request) {
    // Validar o token
    jwt.verify(token, process.env.JWT_SECRET, (e:Error, data:any) => {
        if ((e)) throw e;
    });

    // Validar sessão
    let repositorio:Repository<MedicoToken> = getRepository(MedicoToken);
    let sessao:MedicoToken|undefined = await repositorio.findOne({ relations:['medico'], where: { token:token } });
    if ((sessao == null)) throw new Error('Sessão desconectada');
}