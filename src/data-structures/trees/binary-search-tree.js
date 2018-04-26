const Node = require('./node');

const defaultComparator = (a, b) => a - b;

class BinarySearchTree {

    constructor(cmp) {
        this._root = null;
        this.size = 0;

        this.cmp = cmp || defaultComparator;
    }

    inOrder(callback) {
        this._inOrder(this._root, callback);
    }

    _inOrder(node, callback) {
        if (!node) {
            return;
        }

        this._inOrder(node.left, callback);
        callback(node);
        this._inOrder(node.right, callback);
    }

    insert(value) {
        if (typeof value === 'undefined') {
            throw new Error('Passed value must be defined!');
        }

        this._root = this._insert(this._root, value);
    }

    _insert(node, value) {
        if (!node) {
            return new Node(value);
        }

        const compareResult = this.cmp(value, node.value);
        if (compareResult < 0) {
            node.left = this._insert(node.left, value);
        } else if (compareResult > 0) {
            node.right = this._insert(node.right, value);
        }

        return node;
    }

    _findMaxNode(node) {
        while (node.right !== null) {
            node = node.right;
        }

        return node;
    }

    _findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }

        return node;
    }

    _optimal(childPropName) {
        let node = this._root;

        while (node[childPropName] !== null) {
            node = node[childPropName];
        }
    }

    min() {
        return this._root === null ? this._root : this._findMinNode(this._root).value;
    }

    max() {
        return this._root === null ? this._root : this._findMaxNode(this._root).value;
    }

    remove(value) {
        this._root = this._remove(this._root, value);
    }

    _remove(node, value) {
        if (!node) {
            return node;
        }

        const compareResult = this.cmp(value, node.value);
        if (compareResult === 0) {

            if (!node.left) {
                return node.right;
            }

            if (!node.right) {
                return node.left;
            }

            let minParent = node.right;

            while (minParent.left !== null && minParent.left.left !== null) {
                minParent = minParent.left;
            }

            if (minParent.left) {
                const min = minParent.left;
                minParent.left = minParent.right;

                min.left = node.left;
                min.right = node.right;
                return min
            } else {
                return minParent;
            }

        } else if (compareResult < 0) {
            node.left = this._remove(node.left, value);
            return node;
        } else {
            node.right = this._remove(node.right, value);
            return node;
        }
    }

    lowestCommonAncestor(firstNode, secondNode) {
        return this._lowestCommonAncestor(this._root, firstNode, secondNode);
    }

    _lowestCommonAncestor(currentNode, firstNode, secondNode) {
        const firstInLeft = this._existsInSubtree(currentNode.left, firstNode);
        const secondInLeft = this._existsInSubtree(currentNode.left, secondNode);

        const firstInRight = this._existsInSubtree(currentNode.right, firstNode);
        const secondInRight = this._existsInSubtree(currentNode.right, secondNode);

        if ((firstInLeft && secondInRight) || (firstInRight && secondInLeft)) {
            return currentNode;
        } else if (firstInLeft && secondInLeft) {
            return this._existsInSubtree(currentNode.left, firstNode, secondInLeft);
        } else if (firstInRight && secondInRight) {
            return this._existsInSubtree(currentNode.right, firstNode, secondNode);
        }

        return false;
    }

    existsInSubtree(root, targetNode) {
        return this._existsInSubtree(root, targetNode);
    }

    _existsInSubtree(node, targetNode) {
        if (!node) {
            return false;
        }

        const compareResult = this.cmp(targetNode.node, node.value);
        return compareResult === 0 ?
            true :
            compareResult < 0 ? this._existsInSubtree(node.left) : this._existsInSubtree(node.right);
    }
}

module.exports = BinarySearchTree