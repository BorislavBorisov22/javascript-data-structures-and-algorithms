/* Store a set of words in an array and display the contents both forward and backward. */

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