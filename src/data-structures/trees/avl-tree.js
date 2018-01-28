(function(exports) {
    // Avl node
    const AvlNode = function(value, left, right, parent) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;

        this.size = 0;
        this.height = 0;
    };

    AvlNode.getSize = function(node) {
        return node === null ? 0 : node.size;
    };

    AvlNode.getHeight = function(node) {
        return node === null ? 0 : node.height;
    };

    AvlNode.prototype.getBalance = function() {
        return AvlNode.getHeight(this.left) - AvlNode.getHeight(this.right);
    };

    // AVL Iterator
    const AvlTreeIterator = function(node) {
        this.avlNode = node;
    };

    // AVL Tree
    const AvlTree = function() {
        this.root = null;
    };

    exports.AvlTree = AvlTree;
})(typeof window === 'undefined' ? module.exports : window);
