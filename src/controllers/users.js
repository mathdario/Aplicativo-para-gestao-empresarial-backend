const bcrypt = require('bcrypt');
const knex = require('../db/connection');
const jwt = require('jsonwebtoken');
const { error400, error500, error404, error401 } = require('../functions/error');
const { sendEmail } = require('../functions/sendEmail');
const nullToEmptyStrings = require('../functions/nullToEmptyStrings');
const fs = require('fs').promises;

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await knex('users').first().where({ email });

    if (user) {
      return error400(res, 'Email já cadastrado.');
    }

    const cryptoPass = await bcrypt.hash(password, 10);

    const addedUser = await knex('users')
      .insert({ name: name.trim(), email, password: cryptoPass })
      .returning(['name', 'email']);

    const file = (await fs.readFile('./src/templates/welcomeEmail.html')).toString();
    sendEmail(file, { name: name.trim() }, { name: name.trim(), email }, `Boas-vindas, ${name.trim()}!`);

    return res.status(201).json(addedUser[0]);
  } catch (error) {
    return error500(res);
  }
};

const detailUser = async (req, res) => {
  const { id } = req.loggedUser;
    
  try {
    const user = await knex('users').where({ id }).first();
    const { password: _, reset_token: __, ...userData } = user;

    for (const prop in userData) {
      userData[prop] = nullToEmptyStrings(userData[prop]);
    }
    
    res.status(200).json(userData);
  } catch (error) {
    return error500(res);
  }
};

const editUser = async (req, res) => {
  const { name, email, newPassword, cpf, phone } = req.body;
  const { loggedUser } = req;

  try {
    if (email !== loggedUser.email) {
      const emailFounded = await knex('users').where({ email }).first();
      
      if (emailFounded) {
        return error400(res, 'Este email já está sendo utilizado.');
      }
    }
    
    if (newPassword) {
      const cryptoPass = await bcrypt.hash(newPassword, 10);
      await knex('users')
        .where({ id: loggedUser.id })
        .update({ name, email, password: cryptoPass, cpf, phone });
    } else {
      await knex('users')
        .where({ id: loggedUser.id })
        .update({ name, email, cpf, phone });
    }

    return res.status(204).send();
  } catch (error) {
    return error500(res);
  }
};

const verifyEmail = async (req, res) => {
  const { email } = req.query;

  try {
    if (!email) {
      return error400(res, 'O campo email é obrigatório.');
    }

    const user = await knex('users').first().where({ email });

    if (user) {
      return error400(res, 'Email já cadastrado.');
    }

    return res.status(204).json();
  } catch (error) {
    return error500(res);
  }
};

const createAndSendPasswordResetRequest = async (req, res) => {
  const { email } = req.query;

  try {
    if (!email) {
      return error400(res, 'Um email ou token deve ser informado.');
    }

    const user = await knex('users').first().where({ email });

    if (!user) {
      return error404(res, 'Usuário não encontrado.');
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_PASSWORD,
      { expiresIn: 300 }
    );

    await knex('users').where({ id: user.id }).update({ reset_token: token });

    const resetLink = `https://example.com/reset-password?token=${token}`;

    const file = (await fs.readFile('./src/templates/resetPasswordEmail.html')).toString();
    sendEmail(file, { name: user.name, resetLink }, { name: user.name, email }, 'Definir nova senha');

    return res.status(204).send();
  } catch (error) {
    return error500(res);
  }
};

const verifyAndResetPassword = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD);

    const cryptoPass = await bcrypt.hash(password, 10);

    await knex('users').where({ id }).update({ password: cryptoPass, reset_token: null });

    return res.status(204).send();
  } catch (error) {
    if (error.message == 'invalid signature') {
      return error401(res, 'Token inválido.');
    }
    if (error.message == 'jwt expired') {
      return error401(res, 'Token expirou.');
    }
    return error500(res);
  }
};

module.exports = {
  signUpUser,
  detailUser,
  editUser,
  verifyEmail,
  createAndSendPasswordResetRequest,
  verifyAndResetPassword
};
