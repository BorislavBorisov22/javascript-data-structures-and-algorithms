class AvlNode {

    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.height = 1;
    }

    static getHeight(avlNode) {
        return !avlNode ? 0 : avlNode.height;
    }

    static getBalance(node) {
        return AvlNode.getHeight(node.left) - AvlNode.getHeight(node.right);
    }

    static updateHeight(node) {
        node.height = Math.max(AvlNode.getHeight(node.left), AvlNode.getHeight(node.right)) + 1;
    }
}

module.exports = AvlNode;
