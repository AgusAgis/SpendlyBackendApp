// controllers/dolar.controller.js
const dolarService = require('../services/dolar.service'); // Importa la capa de Servicio


const getCotizacionesController = async (req, res) => {
    try {
        const cotizaciones = await dolarService.getCotizaciones();
        res.json(cotizaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCotizacionesController
};
