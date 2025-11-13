const gastosModel = require('../data/gastos.model');
const dolarService = require('../services/dolar.service');

/**
 * obtener todos los gastos realizados.
 */
const getAllGastos = () => {
    return gastosModel.findAll();
};

/**
 * obtener un gasto por Id
 */
const getGastoById = (id) => {
    return gastosModel.findById(id);
};

/**
 * agregar un nuevo gasto
 */
const addGasto = async (data) => {

    if (!data.categoria || !data.monto || !data.fecha || !data.moneda) {
        throw new Error("Datos incompletos. Se requieren categoria, monto, fecha y moneda.");
    }

    let montoEnARS;
    const monto = parseFloat(data.monto);
    const moneda = data.moneda;
    const tipoConversion = data.tipoConversion;

    if (moneda === 'USD') {
        if (!tipoConversion) {
            throw new Error("Para un gasto en USD, se requiere un 'tipoConversion'.");
        }
        
        const cotizaciones = await dolarService.getCotizaciones();
        
        const tipoDolar = cotizaciones.find(c => c.casa === tipoConversion);

        if (!tipoDolar) {
            throw new Error(`Tipo de conversión '${tipoConversion}' no encontrado.`);
        }
        // usa el valor de "venta" para la conversión
        montoEnARS = monto * tipoDolar.venta;

    } else {
        montoEnARS = monto;
    }

    const gastoParaGuardar = {
        categoria: data.categoria,
        fecha: data.fecha,
        montoEnARS: Math.round(montoEnARS * 100) / 100,
        monto: monto,
        moneda: moneda,
        tipoConversion: moneda === 'USD' ? tipoConversion : null
    };

    return gastosModel.save(gastoParaGuardar);
};

/**
 * actualizar un gasto por ID.
 */
const updateGasto = async (id, data) => {

    const gastoExistente = gastosModel.findById(id);
    if (!gastoExistente) {
        return null;
    }
    
    const datosParaActualizar = {
        ...gastoExistente,
        categoria: data.categoria || gastoExistente.categoria,
        fecha: data.fecha || gastoExistente.fecha,
    };

    if (data.monto !== undefined) {

        if (!data.moneda) {
            throw new Error("Para actualizar el monto, se debe proveer 'moneda'.");
        }

        const montoActualizado = parseFloat(data.monto);
        const moneda = data.moneda;
        const tipoConversion = data.tipoConversion;
        let montoEnARS;

        if (moneda === 'USD') {
            if (!tipoConversion) {
                throw new Error("Para un gasto en USD, se requiere un 'tipoConversion'.");
            }
            const cotizaciones = await dolarService.getCotizaciones();
            const tipoDolar = cotizaciones.find(c => c.casa === tipoConversion);
            if (!tipoDolar) {
                throw new Error(`Tipo de conversión '${tipoConversion}' no encontrado.`);
            }
            montoEnARS = montoActualizado * parseFloat(tipoDolar.venta);
        } else {
            montoEnARS = montoActualizado;
        }

        datosParaActualizar.montoEnARS = Math.round(montoEnARS * 100) / 100;
        datosParaActualizar.monto = montoActualizado;
        datosParaActualizar.moneda = moneda;
        datosParaActualizar.tipoConversion = moneda === 'USD' ? tipoConversion : null;
    }

    return gastosModel.update(id, datosParaActualizar);
};

/**
 * borrar un gasto por ID.
 */
const deleteGasto = (id) => {
    return gastosModel.remove(id);
};

module.exports = {
    getAllGastos,
    getGastoById,
    addGasto,
    updateGasto,
    deleteGasto
};
