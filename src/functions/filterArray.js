const filterArray = (arr, status, [...props]) => {
    const filteredArray = arr.filter(item => item.status.toLowerCase() === status);
    const filteredResult = [];
    filteredArray.forEach(charge => {
        const { [props[0]]: prop1, [props[1]]: prop2, [props[2]]: prop3, [props[3]]: prop4 } = charge;
        filteredResult.push({ [props[0]]: prop1, [props[1]]: prop2, [props[2]]: prop3, [props[3]]: prop4 });
    });
    return filteredResult;
};

module.exports = filterArray;