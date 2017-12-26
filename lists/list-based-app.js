const fs = require('fs');
const path = require('path');
const List = require('./list');
const Customer = require('./customer');

const print = console.log;

const movies = fs.readFileSync(path.join(__dirname, './movies.txt'))
    .toString()
    .split('\n')
    .map(movieStr => {
        const result = movieStr.split(' ');
        result.splice(0, 1);
        return result.join(' ');
    })
    .filter(movie => !!movie);


// movies list init
const moviesList = new List();
movies.forEach(m => moviesList.append(m));

// customers list init
const customersList = new List();

// rented movies
const rentedMovies = new List();

const displayList = (list) => {
    for (list.front(); list.currPos() < list.length(); list.next()) {
        const current = list.getElement();
        if (current instanceof Customer) {
            print(`${current.name}: ${current.movie}`);
        } else {
            print(current);
        }
    }
};

const checkout = (name, movie, filmList, customersList) => {
    if (moviesList.contains(movie)) {
        const customer = new Customer(name, movie);
        customersList.append(customer);
        rentedMovies.append(movie);
        filmList.remove(movie);

        print('Rented movies:');
        displayList(rentedMovies);
    } else {
        print(`Movie ${name} is not available!`);
    }
}

const checkIn = (movie, filmList, customersList) => {
    if (!rentedMovies.contains(movie)) {
        print('No such movie is rented');
        return;
    }

    rentedMovies.remove(movie);
    moviesList.append(movie);

    print('Available movies: ');
    print(moviesList.toString());
};

checkout('Jane Doe', 'The Godfather', moviesList, customersList);
checkIn('The Godfather', moviesList, customersList);