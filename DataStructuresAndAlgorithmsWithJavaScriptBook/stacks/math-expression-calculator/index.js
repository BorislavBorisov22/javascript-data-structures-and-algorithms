/* A stack can be used to ensure that an arithmetic expression has balanced paren‐
theses. Write a function that takes an arithmetic expression as an argument and
returns the postion in the expression where a parenthesis is missing. An example
of an arithmetic expression with unbalanced parentheses is 2.3 + 23 / 12 + (3.14159
* .24.
A postfix expression evaluator works on arithmetic expressions taking the following
form:
op1 op2 operator
Using two stacks—one for the operands and one for the operators—design and
implement a JavaScript function that converts infix expressions to postfix expres‐
sions, and then use the stacks to evaluate the expression. */

// available operators, functions and brackets
const operators = ['+', '-', '*', '/'];
const mathematicalFunctions = ['ln', 'pow', 'sqrt'];
const brackets = ['(', ')'];

const trimInput = (input) => {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== '' && input[i] !== ' ') {
            result += input[i];
        }
    }

    return result;
};

const isNumber = (number) => {
    return !Number.isNaN(Number(number));
};

const separateTokens = (input) => {
    const tokens = [];

    let number = '';

    const inputLength = input.length;
    for (let i = 0; i < inputLength; i++) {
        if (input[i] === '(' || input[i] === ')' || input[i] === ',') {
            tokens.push(input[i]);
        } else if (input[i] === '-' && (i === 0 || input[i - 1] === '(' || input[i - 1] === ',')) {
            number += '-';
        } else if (!Number.isNaN(Number(input[i]))) {
            while ((i < inputLength) && (isNumber(input[i]) || input[i] === '.')) {
                number += input[i];
                i++;
            }

            tokens.push(number);

            number = '';
            i--;
        } else if (operators.indexOf(input[i]) >= 0) {
            tokens.push(input[i]);
        } else if (i + 1 < inputLength && input.substr(i, 2) === 'ln') {
            tokens.push('ln');
            i++;
        } else if (i + 2 < inputLength && input.substr(i, 3) === 'pow') {
            tokens.push('pow');
            i += 2;
        } else if (i + 3 < inputLength && input.substr(i, 4) === 'sqrt') {
            tokens.push('sqrt');
            i += 3;
        } else {
            console.log(input[i], 'invalid input');
            throw new Error('invalid expression');
        }
    }

    return tokens;
};

const getOperatorPrecedence = (operator) => {
    return operator === '+' || operator === '-' ? 1 : 2;
};

const shuntingYard = (expressionTokens) => {
    const stack = [];
    const queue = [];

    expressionTokens.forEach((token, index) => {
        if (isNumber(token)) {
            queue.unshift(token);
        } else if (mathematicalFunctions.indexOf(token) >= 0) {
            stack.push(token);
        } else if (token === ',') {
            if (stack.indexOf('(') < 0) {
                throw new Error('Invalid expression!');
            }

            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                queue.unshift(stack.pop());
            }
        } else if (token === '(') {
            stack.push(token);
        } else if (operators.indexOf(token) >= 0) {
            const currentOperatorPrecedence = getOperatorPrecedence(token);

            while (stack.length > 1 && operators.indexOf(stack[stack.length - 1]) >= 0 && currentOperatorPrecedence <= getOperatorPrecedence(stack[stack.length - 1])) {
                queue.unshift(stack.pop());
            }

            stack.push(token);
        } else if (token === ')') {
            if (stack.indexOf('(') < 0) {
                throw new Error('Invalid expression!');
            }

            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                queue.unshift(stack.pop());
            }

            stack.pop();

            if (mathematicalFunctions.indexOf(stack[stack.length - 1]) >= 0) {
                queue.unshift(stack.pop());
            }
        }
    });


    while (stack.length > 0) {
        if (stack[stack.length - 1] === ')' || stack[stack.length - 1] === ')') {
            throw new Error('Invalid expression!');
        }

        queue.unshift(stack.pop());
    }

    return queue.reverse();
};

const operatorCallbacks = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    'pow': (a, b) => Math.pow(a, b),
    'sqrt': (a) => Math.sqrt(a),
    'ln': (a) => Math.log10(a)
};

const evaluateWithRevesePolishNotation = (postfixExpression) => {
    const stack = [];

    postfixExpression.forEach(token => {
        if (isNumber(token)) {
            stack.push(+token);
        } else {
            const callback = operatorCallbacks[token];

            if (stack.length < callback.length) {
                throw new Error('Invalid expression');
            }

            const parameters = [];
            for (let i = 0; i < callback.length; i++) {
                parameters.push(stack.pop());
            }

            const result = callback(...parameters.reverse());

            // console.log(`${parameters}: ${token}`);
            stack.push(callback(...parameters));
        }
    });

    return stack.pop();
};

// const input = '3 + 2.2 / 2';
const input = '((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1))';
const trimmedInput = trimInput(input.trim());
const tokens = separateTokens(trimmedInput);

const postfix = shuntingYard(tokens);
const result = evaluateWithRevesePolishNotation(postfix);
console.log(`result from expression is : ${result}`);