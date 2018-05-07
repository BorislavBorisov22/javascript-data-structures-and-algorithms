const nodeColor = require('./node-color');

class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.color = nodeColor.red;
        this.parent = null;
    }

    static isParentBlack(node) {
        return !node || Node.isBlack(node.parent);
    }

    static isUncleBlack(node) {
        if (!(node.parent && node.parent.parent)) {
            return true;
        }

        const oppositeDir = Node.isLeftChild(node.parent) ? 'right' : 'left';

        if (node.parent && node.parent.parent) {
            return Node.isBlack(node.parent.parent[oppositeDir]);
        }

        return false;
    }

    static isBlack(node) {
        return !node || node.color === nodeColor.black;
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
        const oppositeDir = Node.isLeftChild(node.parent) ? 'right' : 'left';
        return node.parent.parent[oppositeDir];
    }

    static getSibling(node) {
        const oppsiteDir = Node.isLeftChild(node) ? 'right' : 'left';
        return node.parent[oppsiteDir];
    }
}

module.exports = Node;