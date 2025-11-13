
// en memoria gastos
let gastos = [
    { 
        id: 1, 
        nombre: "Factura de luz",
        categoria: "Hogar", 
        fecha: "2025/11/03",
        montoEnARS: 11300,        // Monto principal (siempre ARS)
        monto: 11300,             // Monto que ingresó el usuario
        moneda: "ARS",            // Moneda que ingresó el usuario
        tipoConversion: null,      // Tipo de dólar usado (null si fue ARS)
        archivos: null
    },
    { 
        id: 2, 
        nombre: "Netflix",
        categoria: "Entretenimiento", 
        fecha: "2025/11/04",
        montoEnARS: 9500,
        monto: 9500,
        moneda: "ARS",
        tipoConversion: null,
        archivos: null
    },
    { 
        id: 3, 
        nombre: "Hamburguesas",
        categoria: "Comida", 
        fecha: "2025/11/04",
        montoEnARS: 4000,
        monto: 4000,
        moneda: "ARS",
        tipoConversion: null,
        archivos: null
    },
];

//cont ids
let nextId = 4;

/**
 * lista completa de gastos
 */
const findAll = () => {
    return gastos;
};

/**
 * find un gasto por su Id
 */
const findById = (id) => {
    return gastos.find(gasto => gasto.id === id);
};

/**
 * crear y agregar un gasto
 */
const save = (data) => {
    const newGasto = {
        id: nextId++,
        nombre: data.nombre,
        categoria: data.categoria,
        fecha: data.fecha,
        montoEnARS: data.montoEnARS, // El monto principal es en ARS
        monto: data.monto,
        moneda: data.moneda,
        tipoConversion: data.tipoConversion,
        archivos: data.archivos || null
    };
    gastos.push(newGasto);
    return newGasto;
};

/**
 * update gasto por id
 */
const update = (id, data) => {
const index = gastos.findIndex(gasto => gasto.id === id);

    if (index === -1) {
        return null; // Gasto no encontrado
    }
    const gastoActual = gastos[index];

    const updatedGasto = { 
        ...gastoActual,
        ...data,
        id: id
    };
  
    gastos[index] = updatedGasto;
    return updatedGasto;
};

/**
 * elimina gasto por id
 */
const remove = (id) => {
    const index = gastos.findIndex(gasto => gasto.id === id);

    if (index === -1) {
        return false;
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
