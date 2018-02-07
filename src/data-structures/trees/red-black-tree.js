(function(exports) {

    const color = {
        BLACK: 0,
        RED: 1
    };

    const RedBlackNode = function(value) {
        this.value = value;
        this.color = color.BLACK;
        this.left = null;
        this.right = null;
    };

    RedBlackNode.rotateRight = function(node) {
        const newNode = node.left;
        node.left = newNode.right;
        newNode.right = node;

        return node;
    };

    RedBlackNode.rotateLeft = function(node) {
        const newNode = node.right;
        node.right = newNode.left;
        newNode.left = node;

        return newNode;
    };

    RedBlackNode.flipColors = function(node) {
        node.color = color.RED;
        if (node.left) {
            node.left.color = color.BLACK;
        }

        if (node.right) {
            node.right.color = color.BLACK;
        }

        return node;
    };

    const RedBlackTree = function(cmp) {
        this.cmp = cmp;
        this.root = null;
    };

    RedBlackTree.prototype._isRed = function(node) {
        return node.color === color.RED;
    };

    exports.RedBlackTree = RedBlackTree;

})(typeof window === 'undefined' ? module.exports : window);