const Stack = require('./stack');

const factorialRecursive = (n) => {
    if (n <= 1) {
        return 1;
    }

    return n * factorialRecursive(n - 1);
};

const factorialStack = (n) => {
    const stack = new Stack();

    while (n > 1) {
        stack.push(n--);
    }

    let result = 1;
    while (!stack.isEmpty) {
        result *= stack.pop();
    }

    return result;
};

console.log(factorialRecursive(5));
console.log(factorialStack(5));