const categoriasService = require('../services/categorias.service');

const getCategoriasController = async (req, res) => {
  try {
    const categorias = await categoriasService.getAllCategorias();
    res.json(categorias);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getCategoriaController = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await categoriasService.getCategoriaById(id);
    if (categoria) res.json(categoria);
    else res.status(404).json({ error: "Categoria no encontrada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createCategoriaController = async (req, res) => {
  try {
    const newCategoria = await categoriasService.addCategoria(req.body);
    res.status(201).json(newCategoria);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateCategoriaController = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await categoriasService.updateCategoria(id, req.body);
    if (updated) res.json(updated);
    else res.status(404).json({ error: "Categoria no encontrada" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteCategoriaController = async (req, res) => {
  try {
    const id = req.params.id;
    const ok = await categoriasService.deleteCategoria(id);
    if (ok) res.status(204).send();
    else res.status(404).json({ error: "Categoria no encontrada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getCategoriasController,
  getCategoriaController,
  createCategoriaController,
  updateCategoriaController,
  deleteCategoriaController
};