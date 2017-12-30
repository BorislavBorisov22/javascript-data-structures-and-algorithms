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

        while (current.data !== data) {
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
}

const tree = new BinarySearchTree((a, b) => a - b);
tree.insert(22);
tree.insert(44);
tree.insert(20000);
tree.insert(99);
tree.insert(30);
tree.insert(28);
tree.insert(30)

const node = tree.find(30);

console.log(node);
console.log(`Max: ${tree.getMax()}`, `Min: ${tree.getMin()}`);

module.exports = BinarySearchTree;