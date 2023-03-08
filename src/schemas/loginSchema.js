const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email({tlds: {allow: false}}).required().messages({
    'string.base': 'O campo email deve ser do tipo texto.',
    'string.empty': 'O campo email é obrigatório.',
    'any.required': 'O campo email é obrigatório.',
    'string.email': 'O email informado é inválido.'
  }),
  password: joi.string().required().messages({
    'string.base': 'O campo senha deve ser do tipo texto.',
    'string.empty': 'O campo senha é obrigatório.',
    'any.required': 'O campo senha é obrigatório.'
  })
})

module.exports = loginSchema