// data/gastos.model.js

// Array en memoria para almacenar los gastos (Persistencia en Memoria).
let gastos = [
    { 
        id: 1, 
        titulo: "Hogar", 
        fecha: "2025/11/03",
        montoEnARS: 11300,        // Monto principal (siempre ARS)
        montoOriginal: 11300,     // Monto que ingresó el usuario
        monedaOriginal: "ARS",    // Moneda que ingresó el usuario
        tipoConversion: null      // Tipo de dólar usado (null si fue ARS)
    },
    { 
        id: 2, 
        titulo: "Entretenimiento", 
        fecha: "2025/11/04",
        montoEnARS: 9500,
        montoOriginal: 9500,
        monedaOriginal: "ARS",
        tipoConversion: null
    },
    { 
        id: 3, 
        titulo: "Comida", 
        fecha: "2025/11/04",
        montoEnARS: 4000,
        montoOriginal: 4000,
        monedaOriginal: "ARS",
        tipoConversion: null
    },
];

// Contador para asignar IDs únicos y consecutivos.
let nextId = 4;

/**
 * Obtiene la lista completa de gastos.
 */
const findAll = () => {
    return gastos;
};

/**
 * Busca un gasto por su ID.
 */
const findById = (id) => {
    return gastos.find(gasto => gasto.id === id);
};

/**
 * Crea y añade un nuevo gasto.
 */
const save = (data) => {
    const newGasto = {
        id: nextId++,
        titulo: data.titulo,
        fecha: data.fecha,
        montoEnARS: data.montoEnARS, // El monto principal es en ARS
        montoOriginal: data.montoOriginal,
        monedaOriginal: data.monedaOriginal,
        tipoConversion: data.tipoConversion
    };
    gastos.push(newGasto);
    return newGasto;
};

/**
 * Actualiza un gasto existente por ID.
 */
const update = (id, data) => {
const index = gastos.findIndex(gasto => gasto.id === id);

    if (index === -1) {
        return null; // Gasto no encontrado
    }

    // Aseguramos que solo se actualicen los campos provistos
    const updatedGasto = { ...gastos[index] };

    if (data.titulo) updatedGasto.titulo = data.titulo;
    if (data.fecha) updatedGasto.fecha = data.fecha;
    
    // Si se actualiza el monto, se debe proveer la lógica de conversión completa
    if (data.montoEnARS) {
        updatedGasto.montoEnARS = data.montoEnARS;
        updatedGasto.montoOriginal = data.montoOriginal;
        updatedGasto.monedaOriginal = data.monedaOriginal;
        updatedGasto.tipoConversion = data.tipoConversion;
    }

    gastos[index] = updatedGasto;
    return updatedGasto;
};

/**
 * Elimina un gasto por ID.
 */
const remove = (id) => {
    const index = gastos.findIndex(gasto => gasto.id === id);

    if (index === -1) {
        return false; // No encontrado
    }

    gastos.splice(index, 1);
    return true;
};

module.exports = {
    findAll,
    findById,
    save,
    update,
    remove
};