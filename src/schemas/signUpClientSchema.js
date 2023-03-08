const joi = require('joi');

const signUpClient = joi.object({
  name: joi.string().trim().required().messages({
    'string.base': 'O campo nome deve ser do tipo texto.',
    'string.empty': 'O campo nome é obrigatório.',
    'any.required': 'O campo nome é obrigatório.'
  }),
  email: joi.string().email({tlds: {allow: false}}).required().messages({
    'string.base': 'O campo email deve ser do tipo texto.',
    'string.empty': 'O campo email é obrigatório.',
    'any.required': 'O campo email é obrigatório.',
    'string.email': 'O email informado é inválido.'
  }),
  cpf: joi.string().min(9).required().messages({
    'string.base': 'O campo CPF deve ser do tipo texto.',
    'string.empty': 'O campo CPF é obrigatório.',
    'string.min': 'O CPF informado é inválido.',
    'any.required': 'O campo CPF é obrigatório.'
  }),
  phone: joi.string().min(8).required().messages({
    'string.base': 'O campo telefone deve ser do tipo texto.',
    'string.empty': 'O campo telefone é obrigatório.',
    'string.min': 'O telefone informado é inválido.',
    'any.required': 'O campo telefone é obrigatório.'
  }),
  zipcode: joi.string().max(20).allow(null, '').messages({
    'string.base': 'O campo CEP deve ser do tipo texto.',
    'string.max': 'O CEP informado é inválido.'
  }),
  address: joi.string().allow(null, '').messages({
    'string.base': 'O campo endereço deve ser do tipo texto.'
  }),
  complement: joi.string().allow(null, '').messages({
    'string.base': 'O campo complemento deve ser do tipo texto.'
  }),
  neighborhood: joi.string().allow(null, '').messages({
    'string.base': 'O campo bairro deve ser do tipo texto.'
  }),
  city: joi.string().allow(null, '').messages({
    'string.base': 'O campo cidade deve ser do tipo texto.'
  }),
  state: joi.string().allow(null, '').messages({
    'string.base': 'O campo estado deve ser do tipo texto.'
  })
});

module.exports = signUpClient;