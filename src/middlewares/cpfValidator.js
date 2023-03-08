const { cpf } = require('cpf-cnpj-validator');
const { error400, error500 } = require('../functions/error');

const cpfValidator = (req, res, next) => {
  const { cpf: cpfString } = req.body;

  try {
    if (!cpfString) return next();

    if (cpf.isValid(cpfString)) return next();

    return error400(res, 'O CPF informado é inválido.');
  } catch (error) {
    return error500(res);
  }
};

module.exports = cpfValidator;