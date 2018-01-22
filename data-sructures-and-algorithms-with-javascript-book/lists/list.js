'use strict';

class List {
    constructor() {
        this.dataStore = [];
        this.listSize = 0;
        this.pos = 0;
    }

    append(element) {
        this.dataStore[this.listSize++] = element;
    }

    remove(element) {
        const index = this.find(element);
        if (index < 0) {
            return false;
        }

        this.dataStore.splice(index, 1);
        this.listSize--;
        return true;
    }

    insert(element, after) {
        const index = this.find(after);

        if (index < 0) {
            return false;
        }

        this.dataStore.splice(index + 1, 0, element);
        ++this.listSize;
        return true;
    }

    length() {
        return this.listSize;
    }

    toString() {
        return this.dataStore.toString();
    }

    find(element) {
        const targetIndex = this.dataStore.findIndex(el => el === element);
        return targetIndex;
    }

    contains(element) {
        const index = this.find(element);

        return index >= 0;
    }

    appendIfAny(element, predicate) {
        if (!this.dataStore.some(predicate)) {
            return false;
        }

        this.append(element);
        return true;
    }

    clear() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = 0;
        this.pos = 0;
    }

    // iterator functions
    front() {
        this.pos = 0;
    }

    end() {
        this.pos = this.listSize - 1;
    }

    next() {
        ++this.pos;
    }

    prev() {
        --this.pos;
    }

    currPos() {
        return this.pos;
    }

    getElement() {
        return this.dataStore[this.pos];
    }

    moveTo(position) {
        if (position < 0 || position >= this.listSize) {
            return;
        }

        this.pos = position;
    }
}

module.exports = List;