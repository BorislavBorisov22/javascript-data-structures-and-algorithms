/* Create a Person class that stores a person’s name and their gender. Create a list of
at least 10 Person objects. Write a function that displays all the people in the list of
the same gender.*/

const List = require('./list');

class Person {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
}

const peopleList = new List();
for (let i = 0; i < 10; i++) {
    const person = new Person(`Person ${i + 1}`, i % 2 === 0 ? 'male' : 'female');
    peopleList.append(person);
}

const displayPeopleWithGender = (gender, peopleList) => {
    console.log(gender.toUpperCase());
    for (peopleList.front(); peopleList.currPos() < peopleList.length(); peopleList.next()) {
        if (peopleList.getElement().gender.toLowerCase() === gender.toLowerCase()) {
            console.log(peopleList.getElement().name);
        }
    }
};

displayPeopleWithGender('male', peopleList);