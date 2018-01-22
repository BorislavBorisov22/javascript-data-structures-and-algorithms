/* Modify the Queue class to create a Deque class. A deque is a queue-like structure
that allows elements to be added and removed from both the front and the back of
the list. Test your class in a program. */

// Simply just a wrapper on what js array can do :)
class Dequeue {
    constructor() {
        this.dataStore = [];
    }

    get count() {
        return this.dataStore.length;
    }

    get front() {
        return this.dataStore[1];
    }

    get back() {
        return this.dataStore[this.dataStore.length - 1];
    }

    removeFront() {
        return this.dataStore.shift();
    }

    removeBack() {
        return this.dataStore.pop();
    }

    pushFront(element) {
        this.dataStore.unshift(element);
    }

    pushBack(element) {
        this.dataStore.push(element);
    }
}

module.exports = Dequeue;