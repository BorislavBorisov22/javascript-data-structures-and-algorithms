const nodeColor = {
    red: true,
    black: false
};

class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.color = nodeColor.red;
        this.parent = null;
    }

    static isParentBlack(node) {
        return !node || Node.isBlack(node.parent);
    }

    static isUncleBlack(node) {
        if (!(node.parent && node.parent.parent)) {
            return true;
        }

        const oppositeDir = Node.isLeftChild(node.parent) ? 'right' : 'left';

        if (node.parent && node.parent.parent) {
            return Node.isBlack(node.parent.parent[oppositeDir]);
        }

        return false;
    }

    static isBlack(node) {
        return !node || node.color === nodeColor.black;
    }

    static isLeftChild(node) {
        if (!node.parent) {
            return false;
        }

        return node.parent.left === node;
    }

    static isRightChild(node) {
        if (!node.parent) {
            return false;
        }

        return node.parent.right === node;
    }

    static getUncle(node) {
        const oppositeDir = Node.isLeftChild(node.parent) ? 'right' : 'left';
        return node.parent.parent[oppositeDir];
    }
}

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

        this.fixTree(node);
        this.root.color = nodeColor.black;
    }

    fixTree(startNode) {
        let node = startNode;

        while (node.parent !== null) {

            if (Node.isParentBlack(node) || Node.isBlack(node)) {
                return;
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

                node = node.parent;
            } else {
                if (Node.isLeftChild(node) && Node.isLeftChild(node.parent)) {
                    // right rotation
                    this.rotateRight(node.parent.parent);
                } else if (Node.isRightChild(node) && Node.isRightChild(node.parent)) {
                    // left rotation
                    this.rotateLeft(node.parent.parent);
                } else if (Node.isLeftChild(node) && Node.isRightChild(node.parent)) {
                    // left right rotation
                    this.rotateLeft(node.parent);
                    this.rotateRight(node.parent);
                } else if (Node.isRightChild(node) && Node.isLeftChild(node.parent)) {
                    // right left rotation
                    this.rotateRight(node.parent);
                    this.rotateLeft(node.parent);
                } else {
                    continue;
                }

                node.parent.color = nodeColor.black;
                if (node.parent.left) {
                    node.parent.left.color = nodeColor.red;
                }

                if (node.parent.right) {
                    node.parent.right.color = nodeColor.red;
                }
            }

            node = node.parent;
        }
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

        newRoot.parent = node.parent;

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
tree.insert(4);
tree.insert(2);
tree.insert(12);
// right side of the tree parent and uncle red case
tree.insert(13);

// left side of the tree parent and uncle red case
tree.insert(-5);
tree.insert(3);
tree.insert(3.5);

// parent red but uncle black cases
//  left left case
tree.insert(19);

tree.inOrder((node) => {
    const { left, right, parent, value, color } = node;
    // eslint-disable-next-line
    console.log(`${value} - ${color ? 'red' : 'black'} => left(${left ? left.value : 'null'}) => right(${right ? right.value : 'null'}) => parent(${parent ? parent.value : 'null'})`);
});

module.exports = RedBlackTree;