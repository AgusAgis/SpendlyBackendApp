const { faker } = require('@faker-js/faker');

const categorias = [
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Hogar',
  'Educación',
  'Salud'
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