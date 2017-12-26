const Stack = require('./stack');

const areParenthesisCorrectStack = (expression) => {
    const stack = new Stack();

    for (let i = 0; i < expression.length; i++) {
        const currentSymbol = expression[i];

        if (currentSymbol === '(') {
            stack.push(currentSymbol);
        } else if (currentSymbol === ')') {
            if (stack.isEmpty) {
                return false;
            }

            stack.pop();
        }
    }

    return stack.isEmpty;
};

const areParenthesisCorrectCounter = (text) => {
    let counter = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '(') {
            counter++;
        } else if (text[i] === ')') {
            if (counter < 1) {
                return false;
            }

            counter--;
        }

    }

    return counter === 0;
};

const validExpression = '(a + b) - (a - (2 * b))';
console.log(areParenthesisCorrectStack(validExpression));
console.log(areParenthesisCorrectCounter(validExpression));

const invalidExpression = ('(((((a + b ))');
console.log(areParenthesisCorrectStack(invalidExpression));
console.log(areParenthesisCorrectCounter(invalidExpression));