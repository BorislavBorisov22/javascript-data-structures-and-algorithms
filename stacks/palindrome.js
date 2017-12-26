const Stack = require('./stack');

const determinePalindrome = (text) => {
    const stack = new Stack();
    text.split('').forEach(c => stack.push(c));

    let reversed = '';
    while (!stack.isEmpty) {
        reversed += stack.pop();
    }

    return reversed === text;
};

const palindrome = 'racecar';
const notPalindrome = 'palindrome, I think not'
console.log(palindrome, determinePalindrome(palindrome));
console.log(notPalindrome, determinePalindrome(notPalindrome));