(function(exports) {

    const color = {
        BLACK: false,
        RED: true
    };

    const Node = function(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.count = 1;
        this.color = color.RED;
    };

    Node.count = function(node) {
        return node === null ? 0 : node.count;
    };

    Node.isRed = function(node) {
        return node === null ? false : node.color === color.RED;
    };

    Node.rotateLeft = function(node) {
        const newNode = node.right;
        node.right = newNode.left;
        newNode.left = node;

        newNode.color = node.color;
        node.color = color.RED;

        return newNode;
    };

    Node.rotateRight = function(node) {
        const newNode = node.left;
        node.left = newNode.right;
        newNode.right = node;

        newNode.color = node.color;
        node.color = color.RED;

        return newNode;
    };

    Node.flipColors = function(node) {
        node.color = color.RED;
        node.left.color = color.BLACK;
        node.right.color = color.BLACK;

        return node;
    };

    const RedBlackTree = function(cmp) {
        this.cmp = cmp;
        this.root = null;
    };

    RedBlackTree.prototype.insert = function(value) {
        this.root = this._insert(this.root, value);
        this.root.color = color.BLACK;
    };

    RedBlackTree.prototype._insert = function(node, value) {
        if (node === null) {
            const newNode = new Node(value);
            return newNode;
        }

        const compareResult = this.cmp(value, node.value);
        if (compareResult < 0) {
            node.left = this._insert(node.left, value);
        } else if (compareResult > 0) {
            node.right = this._insert(node.right, value);
        } else {
            // just skip if value is already present;
            return node;
        }

        if (Node.isRed(node.right) && !Node.isRed(node.left)) {
            node = Node.rotateLeft(node);
        }

        if (Node.isRed(node.left) && Node.isRed(node.left.left)) {
            node = Node.rotateRight(node);
        }

        if (Node.isRed(node.left) && Node.isRed(node.right)) {
            node = Node.flipColors(node);
        }

        return node;
    };

    RedBlackTree.prototype.inOrder = function(callback) {
        this._inOrder(this.root, callback);
    };

    RedBlackTree.prototype._inOrder = function(node, callback) {
        if (node === null) {
            return;
        }

        this._inOrder(node.left);
        callback(node);
        this._inOrder(node.right);
    };

    exports.RedBlackTree = RedBlackTree;

})(typeof window === 'undefined' ? module.exports : window);

const tree = new module.exports.RedBlackTree((a, b) => a - b);
const values = [30, 20, 40, 35, 37, 45, 44, 50, 47];
values.forEach(value => tree.insert(value));

console.log(tree);