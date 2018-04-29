const Node = require('./node');

const defaultComparator = (a, b) => a - b;

class BinarySearchTree {

    constructor(cmp) {
        this._root = null;
        this._size = 0;

        this.cmp = cmp || defaultComparator;
    }

    get size() {
        return this._size;
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
            this._size++;
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

    findMaxNode(node) {
        if (!node) {
            return null;
        }

        while (node.right !== null) {
            node = node.right;
        }

        return node;
    }

    findMinNode(node) {
        if (!node) {
            return null;
        }

        while (node.left !== null) {
            node = node.left;
        }

        return node;
    }

    find(value) {
        let currentNode = this._root;

        while (currentNode !== null) {
            const compareResult = this.cmp(value, currentNode.value);
            if (compareResult === 0) {
                return currentNode;
            } else if (compareResult < 0) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return null;
    }

    _optimal(childPropName) {
        let node = this._root;

        while (node[childPropName] !== null) {
            node = node[childPropName];
        }
    }

    min() {
        return this._root === null ? this._root : this.findMinNode(this._root).value;
    }

    max() {
        return this._root === null ? this._root : this.findMaxNode(this._root).value;
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
            this._size--;

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

        return null;
    }

    isBalanced() {
        return this._isBalance(this._root);
    }

    _isBalanced(node) {
        if (!node) {
            return true;
        }

        return this._isBalanced(node.left) &&
            this._isBalanced(node.right) &&
            Math.abs(this.getHeight(node.left) - this.getHeight.getHeight(node.right)) <= 1;
    }

    getHeight(node) {
        if (!node) {
            return 0;
        }

        return Math.max(this._height(node.left), this._height(node.right)) + 1;
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

const tree = new BinarySearchTree();

const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
values.forEach(tree.insert.bind(tree));

const expectedNode = tree._root.right.right;

const actualNode = tree.find(expectedNode);
console.log(actualNode);
module.exports = BinarySearchTree;