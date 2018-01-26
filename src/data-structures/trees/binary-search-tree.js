(function (exports) {
    exports.Node = function (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    exports.BinaryTree = function (cmp) {
        if (typeof cmp !== 'function' || cmp.length < 2) {
            throw new Error('Passed cmp parameter must be of type function and accept two parameters')
        }

        this.cmp = cmp;
        this._root = null;
        this.size = 0;
    };

    exports.BinaryTree.prototype.add = function (value) {
        this._root = this._add(this._root, value);
    };

    exports.BinaryTree.prototype._add = function (node, value) {
        if (node === null) {
            node = new exports.Node(value);
            ++this.size;
            return node;
        }

        var cmpResult = this.cmp(value, node.value);
        if (cmpResult < 0) {
            node.left = this._add(node.left, value);
        } else {
            node.right = this._add(node.right, value);
        }

        return node;
    };

    exports.BinaryTree.prototype.addMany = function (...values) {
        values.forEach(v => this.add(v));
    };

    exports.BinaryTree.prototype.find = function (value) {
        if (typeof value === 'undefined') {
            return null;
        }

        var current = this._root;
        var cmpResult;

        while (current) {
            cmpResult = this.cmp(value, current.value);

            if (cmpResult === 0) {
                return current;
            } else if (cmpResult < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return current;
    };

    exports.BinaryTree.prototype.findRecursive = function (value) {
        return this._findRecursive(this._root, value);
    };

    exports.BinaryTree.prototype._findRecursive = function (node, value) {
        if (!node) {
            return null;
        }

        var compareResult = this.cmp(value, node.value);
        if (compareResult === 0) {
            return node;
        }

        var nextNode = compareResult < 0 ? node.left : node.right;
        return this._findRecursive(nextNode, value);
    };
    exports.BinaryTree.prototype.inOrder = function (callback) {
        if (typeof callback !== 'function' || callback.length < 1) {
            throw new Error('Passed callback parameter must be of type function accepting a tree node as a parameter!');
        }

        this._inOrder(this._root, callback);
    };

    exports.BinaryTree.prototype._inOrder = function (node, callback) {
        if (!node) {
            return;
        }

        this._inOrder(node.left, callback);
        callback(node);
        this._inOrder(node.right, callback);
    };

    exports.BinaryTree.prototype.findMin = function () {
        return this._findOptimal('left');
    };

    exports.BinaryTree.prototype.findMax = function () {
        return this._findOptimal('right');
    };

    exports.BinaryTree.prototype._findOptimal = function (childPropertyName) {
        if (childPropertyName !== 'left' && childPropertyName !== 'right') {
            throw new Error('Passed childPropertyName parameter must be either left or right!');
        }

        if (this._root === null) {
            return null;
        }

        var current = this._root;

        while (current[childPropertyName] !== null) {
            current = current[childPropertyName];
        }

        return current;
    };

    exports.BinaryTree.prototype.remove = function (value) {
        this._root = this._remove(this._root, value);
    };

    exports.BinaryTree.prototype._remove = function (node, value) {
        if (!node) {
            return null;
        }

        var compareResult = this.cmp(value, node.value);
        if (compareResult === 0) {
            --this.size;

            if (!node.left) {
                return node.right;
            }

            if (!node.right) {
                return node.left;
            }

            var current = node.right;

            while (current.left !== null && current.left.left !== null) {
                current = current.left;
            }

            if (current.left !== null) {
                node.value = current.left.value;
                current.left = current.left.right;

                return node;
            } else {
                node.value = current.value;
                node.right = current.right;
                return node;
            }
        } else if (compareResult < 0) {
            node.left = this._remove(node.left, value);
            return node;
        } else {
            node.right = this._remove(node.right, value);
            return node;
        }
    };

    exports.BinaryTree.prototype.getHeight = function () {
        return this._getHeight(this._root);
    };

    exports.BinaryTree.prototype._getHeight = function (node) {
        if (!node) {
            return 0;
        }

        return Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
    };

    exports.BinaryTree.prototype.isBalanced = function () {
        return this._isBalanced(this._root);
    };

    exports.BinaryTree.prototype._isBalanced = function (node) {
        if (!node) {
            return true;
        }

        var leftHeight = this._getHeight(node.left);
        var rightHeight = this._getHeight(node.right);

        var leftIsBalanced = this._isBalanced(node.left);
        var rightIsBalanced = this._isBalanced(node.right);

        return Math.abs(leftHeight - rightHeight) <= 1 && leftIsBalanced && rightIsBalanced;
    };

})(typeof window === 'undefined' ? module.exports : window);
