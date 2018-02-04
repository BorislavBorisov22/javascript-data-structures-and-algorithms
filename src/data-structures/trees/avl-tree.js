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

    AvlTree.prototype.delete = function(value) {
        this.root = this._delete(this.root, value);
    };

    AvlTree.prototype._delete = function(node, value) {
        if (node === null) {
            return null;
        }

        const cmpResult = this.cmp(value, node.value);
        if (cmpResult === 0) {
            const left = node.left;
            const right = node.right;

            if (left === null) {
                return right;
            }

            if (right === null) {
                return left;
            }

            const max = this.getMax();
            node.value = max.value;

            node.left = this._delete(node.left, max.value);
        } else if (cmpResult < 0) {
            node.left = this._delete(node.left, value);
        } else if (cmpResult > 0) {
            node.right = this._delete(node.right, value);
        }

        node = this.balance(node);
        AvlNode.updateHeight(node);
        return node;
    };

    AvlTree.prototype._getOptimal = function(root, childNodePropertyName) {
        let current = root;
        while (current[childNodePropertyName] !== null) {
            current = current[childNodePropertyName];
        }

        return current;
    };

    AvlTree.prototype.getMin = function(root) {
        return this.getOptimal(root, 'left');
    };

    AvlTree.prototype.getMax = function(root) {
        return this.getOptimal(root, 'right');
    };

    AvlTree.prototype.inOrder = function(callback) {
        this._inOrder(this.root, callback);
    };

    AvlTree.prototype.find = function(value) {
        return this._find(this.root, value);
    };

    AvlTree.prototype._find = function(node, value) {
        if (node === null) {
            return null;
        }

        const cmpResult = this.cmp(value, node.value);
        if (cmpResult === 0) {
            return node;
        }

        return cmpResult < 0 ?
            this._find(node.left, value) :
            this._find(node.right, value);
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
[2, 1, 4, 3, 5].forEach(n => tree.insert(n));
tree.delete(1);
// tree.inOrder(({ value, height }) => console.log({ value, height }));
console.log(tree.root);