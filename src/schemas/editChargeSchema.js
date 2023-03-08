const joi = require('joi');

const editChargeSchema = joi.object({
  description: joi.string().required().messages({
    'string.base': 'O campo descrição deve ser do tipo texto.',
    'string.empty': 'O campo descrição é obrigatório.',
    'any.required': 'O campo descrição é obrigatório.'
  }),
  status: joi.string().required().messages({
    'string.base': 'O campo status deve ser do tipo texto.',
    'string.empty': 'O campo status é obrigatório.',
    'any.required': 'O campo status é obrigatório.'
  }),
  value: joi.number().positive().required().messages({
    'number.positive': 'O valor deve ser positivo.',
    'number.base': 'O campo valor deve ser do tipo número.',
    'any.required': 'O campo valor é obrigatório.'
  }),
  due_date: joi.date().iso().required().messages({
    'date.base': 'O campo vencimento deve ser do tipo data.',
    'any.validate': 'Formato esperado de data: AAAA-MM-DD.',
    'date.format': 'Formato esperado de data: AAAA-MM-DD.',
    'date.strict': 'Formato esperado de data: AAAA-MM-DD.',
    'string.empty': 'O campo vencimento é obrigatório.',
    'any.required': 'O campo vencimento é obrigatório.'
  })
});

module.exports = editChargeSchema;
