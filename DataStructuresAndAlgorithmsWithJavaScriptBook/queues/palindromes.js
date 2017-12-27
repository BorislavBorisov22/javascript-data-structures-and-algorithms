const Dequeue = require('./dequeue');

const isPalindrome = (word) => {
    const dequeue = new Dequeue();

    for (let i = 0; i < word.length; i++) {
        dequeue.pushBack(word[i]);
    }

    while (dequeue.count > 1) {
        const front = dequeue.removeFront();
        const back = dequeue.removeBack();

        if (front !== back) {
            return false;
        }
    }

    return true;
};

const nonPalindrome = 'not palindrome';
const palindrome = 'caabbbbaac';

console.log(nonPalindrome, isPalindrome(nonPalindrome));
console.log(palindrome, isPalindrome(palindrome));