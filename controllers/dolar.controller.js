const dolarService = require('../services/dolar.service');


const getCotizacionesController = async (req, res) => {
    try {
        const cotizaciones = await dolarService.getCotizaciones();
        res.json(cotizaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * GET /dolar/convertir - Calcula una conversión en vivo.
 */
const getConversionController = async (req, res) => {
    // Ej: ?monto=50&tipoConversion=tarjeta&moneda=USD
    const { monto, tipoConversion, moneda } = req.query; 

    if (!monto || !tipoConversion || !moneda) {
        return res.status(400).json({ error: 'Faltan parámetros: monto, tipoConversion, moneda' });
    }
    
    if (moneda !== 'USD') {
        return res.json({ montoConvertido: parseFloat(monto) }); // No necesita conversión
    }

    try {
        const cotizaciones = await dolarService.getCotizaciones(); // Usa el caché
        const tipoDolar = cotizaciones.find(c => c.casa === tipoConversion);

        if (!tipoDolar) {
            return res.status(404).json({ error: 'Tipo de cotización no válido' });
        }

        const montoConvertido = parseFloat(monto) * parseFloat(tipoDolar.venta);
        res.json({ montoConvertido: Math.round(montoConvertido * 100) / 100 });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCotizacionesController,
    getConversionController
};
