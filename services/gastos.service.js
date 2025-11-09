// services/gastos.service.js

const gastosModel = require('../data/gastos.model'); // Importa la capa de Persistencia
const dolarService = require('../services/dolar.service');

/**
 * Servicio para obtener todos los gastos realizados.
 */
const getAllGastos = () => {
    return gastosModel.findAll();
};

/**
 * Servicio para obtener un gasto por ID.
 */
const getGastoById = (id) => {
    return gastosModel.findById(id);
};

/**
 * Servicio para agregar un nuevo gasto (incluye validación de negocio).
 */
const addGasto = async (data) => {

    if (!data.categoria || !data.monto || !data.fecha || !data.moneda) {
        // Lanza un error que será capturado por el controlador
        throw new Error("Datos incompletos. Se requieren categoria, monto, fecha y moneda.");
    }

    let montoEnARS;
    const monto = parseFloat(data.monto);
    const moneda = data.moneda; // "ARS" o "USD"
    const tipoConversion = data.tipoConversion; // "tarjeta", "blue", etc.

    // 2. Lógica de Conversión
    if (moneda === 'USD') {
        if (!tipoConversion) {
            throw new Error("Para un gasto en USD, se requiere un 'tipoConversion'.");
        }
        
        // Obtenemos cotizaciones
        const cotizaciones = await dolarService.getCotizaciones();
        
        // Buscamos la cotización correcta (ej: "tarjeta")
        const tipoDolar = cotizaciones.find(c => c.casa === tipoConversion);

        if (!tipoDolar) {
            throw new Error(`Tipo de conversión '${tipoConversion}' no encontrado.`);
        }
        // Usamos el valor de "venta" para la conversión
        montoEnARS = monto * tipoDolar.venta;

    } else {
        // Si la moneda es ARS, la guardamos tal cual
        montoEnARS = monto;
    }

    // 3. Preparar el objeto para guardar en el modelo
    const gastoParaGuardar = {
        categoria: data.categoria,
        fecha: data.fecha,
        montoEnARS: Math.round(montoEnARS * 100) / 100, // Redondeamos a 2 decimales
        monto: monto,
        moneda: moneda,
        tipoConversion: moneda === 'USD' ? tipoConversion : null
    };

    return gastosModel.save(gastoParaGuardar);
};

/**
 * Servicio para actualizar un gasto por ID.
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

    // 3. Verificar si el monto está siendo actualizado
    // Si el frontend envía un 'monto', recalculamos todo.
    if (data.monto !== undefined) {

        if (!data.moneda) {
            throw new Error("Para actualizar el monto, se debe proveer 'moneda'.");
        }

        const montoActualizado = parseFloat(data.monto);
        const moneda = data.moneda;
        const tipoConversion = data.tipoConversion;
        let montoEnARS;

        // 4. Re-aplicamos la misma lógica de conversión de addGasto
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

        // 5. Sobreescribimos los campos de monto en el objeto a actualizar
        datosParaActualizar.montoEnARS = Math.round(montoEnARS * 100) / 100;
        datosParaActualizar.monto = montoActualizado;
        datosParaActualizar.moneda = moneda;
        datosParaActualizar.tipoConversion = moneda === 'USD' ? tipoConversion : null;
    }

    return gastosModel.update(id, datosParaActualizar);
};

/**
 * Servicio para borrar un gasto por ID.
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
