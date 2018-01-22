/* 1. Write a function that inserts an element into a list only if the element to be inserted
is larger than any of the elements currently in the list. Larger can mean either greater
than when working with numeric values, or further down in the alphabet, when
working with textual values.
2. Write a function that inserts an element into a list only if the element to be inserted
is smaller than any of the elements currently in the list. */

const List = require('./list');

const list = new List();
list.append(1);
list.appendIfAny(2, n => n < 2);
list.appendIfAny(3, n => n < 3);
console.log(list.toString());