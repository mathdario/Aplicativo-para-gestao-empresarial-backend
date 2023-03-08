const knex = require('../db/connection');
const compareDates = require('../functions/compareDates');
const filterArray = require('../functions/filterArray');
const totalValue = require('../functions/totalValue');

const summary = async (req, res) => {
    let allCharges = [];
    let allClients = [];

    try {
        const charges = await knex('charges').join('clients', 'clients.id', 'charges.client_id').select(
            'charges.id',
            'charges.serial_id',
            'clients.name as client_name',
            'charges.client_id',
            'charges.description',
            'charges.status',
            'charges.value',
            'charges.due_date'
        );

        for (const charge of charges) {
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

        const filteredPaidCharges = filterArray(allCharges, 'pago', ['client_name', 'id', 'serial_id', 'value']);
        const filteredOverdueCharges = filterArray(allCharges, 'vencido', ['client_name', 'id', 'serial_id', 'value']);
        const filteredPendingCharges = filterArray(allCharges, 'pendente', ['client_name', 'id', 'serial_id', 'value']);

        const totalValuePaid = totalValue(filteredPaidCharges);
        const totalValueOverdue = totalValue(filteredOverdueCharges);
        const totalValuePending = totalValue(filteredPendingCharges);

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
            const clientCharges = await knex('charges').where({ client_id: client.id });

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

        const filteredDefaultingClients = filterArray(allClients, 'inadimplente', ['name', 'id', 'serial_id', 'cpf']);
        const filteredUpToDateClients = filterArray(allClients, 'em dia', ['name', 'id', 'serial_id', 'cpf']);

        const summaryObject = {
            charges: {
                paidCharges: {
                    totalValue: totalValuePaid,
                    quantity: filteredPaidCharges.length,
                    charges: filteredPaidCharges
                },
                overdueCharges: {
                    totalValue: totalValueOverdue,
                    quantity: filteredOverdueCharges.length,
                    charges: filteredOverdueCharges
                },
                pendingCharges: {
                    totalValue: totalValuePending,
                    quantity: filteredPendingCharges.length,
                    charges: filteredPendingCharges
                }
            },
            clients: {
                defaultingClients: {
                    quantity: filteredDefaultingClients.length,
                    clients: filteredDefaultingClients
                },
                upToDateClients: {
                    quantity: filteredUpToDateClients.length,
                    clients: filteredUpToDateClients
                }
            }
        };

        return res.status(200).json(summaryObject);
    } catch (error) {
        return error500(res);
    }
};

module.exports = {
    summary
}