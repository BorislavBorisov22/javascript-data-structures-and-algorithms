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

    exports.prototype.push = function(value) {
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

    exports.prototype.pop = function() {
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
})(typeof window === 'undefined' ? module.exports : window);