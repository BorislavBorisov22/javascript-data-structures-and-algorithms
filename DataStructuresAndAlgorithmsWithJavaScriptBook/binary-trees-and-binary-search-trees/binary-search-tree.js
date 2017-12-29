class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    show() {
        return this.data;
    }
}

class BinarySearchTree {
    constructor(compareFunc) {
        this.compareFunc = compareFunc;
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value, null, null);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (this.compareFunc(newNode.data, current.data) < 0) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }

                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }

                current = current.right;
            }
        }
    }

    insertMany(...values) {
        values.forEach(value => this.insert(value));
    }

    printRecursive(node, indent) {
        if (!node) {
            return;
        }

        console.log(indent + node.data);
        this.printRecursive(node.left, indent + '  ');
        this.printRecursive(node.right, indent + '  ');
    }

    traverse(callback) {
        const queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            const current = queue.shift();

            callback(current);

            if (current.left) {
                queue.push(current.left);
            }

            if (current.right) {
                queue.push(current.right);
            }
        }
    }
}

const tree = new BinarySearchTree((a, b) => a - b);
tree.insert(22);
tree.insert(44);
tree.insert(99);
tree.insert(100);
tree.insert(11);
tree.insert(30)

// tree.traverse((node) => console.log(node.data));
tree.printRecursive(tree.root, '');

module.exports = BinarySearchTree;