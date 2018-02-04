(function(exports) {
    const AvlNode = function(value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    };

    AvlNode.getHeight = function(node) {
        return node === null ? 0 : node.height;
    };

    AvlNode.updateHeight = function(node) {
        node.height = Math.max(AvlNode.getHeight(node.left), AvlNode.getHeight(node.right)) + 1;
    };

    AvlNode.getBalance = function(node) {
        return AvlNode.getHeight(node.left) - AvlNode.getHeight(node.right);
    };

    AvlNode.rotateRight = function(root) {
        const newRoot = root.left;
        root.left = newRoot.right;
        newRoot.right = root;

        AvlNode.updateHeight(root);

        return newRoot;
    };

    AvlNode.rotateLeft = function(root) {
        const newRoot = root.right;
        root.right = newRoot.left;
        newRoot.left = root;

        AvlNode.updateHeight(root);

        return newRoot;
    };

    const AvlTree = function(cmp) {
        this.cmp = cmp;
        this.root = null;
    };

    AvlTree.prototype.insert = function(value) {
        this.root = this._insert(this.root, value);
    };

    AvlTree.prototype._insert = function(node, value) {
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

        node = this.balance(node);
        AvlNode.updateHeight(node);

        return node;
    };

    AvlTree.prototype.balance = function(node) {
        const currentNodeBalance = AvlNode.getBalance(node);
        if (currentNodeBalance >= -1 && currentNodeBalance <= 1) {
            return node;
        }

        if (currentNodeBalance > 1) {
            const leftChildBalance = AvlNode.getBalance(node.left);
            if (leftChildBalance < 0) {
                node.left = AvlNode.rotateLeft(node.left);
            }

            node = AvlNode.rotateRight(node);
        } else {
            const rightChildBalance = AvlNode.getBalance(node.right);
            if (rightChildBalance > 0) {
                node.right = AvlNode.rotateRight(node.right);
            }

            node = AvlNode.rotateLeft(node);
        }

        return node;
    };

    AvlTree.prototype.inOrder = function(callback) {
        this._inOrder(this.root, callback);
    };

    AvlTree.prototype._inOrder = function(node, callback) {
        if (node === null) {
            return;
        }

        this._inOrder(node.left, callback);
        callback(node);
        this._inOrder(node.right, callback);
    };

    exports.AvlTree = AvlTree;
    exports.AvlNode = AvlNode;
})(typeof window === 'undefined' ? module.exports : window);


const tree = new module.exports.AvlTree((a, b) => a - b);
[1, 0, 3, 4, 5].forEach(n => tree.insert(n));
tree.insert(2);

// tree.inOrder(({ value, height }) => console.log({ value, height }));
console.log(tree.root);