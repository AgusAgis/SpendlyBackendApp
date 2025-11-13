const categoriasService = require('../services/categorias.service'); 


/**
 * GET /categorias - Obtiene todas las categorias.
 */
const getCategoriasController = (req, res) => {
    const categorias = categoriasService.getAllCategorias();
    res.json(categorias);
};

/**
 * GET /categorias/:id - Obtiene una categorias por su ID.
 */
const getCategoriaController = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const categoria = categoriasService.getCategoriaById(id);

    if (categoria) {
        res.json(categoria);
    } else {
        res.status(404).json({ error: 'Categoria no encontrado' });
    }
};

/**
 * POST /categorias - Incorpora una nueva categoria.
 */
const createCategoriaController = (req, res) => {
    try {
        const newCategoria = categoriasService.addCategoria(req.body);
        res.status(201).json(newCategoria);
    } catch (error) {
        // Captura el error de validación lanzado por el servicio
        res.status(400).json({ error: error.message });
    }
};

/**
 * PUT /categorias/:id - Actualiza una categoria por su ID.
 */
const updateCategoriaController = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const updatedCategoria = categoriasService.updateCategoria(id, req.body);

    if (updatedCategoria) {
        res.json(updatedCategoria);
    } else {
        res.status(404).json({ error: 'Categoria no encontrada para actualizar' });
    }
};

/**
 * DELETE /categorias/:id - Borra una categoria por su ID.
 */
const deleteCategoriaController = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const wasDeleted = categoriasService.deleteCategoria(id);

    if (wasDeleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Categoria no encontrado para borrar' });
    }
};

module.exports = {
    getCategoriasController,
    getCategoriaController,
    createCategoriaController,
    updateCategoriaController,
    deleteCategoriaController
};