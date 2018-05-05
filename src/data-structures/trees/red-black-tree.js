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
    }

    static isParentBlack(node) {
        return !node ? false : Node.isBlack(node.parent);
    }

    static isUncleBlack(node) {
        const oppositeDir = Node.isLeftChild(node) ? 'right' : 'left';

        return !node || !node.parent ? false : Node.isBlack(node.parent[oppositeDir]);
    }

    static isBlack(node) {
        return node !== null ? node.color === nodeColor.black : false;
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
        const oppositeDir = Node.isLeftChild(node) ? 'right' : 'left';
        return node.parent[oppositeDir];
    }
}

class RedBlackTree {

    constructor(cmp) {
        this.cmp = cmp;
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
            const direction = this.cmp(value, parent) < 0 ? 'left' : 'right';
            if (!parent[direction]) {
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

        if (Node.isParentBlack(node)) {
            return;
        }

        if (node.parent && !Node.isUncleBlack(node)) {
            const uncle = Node.getUncle(node);
            node.parent.color = nodeColor.black;

            node.parent.color = nodeColor.red;
            if (uncle) {
                uncle.color = nodeColor.black;
            }
        } else {
            if (Node.isLeftChild(node) && Node.isLeftChild(node.parent)) {
                // right rotation
            } else if (Node.isRightChild(node) && Node.isRightChild(node.parent)) {
                // left rotation
            } else if (Node.isLeftChild(node) && Node.isRightChild(node.parent)) {
                // left right rotation
            } else {
                // right left rotation
            }
        }
    }

    rotateRight(node) {
        const newRoot = node.left;

        node.left = newRoot.right;
        if (node.left) {
            node.left.parent = node;
        }

        newRoot.parent = node.parent;

        if (node.parent && Node.isLeftChild(node.parent)) {
            node.parent.left = newRoot;
        } else if (node.parent && Node.isRightChild(node.parent)) {
            node.parent.right = newRoot;
        }

        newRoot.parent = node.parent;
        node.parent = newRoot;

        newRoot.right = node;

        return newRoot;
    }
}

module.exports = RedBlackTree;