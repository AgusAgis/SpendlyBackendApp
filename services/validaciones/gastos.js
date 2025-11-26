const Joi = require("joi");

const gastoSchemaCrear = Joi.object({
  nombre: Joi.string().min(2).max(60).required(),
  categoria: Joi.string().min(2).max(50).required(),
  monto: Joi.number().positive().required(),
  moneda: Joi.string().valid('ARS','USD').required(),
  tipoConversion: Joi.string()
      .valid('oficial','blue','bolsa','mayorista','mayorista','cripto','tarjeta')
      .allow(null), 
  fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  imagen: Joi.string().uri().allow("", null), // opcional porque puede venir de categoría
  archivo: Joi.any().optional() // 👈 definido, permitido, pero NO required
}).unknown(false);

const gastoSchemaActualizar = Joi.object({
  nombre: Joi.string().min(2).max(60),
  categoria: Joi.string().min(2).max(50),
  monto: Joi.number().positive(),
  moneda: Joi.string().valid('ARS','USD'),
  tipoConversion: Joi.string().valid('oficial','blue','bolsa','mayorista','cripto','tarjeta').allow(null),
  fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  imagen: Joi.string().uri().allow("", null),
  archivo: Joi.any() // 👈 también permitido en actualización
}).unknown(false);

function validarGastoCrear(gasto) {
    const { error } = gastoSchemaCrear.validate(gasto);
    if (error) return { result: false, error };
    return { result: true };
}

function validarGastoActualizar(gasto) {
    const { error } = gastoSchemaActualizar.validate(gasto);
    if (error) return { result: false, error };
    return { result: true };
}

module.exports = {
    validarGastoCrear,
    validarGastoActualizar
};