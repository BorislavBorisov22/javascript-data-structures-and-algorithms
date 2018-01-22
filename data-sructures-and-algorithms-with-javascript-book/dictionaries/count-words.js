/* Using the Dictionary class, write a program that stores the number of occurrences
of words in a text. Your program should display each word in a text just once as
well as the number of times the word occurs in the text. For example, given the text
“the brown fox jumped over the blue fox,” the output will be: 
the: 2
brown: 1
fox: 2
jumped: 1
over: 1
blue: 1*/

const path = require('path');
const fs = require('fs');

const countWordsFromFile = (filePath) => {
    // actual dictionary class would only make things more complicated
    const dict = {};

    const lines = fs.readFileSync(path.join(__dirname, filePath))
        .toString()
        .split('\n')
        .filter(line => !!line);

    lines.forEach(line => {
        const wordsOnLine = line.split(' ').filter(w => !!w);

        wordsOnLine.forEach(word => {
            if (!dict[word]) {
                dict[word] = 1;
            } else {
                dict[word]++;
            }
        });
    });

    Object.keys(dict).forEach(key => {
        console.log(`${key}: ${dict[key]}`);
    });
};

countWordsFromFile('./words.txt');