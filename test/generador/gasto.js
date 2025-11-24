const { faker } = require('@faker-js/faker');

const categorias = [
    'Educacion',
    'Salud',
    'Entretenimiento'
]
const get = () => ({
    "id": faker.number.int({ min: 10, max: 10000 }),
    "nombre": faker.commerce.department(),
    "categoria": faker.helpers.arrayElement(categorias),
    "monto": faker.finance.amount(),
    "moneda": "ARS",
    "fecha": faker.date.anytime(),
})

module.exports = {
    get
}