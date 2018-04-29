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

    describe('find', () => {
        it('expect find method to find the correct node when passed existing node', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            let expectedNode = tree._root.right.right;
            let actualNode = tree.find(12);
            expect(actualNode).to.eql(expectedNode);

            expectedNode = tree._root.right.left.right;
            actualNode = tree.find(5.7);
            expect(actualNode).to.eql(expectedNode);
        });

        it('expect find method to return null when passed value doest not exist in the tree', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            const targetNode = tree.find(64);
            expect(targetNode).to.be.null;
        });
    });

    describe('min', () => {
        it('expect to return the correct min value from the tree', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            const minValue = tree.min();
            expect(minValue).to.equal(-1);
        });

        it('expect to return null when no elements are present in the tree', () => {
            const min = tree.min();
            expect(min).to.be.null;
        });
    });

    describe('max', () => {
        it('expect to return the correct max value from the tree', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            const maxValue = tree.max();
            expect(maxValue).to.equal(33);
        });

        it('expect to return null when no elements are present in the tree', () => {
            const max = tree.max();
            expect(max).to.be.null;
        });
    });

    describe('inOrder', () => {
        it('expect in order to iterates over nodes in a sorted node order', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            let nodes = [];
            tree.inOrder((node) => nodes.push(node.value));

            expect(nodes).to.deep.equal(values.sort((a, b) => a - b));
        });
    });

    describe('remove', () => {
        it('expect to remove node from the tree correctly change the target node', () => {
            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            expect(tree._root.right.right.value).to.equal(12);

            tree.remove(12);

            expect(tree.size).to.equal(values.length - 1);
            expect(tree._root.right.right.value).to.equal(33);

            tree.remove(5.5);

            expect(tree.size).to.equal(values.length - 2);
            expect(tree._root.right.left.value).to.equal(5.7);
        });

        it('expect to always remain a valud binary search tree structure when removing elements', () => {
            const expectToBeSorted = (arr) => {
                expect(arr.slice().sort((a, b) => a - b)).to.deep.equal(arr);
            };

            const values = [5, 0, -1, 6, 12, 33, 9, 5.5, 5.7];
            values.forEach(tree.insert.bind(tree));

            const removeValues = [-1, 12, 33, 5, 5.5, 5.7, 0, 9, 6];

            removeValues.forEach((value, index) => {
                tree.remove(value);

                expect(tree.size).to.equal(values.length - 1 - index);

                let inOrder = [];
                tree.inOrder((node) => inOrder.push(node.value));
                console.log(inOrder);
                expectToBeSorted(inOrder);
            });
        });
    });
});