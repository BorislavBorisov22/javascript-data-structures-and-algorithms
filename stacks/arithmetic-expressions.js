// TODO: reserach algorithm 

const Stack = require('./stack');

const convertInfixToPostfix = (expression) => {
    const operators = new Stack();
    const operands = new Stack();

    expression.split(' ').forEach(symbol => {
        if (!Number.isNaN(Number(symbol))) {
            operands.push(symbol);
        } else {
            operators.push(symbol);
        }
    });
};

const expression = '23 + 23 / 12 + 3 * 24';
console.log(convertInfixToPostfix(expression));