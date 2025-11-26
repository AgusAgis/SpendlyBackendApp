const Joi = require('joi');

const categoriaCreateSchema = Joi.object({
  titulo: Joi.string().trim().min(1).max(60).required(),
  imagen: Joi.string().uri().allow('', null).optional()
}).unknown(false);

const categoriaUpdateSchema = Joi.object({
  titulo: Joi.string().trim().min(1).max(60).optional(),
  imagen: Joi.string().uri().allow('', null).optional()
}).min(1).unknown(false); // min(1) → al menos 1 campo si vas a probar updates parciales

const validarCategoriaCrear = categoria => {
  const { error } = categoriaCreateSchema.validate(categoria, { abortEarly: false });
  if (error) return { result: false, error };
  return { result: true };
};

const validarCategoriaActualizar = categoria => {
  const { error } = categoriaUpdateSchema.validate(categoria, { abortEarly: false });
  if (error) return { result: false, error };
  return { result: true };
};

module.exports = {
  validarCategoriaCrear,
  validarCategoriaActualizar
};