const BinaryHeap = require('../../../src/data-structures/trees/binary-heap');

const { expect } = require('chai');

describe('BinaryHeap', () => {
    let heap = new BinaryHeap();

    beforeEach(() => {
        heap = new BinaryHeap((a, b) => a - b);
    });

    describe('insert', () => {
        it('expect to insert values correctly', () => {
            const valuesToInsert = [5, 13, 32, 18, 25, 4, 4.5];
            valuesToInsert.forEach(heap.insert.bind(heap));

            const expectedDataValues = [null, 4, 13, 4.5, 18, 25, 32, 5];
            heap.data.forEach((dataValue, index) => {
                expect(expectedDataValues[index]).to.equal(dataValue);
            });
        });
    });

    describe('removeTop', () => {
        it('expect to throw when removeTop called on empty heap', () => {
            expect(heap.removeTop.bind(heap)).to.throw();
        });

        it('expect to remove the top value correctly and return it, and remain a valid heap', () => {
            const valuesToInsert = [5, 13, 32, 18, 25, 4, 4.5];
            valuesToInsert.forEach(heap.insert.bind(heap));

            let top = heap.removeTop();
            expect(top).to.equal(4);
            expect(heap.size).to.equal(valuesToInsert.length - 1);
            expect([null, 4.5, 13, 5, 18, 25, 32]).to.deep.equal(heap.data);

            top = heap.removeTop();
            expect(top).to.equal(4.5);
            expect(heap.size).to.equal(valuesToInsert.length - 2);
            expect([null, 5, 13, 32, 18, 25]).to.deep.equal(heap.data);
        });

        it('expect to always return the optimal value base on the compare func provided', () => {
            const valuesToInsert = [5, 13, 32, 18, 25, 4, 4.5];
            valuesToInsert.forEach(heap.insert.bind(heap));

            const removed = [];
            while (!heap.isEmpty) {
                removed.push(heap.removeTop());
            }

            expect(removed).to.deep.equal(valuesToInsert.slice().sort((a, b) => a - b));
            expect(heap.isEmpty).to.be.true;
            expect(heap.size).to.equal(0);
        });
    });

    describe('top', () => {
        it('expect to return the top element without removing it from the heap', () => {
            const valuesToInsert = [5, 13, 32, 18, 25, 4, 4.5];
            valuesToInsert.forEach(heap.insert.bind(heap));

            const { top } = heap;
            expect(top).to.equal(4);
            expect(heap.size).to.equal(valuesToInsert.length);
            expect(heap.data[1]).to.equal(4);
        });

        it('expect to throw when called on an empty heap', () => {
            expect(() => heap.top).to.throw();
        });
    });

    describe('isEmpty', () => {
        it('expect to return false when element are present in heap', () => {
            heap.insert(22);
            expect(heap.isEmpty).to.be.false;
        });

        it('expect to return true when heap has no elements added', () => {
            expect(heap.isEmpty).to.be.true;
        });
    });
});
