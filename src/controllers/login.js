const bcrypt = require('bcrypt');
const knex = require('../db/connection');
const jwt = require('jsonwebtoken');
const { error401, error500 } = require('../functions/error');

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex('users').where({ email }).first();

    if (!user) {
      return error401(res, 'E-mail e/ou senha inválido(s).');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return error401(res, 'E-mail e/ou senha inválido(s).');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_PASSWORD,
      { expiresIn: '8h' }
    );

    return res.json({ user: { id: user.id,  name: user.name }, token });
  } catch (error) {
    return error500(res);
  }
};

module.exports = {
  logIn
};
