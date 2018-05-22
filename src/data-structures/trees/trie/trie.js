const Node = require('./node');

class Trie {
    constructor() {
        this.root = new Node('');
        this._size = 0;
    }

    get size() {
        return this._size;
    }

    insert(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            if (!node.children.has(word[i])) {
                const newNode = new Node(word[i]);
                node.children.set(word[i], newNode);
            }

            node = node.children.get(word[i]);
        }

        if (!node.isEndOfWord) {
            this._size++;
        }

        node.isEndOfWord = true;
    }

    insertMany(...values) {
        values.forEach(this.insert.bind(this));
    }

    exists(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.children.has(word[i])) {
                return false;
            }

            node = node.children.get(word[i]);
        }

        return node.isEndOfWord;
    }
}

const trie = new Trie();
trie.insertMany(...'the a there answer any by bye their therefore'.split(' '));
const exists = (trie.exists('and'));
console.log(exists);

module.exports = Trie;
