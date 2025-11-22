const { MODO_PERSISTENCIA } = require('../config');

let GastosDAO;
let CategoriasDAO;

switch (MODO_PERSISTENCIA) {
  case 'MONGODB':
    GastosDAO = require('./gastos.mongodb.dao');
    CategoriasDAO = require('./categorias.mongodb.dao');
    break;

  default: // MEM
    GastosDAO = require('./gastos.mem.dao');
    CategoriasDAO = require('./categorias.mem.dao');
    break;
}

module.exports = { GastosDAO, CategoriasDAO };