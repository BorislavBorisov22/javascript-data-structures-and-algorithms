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

// const tree = new RedBlackTree((a, b) => a - b);
// tree.insertMany(30, 40, 35, 60, 50, 34, 32);

module.exports = RedBlackTree;