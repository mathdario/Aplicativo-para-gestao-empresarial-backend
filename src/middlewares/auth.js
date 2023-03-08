const jwt = require('jsonwebtoken');
const knex = require('../db/connection');
const { error401, error500 } = require('../functions/error');

const authValidate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return error401(res);
    }

    const token = authorization.split(' ')[1];

    const { id, email } = jwt.verify(token, process.env.JWT_PASSWORD);

    const loggedUser = await knex('users').column('id', 'email').where({ id, email }).first();

    if (!loggedUser) {
      return error401(res);
    }
    
    req.loggedUser = loggedUser;

    next();
  } catch (error) {
    if (error.message == 'invalid signature') {
      return error401(res, 'Token inválido.');
    }
    if (error.message == 'jwt expired') {
      return error401(res, 'Token expirou.');
    }
    return error500(res);
  }
}

module.exports = {
  authValidate
}
