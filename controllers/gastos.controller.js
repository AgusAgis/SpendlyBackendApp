// controllers/gastos.controller.js

const gastosService = require('../services/gastos.service'); // Importa la capa de Servicio

/**
 * Handler para GET /gastos - Obtiene todos los gastos.
 */
const getGastos = (req, res) => {
    const allGastos = gastosService.getAllGastos();
    res.json(allGastos);
};

/**
 * Handler para GET /gastos/:id - Obtiene un gasto por su ID.
 */
const getGasto = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const gasto = gastosService.getGastoById(id);

    if (gasto) {
        res.json(gasto);
    } else {
        res.status(404).json({ error: 'Gasto no encontrado' });
    }
};

/**
 * Handler para POST /gastos - Incorpora un nuevo gasto.
 */
const createGasto = async (req, res) => { // <-- async
    try {
        // El body ahora espera: { titulo, monto, fecha, moneda, tipoConversion}
        const newGasto = await gastosService.addGasto(req.body);
        res.status(201).json(newGasto);
    } catch (error) {
        // Captura el error de validación lanzado por el servicio
        res.status(400).json({ error: error.message });
    }
};

/**
 * Handler para PUT /gastos/:id - Actualiza un gasto por su ID.
 */
const updateGastoController = async (req, res) => { // <-- async
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const updatedGasto = await gastosService.updateGasto(id, req.body); // <-- await

    if (updatedGasto) {
        res.json(updatedGasto);
    } else {
        res.status(404).json({ error: 'Gasto no encontrado para actualizar' });
    }
};

/**
 * Handler para DELETE /gastos/:id - Borra un gasto por su ID.
 */
const deleteGastoController = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const wasDeleted = gastosService.deleteGasto(id);

    if (wasDeleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Gasto no encontrado para borrar' });
    }
};

module.exports = {
    getGastos,
    getGasto,
    createGasto,
    updateGastoController,
    deleteGastoController
};