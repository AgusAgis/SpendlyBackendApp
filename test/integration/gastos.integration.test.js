// test de integracion  utilizando Mocha Chai y Supertest

const { expect } = require('chai');
const supertest = require('supertest');

const request = supertest('http://localhost:8080')

describe('** Pruebas de Integración para Endpoints de Gastos **', () => {
    describe('GET /gastos', () => {
        it('debería retornar el status 200 y una lista de gastos', async () => {
            const response = await request.get('/gastos');
            //console.log(response)
            expect(response.status).to.eql(200)

        });
    });
});