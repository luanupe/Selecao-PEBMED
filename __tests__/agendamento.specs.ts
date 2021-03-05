import { autenticarJWT } from "./autenticar.specs";

const supertest = require('supertest');
const server = require('../server');
const mock = jest.fn();

// [] Usuário AUTENTICADO deve receber status code 200 ao LISTAR agendamento
// [] Usuário AUTENTICADO deve receber status code 201 ao CADASTRAR agendamento e receber um JSON com atributo id
// [] Usuário AUTENTICADO deve receber status code 200 ao DETALHAR agendamento e receber um JSON com atributo id
// [] Usuário AUTENTICADO deve receber status code 201 ao ATUALIZAR agendamento e receber um JSON com atributo id
// [] Usuário AUTENTICADO deve receber status code 410 ao DELETAR agendamento

beforeAll(async () => {

    let token = await autenticarJWT();
    mock.mockReturnValue(token);

});

describe('Rotas de agendamento: AUTENTICADO', () => {



});