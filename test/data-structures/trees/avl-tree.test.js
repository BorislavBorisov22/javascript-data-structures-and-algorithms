const AvlTree = require('../../../src/data-structures/trees/avl-tree');

const { expect } = require('chai');

describe('AvlTree', () => {
    let tree = new AvlTree();

    beforeEach(() => {
        tree = new AvlTree((a, b) => a - b);
    });

    describe('insert', () => {
        it('expect to insert values correctly and remain a valid AVL tree', () => {
            tree.insertMany(4, 1, 17, 22);

            tree.insert(18); // left right case
            tree.insert(44); // left left case
            tree.insertMany(0, -1); // right right case
            tree.insertMany(20, 40, 42); // right left case

            const root = tree.root;

            expect(root.value).to.equal(18, 'root value');
            expect(root.height).to.equal(4, 'root height');

            expect(root.right.value).to.equal(22, 'right child value');
            expect(root.right.height).to.equal(3, 'right child height');

            expect(root.right.left.value).to.equal(20, 'right left child value');
            expect(root.right.left.height).to.equal(1, 'right left child height');

            expect(root.right.right.value).to.equal(42, 'right right child value');
            expect(root.right.right.height).to.equal(2, 'right right child height');

            expect(root.right.right.left.value).to.equal(40, 'right right left child value');
            expect(root.right.right.left.height).to.equal(1, 'right right left child height');

            expect(root.right.right.right.value).to.equal(44, 'right right right child value');
            expect(root.right.right.right.height).to.equal(1, 'right right right child height');

            expect(root.left.value).to.equal(4, 'left child value');
            expect(root.left.height).to.equal(3, 'left child height');

            expect(root.left.right.value).to.equal(17, 'left right child value');
            expect(root.left.right.height).to.equal(1, 'left right child height');

            expect(root.left.left.value).to.equal(0, 'left left child value');
            expect(root.left.left.height).to.equal(2, 'left left child height');

            expect(root.left.left.right.value).to.equal(1, 'left left right child value');
            expect(root.left.left.right.height).to.equal(1, 'left left right child height');

            expect(root.left.left.left.value).to.equal(-1, 'left left left child value');
            expect(root.left.left.left.height).to.equal(1, 'left left left child height');
        });

        it('expect to increase size correctly when new elements are added', () => {
            tree.insertMany(4, 1, 17, 22, 18, 44, 0, -1, 20, 40, 42);
            expect(tree.size).to.equal(11);
        });

        it('expect not to change tree size when trying to insert an existing value', () => {
            tree.insertMany(4, 1, 17, 22, 18, 44, 0, -1, 20, 40, 42);
            tree.insertMany(22, 4, 1, 17);
            expect(tree.size).to.equal(11);
        });
    });
});
