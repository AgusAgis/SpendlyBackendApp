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

    if (!data.nombre || !data.categoria || !data.monto || !data.fecha || !data.moneda) {
        throw new Error("Datos incompletos. Se requieren nombre, categoria, monto, fecha y moneda.");
    }

    let montoEnARS;
    const monto = parseFloat(data.monto);
    const moneda = data.moneda;
    const tipoConversion = data.tipoConversion;

    // Si la moneda es USD, convierte
    if (moneda === 'USD') {
        if (!tipoConversion) {
            throw new Error("Para un gasto en USD, se requiere un 'tipoConversion'.");
        }

        const cotizaciones = await dolarService.getCotizaciones();
        const tipoDolar = cotizaciones.find(c => c.casa === tipoConversion);

        if (!tipoDolar) {
            throw new Error(`Tipo de conversión '${tipoConversion}' no encontrado.`);
        }

        montoEnARS = monto * tipoDolar.venta;

    } else {
        montoEnARS = monto;
    }

    const gastoParaGuardar = {
        nombre: data.nombre,
        categoria: data.categoria,
        fecha: data.fecha,
        montoEnARS: Math.round(montoEnARS * 100) / 100,
        monto: monto,
        moneda: moneda,
        tipoConversion: moneda === 'USD' ? tipoConversion : null,
        archivos: data.archivo || null
    };

    // Si vino archivo → guardarlo
    if (data.archivo) {
        gastoParaGuardar.archivo = data.archivo || null;
    }

    return gastosModel.save(gastoParaGuardar);
};

/**
 * actualizar un gasto por ID.
 */
const updateGasto = async (id, data) => {
    const gastoExistente = gastosModel.findById(id);
    if (!gastoExistente) return null;

    const updatedData = {
        ...gastoExistente,      // mantenemos lo que ya tenía
        ...data                 // reemplazamos solo lo que viene
    };

    // Si hay monto nuevo → recalcular
    if (data.monto !== undefined) {
        const monto = parseFloat(data.monto);

        if (!data.moneda) {
            throw new Error("Para actualizar monto se debe enviar 'moneda'.");
        }

        if (data.moneda === "USD") {
            const cotizaciones = await dolarService.getCotizaciones();
            const tipoDolar = cotizaciones.find(c => c.casa === data.tipoConversion);

            if (!tipoDolar) throw new Error("Tipo de dólar inválido.");

            updatedData.montoEnARS = monto * parseFloat(tipoDolar.venta);
        } else {
            updatedData.montoEnARS = monto;
        }
    }

    return gastosModel.update(id, updatedData);
};

/**
 * borrar un gasto por ID.
 */
const deleteGasto = (id) => {
    return gastosModel.remove(id);
};

const agregarArchivoAGasto = (id, rutaArchivo) => {
    const gasto = gastosModel.findById(id);
    if (!gasto) throw new Error("Gasto no encontrado");

    if (!gasto.archivos) gasto.archivos = [];

    gasto.archivos.push(rutaArchivo);

    gastosModel.update(id, gasto);

    return gasto;
};

module.exports = {
    getAllGastos,
    getGastoById,
    addGasto,
    updateGasto,
    deleteGasto,
    agregarArchivoAGasto
};
