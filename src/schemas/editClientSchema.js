const joi = require('joi');

const editClientSchema = joi.object({
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
  phone: joi.string().min(8).required().messages({
    'string.base': 'O campo telefone deve ser do tipo texto.',
    'string.empty': 'O campo telefone é obrigatório.',
    'string.min': 'O telefone informado é inválido.',
    'any.required': 'O campo telefone é obrigatório.'
  }),
  cpf: joi.string().min(9).required().messages({
    'string.base': 'O campo CPF deve ser do tipo texto.',
    'string.empty': 'O campo CPF é obrigatório.',
    'string.min': 'O CPF informado é inválido.',
    'any.required': 'O campo CPF é obrigatório.'
  }),
  zipcode: joi.string().max(20).allow(null, '').messages({
    'string.base': 'O campo CEP deve ser do tipo texto.',
    'string.max': 'O CEP informado deve ter até 20 caracteres.'
  }),
  address: joi.string().max(100).allow(null, '').messages({
    'string.base': 'O campo endereço deve ser do tipo texto.',
    'string.max': 'O endereço informado deve ter até 100 caracteres.'
  }),
  complement: joi.string().max(100).allow(null, '').messages({
    'string.base': 'O campo complemento deve ser do tipo texto.',
    'string.max': 'O complemento informado deve ter até 100 caracteres.'
  }),
  neighborhood: joi.string().max(20).allow(null, '').messages({
    'string.base': 'O campo bairro deve ser do tipo texto.',
    'string.max': 'O bairro informado deve ter até 20 caracteres.'
  }),
  city: joi.string().max(20).allow(null, '').messages({
    'string.base': 'O campo cidade deve ser do tipo texto.',
    'string.max': 'A cidade informada deve ter até 20 caracteres.'
  }),
  state: joi.string().max(20).allow(null, '').messages({
    'string.base': 'O campo estado deve ser do tipo texto.',
    'string.max': 'O estado informado deve ter até 20 caracteres.'
  })
});

module.exports = editClientSchema;
