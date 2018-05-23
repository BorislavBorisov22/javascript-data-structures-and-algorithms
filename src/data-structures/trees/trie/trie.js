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

    delete(word) {
        if (!word) {
            throw new Error('Passed word cannot be null or undefined');
        }

        this._delete(this.root, word, 0);
    }

    _delete(node, word, wordIndex) {
        if (node.isEndOfWord && wordIndex === word.length) {
            return true;
        }

        if (!node.children.has(word[wordIndex])) {
            return false;
        }

        const next = node.children.get(word[wordIndex]);
        const shouldDeleteChild = this._delete(next, word, wordIndex + 1);
        if (shouldDeleteChild) {
            node.children.delete(word[wordIndex]);
            return node.children.size > 0 ? false : true;
        }

        return false;
    }
}

const trie = new Trie();
trie.insertMany('the', 'though');
trie.delete('the');
module.exports = Trie;
