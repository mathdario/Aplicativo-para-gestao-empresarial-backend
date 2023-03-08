const bcrypt = require('bcrypt');
const knex = require('../db/connection');
const { error400, error500 } = require('../functions/error');

const passwordValidator = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!oldPassword && !newPassword) return next();

  if ((!oldPassword && newPassword) || (!newPassword && oldPassword)) {
    return error400(res, 'Os campos senha antiga e senha nova precisam ser preenchidos.');
  }

  try {
    const user = await knex('users').where({ email }).first();
    const cryptoPass = user.password;

    const validPassword = await bcrypt.compare(oldPassword, cryptoPass);

    if (!validPassword) {
      return error400(res, 'Senha incorreta.');
    }

    if (oldPassword === newPassword) {
      return error400(res, 'A nova senha precisa ser diferente.');
    }

    return next();
  } catch (error) {
    return error500(res);
  }
};

module.exports = {
  passwordValidator,
};

