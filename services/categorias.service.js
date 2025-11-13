const categoriaModel = require('../data/categorias.model'); 

/**
 * obtener todas las categoria realizados.
 */
const getAllCategorias = () => {
    return categoriaModel.findAll();
};

/**
 * obtener una categoria por ID.
 */
const getCategoriaById = (id) => {
    return categoriaModel.findById(id);
};

/**
 * agregar una nueva Categoria
 */
const addCategoria = (data) => {
    if (!data.titulo || !data.imagen) {
        // Lanza un error que será capturado por el controlador
        throw new Error("Datos incompletos. Se requieren titulo e imagen.");
    }

    return categoriaModel.save(data);
};

/**
 * actualizar una categoria por ID.
 */
const updateCategoria = (id, data) => {
    return categoriaModel.update(id, data);
};

/**
 * borrar un Categoria por ID.
 */
const deleteCategoria = (id) => {
    return categoriaModel.remove(id);
};

module.exports = {
    getAllCategorias,
    getCategoriaById,
    addCategoria,
    updateCategoria,
    deleteCategoria
};