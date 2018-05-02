const AvlNode = require('./avl-node');

const defaultComparator = (a, b) => a - b;

class AvlTree {

    constructor(cmp) {
        this.cmp = cmp || defaultComparator;
        this.root = null;
        this.size = 0;
    }

    find(value) {
        return this._find(this.root, value);
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    remove(value) {
        this.root = this._remove(this.root, value);
    }

    removeMany(...values) {
        values.forEach(this.remove.bind(this));
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

    _remove(node, value) {
        if (!node) {
            return null;
        }

        const compareResult = this.cmp(value, node.value);
        if (compareResult === 0) {
            if (!node.left) {
                this.size--;
                return node.right;
            }

            if (!node.right) {
                this.size--;
                return node.left;
            }

            const min = this._min(node.right);
            node.value = min.value;
            node.right = this._remove(node.right, min.value);
        } else if (compareResult < 0) {
            node.left = this._remove(node.left, value);
        } else {
            node.right = this._remove(node.right, value);
        }

        node = this._rotate(node);
        AvlNode.updateHeight(node);
        return node;
    }

    _find(node, value) {
        if (!node) {
            return null;
        }

        const compareResult = this.cmp(value, node.value);
        if (compareResult === 0) {
            return node;
        } else if (compareResult < 0) {
            return this._find(node.left, value);
        } else {
            return this._find(node.right, value);
        }
    }

    _min(node) {
        while (node.left !== null) {
            node = node.left;
        }

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
