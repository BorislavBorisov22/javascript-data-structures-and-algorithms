const LinkedList = require('../../../src/data-structures/linear-data-structures/linked-list');

const { expect } = require('chai');

describe('Linked list tests', () => {
    let linkedList = new LinkedList();

    const collectListItems = () => {
        const elements = [];
        linkedList.inOrder((node) => elements.push(node.value));
        return elements;
    };

    beforeEach(() => {
        linkedList = new LinkedList();
    });

    it('expect to push values to the back of the list correctly', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];

        values.forEach((value) => linkedList.push(value));
        linkedList.inOrder((linkedNode, index) => {
            expect(linkedNode.value).to.equal(values[index]);
        });
    });

    it('expect to add elements on the left of the list when usingunshift to add values', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.unshift(value));

        const listValues = collectListItems();
        expect(listValues).to.deep.equal(values.reverse());
    });

    it('expect to remove the last element from the list on each pop method call', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        values.forEach((_, index) => {
            const popped = linkedList.pop();
            expect(linkedList.size).to.equal(values.length - 1 - index);
            expect(popped).to.equal(values[values.length - 1 - index]);
        });
    });

    it('expect to remove the first element from the list on each shift method call', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        values.forEach((_, index) => {
            const shifted = linkedList.shift();
            expect(linkedList.size).to.equal(values.length - 1 - index);
            expect(shifted).to.equal(values[index]);
        });
    });
});
