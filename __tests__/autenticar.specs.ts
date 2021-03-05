import { getRepository, Repository } from "typeorm";

import { getHashSenha } from '../src/utils/hash.utils';

import { Medico } from "../src/database/entity/Medico";
import { MedicoToken } from "../src/database/entity/MedicoToken";

const supertest = require('supertest');
const server = require('../server');
const mock = jest.fn();

describe('Testar autenticação e JWT', () => {

    it ('Desejo que ao tentar autenticar com o payload inválido o status code seja 401 e exista propriedade "error" na resposta', async () => {

        // Enviar payload inválido
        const app = await supertest(server);
        const res = await app.post('/api/v1/autenticar/login').send({  });

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("error");
    });

    it ('Desejo que ao tentar autenticar com credenciais inválidas o status code seja 401 e exista propriedade "error" na resposta', async () => {

        // Médico não persistido
        let senha:string = await getHashSenha("123456");

        // Enviar credenciais inválidas
        const app = await supertest(server);
        const res = await app.post('/api/v1/autenticar/login').send({ 'email':'test@prontomed.com', 'senha':senha });

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("error");
    });

    it ('Desejo que ao autenticar com credenciais válidas o status code seja 200 e exista "token" e "medicoId" na resposta', async () => {

        // Persistir médico
        let senha:string = await getHashSenha('123456');
        let email:string = 'test' + Math.random() + '@prontomed.com';
        let medico:Medico = await getRepository(Medico).save({ 'nome':'Teste ProntoMed', 'email':email, 'senha':senha });

        // Enviar credenciais válidas
        const app = await supertest(server);
        const res = await app.post('/api/v1/autenticar/login').send({ 'email':medico.email, 'senha':'123456' });

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("medicoId");

        // Gravar JWT token
        mock.mockReturnValue({ 'email': medico.email, 'data':res.body });
    });

    it ('Desejo que ao finalizar sessão o "x-access-token" seja invalidado e o status code seja 410', async () => {

        // Mocked
        let token = mock();

        // Finalizar sessão
        const app = await supertest(server);
        const res = await app.post('/api/v1/autenticar/logout').set('x-access-token', token.data.token);

        // Buscar sessão
        let repositorio:Repository<MedicoToken> = getRepository(MedicoToken);
        let sessao:MedicoToken = await repositorio.findOne({ 'token':token.token });

        // Assert
        expect(res.statusCode).toEqual(410);
        expect(sessao).toBeFalsy();

    });
    
});