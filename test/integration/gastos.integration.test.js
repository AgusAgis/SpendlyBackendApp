// test de integracion  utilizando Mocha Chai y Supertest

const { expect } = require('chai');
const supertest = require('supertest');
const gasto = require('../generador/gasto.js')

const request = supertest('http://localhost:8080')

describe('** Pruebas de Integración para Endpoints de Gastos **', () => {
    describe('GET /gastos', () => {
        it('debería retornar el status 200 y una lista de gastos', async () => {
            const response = await request.get('/gastos');
            //console.log(response)
            expect(response.status).to.eql(200)

        });
    });
    describe('POST /gastos', () => {
        it('debería agregar un gasto a la lista', async () => {
            const nuevoGasto = gasto.get();
            console.log(nuevoGasto)
            const response = await request.post('/gastos').send(nuevoGasto)
            expect(response.status).to.eql(201)
            expect(response.body).to.have.property('nombre').that.is.equal(nuevoGasto.nombre);
        });
    });
});