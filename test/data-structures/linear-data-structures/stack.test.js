const { Stack } = require('../../../src/data-structures/linear-data-structures/stack');
const { expect } = require('chai');

describe('Stack data structure tests', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it('expect stack.pop to always pop the last pushed element', () => {
        const values = [1, 3, 4, 5, 6, 7];

        values.forEach(value => stack.push(value));

        let index = values.length - 1;
        while (!stack.isEmpty) {
            const current = stack.pop();
            expect(current).to.equal(values[index]);
            --index;
        }
    });

    it('expect stack.isEmpty to return true when stack is empty', () => {
        expect(stack.isEmpty).to.be.true;
    });

    it('expect stack.isEmpty to return false when stack contains values', () => {
        stack.push(22);
        stack.push(13);
        stack.pop();

        expect(stack.isEmpty).to.be.false;
    });
});