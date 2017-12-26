class Stack {
    constructor() {
        this.dataStore = [];
        this.top = 0;
    }

    get peek() {
        return this.dataStore[this.top - 1];
    }

    get length() {
        return this.top;
    }

    get isEmpty() {
        return this.top === 0;
    }

    push(element) {
        this.dataStore[this.top++] = element;
    }

    clear() {
        this.top = 0;
    }

    pop() {
        return this.dataStore[--this.top];
    }
}

module.exports = Stack;