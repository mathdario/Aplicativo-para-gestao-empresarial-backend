const joi = require('joi');

const signUpSchema = joi.object({
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
  password: joi.string().required().min(5).messages({
    'string.base': 'O campo senha deve ser do tipo texto.',
    'string.empty': 'O campo senha é obrigatório.',
    'any.required': 'O campo senha é obrigatório.',
    'string.min': 'A senha deve conter, no mínimo, 5 caracteres.'
  })
});

module.exports = signUpSchema;