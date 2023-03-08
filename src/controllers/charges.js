const knex = require('../db/connection');
const { error400, error404, error500 } = require('../functions/error');
const compareDates = require('../functions/compareDates');

const createCharge = async (req, res) => {
    const {
        client_id,
        description,
        status,
        value,
        due_date
    } = req.body;

    try {
        const cpfFounded = await knex('clients').where({ id: client_id }).first();

        if (!cpfFounded) {
            return error400(res, 'CPF não existente no banco de dados.');
        }

        await knex('charges').insert({
            client_id,
            description,
            status,
            value,
            due_date
        });

        return res.status(204).send();
    } catch (error) {
        return error500(res);
    }
};

const listCharges = async (req, res) => {
    let allCharges = [];
    const { status } = req.query;

    try {
        const chargesListArray = await knex('charges').join('clients', 'clients.id', 'charges.client_id').select(
            'charges.id',
            'charges.serial_id',
            'clients.name as client_name',
            'charges.client_id',
            'charges.description',
            'charges.status',
            'charges.value',
            'charges.due_date'
        );

        for (const charge of chargesListArray) {
            let status = 'Pago';

            if (charge.status === 'pendente') {
                const compareValue = compareDates(charge);

                if (compareValue === -1) {
                    status = 'Vencido';
                } else {
                    status = 'Pendente';
                }
            }
            allCharges.push({ ...charge, status });
        }

        if (status) allCharges = allCharges.filter(charge => charge.status.toLowerCase() === status.toLowerCase());

        return res.status(200).json(allCharges);
    } catch (error) {
        return error500();
    }
};

const editCharge = async (req, res) => {
    const { id } = req.params;
    const { description, status, value, due_date } = req.body;

    try {
        const charge = await knex('charges').where({ id }).first();

        if (!charge) {
            return error404(res, 'Não há cobrança registrada com o ID informado.');
        }

        await knex('charges').where({ id }).update({
            description,
            status,
            value,
            due_date
        });

        return res.status(204).send();
    } catch (error) {
        return error500(res);
    }
};

const deleteCharge = async (req, res) => {
    const { id } = req.params;
    try {
        const charge = await knex('charges').where({ id }).first();

        if (!charge) {
            return error404(res, 'Não há cobrança registrada com o ID informado.');
        }

        if (charge.status === 'pago') {
            return error400(res, 'Esta cobrança está paga e não pode ser excluída.');
        }

        if (charge.status === 'pendente') {
            const compareValue = compareDates(charge);

            if (compareValue === -1) {
                return error400(res, 'Esta cobrança está vencida e não pode ser excluída.');
            }
        }

        await knex('charges').where({ id }).del();

        return res.status(204).send();
    } catch (error) {
        return error500(res);
    }
};

const detailCharge = async (req, res) => {
    const { id } = req.params;
    try {
        const charge = await knex('charges').join('clients', 'clients.id', 'charges.client_id').select(
            'charges.id',
            'charges.serial_id',
            'clients.name as client_name',
            'charges.description',
            'charges.status',
            'charges.value',
            'charges.due_date'
        ).where('charges.id', id).first();

        if (!charge) {
            return error404(res, 'Não há cobrança registrada com o ID informado.');
        }

        let status = 'Pago';

        if (charge.status === 'pendente') {
            const compareValue = compareDates(charge);

            if (compareValue === -1) {
                status = 'Vencido';
            } else {
                status = 'Pendente';
            }
        }

        res.status(200).json({ ...charge, status });
    } catch (error) {
        return error500(res);
    }
};

module.exports = {
    createCharge,
    listCharges,
    editCharge,
    deleteCharge,
    detailCharge
};
