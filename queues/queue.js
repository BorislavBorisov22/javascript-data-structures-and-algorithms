class Queue {
    constructor() {
        this.dataStore = [];
    }

    peek() {
        return this.dataStore[0];
    }

    isEmpty() {
        return this.dataStore.length === 0;
    }

    back() {
        return this.dataStore[this.dataStore.length - 1];
    }

    front() {
        return this.peek();
    }

    enqueue(element) {
        this.dataStore.push(element);
    }

    dequeue() {
        return this.dataStore.shift();
    }

    toString() {
        return this.dataStore.toString();
    }

    count() {
        return this.dataStore.length;
    }
}

module.exports = Queue;