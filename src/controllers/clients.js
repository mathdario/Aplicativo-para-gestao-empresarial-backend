const knex = require('../db/connection');
const { error400, error404, error500 } = require('../functions/error');
const compareDates = require('../functions/compareDates');
const nullToEmptyStrings = require('../functions/nullToEmptyStrings');

const signUpClient = async (req, res) => {
  const {
    name,
    email,
    cpf,
    phone,
    zipcode,
    address,
    complement,
    neighborhood,
    city,
    state
  } = req.body;

  try {
    const emailFounded = await knex('clients').where({ email }).first();

    if (emailFounded) {
      return error400(res, 'Este email já está sendo utilizado.');
    }

    const cpfFounded = await knex('clients').where({ cpf }).first();

    if (cpfFounded) {
      return error400(res, 'CPF já está cadastrado.');
    }

    await knex('clients').insert({
      name,
      email,
      cpf,
      phone,
      zipcode,
      address,
      complement,
      neighborhood,
      city,
      state
    });

    return res.status(204).send();
  } catch (error) {
    return error500(res);
  }
};

const listClients = async (req, res) => {
  let allClients = [];
  const { status } = req.query;
  try {
    const clientListArray = await knex('clients').column(
      'id',
      'serial_id',
      'name',
      'email',
      'phone',
      'cpf'
    );

    for (const client of clientListArray) {
      let counter = 0;
      const clientCharges = await knex('charges').where({
        client_id: client.id,
      });

      for (const charge of clientCharges) {
        if (charge.status === 'pendente') {

          const compareValue = compareDates(charge);

          if (compareValue === -1) {
            counter++;
          }
        }
      }
      let chargeStatus;
      if (counter > 0) {
        chargeStatus = 'Inadimplente';
      } else {
        chargeStatus = 'Em dia';
      }
      allClients.push({ ...client, status: chargeStatus });
    }

    if (status) allClients = allClients.filter(client => client.status.toLowerCase() === status.toLowerCase());

    return res.status(200).json(allClients);
  } catch (error) {
    return error500(res);
  }
};

const detailClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await knex('clients').where({ id }).first();

    if (!client) {
      return error404(res, 'Não há cliente registrado com o ID informado.');
    }

    const charges = await knex('charges').where({ client_id: client.id }).column(
      'id',
      'serial_id',
      'description',
      'status',
      'value',
      'due_date'
    );

    for (const prop in client) {
      client[prop] = nullToEmptyStrings(client[prop]);
    }

    const details = { client: { ...client }, charges };

    return res.status(200).json(details);
  } catch (error) {
    return error500(res);
  }
};

const editClient = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    cpf,
    phone,
    zipcode,
    address,
    complement,
    neighborhood,
    city,
    state
  } = req.body;

  try {
    const client = await knex('clients').where({ id }).first();

    if (!client) {
      return error404(res, 'Não há cliente registrado com o ID informado.');
    }

    if (email !== client.email) {
      const emailFounded = await knex('clients').where({ email }).first();

      if (emailFounded) {
        return error400(res, 'Este email já está sendo utilizado.');
      }
    }

    if (cpf !== client.cpf) {
      const cpfFounded = await knex('clients').where({ cpf }).first();

      if (cpfFounded) {
        return error400(res, 'Este CPF já está sendo utilizado.');
      }
    }

    await knex('clients').where({ id }).update({
      name,
      email,
      cpf,
      phone,
      zipcode,
      address,
      complement,
      neighborhood,
      city,
      state
    });

    return res.status(204).send();
  } catch (error) {
    return error500(res);
  }
};

module.exports = {
  signUpClient,
  listClients,
  detailClient,
  editClient,
};
