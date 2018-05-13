const Node = require('./node');
const nodeColor = require('./node-color');

class RedBlackTree {

    constructor(cmp) {
        this.cmp = cmp || ((a, b) => a - b);
        this.root = null;
    }

    insert(value) {
        const node = new Node(value);
        if (this.root === null) {
            this.root = node;
            this.root.color = nodeColor.black;
            return;
        }

        let parent = this.root;
        while (true) {
            const direction = this.cmp(value, parent.value) < 0 ? 'left' : 'right';
            if (!parent[direction]) {
                parent[direction] = node;
                break;
            }

            parent = parent[direction];
        }

        node.parent = parent;

        this.root = this.fixTree(node);
        this.root.color = nodeColor.black;
    }

    insertMany(...values) {
        values.forEach(this.insert.bind(this));
    }

    fixTree(startNode) {
        let node = startNode;

        while (node.parent !== null) {

            if (Node.isParentBlack(node) || Node.isBlack(node)) {
                node = node.parent;
                continue;
            }

            if (node.parent && !Node.isUncleBlack(node)) {
                const uncle = Node.getUncle(node);
                node.parent.color = nodeColor.black;

                if (uncle) {
                    uncle.color = nodeColor.black;
                }

                if (node.parent && node.parent.parent) {
                    node.parent.parent.color = nodeColor.red;
                }

            } else {
                let newRoot;

                if (Node.isLeftChild(node) && Node.isLeftChild(node.parent)) {
                    // right rotation
                    newRoot = this.rotateRight(node.parent.parent);
                } else if (Node.isRightChild(node) && Node.isRightChild(node.parent)) {
                    // left rotation
                    newRoot = this.rotateLeft(node.parent.parent);
                } else if (Node.isLeftChild(node) && Node.isRightChild(node.parent)) {
                    // left right rotation
                    this.rotateRight(node.parent);
                    newRoot = this.rotateLeft(node.parent);
                } else if (Node.isRightChild(node) && Node.isLeftChild(node.parent)) {
                    // right left rotation
                    this.rotateLeft(node.parent);
                    newRoot = this.rotateRight(node.parent);
                } else {
                    node = node.parent;
                    continue;
                }

                newRoot.color = nodeColor.black;
                if (newRoot.left) {
                    newRoot.left.color = nodeColor.red;
                }

                if (newRoot.right) {
                    newRoot.right.color = nodeColor.red;
                }
            }

            if (node.parent) {
                node = node.parent;
            }
        }

        return node;
    }

    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }

        return node;
    }

    _transplantNode(node) {
        const dir = node.left ? 'left' : 'right';

        if (node[dir]) {
            node[dir].parent = node.parent;
        }

        if (node.parent && node.parent.left === node) {
            node.parent.left = node[dir];
        } else if (node.parent && node.parent.right === node) {
            node.parent.right = node[dir];
        }

        return node[dir];
    }

    remove(value) {
        let node = this.root;
        let searchValue = value;

        // peforming standart binary search tree removal until we go to a case removing
        // a node with 0 or 1 child
        while (node !== null) {
            const compareResult = this.cmp(searchValue, node.value);
            if (compareResult === 0) {
                if (node.left && node.right) {
                    const inOrderSuccessor = this._findMin(node.right);
                    node.value = inOrderSuccessor.value;
                    node = inOrderSuccessor;
                } else {
                    this.fixRemove(node);
                    return;
                }
            } else if (compareResult < 0) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
    }

    fixRemove(nodeToRemove) {
        if (!nodeToRemove) {
            throw new Error('Cannot remove undefined or null node!');
        }

        const parent = nodeToRemove.parent;
        const sibling = Node.getSibling(nodeToRemove);
        const isLeftChild = Node.isLeftChild(nodeToRemove);
        let node = nodeToRemove;
        if (!Node.isBlack(node) || (!Node.isBlack(node.left) || !Node.isBlack(node.right))) {
            const newNode = this._transplantNode(node);
            if (newNode) {
                newNode.color = nodeColor.black;
            }
        } else {
            // double black node case
            let newNode = this._transplantNode(node);
            this._deleteCase1(newNode, parent, sibling, isLeftChild);
        }
    }

    // when double black node is root
    _deleteCase1(doubleBlackNode, parent, sibling, isLeftChild) {
        if (doubleBlackNode === this.root) {
            return;
        }

        this._deleteCase2(doubleBlackNode, parent, sibling, isLeftChild);
    }

    _deleteCase2(doubleBlackNode, parent, sibling, isLeftChild) {
        if (isLeftChild && parent && Node.isBlack(parent) &&
            sibling && !Node.isBlack(sibling) &&
            Node.isBlack(sibling.left) && Node.isBlack(sibling.right)) {

            let newSibling;
            if (isLeftChild) {
                this.rotateLeft(parent);
                newSibling = parent.right;
            } else {
                this.rotateRight(parent);
                newSibling = parent.left;
            }
            this.rotateLeft(parent);

            sibling.color = nodeColor.black;
            parent.color = nodeColor.red;

            sibling = newSibling;
        }

        this._deleteCase3(doubleBlackNode, parent, sibling, isLeftChild);
    }

    _deleteCase3(doubleBlackNode, parent, sibling, isLeftChild) {
        if (parent && sibling &&
            Node.isBlack(parent) && Node.isBlack(sibling) &&
            Node.isBlack(sibling.left) && Node.isBlack(sibling.right)) {

            sibling.color = nodeColor.red;
            sibling = Node.getSibling(parent);
            doubleBlackNode = parent;
            parent = parent.parent;
            isLeftChild = Node.isLeftChild(doubleBlackNode);
        }

        this._deleteCase4(doubleBlackNode, parent, sibling, isLeftChild);
    }

    _deleteCase4(doubleBlackNode, parent, sibling, isLeftChild) {
        if (parent && !Node.isBlack(parent) &&
            Node.isBlack(sibling) && Node.isBlack(sibling.left) && Node.isBlack(sibling.right)) {

            parent.color = nodeColor.black;
            sibling.color = nodeColor.red;
            return;
        }

        this._deleteCase5(doubleBlackNode, parent, sibling, isLeftChild);
    }

    _deleteCase5(doubleBlackNode, parent, sibling, isLeftChild) {
        if (parent && Node.isBlack(parent) &&
            sibling && Node.isBlack(sibling)) {

            if (isLeftChild && Node.isBlack(sibling.right) && !Node.isBlack(sibling.left)) {
                this.rotateRight(sibling);

                sibling.color = nodeColor.red;
                sibling.parent.color = nodeColor.black;

                sibling = sibling.parent;
            } else if (Node.isBlack(sibling.left) && !Node.isBlack(sibling.right)) {
                this.rotateLeft(sibling);

                sibling.color = nodeColor.red;
                sibling.parent.color = nodeColor.black;

                sibling = sibling.parent;
            }
        }

        this._deleteCase6(doubleBlackNode, parent, sibling, isLeftChild);
    }

    _deleteCase6(doubleBlackNode, parent, sibling, isLeftChild) {
        if (parent && sibling && Node.isBlack(sibling)) {
            if (isLeftChild && !Node.isBlack(sibling.right)) {
                this.rotateLeft(parent);
                sibling.right.color = nodeColor.black;

                if (parent === this.root) {
                    this.root = sibling;
                }

                return;
            } else if (!isLeftChild && !Node.isBlack(sibling.left)) {
                this.rotateRight(parent);
                sibling.left.color = nodeColor.black;

                if (parent === this.root) {
                    this.root = sibling;
                }

                return;
            }
        }

        this._deleteCase1(doubleBlackNode, parent, sibling, isLeftChild);
    }


    rotateRight(node) {
        if (!node) {
            return;
        }

        const newRoot = node.left;

        node.left = newRoot.right;
        if (node.left) {
            node.left.parent = node;
        }

        newRoot.parent = node.parent;

        if (node.parent && Node.isLeftChild(node)) {
            node.parent.left = newRoot;
        } else if (node.parent && Node.isRightChild(node)) {
            node.parent.right = newRoot;
        }

        newRoot.parent = node.parent;
        node.parent = newRoot;

        newRoot.right = node;

        return newRoot;
    }

    rotateLeft(node) {
        if (!node) {
            return;
        }

        const newRoot = node.right;

        node.right = newRoot.left;
        if (node.right) {
            node.right.parent = node;
        }

        if (node.parent && Node.isLeftChild(node)) {
            node.parent.left = newRoot;
        } else if (node.parent && Node.isRightChild(node)) {
            node.parent.right = newRoot;
        }

        newRoot.parent = node.parent;
        node.parent = newRoot;

        newRoot.left = node;

        return newRoot;
    }

    inOrder(callback) {
        this._inOrder(this.root, callback);
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

const tree = new RedBlackTree();
tree.insertMany(30, 20, 40, 35, 50);

tree.remove(20);

module.exports = RedBlackTree;