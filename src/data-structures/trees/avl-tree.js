const AvlNode = require('./avl-node');

const defaultComparator = (a, b) => a - b;

class AvlTree {

    constructor(cmp) {
        this.cmp = cmp || defaultComparator;
        this.root = null;
        this.size = 0;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    insertMany(...values) {
        values.forEach(this.insert.bind(this));
    }

    inOrder(callback) {
        this._inOrder(this.root, callback);
    }

    _insert(node, value) {
        if (!node) {
            this.size++;
            return new AvlNode(value);
        }

        const compareResult = this.cmp(value, node.value);
        if (compareResult < 0) {
            node.left = this._insert(node.left, value);
        } else if (compareResult > 0) {
            node.right = this._insert(node.right, value);
        }

        node = this._rotate(node);
        AvlNode.updateHeight(node);

        return node;
    }

    _rotate(node) {
        const nodeBalance = AvlNode.getBalance(node);

        if (nodeBalance > 1) {
            const leftChildBalance = AvlNode.getBalance(node.left);

            if (leftChildBalance < 0) {
                node.left = this._rotateLeft(node.left);
            }

            return this._rotateRight(node);
        } else if (nodeBalance < -1) {
            const rightChildBalance = AvlNode.getBalance(node.right);

            if (rightChildBalance > 0) {
                node.right = this._rotateRight(node.right);
            }

            return this._rotateLeft(node);
        }

        return node;
    }

    _rotateRight(root) {
        const newRoot = root.left;

        root.left = newRoot.right;
        newRoot.right = root;

        AvlNode.updateHeight(root);

        return newRoot;
    }

    _rotateLeft(root) {
        const newRoot = root.right;

        root.right = newRoot.left;
        newRoot.left = root;

        AvlNode.updateHeight(root);

        return newRoot;
    }

    _inOrder(node, callback) {
        if (!node) {
            return;
        }

        this._inOrder(node.left, callback);
        callback(node);
        this._inOrder(node.right, callback);
    }
}

module.exports = AvlTree;
