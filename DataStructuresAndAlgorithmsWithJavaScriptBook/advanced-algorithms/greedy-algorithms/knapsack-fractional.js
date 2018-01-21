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