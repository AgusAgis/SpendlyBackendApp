// data/gastos.model.js

// Array en memoria para almacenar los gastos (Persistencia en Memoria).
let gastos = [
    { 
        id: 1, 
        categoria: "Hogar", 
        fecha: "2025/11/03",
        montoEnARS: 11300,        // Monto principal (siempre ARS)
        monto: 11300,             // Monto que ingresó el usuario
        moneda: "ARS",            // Moneda que ingresó el usuario
        tipoConversion: null      // Tipo de dólar usado (null si fue ARS)
    },
    { 
        id: 2, 
        categoria: "Entretenimiento", 
        fecha: "2025/11/04",
        montoEnARS: 9500,
        monto: 9500,
        moneda: "ARS",
        tipoConversion: null
    },
    { 
        id: 3, 
        categoria: "Comida", 
        fecha: "2025/11/04",
        montoEnARS: 4000,
        monto: 4000,
        moneda: "ARS",
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
        categoria: data.categoria,
        fecha: data.fecha,
        montoEnARS: data.montoEnARS, // El monto principal es en ARS
        monto: data.monto,
        moneda: data.moneda,
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
    const updatedGasto = { 
        ...data, // Usamos todos los datos que nos pasa el servicio
        id: id   // Nos aseguramos que el ID no cambie
    };
  
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
