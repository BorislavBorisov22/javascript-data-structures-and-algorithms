const displayWords = (words, reverse = false) => {
    if (reverse) {
        console.log(words.slice().reverse());
    } else {
        console.log(words);
    }
}

const words = [
    'programming',
    'C#',
    'javascript',
    'horse',
    'cat',
    'dog'
];

displayWords(words);
displayWords(words, true);