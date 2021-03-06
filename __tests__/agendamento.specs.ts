import { Agendamento } from "../src/database/entity/Agendamento";
import { Paciente } from "../src/database/entity/Paciente";
import { getAgendamentoFactory, getAgendamentoPelaFactory } from "../src/utils/test.utils";
import { autenticarJWT } from "./autenticar.specs";

const supertest = require('supertest');
const server = require('../server');
const mock = jest.fn();

// [OK] Usuário AUTENTICADO deve receber status code 200 ao LISTAR agendamento
// [OK] Usuário AUTENTICADO deve receber status code 201 ao CADASTRAR agendamento e receber um JSON com atributo id
// [Ok] Usuário AUTENTICADO deve receber status code 200 ao DETALHAR agendamento e receber um JSON com atributo id
// [OK] Usuário AUTENTICADO deve receber status code 201 ao ATUALIZAR agendamento e receber um JSON com atributo id
// [OK] Usuário AUTENTICADO deve receber status code 410 ao DELETAR agendamento

beforeAll(async () => {

    let token = await autenticarJWT();
    mock.mockReturnValue(token);

});

describe('Rotas de agendamento: AUTENTICADO', () => {

    it ('Usuário AUTENTICADO deve receber status code 200 ao LISTAR agendamento', async () => {

        // Mocked
        let token = mock();

        // Listar agendamentos
        const app = await supertest(server);
        const res = await app.get('/api/v1/agendamento').set('x-access-token', token.data.token);

        // Assert
        expect(res.statusCode).toEqual(200);

    });

    it ('Usuário AUTENTICADO deve receber status code 201 ao CADASTRAR agendamento e receber um JSON com atributo id', async () => {

        // Mocked
        let token = mock();
        
        // Cadastrar agendamento
        let data = await getAgendamentoFactory();
        const app = await supertest(server);
        const res = await app.post('/api/v1/agendamento').set('x-access-token', token.data.token).send(data);

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');

    });

    it ('Usuário AUTENTICADO deve receber status code 200 ao DETALHAR agendamento e receber um JSON com atributo id', async () => {

        // Mocked
        let token = mock();

        // Buscar agendamento cadastrado
        let agendamento:Agendamento = await getAgendamentoPelaFactory();

        // Cadastrar agendamento
        const app = await supertest(server);
        const res = await app.get('/api/v1/agendamento/' + agendamento.id).set('x-access-token', token.data.token);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');

    });

    it ('Usuário AUTENTICADO deve receber status code 201 ao ATUALIZAR agendamento e receber um JSON com atributo id', async () => {

        // Mocked
        let token = mock();

        // Buscar agendamento cadastrado
        let agendamento:Agendamento = await getAgendamentoPelaFactory();

        // Gerar dados para atualizar
        let data = await getAgendamentoFactory();

        // Cadastrar agendamento
        const app = await supertest(server);
        const res = await app.put('/api/v1/agendamento/' + agendamento.id).set('x-access-token', token.data.token).send(data);

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');

    });

    it ('Usuário AUTENTICADO deve receber status code 410 ao DELETAR agendamento', async () => {

        // Mocked
        let token = mock();

        // Buscar agendamento cadastrado
        let agendamento:Agendamento = await getAgendamentoPelaFactory();

        // Cadastrar agendamento
        const app = await supertest(server);
        const res = await app.delete('/api/v1/agendamento/' + agendamento.id).set('x-access-token', token.data.token);

        // Assert
        expect(res.statusCode).toEqual(410);

    });

});