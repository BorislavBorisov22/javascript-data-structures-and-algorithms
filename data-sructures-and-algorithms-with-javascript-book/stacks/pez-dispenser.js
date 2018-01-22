/* An example of a real-world stack is a Pez dispenser. Imagine that your virtual Pez
dispenser is filled with red, yellow, and white colors and you don’t like the yellow
ones. Write a program that uses a stack (and maybe more than one) to remove the
yellow ones without changing the order of the other candies in the dispenser. */

const Stack = require('./stack');

const removeYellows = (dispenser) => {
    const reversed = new Stack();

    dispenser.colors.forEach(c => {
        if (c !== 'yellow') {
            reversed.push(c);
        }
    });

    let result = '';
    while (!reversed.isEmpty) {
        result += reversed.pop() + ' ';
    }

    return result;
};

const dispenser = {
    colors: [
        'yellow',
        'red',
        'blue',
        'yellow',
        'blue',
        'red'
    ]
};

console.log(removeYellows(dispenser));