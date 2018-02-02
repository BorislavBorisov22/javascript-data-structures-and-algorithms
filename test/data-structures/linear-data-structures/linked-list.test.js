const { LinkedList } = require('../../../src/data-structures/linear-data-structures/linked-list');

const { expect } = require('chai');

describe('Linked list tests', () => {
    let linkedList;

    beforeEach(() => {
        linkedList = new LinkedList();
    })

    it('expect to push values to the back of the list correctly', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];

        values.forEach((value) => linkedList.push(value));
        linkedList.inOrder((linkedNode, index) => {
            expect(linkedNode.value).to.equal(values[index]);
        });
    });
});