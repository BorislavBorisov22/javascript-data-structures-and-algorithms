const max = (a, b) => a > b ? a : b;

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
