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