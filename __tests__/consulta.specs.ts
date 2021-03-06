import { autenticarJWT } from "./autenticar.specs";

import { getAgendamentoPelaFactory, getConsultaPelaFactory } from "../src/utils/test.utils";

import { Agendamento } from "../src/database/entity/Agendamento";
import { Consulta } from "../src/database/entity/Consulta";

const supertest = require('supertest');
const server = require('../server');
const mock = jest.fn();

// [OK] Usuário AUTENTICADO deve receber status code 201 ao INICIAR consulta
// [OK] Usuário AUTENTICADO deve receber status code 200 ao DETALHAR consulta
// [OK] Usuário AUTENTICADO deve receber status code 201 ao ADICIONAR OBSERVACAO
// [OK] Usuário AUTENTICADO deve receber status code 201 ao ADICIONAR ANOTAÇÃO

beforeAll(async () => {

    let token = await autenticarJWT();
    mock.mockReturnValue(token);

});

describe('Rotas de consultas: AUTENTICADO', () => {

    it ('Usuário AUTENTICADO deve receber status code 201 ao INICIAR consulta', async () => {

        // Mocked
        let token = mock();
        
        // Abrir Consulta
        let agendamento:Agendamento = await getAgendamentoPelaFactory();
        const app = await supertest(server);
        const res = await app.post('/api/v1/consulta/' + agendamento.id + '/iniciar').set('x-access-token', token.data.token).send({ agendamento: { id:agendamento.id } });

        // Assert
        expect(res.statusCode).toEqual(201);

    });

    it ('Usuário AUTENTICADO deve receber status code 200 ao DETALHAR consulta', async () => {

        // Mocked
        let token = mock();
        
        // Abrir Consulta
        let consulta:Consulta = await getConsultaPelaFactory();
        const app = await supertest(server);
        const res = await app.get('/api/v1/consulta/' + consulta.id).set('x-access-token', token.data.token);

        // Assert
        expect(res.statusCode).toEqual(200);

    });

    it ('Usuário AUTENTICADO deve receber status code 201 ao ADICIONAR OBSERVACAO', async () => {

        // Mocked
        let token = mock();
        
        // Abrir Consulta
        let consulta:Consulta = await getConsultaPelaFactory();
        const app = await supertest(server);
        const res = await app.put('/api/v1/consulta/' + consulta.id).set('x-access-token', token.data.token).send({ observacao:'Teste de Observacao' });

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(res.body.observacao).toBeTruthy();

    });

    it ('Usuário AUTENTICADO deve receber status code 201 ao ADICIONAR ANOTAÇÃO', async () => {

        // Mocked
        let token = mock();
        
        // Abrir Consulta
        let consulta:Consulta = await getConsultaPelaFactory();
        let data = { consulta: { id:consulta.id }, conteudo:'Teste de Anotação' };
        const app = await supertest(server);
        const res = await app.post('/api/v1/consulta/' + consulta.id + '/anotacao').set('x-access-token', token.data.token).send(data);

        // Assert
        expect(res.statusCode).toEqual(201);

    });

});