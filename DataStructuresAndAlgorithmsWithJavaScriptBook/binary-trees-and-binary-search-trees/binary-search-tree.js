class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    show() {
        return this.data;
    }
}

class BinarySearchTree {
    constructor(compareFunc) {
        if (typeof compareFunc !== 'function' || compareFunc.length < 2) {
            throw new Error('Passed compareFunc parameter must be a function accepting two arguments!');
        }

        this.compareFunc = compareFunc;
        this.root = null;
    }

    /**
     * Inserts new value in the tree
     * 
     * @param {any} value 
     * @returns {void}
     * 
     * @memberOf BinarySearchTree
     */
    insert(value) {
        const newNode = new Node(value, null, null);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (this.compareFunc(newNode.data, current.data) < 0) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }

                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }

                current = current.right;
            }
        }
    }


    /**
     * Inserts many values passed as comma seperated parameters
     * to method
     * 
     * @param {any} values 
     * 
     * @memberOf BinarySearchTree
     */
    insertMany(...values) {
        values.forEach(value => this.insert(value));
    }

    _inOrder(node, callback) {
        if (!node) {
            return;
        }

        this._inOrder(node.left, callback);
        callback(node);
        this._inOrder(node.right, callback);
    }

    /**
     * Makes in order traversal of the tree
     * and calls the passed callback function for each node
     * passing the current node to the callback function
     * 
     * @param {function(node)} callback 
     * 
     * @memberOf BinarySearchTree
     */
    inOrder(callback) {
        const current = this.root;
        this._inOrder(current, callback);
    }

    _preOrder(node, callback) {
        if (!node) {
            return;
        }

        callback(node);
        this._preOrder(node.left, callback);
        this._preOrder(node.right, callback);
    }

    /**
     * Makes pre order traversal of the tree
     * and calls the passed callback function for each node
     * passing the current node to the callback function
     * 
     * @param {function(node)} callback 
     * 
     * @memberOf BinarySearchTree
     */
    preOrder(callback) {
        const current = this.root;
        this._preOrder(current, callback);
    }

    _postOrder(node, callback) {
        if (!node) {
            return;
        }

        this._postOrder(node.left, callback);
        this._postOrder(node.right, callback);
        callback(node);
    }

    /**
     * Makes pre order traversal of the tree
     * and calls the passed callback function for each node
     * passing the current node to the callback function
     * 
     * @param {function(node)} callback 
     * 
     * @memberOf BinarySearchTree
     */
    postOrder(callback) {
        const current = this.root;
        this._postOrder(current, callback);
    }

    /**
     * Returns the minimum value currently present in the tree
     * 
     * @returns {any}
     * 
     * @memberOf BinarySearchTree
     */
    getMin() {
        if (this.root === null) {
            return undefined;
        }

        let current = this.root;

        while (current.left !== null) {
            current = current.left;
        }

        return current.data;
    }

    /**
     * Returns the maximum value currently present in the tree
     * 
     * @returns {any}
     * 
     * @memberOf BinarySearchTree
     */
    getMax() {
        if (this.root === null) {
            return undefined;
        }

        let current = this.root;

        while (current.right !== null) {
            current = current.right;
        }

        return current.data;
    }

    /**
     * Finds and returns the node with the specified data 
     * or returns null when node with such data is not found
     * 
     * @param {any} data 
     * @returns {Node}
     * 
     * @memberOf BinarySearchTree
     */
    find(data) {
        let current = this.root;

        while (!!current && current.data !== data) {
            if (this.compareFunc(data, current.data) < 0) {
                current = current.left;
            } else {
                current = current.right;
            }

            if (current === null) {
                return null;
            }
        }

        return current;
    }

    /**
     * Searches for a node with the same data as the passed data parameter
     * recursively
     * 
     * @param {any} data data to search for
     * @returns {Node} the node with such data of null if no such node was found
     * 
     * @memberOf BinarySearchTree
     */
    findRecursive(data) {
        return this._findRecursive(this.root, data);
    }

    /**
     * Searches for a node with the same data as the passed data parameter
     * recursively
     * 
     * @param {Node} node root for a given subtree
     * @param {any} data data to search for
     * @returns {Node} the node with such data of null if no such node was found
     * 
     * @memberOf BinarySearchTree
     */
    _findRecursive(node, data) {
        if (!node) {
            return null;
        }

        const compareResult = this.compareFunc(data, node.data);
        if (compareResult === 0) {
            return node;
        } else if (compareResult < 0) {
            return this._findRecursive(node.left, data);
        } else {
            return this._findRecursive(node.right, data);
        }
    }

    /**
     * Returns the smallest node of a subtree with a root - the passed
     * node parameter
     * 
     * @param {Node} node the node to start searching from
     * @returns {Node} Returns the smallest node from a subtree
     *
     * 
     * @memberOf BinarySearchTree
     */
    getSmallest(node) {
        if (!node) {
            throw new Error('Passed node cannot be undefined!');
        }

        let smallestData = Number.MAX_VALUE;
        let smallestNode = null;
        let current = node;

        while (current !== null) {
            if (this.compareFunc(current.data, smallestData) < 0) {
                smallestData = current.data;
                smallestNode = current;
            }

            current = current.left;
        }

        return smallestNode;
    }

    /**
     * Removes the first occurence of a node with the data specified
     * parameter
     * 
     * @param {any} data 
     * 
     * @memberOf BinarySearchTree
     */
    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    /**
     * Removes the first found occurence of a node with the specified
     * data parameter
     * 
     * @param {Node} node Current node
     * @param {any} data Target data to be removed
     * @returns {Node}
     * 
     * @memberOf BinarySearchTree
     */
    removeNode(node, data) {
        if (node === null) {
            return null;
        }

        const compareResult = this.compareFunc(data, node.data);
        if (compareResult === 0) {
            if (node.left === null && node.right === null) {
                return null;
            }

            if (node.left === null) {
                return node.right;
            }

            if (node.right === null) {
                return node.left;
            }

            const tempNode = this.getSmallest(node.right);
            node.data = tempNode.data;

            node.right = this.removeNode(node.right, tempNode.data);
            return node;
        } else if (compareResult < 0) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else {
            node.right = this.removeNode(node.right, data);
            return node;
        }
    }

    /**
     * Returns the lowest common ancestor node of two passed nodes
     * 
     * @param {Node} firstNode 
     * @param {Node} secondNode 
     * @param {Node} current The root of the search tree to check in
     * @returns {Node} the lowest common ancestor of first and second node
     * 
     * @memberOf BinarySearchTree
     */
    _lowestCommonAncestor(firstNode, secondNode, current) {
        if (!firstNode || !secondNode || !current) {
            return null;
        }

        if (firstNode === secondNode) {
            return firstNode;
        }

        const isFirstInLeftTree = this._existsInSubtree(current.left, firstNode);
        const isSecondInLeftTree = this._existsInSubtree(current.left, secondNode);

        const isFirstInRightTree = this._existsInSubtree(current.right, firstNode);
        const isSecondInRightTree = this._existsInSubtree(current.right, secondNode);

        if (
            (isFirstInLeftTree && isSecondInRightTree) ||
            (isFirstInRightTree && isSecondInLeftTree)) {

            return current;
        }

        if (isFirstInLeftTree && isSecondInLeftTree) {
            return this._lowestCommonAncestor(firstNode, secondNode, current.left);
        }

        if (isFirstInRightTree, isSecondInRightTree) {
            return this._lowestCommonAncestor(firstNode, secondNode, current.right);
        }

        return null;
    }

    /**
     * Returns the lowest common ancestor node of two passed nodes
     * 
     * @param {Node} firstNode 
     * @param {Node} secondNode 
     * @returns {Node} the lowest common ancestor of first and second node
     * 
     * @memberOf BinarySearchTree
     */
    lowestCommonAncestor(firstNode, secondNode, current) {
        return this._lowestCommonAncestor(firstNode, secondNode, this.root);
    }

    /**
     * Check if given node exists in a subtree
     * 
     * @param {node} current Root node of a given subtree
     * @param {node} target Node to check for
     * @returns {bool} if given node exists in a subtree
     * 
     * @memberOf BinarySearchTree
     */
    _existsInSubtree(current, target) {
        if (!current) {
            return false;
        }

        if (current === target) {
            return true;
        } else {
            const leftSearch = this._existsInSubtree(current.left, target);
            const rightSearch = this._existsInSubtree(current.right, target);

            return leftSearch || rightSearch;
        }
    }

    /**
     * Returs the height of the binary search tree
     * 
     * @returns {Numbers} the height of the tree
     * 
     * @memberOf BinarySearchTree
     */
    getHeight() {
        return this._getHeight(this.root);
    }

    /**
     * Returns the height of a subtree starting from the passed root node
     * 
     * @param {Node} node the root of the subtree 
     * @returns {Number}
     * 
     * @memberOf BinarySearchTree
     */
    _getHeight(node) {
        if (!node) {
            return 0;
        }

        return 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    }


    /**
     * Checks if the tree is balanced
     * 
     * @returns {bool}
     * 
     * @memberOf BinarySearchTree
     */
    isBalanced() {
        return this._isBalanced(this.root);
    }


    /**
     * Checks if a subtree is balanced starting from the passed root node
     * 
     * @param {Node} node the root of the subtree 
     * @returns {bool}
     * 
     * @memberOf BinarySearchTree
     */
    _isBalanced(node) {
        if (!node) {
            return true;
        }

        return this._isBalanced(node.left) &&
            this._isBalanced(node.right) &&
            Math.abs(this._getHeight(node.left) - this._getHeight(node.right)) <= 1;
    }
}

module.exports = BinarySearchTree;
