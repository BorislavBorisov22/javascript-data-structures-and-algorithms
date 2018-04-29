/**
 * Stack data structure
 *
 *
 * @example
 * var stackModule = require('path-to-algorithms/src/data-structures'+
 * 'linear-data-structures/stack');
 * var stack = new stackModule.Stack();
 *
 * stack.push(1996);
 * stack.peek();
 * stack.pop();
 *
 * @module data-structures/linear-data-structures-avl-tree
 */

class Stack {

    /**
     * Stack.
     *
     * @public
     * @constructor
     */
    constructor() {
        this._data = [];
        this.size = 0;
    };

    /**
     * Adds element on the top of the stack.
     *
     * @public
     * @method
     * @param {Any} value value to add to the stack.
     */
    push(value) {
        if (typeof value === 'undefined') {
            throw new Error('Cannot add undefined value!');
        }

        this._data[this.size++] = value;
    }

    /**
     * Removes the elements from the top of the stack
     * and returns the removed element.
     *
     * @public
     * @method
     * @returns {Any} the value popped from the top of the stack
     */
    pop() {
        if (!this.size === 0) {
            return null;
        }

        var valueToReturn = this.peek();
        this._data.splice(this.size--, 1);

        return valueToReturn;
    }

    /**
     * Returns the value on top of the stack
     * without removing it.
     *
     * @public
     * @method
     * @returns {Any} the value from the top
     * of the stack or null if stack is empty
     */
    peek() {
        return this._data[this.size - 1];
    }

    /**
     * Returns wheter the stack is empty or not.
     *
     * @public
     * @property
     * @returns {Any} the value from the top
     * of the stack or null if stack is empty
     */
    get isEmpty() {
        return this.size === 0;
    }
}

module.exports = Stack;