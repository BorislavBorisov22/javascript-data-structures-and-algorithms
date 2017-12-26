const displayAsSingleWord = (lettersArr) => {
    return lettersArr.join('');
};

const lettersHolder = {
    letters: ['J', 'S', 'R', 'O', 'C', 'K', 'S', '!']
};

console.log(displayAsSingleWord(lettersHolder.letters));