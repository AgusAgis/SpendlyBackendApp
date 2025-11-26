//const gastosModel = require('../data/gastos.mem.dao');
const dolarService = require('../services/dolar.service');
const { validarGastoCrear, validarGastoActualizar } = require('../services/validaciones/gastos');


const { CategoriasDAO, GastosDAO } = require('../data/factory');
const gastosModel = GastosDAO;
const categoriasModel = CategoriasDAO;

/**
 * obtener todos los gastos realizados.
 */
const getAllGastos = async () => {
    return await gastosModel.findAll();
};

/**
 * obtener un gasto por Id
 */
const getGastoById = async (id) => {
    return await gastosModel.findById(id);
};

/**
 * agregar un nuevo gasto
 */


const addGasto = async (data) => {
  //  Validación de alta con Joi
  const { result, error } = validarGastoCrear(data);
  if (!result) {
    const mensajes = error.details.map(d => d.message).join(', ');
    throw new Error(`Datos inválidos del gasto: ${mensajes}`);
  }

  //  calcular montoEnARS como ya lo hacés
  let montoEnARS;
  const monto = parseFloat(data.monto);
  const moneda = data.moneda;
  const tipoConversion = data.tipoConversion;

  if (moneda === 'USD') {
    if (!tipoConversion) throw new Error("Para USD se requiere tipoConversion.");
    const cotizaciones = await dolarService.getCotizaciones();
    const tipoDolar = cotizaciones.find(c => c.casa === tipoConversion);
    if (!tipoDolar) throw new Error("Tipo de conversión no encontrado.");
    montoEnARS = monto * tipoDolar.venta;
  } else {
    montoEnARS = monto;
  }

  // traer imagen desde categoría si no vino en el body
  let imagenFinal = data.imagen || null;

  if (!imagenFinal) {
    const categorias = await categoriasModel.findAll();
    const catMatch = categorias.find(c => c.titulo === data.categoria);

    if (catMatch?.imagen) {
      imagenFinal = catMatch.imagen;
    }
  }

  // armar gasto final
  const gastoParaGuardar = {
    nombre: data.nombre,
    categoria: data.categoria,
    fecha: data.fecha,
    imagen: imagenFinal,
    montoEnARS: Math.round(montoEnARS * 100) / 100,
    monto,
    moneda,
    tipoConversion: moneda === 'USD' ? tipoConversion : null,
    archivo: data.archivo || null
  };

  return await gastosModel.save(gastoParaGuardar);
};

/**
 * actualizar un gasto por ID.
 */
const updateGasto = async (id, data) => {
  const gastoExistente = await gastosModel.findById(id);
  if (!gastoExistente) return null;

  //  Validar SOLO lo que viene para actualizar
  const { result, error } = validarGastoActualizar(data);
  if (!result) {
    const mensajes = error.details.map(d => d.message).join(', ');
    throw new Error(`Datos inválidos para actualizar gasto: ${mensajes}`);
  }

  // Mezclamos datos existentes con los nuevos
  const updatedData = {
    ...gastoExistente,
    ...data
  };

  // Si hay monto nuevo → recalcular montoEnARS
  if (data.monto !== undefined) {
    const monto = parseFloat(data.monto);

    // Si no mandaste moneda en el body, uso la moneda que ya tenía el gasto
    const moneda = data.moneda || gastoExistente.moneda;

    if (!moneda) {
      throw new Error("Para actualizar el monto se debe contar con 'moneda'.");
    }

    if (moneda === "USD") {
      const tipoConversion = data.tipoConversion || gastoExistente.tipoConversion;
      if (!tipoConversion) {
        throw new Error("Para USD se requiere 'tipoConversion'.");
      }

      const cotizaciones = await dolarService.getCotizaciones();
      const tipoDolar = cotizaciones.find(c => c.casa === tipoConversion);
      if (!tipoDolar) throw new Error("Tipo de dólar inválido.");

      updatedData.moneda = "USD";
      updatedData.tipoConversion = tipoConversion;
      updatedData.montoEnARS = monto * parseFloat(tipoDolar.venta);
    } else {
      updatedData.moneda = "ARS";
      updatedData.tipoConversion = null;
      updatedData.montoEnARS = monto;
    }
  }

  return await gastosModel.update(id, updatedData);
};

/**
 * borrar un gasto por ID.
 */
const deleteGasto = async (id) => {
    return await gastosModel.remove(id);
};

const agregarArchivoAGasto = async (id, rutaArchivo) => {
    const gasto = await gastosModel.findById(id);
    if (!gasto) throw new Error("Gasto no encontrado");

    gasto.archivo = rutaArchivo;

    await gastosModel.update(id, gasto);

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
