const max = (a, b) => a > b ? a : b;

/**
 * Solves science Knapsack fractional problem which defers from the
 * classical knapsack problem by allowing us to select only a portion
 * of an item if needed.
 * 
 * 
 * @param {Number} capacity the maximum capacity that can be taken
 * @param {Array} weights the weights of the items to select from
 * @param {Array} values the values of the items to select from
 * @param {Number} n the number of all items to select from
 * @returns {Number} The maximum value that can be achieved from
 * selecting the provided items without taking elements with summed
 * weight more than the provided capacity. With the fractional problem
 * we can take only parts of some items when we cannot take a whole item
 */
const knapsackFraction = (capacity, weights, values, n) => {
    let load = 0;
    let index = 0;

    let maxValueCollected = 0;
    const ratios = values
        .map((v, index) => {
            return {
                value: v,
                weight: weights[index],
                ratio: v / weights[index]
            };
        })
        .sort((a, b) => b.ration - a.ratio);

    while (capacity > 0 && index < n) {
        if (ratios[index].weight <= capacity) {
            maxValueCollected += ratios[index].value;
            capacity -= ratios[index].weight;
        } else {
            const weightRemainder = capacity / ratios[index].weight;
            maxValueCollected += weightRemainder * ratios[index].value;
            capacity = 0;
        }

        ++index;
    }

    return maxValueCollected;
};

module.exports = knapsackFraction;