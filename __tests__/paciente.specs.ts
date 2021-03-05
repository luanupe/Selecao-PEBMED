import { autenticarJWT } from "./autenticar.specs";

import { getPacienteFactory, getPacientePelaFactory } from "../src/utils/test.utils";

import { Paciente } from "../src/database/entity/Paciente";

const supertest = require('supertest');
const server = require('../server');
const mock = jest.fn();

// [OK] Usuário AUTENTICADO deve receber status code 200 ao LISTAR paciente
// [OK] Usuário AUTENTICADO deve receber status code 201 ao CADASTRAR paciente e receber um JSON com atributo id
// [OK] Usuário AUTENTICADO deve receber status code 200 ao DETALHAR paciente e receber um JSON com atributo id
// [OK] Usuário AUTENTICADO deve receber status code 201 ao ATUALIZAR paciente e receber um JSON com atributo id
// [OK] Usuário AUTENTICADO deve receber status code 410 ao DELETAR paciente

beforeAll(async () => {

    let token = await autenticarJWT();
    mock.mockReturnValue(token);

});

describe('Rotas de pacientes: AUTENTICADO', () => {

    it ('Usuário AUTENTICADO deve receber status code 200 ao LISTAR paciente', async () => {

        // Mocked
        let token = mock();

        // Listar pacientes
        const app = await supertest(server);
        const res = await app.get('/api/v1/paciente').set('x-access-token', token.data.token);

        // Assert
        expect(res.statusCode).toEqual(200);

    });

    it ('Usuário AUTENTICADO deve receber status code 201 ao CADASTRAR paciente e receber um JSON com atributo id', async () => {

        // Mocked
        let token = mock();

        // Cadastrar paciente
        const app = await supertest(server);
        const res = await app.post('/api/v1/paciente').set('x-access-token', token.data.token).send(getPacienteFactory());

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');

    });

    it ('Usuário AUTENTICADO deve receber status code 200 ao DETALHAR paciente e receber um JSON com atributo id', async () => {

        // Mocked
        let token = mock();

        // Buscar paciente cadastrado
        let paciente:Paciente = await getPacientePelaFactory();

        // Cadastrar paciente
        const app = await supertest(server);
        const res = await app.get('/api/v1/paciente/' + paciente.id).set('x-access-token', token.data.token);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');

    });

    it ('Usuário AUTENTICADO deve receber status code 201 ao ATUALIZAR paciente e receber um JSON com atributo id', async () => {

        // Mocked
        let token = mock();

        // Buscar paciente cadastrado
        let paciente:Paciente = await getPacientePelaFactory();
        let data = getPacienteFactory(paciente.id);

        // Cadastrar paciente
        const app = await supertest(server);
        const res = await app.put('/api/v1/paciente/' + paciente.id).set('x-access-token', token.data.token).send(data);

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');

    });

    it ('Usuário AUTENTICADO deve receber status code 410 ao DELETAR paciente', async () => {

        // Mocked
        let token = mock();

        // Buscar paciente cadastrado
        let paciente:Paciente = await getPacientePelaFactory();

        // Cadastrar paciente
        const app = await supertest(server);
        const res = await app.delete('/api/v1/paciente/' + paciente.id).set('x-access-token', token.data.token);

        // Assert
        expect(res.statusCode).toEqual(410);

    });

});