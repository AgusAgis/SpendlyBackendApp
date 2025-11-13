const gastosService = require('../services/gastos.service'); 


/**
 * GET /gastos - todos los gastos
 */
const getGastos = (req, res) => {
    const allGastos = gastosService.getAllGastos();
    res.json(allGastos);
};

/**
 * GET /gastos/:id - gassto por ID
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
 * POST /gastos - agregar un nuevo gasto.
 */
const createGasto = async (req, res) => {
    try {
        let archivoSubido = null;

        // Si viene un archivo, guardamos su ruta
        if (req.file) {
            archivoSubido = `/uploads/${req.file.filename}`;
        }

        // Datos del body
        const data = {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            monto: req.body.monto,
            fecha: req.body.fecha,
            moneda: req.body.moneda,
            tipoConversion: req.body.tipoConversion,
            archivo: archivoSubido
        };

        const newGasto = await gastosService.addGasto(data);

        res.status(201).json(newGasto);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * PUT /gastos/:id - Actualiza un gasto por su ID.
 */
const updateGastoController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const data = { ...req.body };

        // Si viene un archivo → reemplazar archivo previo
        if (req.file) {
            data.archivo = `/uploads/${req.file.filename}`;
        }

        // Si se recibe literal "null" en archivo → eliminar archivo
        if (req.body.archivo === "null") {
            data.archivo = null;
        }

                // limpiar propiedades vacías ("" o undefined)
        Object.keys(data).forEach(key => {
            if (data[key] === "" || data[key] === undefined) {
                delete data[key];
            }
        });

        const updatedGasto = await gastosService.updateGasto(id, data);

        if (!updatedGasto) {
            return res.status(404).json({ error: 'Gasto no encontrado para actualizar' });
        }

        res.json(updatedGasto);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * DELETE /gastos/:id - Borra un gasto por su ID.
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

const uploadArchivo = (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    if (!req.file) {
        return res.status(400).json({ error: "No se envió ningún archivo" });
    }

    const rutaArchivo = `/uploads/${req.file.filename}`;
    
    try {
        const gasto = gastosService.agregarArchivoAGasto(id, rutaArchivo);
        res.status(200).json(gasto);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getGastos,
    getGasto,
    createGasto,
    updateGastoController,
    deleteGastoController,
    uploadArchivo
};
