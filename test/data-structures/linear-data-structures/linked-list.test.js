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

    it('expect to correctly remove the node from the beginning of the linked list when such value is present', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        let expectedValues = values.slice();
        values.forEach((v, index) => {
            const removed = linkedList.remove(v);
            const listValues = collectListItems();
            
            expectedValues.splice(0, 1);

            expect(removed).to.be.true;
            expect(linkedList.size).to.equal(expectedValues.length, 'Invalid list size');
            expect(expectedValues).to.deep.equal(listValues);
        });
    });

    it('expect to correctly remove the node from the end of the linked list when such value is present', () => {
        const values = [1, 2, 3, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        let expectedValues = values.slice();
        values.reverse().forEach((v, index) => {
            const removed = linkedList.remove(v);
            const listValues = collectListItems();
            
            expectedValues.splice(-1, 1);

            expect(removed).to.be.true;
            expect(linkedList.size).to.equal(expectedValues.length, 'Invalid list size');
            expect(expectedValues).to.deep.equal(listValues);
        });
    });


    it('expect remove to return false when no such element was found in list', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        const removed = linkedList.remove(1024);

        expect(removed).to.be.false;
        expect(linkedList.size).to.equal(values.length);
    });

    it('expect remove to return false when no element present in the list', () => {
        const removed = linkedList.remove(-1);
        expect(removed).to.be.false;
    });

    it('expect recursive reverse to correctly reverse the list', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        linkedList.recursiveReverse();

        expect(collectListItems()).to.deep.equal(values.reverse());
    });

    
    it('expect reverse to correctly reverse the list', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        linkedList.reverse();

        expect(collectListItems()).to.deep.equal(values.reverse());
    });

    it('expect hasCycle to return false when the linked list is not cyclic', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        const hasCycle = linkedList.hasCycle();

        expect(hasCycle).to.be.false;
    });

    it('expect hasCycle to return true when the linked list is cyclic', () => {
        const values = [1, 2, 5, 3, 1, 4, 5, 23, 324, 31];
        values.forEach((value) => linkedList.push(value));

        linkedList._tail.next = linkedList._head;

        const hasCycle = linkedList.hasCycle();

        expect(hasCycle).to.be.true;
    });
});
