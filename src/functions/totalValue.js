const totalValue = (arr) => {
    return arr.reduce((acc, currValue) => acc + currValue.value, 0);
};

module.exports = totalValue;