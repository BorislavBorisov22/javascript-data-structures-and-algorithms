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
}

const tree = new BinarySearchTree((a, b) => a - b);
tree.insertMany(7, 6, 19, 4, 6, 6.5, 6.5, 10, 9, 25, 17, 13, 12, 15);
tree.remove(10);
console.log(tree.find(17));

module.exports = BinarySearchTree;