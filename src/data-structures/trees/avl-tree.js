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
                node.left = this.rotateLeft(node.left);
            }

            return this.rotateRight(node);
        } else if (nodeBalance < -1) {
            const rightChildBalance = AvlNode.getBalance(node.right);

            if (rightChildBalance > 0) {
                node.right = this.rotateRight(node.right);
            }

            return this.rotateLeft(node);
        }

        return node;
    }

    rotateRight(root) {
        const newRoot = root.left;

        root.left = newRoot.right;
        newRoot.right = root;

        AvlNode.updateHeight(root);

        return newRoot;
    }

    rotateLeft(root) {
        const newRoot = root.right;

        root.right = newRoot.left;
        newRoot.left = root;

        AvlNode.updateHeight(root);

        return newRoot;
    }
}

module.exports = AvlTree;
