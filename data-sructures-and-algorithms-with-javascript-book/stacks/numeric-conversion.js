const Stack = require('./stack');

const convertToBase = (base, number) => {
    const stack = new Stack();

    while (number > 0) {
        const remainder = number % base;
        stack.push(remainder);

        number = (number / base) | 0;
    }

    let converted = '';
    while (!stack.isEmpty) {
        converted += stack.pop();
    }

    return converted;
};

const number = 125;
const base = 8;
var convertedNumber = convertToBase(base, number);
console.log(convertedNumber);