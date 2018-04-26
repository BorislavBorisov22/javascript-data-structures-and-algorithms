const BinarySearchTree = require('../../../src/data-structures/trees/binary-search-tree');
const { expect } = require('chai');

describe('BinarySearchTree tests', () => {
    let tree = new BinarySearchTree();

    beforeEach(() => {
        tree = new BinarySearchTree();
    });

    describe('insert', () => {

        it('expect to insert multiple values correctly', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            expect(tree.size).to.equal(values.length);

            expect(tree._root.value).to.equal(5);
            expect(tree._root.left.value).to.equal(0);
            expect(tree._root.right.value).to.equal(6);
            expect(tree._root.left.left.value).to.equal(-1);
            expect(tree._root.right.right.value).to.equal(12);
            expect(tree._root.right.left.value).to.equal(5.5);
            expect(tree._root.right.right.left.value).to.equal(9);
            expect(tree._root.right.right.right.value).to.equal(33);
            expect(tree._root.right.left.right.value).to.equal(5.7);
        });

        it('expect not to increase tree size when trying to insert existing value', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            tree.insert(9);

            expect(tree.size).to.equal(values.length);
        });
    });

    describe('findMinNode, findMaxNode', () => {
        it('expect findMinNode to return the min node in the provided subtree', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            let min = tree.findMinNode(tree._root);
            expect(min.value).to.equal(-1);

            min = tree.findMinNode(tree._root.right);
            expect(min.value).to.equal(5.5);
        });

        it('expect findMinNode to return null when passed an invalid node', () => {
            tree.insert(2);
            const min = tree.findMinNode(undefined);
            expect(min).to.be.null;
        });

        it('expect findMaxNode to return the max node in the provided subtree', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            let min = tree.findMaxNode(tree._root);
            expect(min.value).to.equal(33);

            min = tree.findMaxNode(tree._root.left);
            expect(min.value).to.equal(0);
        });

        it('expect findMaxNode to return null when passed an invalid node', () => {
            tree.insert(22);
            const min = tree.findMaxNode(undefined);
            expect(min).to.be.null;
        });
    });
});