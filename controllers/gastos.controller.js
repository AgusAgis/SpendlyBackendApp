const gastosService = require('../services/gastos.service'); 


/**
 * GET /gastos - todos los gastos
 */
const getGastos = async (req, res) => {
    try {
        const allGastos = await gastosService.getAllGastos();
        res.json(allGastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * GET /gastos/:id - gassto por ID
 */
const getGasto = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    try {
        const gasto = await gastosService.getGastoById(id);

        if (gasto) {
            res.json(gasto);
        } else {
            res.status(404).json({ error: 'Gasto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
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
            imagen: req.body.imagen,
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
        const id = req.params.id;
        if (!id) {
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
const deleteGastoController = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const wasDeleted = await gastosService.deleteGasto(id);

        if (wasDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Gasto no encontrado para borrar' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const uploadArchivo = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({ error: "ID inválido" });
    }

    if (!req.file) {
        return res.status(400).json({ error: "No se envió ningún archivo" });
    }

    const rutaArchivo = `/uploads/${req.file.filename}`;
    
    try {
        const gasto = await gastosService.agregarArchivoAGasto(id, rutaArchivo);
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
