import { autenticarJWT } from "./autenticar.specs";

const supertest = require('supertest');
const server = require('../server');
const mock = jest.fn();

// Usuário AUTENTICADO deve receber status code 201 ao INICIAR consulta
// Usuário AUTENTICADO deve receber status code 200 ao DETALHAR consulta
// Usuário AUTENTICADO deve receber status code 201 ao ADICIONAR OBSERVACAO
// Usuário AUTENTICADO deve receber status code 201 ao ADICIONAR ANOTAÇÃO

beforeAll(async () => {

    let token = await autenticarJWT();
    mock.mockReturnValue(token);

});

describe('Rotas de consultas: AUTENTICADO', () => {



});