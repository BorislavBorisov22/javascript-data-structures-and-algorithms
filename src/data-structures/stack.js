((exports) => {

    exports.StackNode = function(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }

    exports.Stack = function() {
        this._tail = null;
        this._size = 0;
    };

    exports.Stack.prototype.push = function(value) {
        if (typeof value === 'undefined') {
            throw new Error('Cannot add undefined value!');
        }

        const nodeToAdd = new exports.StackNode(value);
        if (this._tail === null) {
            this._tail = nodeToAdd;
        } else {
            this._tail.next = nodeToAdd;
            nodeToAdd.prev = this._tail;
            this._tail = nodeToAdd;
        }

        ++this._size;
    };

    exports.Stack.prototype.pop = function() {
        if (!this._tail) {
            return null;
        }

        const tailToReturn = this._tail;
        if (this._tail.prev) {
            this._tail = this._tail.prev;
            this._tail.next = null;
        }

        --this._size;
        return tailToReturn.value;
    }

    Object.defineProperty(exports.Stack.prototype, 'isEmpty', {
        get: function() {
            return this._size === 0;
        },
    });

})(typeof window === 'undefined' ? module.exports : window);