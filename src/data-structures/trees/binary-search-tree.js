(function(exports) {
    const Node = function(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    };

    const BinaryTree = function(cmp) {
        if (typeof cmp !== 'function' || cmp.length < 2) {
            throw new Error('Passed cmp parameter must be of type function and accept two parameters')
        }

        this.cmp = cmp;
        this._root = null;
        this.size = 0;
    };

    BinaryTree.prototype.add = function(value) {
        this._root = this._add(this._root, value);
    };

    BinaryTree.prototype._add = function(node, value) {
        if (node === null) {
            node = new Node(value);
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

    BinaryTree.prototype.addMany = function(...values) {
        values.forEach(v => this.add(v));
    };

    BinaryTree.prototype.find = function(value) {
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

    BinaryTree.prototype.findRecursive = function(value) {
        return this._findRecursive(this._root, value);
    };

    BinaryTree.prototype._findRecursive = function(node, value) {
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

    BinaryTree.prototype.inOrder = function(callback) {
        if (typeof callback !== 'function' || callback.length < 1) {
            throw new Error('Passed callback parameter must be of type function accepting a tree node as a parameter!');
        }

        this._inOrder(this._root, callback);
    };

    BinaryTree.prototype._inOrder = function(node, callback) {
        if (!node) {
            return;
        }

        this._inOrder(node.left, callback);
        callback(node);
        this._inOrder(node.right, callback);
    };

    BinaryTree.prototype.findMin = function() {
        return this._findOptimal('left');
    };

    BinaryTree.prototype.findMax = function() {
        return this._findOptimal('right');
    };

    BinaryTree.prototype._findOptimal = function(childPropertyName) {
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

    BinaryTree.prototype.remove = function(value) {
        this._root = this._remove(this._root, value);
        return this;
    };

    BinaryTree.prototype._remove = function(node, value) {
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

    BinaryTree.prototype.getHeight = function() {
        return this._getHeight(this._root);
    };

    BinaryTree.prototype._getHeight = function(node) {
        if (!node) {
            return 0;
        }

        return Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
    };

    BinaryTree.prototype.isBalanced = function() {
        return this._isBalanced(this._root);
    };

    BinaryTree.prototype._isBalanced = function(node) {
        if (!node) {
            return true;
        }

        const leftHeight = this._getHeight(node.left);
        const rightHeight = this._getHeight(node.right);

        const leftIsBalanced = this._isBalanced(node.left);
        const rightIsBalanced = this._isBalanced(node.right);

        return Math.abs(leftHeight - rightHeight) <= 1 && leftIsBalanced && rightIsBalanced;
    };

    BinaryTree.prototype.existsInSubtree = function(node) {
        if (!node) {
            throw new Error('Passed node parameter is null or undefined!');
        }

        return this._existsInSubtree(this._root, node);
    };

    BinaryTree.prototype._existsInSubtree = function(currentNode, targetNode) {
        if (!currentNode) {
            return false;
        }

        if (currentNode === targetNode) {
            return true;
        }

        return this._existsInSubtree(currentNode.left, targetNode) ||
            this._existsInSubtree(currentNode.right, targetNode);
    };

    BinaryTree.prototype.lowestCommonAncestor = function(firstNode, secondNode) {
        if (!(firstNode && secondNode)) {
            throw new Error('Passed node cannot be undefined or null!');
        }

        return this._lowestCommonAncestor(this._root, firstNode, secondNode);
    };

    BinaryTree.prototype._lowestCommonAncestor = function(currentNode, firstNode, secondNode) {
        const isFirstInLeft = this._existsInSubtree(currentNode.left, firstNode);
        const isFirstInRight = this._existsInSubtree(currentNode.right, firstNode);

        const isSecondInLeft = this._existsInSubtree(currentNode.left, secondNode);
        const isSecondInRight = this._existsInSubtree(currentNode.right, secondNode);

        const areInSeperateBranches = (isFirstInLeft && isSecondInRight) || (isFirstInRight && isSecondInLeft);

        if (areInSeperateBranches) {
            return currentNode;
        } else if (isFirstInLeft && isSecondInLeft) {
            return this._lowestCommonAncestor(currentNode.left, firstNode, secondNode);
        } else if (isFirstInRight && isSecondInRight) {
            return this._lowestCommonAncestor(currentNode.right, firstNode, secondNode);
        } else {
            return null;
        }
    };

    exports.BinaryTree = BinaryTree;
    exports.Node = Node;
})(typeof window === 'undefined' ? module.exports : window);