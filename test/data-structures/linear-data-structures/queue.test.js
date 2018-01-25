const { Queue } = require('../../../src/data-structures/linear-data-structures/queue');
const { expect } = require('chai');

describe('Queue tests', () => {
    let queue;

    beforeEach(() => {
        queue = new Queue();
    });

    it('expect queue.dequeue to awlays return the first value added that is still present and remove it', () => {
        const values = [1, 2, 3, 4, 5, 4, 32, 2, 1024, 10000, -5, 12];

        values.forEach(value => queue.enqueue(value));

        let index = 0;
        while (!queue.isEmpty) {
            const current = queue.dequeue();
            expect(current).to.equal(values[index++]);
        }
    });

    it(
        'expect queue.peek to always return the first value added that is still present but without removing it.',
        () => {
        queue.enqueue(22);
        queue.enqueue(13);
        const peeked = queue.peek();

        expect(peeked).to.equal(22);
        expect(queue.size).to.equal(2);
    });
});
