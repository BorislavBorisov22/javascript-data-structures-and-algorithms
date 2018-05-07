const RedBlackTree = require('../../../../src/data-structures/trees/red-black-tree/red-black-tree');
const nodeColor = require('../../../../src/data-structures/trees/red-black-tree/node-color');

const { expect } = require('chai');

describe('RedBlackTree', () => {
    let tree = new RedBlackTree((a, b) => a - b);

    beforeEach(() => {
        tree = new RedBlackTree((a, b) => a - b);
    });

    describe('insert', () => {
        it(
            'expect to correctly insert values and remain valid red-black tree when having left left rotation cases',
            () => {
                tree.insertMany(5, 7, 16, 33, 35, 60, 80, 85, 90, 95, 100, 105);

                const root = tree.root;

                expect(root.value).to.equal(33);
                expect(root.color).to.equal(nodeColor.black);

                expect(root.left.value).to.equal(7);
                expect(root.left.color).to.equal(nodeColor.black);

                expect(root.left.left.value).to.equal(5);
                expect(root.left.left.color).to.equal(nodeColor.black);

                expect(root.left.right.value).to.equal(16);
                expect(root.left.right.color).to.equal(nodeColor.black);

                expect(root.right.value).to.equal(85);
                expect(root.right.color).to.equal(nodeColor.black);

                expect(root.right.left.value).to.equal(60);
                expect(root.right.left.color).to.equal(nodeColor.red);

                expect(root.right.left.left.value).to.equal(35);
                expect(root.right.left.left.color).to.equal(nodeColor.black);

                expect(root.right.left.right.value).to.equal(80);
                expect(root.right.left.right.color).to.equal(nodeColor.black);

                expect(root.right.right.value).to.equal(95);
                expect(root.right.right.color).to.equal(nodeColor.red);

                expect(root.right.right.left.value).to.equal(90);
                expect(root.right.right.left.color).to.equal(nodeColor.black);

                expect(root.right.right.right.value).to.equal(100);
                expect(root.right.right.right.color).to.equal(nodeColor.black);

                expect(root.right.right.right.right.value).to.equal(105);
                expect(root.right.right.right.right.color).to.equal(nodeColor.red);
            });

        it(
            'expect to correctly insert values and remain valid red-black tree when having left right rotation cases',
            () => {
                tree.insertMany(30, 40, 35, 60, 50, 34, 32);
                const root = tree.root;

                expect(root.value).to.equal(35);
                expect(root.color).to.equal(nodeColor.black);

                expect(root.left.value).to.equal(32);
                expect(root.left.color).to.equal(nodeColor.black);

                expect(root.left.left.value).to.equal(30);
                expect(root.left.left.color).to.equal(nodeColor.red);

                expect(root.left.right.value).to.equal(34);
                expect(root.left.right.color).to.equal(nodeColor.red);

                expect(root.right.value).to.equal(50);
                expect(root.right.color).to.equal(nodeColor.black);

                expect(root.right.left.value).to.equal(40);
                expect(root.right.left.color).to.equal(nodeColor.red);

                expect(root.right.right.value).to.equal(60);
                expect(root.right.right.color).to.equal(nodeColor.red);

            });

        it(
            'expect to correctly insert values and remain valid red-black tree when having right left rotation cases',
            () => {
                tree.insertMany(60, 40, 50, 55, 57, 30, 35);
                const root = tree.root;

                expect(root.value).to.equal(50);
                expect(root.color).to.equal(nodeColor.black);

                expect(root.left.value).to.equal(35);
                expect(root.left.color).to.equal(nodeColor.black);

                expect(root.left.left.value).to.equal(30);
                expect(root.left.left.color).to.equal(nodeColor.red);

                expect(root.left.right.value).to.equal(40);
                expect(root.left.right.color).to.equal(nodeColor.red);

                expect(root.right.value).to.equal(57);
                expect(root.right.color).to.equal(nodeColor.black);

                expect(root.right.left.value).to.equal(55);
                expect(root.right.left.color).to.equal(nodeColor.red);

                expect(root.right.right.value).to.equal(60);
                expect(root.right.right.color).to.equal(nodeColor.red);

            });


        it(
            'expect to correctly insert values and remain valid red-black tree when having left left rotation cases',
            () => {
                const values = [5, 7, 16, 33, 35, 60, 80, 85, 90, 95, 100, 105].reverse();
                tree.insertMany(...values);

                const root = tree.root;

                expect(root.value).to.equal(90, 'root');
                expect(root.color).to.equal(nodeColor.black);

                expect(root.left.value).to.equal(35);
                expect(root.left.color).to.equal(nodeColor.black);

                expect(root.left.left.value).to.equal(16);
                expect(root.left.left.color).to.equal(nodeColor.red);

                expect(root.left.left.left.value).to.equal(7);
                expect(root.left.left.left.color).to.equal(nodeColor.black);

                expect(root.left.left.left.left.value).to.equal(5);
                expect(root.left.left.left.left.color).to.equal(nodeColor.red);

                expect(root.left.left.right.value).to.equal(33);
                expect(root.left.left.right.color).to.equal(nodeColor.black);

                expect(root.left.right.value).to.equal(80);
                expect(root.left.right.color).to.equal(nodeColor.red);

                expect(root.left.right.left.value).to.equal(60);
                expect(root.left.right.left.color).to.equal(nodeColor.black);

                expect(root.left.right.right.value).to.equal(85);
                expect(root.left.right.right.color).to.equal(nodeColor.black);

                expect(root.right.value).to.equal(100);
                expect(root.right.color).to.equal(nodeColor.black);

                expect(root.right.right.value).to.equal(105);
                expect(root.right.right.color).to.equal(nodeColor.black);

                expect(root.right.left.value).to.equal(95);
                expect(root.right.left.color).to.equal(nodeColor.black);
            });

        it('expect to correctly insert values and remain valid red-black tree', () => {
            tree.insertMany(10, 5, 22, 30, 40, 2, 4, 28, 25, 1, 0, 2.5, 6, 7);
            const root = tree.root;

            expect(root.value).to.equal(10, 'root value');
            expect(root.color).to.equal(nodeColor.black, 'root color');

            expect(root.left.value).to.equal(4, 'left value');
            expect(root.left.color).to.equal(nodeColor.black, 'left color');

            expect(root.right.value).to.equal(30, 'right value');
            expect(root.right.color).to.equal(nodeColor.black, 'right color');

            expect(root.left.left.value).to.equal(1, 'left left value');
            expect(root.left.left.color).to.equal(nodeColor.red, 'left left color');

            expect(root.left.right.value).to.equal(6, 'left right value');
            expect(root.left.right.color).to.equal(nodeColor.black, 'left right color');

            expect(root.right.left.value).to.equal(25, 'right left value');
            expect(root.right.left.color).to.equal(nodeColor.black, 'right left color');

            expect(root.right.right.value).to.equal(40, 'right right value');
            expect(root.right.right.color).to.equal(nodeColor.black, 'right right color');

            expect(root.left.left.left.value).to.equal(0, 'left left left value');
            expect(root.left.left.left.color).to.equal(nodeColor.black, 'left left left color');

            expect(root.left.left.right.value).to.equal(2, 'left left right value');
            expect(root.left.left.right.color).to.equal(nodeColor.black, 'left left right color');

            expect(root.left.right.left.value).to.equal(5, 'left right left value');
            expect(root.left.right.left.color).to.equal(nodeColor.red, 'left right left color');

            expect(root.left.right.right.value).to.equal(7, 'left right right value');
            expect(root.left.right.right.color).to.equal(nodeColor.red, 'left right right color');

            expect(root.right.left.left.value).to.equal(22, 'right left left value');
            expect(root.right.left.left.color).to.equal(nodeColor.red, 'right left left color');

            expect(root.right.left.right.value).to.equal(28, 'right left right value');
            expect(root.right.left.right.color).to.equal(nodeColor.red, 'right left right color');
        });
    });
});