const supertest = require('supertest');
const server = require('../server');

describe('Testar se a aplicação foi configurada com sucesso', () => {

    it ('Desejo que a rota "/" retorne status code 200 com uma propriedade chamada "hello"', async () => {
        const app = await supertest(server);
        const response = await app.get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("hello");
    });
    
});