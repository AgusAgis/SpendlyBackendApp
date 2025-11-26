const { CategoriasDAO } = require('../data/factory');
const categoriaModel = CategoriasDAO;
const { validarCategoriaCrear, validarCategoriaActualizar } = require('../services/validaciones/categorias');

const getAllCategorias = async () => {
  return await categoriaModel.findAll();
};

const getCategoriaById = async (id) => {
  return await categoriaModel.findById(id);
};

const addCategoria = async (data) => {
  const { result, error } = validarCategoriaCrear(data);
  if (!result) {
    const mensajes = error.details.map(e => e.message).join(', ');
    throw new Error(`Datos inválidos de la categoría: ${mensajes}`);
  }
  return await categoriaModel.save(data);
};

const updateCategoria = async (id, data) => {
  // validamos update parcial
  const { result, error } = validarCategoriaActualizar(data);
  if (!result) {
    const mensajes = error.details.map(e => e.message).join(', ');
    throw new Error(`Datos inválidos para actualizar categoría: ${mensajes}`);
  }
  
  return await categoriaModel.update(id, data);
};

const deleteCategoria = async (id) => {
  return await categoriaModel.remove(id);
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  addCategoria,
  updateCategoria,
  deleteCategoria
};