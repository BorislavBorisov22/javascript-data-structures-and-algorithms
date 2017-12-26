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