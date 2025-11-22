//const gastosModel = require('../data/gastos.mem.dao');
const dolarService = require('../services/dolar.service');

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
  if (!data.nombre || !data.categoria || !data.monto || !data.fecha || !data.moneda) {
    throw new Error("Datos incompletos. Se requieren nombre, categoria, monto, fecha y moneda.");
  }

  // 1) calcular montoEnARS como ya lo hacés
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

  // 2) ✅ traer imagen desde categoría si no vino en el body
  let imagenFinal = data.imagen || null;

  if (!imagenFinal) {
    const categorias = await categoriasModel.findAll();
    const catMatch = categorias.find(c => c.titulo === data.categoria);

    if (catMatch?.imagen) {
      imagenFinal = catMatch.imagen;
    }
  }

  // 3) armar gasto final
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
