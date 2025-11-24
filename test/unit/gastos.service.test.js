// test unitario utilizando Mocha y Chai

const { expect } = require('chai');
const service = require('../../services/gastos.service');
const factory = require('../../data/factory');

describe('Pruebas Unitarias para Gastos Service (getAllGastos)', () => {

    let originalFindAll;

    // Datos de ejemplo
    const MOCK_GASTOS = [
        { id: 10, nombre: "Test Gasto 1" },
        { id: 11, nombre: "Test Gasto 2" }
    ];


    // --- Casos de Prueba para getAllGastos ---

    describe('getAllGastos() - Mock Manual', () => {
        it('debería retornar la lista de gastos que proporciona el DAO', async () => {
            let findAllLlamado = false;
            factory.GastosDAO.findAll = async () => {
                findAllLlamado = true;
                return MOCK_GASTOS;
            };
            const result = await service.getAllGastos();
            console.log(result)

            expect(result).to.be.an('array');
            expect(result).to.be.deep.equal(MOCK_GASTOS);
            expect(findAllLlamado).to.be.true;
        });

        it('debería retornar un array vacío si el DAO no tiene gastos', async () => {
            factory.GastosDAO.findAll = async () => {
                return [];
            };
            const result = await service.getAllGastos();
            console.log(result)
            expect(result).to.be.an('array').that.is.empty;
        });
    });
});