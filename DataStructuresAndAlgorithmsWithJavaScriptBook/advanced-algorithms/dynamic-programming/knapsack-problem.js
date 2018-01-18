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

const sizes = [3, 4, 7, 8, 9];
const values = [4, 5, 10, 11, 13];
const capacity = 16;
const n = 5;
const result = knapsackRecursive(capacity, sizes, values, n);
