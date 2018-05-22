/* globals Map */

class Node {
    constructor(value) {
        this.value = value;
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

module.exports = Node;
