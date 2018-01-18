const max = (a, b) => a > b ? a : b;

 /**
 * Solves the commonly known in computer science Knapsack problem
 * using a naive brute-force approach
 * 
 * https://en.wikipedia.org/wiki/Knapsack_problem
 * 
 * @param {Number} capacity the maximum capacity that can be taken
 * @param {Number} sizes the sizes of the items to select from
 * @param {Number} values the values of the items to select from
 * @param {Number} n the number of all items to select from
 * @returns {Number} The maximum value that can be achieved from
 * selecting the provided items without taking elements with summed
 * capacity more than the passed maximum
 */
const knapsackRecursive = (capacity, sizes, values, n) => {
    if (n === 0 || capacity === 0) {
        return 0;
    }

    if (sizes[n - 1] > capacity) {
        return knapsackRecursive(capacity, sizes, values, n - 1);
    } else {
        return max(
            values[n - 1] + knapsackRecursive(capacity - sizes[n - 1], sizes, values, n - 1),
            knapsackRecursive(capacity, sizes, values, n - 1));
    }
};

const knapsackDynamicProgramming = (capacity, sizes, values, n) => {
    const knapsackMatrix = Array.from({ length: n + 1 }).map(_ => []);

    for (let itemIndex = 0; itemIndex <= n; itemIndex++) {
        for (let weight = 0; weight <= capacity; weight++) {
            if (itemIndex === 0 || weight === 0) {
                knapsackMatrix[itemIndex][weight] = 0;
            } else if (weight >= sizes[itemIndex - 1]) {
                knapsackMatrix[itemIndex][weight] =
                    max(
                        knapsackMatrix[itemIndex - 1][weight - sizes[itemIndex - 1]] + values[itemIndex - 1],
                        knapsackMatrix[itemIndex - 1][weight]
                    );
            } else {
                knapsackMatrix[itemIndex][weight] = knapsackMatrix[itemIndex - 1][weight];
            }
        }
    }

    return knapsackMatrix[n][capacity];
};

const sizes = [3, 4, 7, 8, 9];
const values = [4, 5, 10, 11, 13];
const capacity = 16;
const n = 5;
const result = knapsackRecursive(capacity, sizes, values, n);
