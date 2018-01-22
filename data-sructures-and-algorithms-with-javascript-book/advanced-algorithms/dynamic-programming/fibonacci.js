/**
 * Generates and returns the n-th number from the fibonacci sequence
 * 
 * @param {any} n the target fibonacci number
 * @returns {Number} The n-th fibonacci number
 */
const genFibonacci = (n) => {
    if (n == 1 || n === 2) {
        return 1;
    }

    const values = [1, 1];
    for (let i = 2; i < n; ++i) {
        values[i] = values[i - 1] + values[i - 2];
    }

    return values[n - 1];
};

module.exports = genFibonacci;
