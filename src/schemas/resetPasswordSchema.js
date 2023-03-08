const joi = require('joi');

const resetPasswordSchema = joi.object({
  password: joi.string().required().min(5).messages({
    'string.base': 'O campo senha deve ser do tipo texto.',
    'string.empty': 'O campo senha é obrigatório.',
    'any.required': 'O campo senha é obrigatório.',
    'string.min': 'A senha deve conter, no mínimo, 5 caracteres.'
  })
});

module.exports = resetPasswordSchema;