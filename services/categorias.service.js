const { CategoriasDAO } = require('../data/factory');
const categoriaModel = CategoriasDAO;

const getAllCategorias = async () => {
  return await categoriaModel.findAll();
};

const getCategoriaById = async (id) => {
  return await categoriaModel.findById(id);
};

const addCategoria = async (data) => {
  if (!data.titulo) {
    throw new Error("Datos incompletos. Se requiere titulo.");
  }
  return await categoriaModel.save(data);
};

const updateCategoria = async (id, data) => {
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