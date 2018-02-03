(function (exports) {
    const AvlNode = function (value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    };

    AvlNode.getHeight = function (node) {
        return node === null ? 0 : node.height;
    };

    AvlNode.updateHeight = function (node) {
        node.height = Math.max(AvlNode.getHeight(node.left), AvlNode.getHeight(node.right)) + 1;
    };

    // AvlNode.rotateRight = function (node) {
    //     const newNode = node.right;
    //     node.
    // };

    const AvlTree = function (cmp) {
        this.cmp = cmp;
        this.root = null;
    };

    AvlTree.prototype.insert = function (value) {
        this.root = this._insert(this.root, value);
    };

    AvlTree.prototype._insert = function (node, value) {
        if (node === null) {
            const newNode = new AvlNode(value);
            return newNode;
        }

        const cmpResult = this.cmp(value, node.value);
        if (cmpResult < 0) {
            node.left = this._insert(node.left, value);
        } else {
            node.right = this._insert(node.right, value);
        }

        AvlNode.updateHeight(node);

        return node;
    };

    AvlTree.prototype.inOrder = function (callback) {
        this._inOrder(this.root, callback);
    };

    AvlTree.prototype._inOrder = function (node, callback) {
        if (node === null) {
            return;
        }

        this._inOrder(node.left, callback);
        callback(node);
        this._inOrder(node.right, callback);
    };

    exports.AvlTree = AvlTree;
})(typeof window === 'undefined' ? module.exports : window);


const tree = new module.exports.AvlTree((a, b) => a - b);
[1, 2, 3, 342, 4].forEach(n => tree.insert(n));

tree.inOrder(({ value, height }) => console.log({ value, height }));
