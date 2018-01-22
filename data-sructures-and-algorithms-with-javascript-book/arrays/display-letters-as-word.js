/* Create an object that stores individual letters in an array and has a function for
displaying the letters as a single word. */

const displayAsSingleWord = (lettersArr) => {
    return lettersArr.join('');
};

const lettersHolder = {
    letters: ['J', 'S', 'R', 'O', 'C', 'K', 'S', '!']
};

console.log(displayAsSingleWord(lettersHolder.letters));