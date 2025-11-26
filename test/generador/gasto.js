const { faker } = require('@faker-js/faker');

const categorias = [
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Hogar',
  'Educación',
  'Salud'
];

const get = () => {
  const fechaRandom = faker.date.anytime().toISOString().split('T')[0]; 
  // → "2025-11-01"

  return {
    nombre: faker.commerce.department(), 
    categoria: faker.helpers.arrayElement(categorias),
    monto: Number(faker.finance.amount({ min: 1000, max: 50000, dec: 0 })), 
    moneda: "ARS", // para no exigir tipoConversion
    tipoConversion: null,
    fecha: fechaRandom
    // imagen y archivo no los mandamos: son opcionales según Joi
  };
};

module.exports = {
  get
};