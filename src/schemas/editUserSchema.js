const joi = require('joi');

const editUserSchema = joi.object({
  name: joi.string().required().messages({
    'string.base': 'O campo nome deve ser do tipo texto.',
    'string.empty': 'O campo nome é obrigatório.',
    'any.required': 'O campo nome é obrigatório.',
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'O campo email deve ser do tipo texto.',
      'string.empty': 'O campo email é obrigatório.',
      'any.required': 'O campo email é obrigatório.',
      'string.email': 'O email informado é inválido.',
    }),
  oldPassword: joi.string().min(5).messages({
    'string.base': 'O campo senha deve ser do tipo texto.',
    'string.empty': 'O campo senha é obrigatório.',
    'string.min': 'A senha deve conter, no mínimo, 5 caracteres.',
  }),
  newPassword: joi.string().min(5).messages({
    'string.base': 'O campo senha deve ser do tipo texto.',
    'string.empty': 'O campo senha é obrigatório.',
    'string.min': 'A senha deve conter, no mínimo, 5 caracteres.',
  }),
  phone: joi.string().min(8).allow(null, '').messages({
    'string.base': 'O campo telefone deve ser do tipo texto.',
    'string.min': 'O telefone informado é inválido.'
  }),
  cpf: joi.string().min(9).allow(null, '').messages({
    'string.base': 'O campo CPF deve ser do tipo texto.',
    'string.min': 'O CPF informado é inválido.'
  })
});

module.exports = editUserSchema;
