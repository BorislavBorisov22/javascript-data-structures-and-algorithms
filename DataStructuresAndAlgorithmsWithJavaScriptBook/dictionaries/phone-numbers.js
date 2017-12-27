/* Write a program that takes a set of names and phone numbers from a text file and
stores them in a Dictionary object. Include in your program the ability to display
one phone number, display all phone numbers, add new phone numbers, remove
phone numbers, and clear out the list of numbers. */

const fs = require('fs');
const path = require('path');
const Dictionary = require('./dictionary');

const storeNumbers = (phoneBookPath) => {
    const lines = fs
        .readFileSync(path.join(__dirname, phoneBookPath))
        .toString()
        .split('\n');

    const dictionary = new Dictionary();

    lines.forEach(line => {
        if (!line) {
            return;
        }

        const tokens = line.split(' ');
        const personName = tokens[0];
        const personPhoneNumber = tokens[1];

        dictionary.add(personName, personPhoneNumber);
    });

    return dictionary;
};

const phoneBookDict = storeNumbers('./phonebook.txt');
phoneBookDict.showAll();

const menu = {
    'add': 'add new phone number by passing person name and phone number',
    'show': 'display all data available in the phonebook',
    'remove': 'remove phone from phonebook by providing person name',
    'clear': 'clear all data in the phonebook'
};

console.log('type help for more information on commands');
process.stdin.on('data', (message) => {
    message = message.toString().trim();
    if (message.trim() === 'exit') {
        console.log('exiting')
        process.exit(0);
    }

    const tokens = message.split(' ');
    const commandName = tokens[0];

    if (commandName === 'add') {
        const personName = tokens[1];
        const personNumber = tokens[2];

        phoneBookDict.add(personName, personNumber);
    } else if (commandName === 'show') {
        phoneBookDict.showAll();
    } else if (commandName === 'remove') {
        const personName = tokens[1];
        phoneBookDict.remove(personName);
    } else if (commandName === 'clear') {
        phoneBookDict.clear();
    } else {
        console.log('type help for more information on commands');
    }
});