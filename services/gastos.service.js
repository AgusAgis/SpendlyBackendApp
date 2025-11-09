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

    if (!data.titulo || !data.monto || !data.fecha) {
        // Lanza un error que será capturado por el controlador
        throw new Error("Datos incompletos. Se requieren titulo, monto y fecha.");
    }

    let montoEnARS;
    const montoOriginal = parseFloat(data.monto);
    const monedaOriginal = data.moneda; // "ARS" o "USD"
    const tipoConversion = data.tipoConversion; // "tarjeta", "blue", etc.

    // 2. Lógica de Conversión
    if (monedaOriginal === 'USD') {
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
        montoEnARS = montoOriginal * tipoDolar.venta;

    } else {
        // Si la moneda es ARS, la guardamos tal cual
        montoEnARS = montoOriginal;
    }

    // 3. Preparar el objeto para guardar en el modelo
    const gastoParaGuardar = {
        titulo: data.titulo,
        fecha: data.fecha,
        montoEnARS: Math.round(montoEnARS * 100) / 100, // Redondeamos a 2 decimales
        montoOriginal: montoOriginal,
        monedaOriginal: monedaOriginal,
        tipoConversion: monedaOriginal === 'USD' ? tipoConversion : null
    };

    return gastosModel.save(gastoParaGuardar);
};

/**
 * Servicio para actualizar un gasto por ID.
 */
const updateGasto = async (id, data) => {
    // NOTA: Si el usuario puede editar el monto, aquí debería ir la misma
    // lógica de conversión que está en `addGasto`.
    // Por ahora, solo pasamos los datos básicos.
    
    // Implementación simple (solo actualiza título y fecha):
    const gastoExistente = gastosModel.findById(id);
    if (!gastoExistente) {
        return null;
    }
    
    const datosParaActualizar = {
        ...gastoExistente,
        titulo: data.titulo || gastoExistente.titulo,
        fecha: data.fecha || gastoExistente.fecha,
        // ... (Aquí iría la lógica completa si se puede cambiar el monto)
    };

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