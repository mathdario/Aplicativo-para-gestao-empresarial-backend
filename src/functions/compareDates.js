const { compareAsc } = require('date-fns');

const compareDates = (charge) => {
    const dateString = (charge.due_date).toLocaleString('pt-BR');
    const day = Number(dateString.slice(0, 2));
    const month = Number(dateString.slice(3, 5)) - 1;
    const year = Number(dateString.slice(6, 10));

    const currentDate = (new Date()).toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" });
    const currentDay = Number(currentDate.slice(0, 2));
    const currentMonth = Number(currentDate.slice(3, 5)) - 1;
    const currentYear = Number(currentDate.slice(6, 10));

    const compareValue = compareAsc(new Date(year, month, day), (new Date(currentYear, currentMonth, currentDay)));
    return compareValue;
};

module.exports = compareDates;