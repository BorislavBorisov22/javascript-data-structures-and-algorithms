((exports) => {

    exports.Stack = function() {
        this._data = [];
        this._size = 0;
    };

    exports.Stack.prototype.push = function(value) {
        if (typeof value === 'undefined') {
            throw new Error('Cannot add undefined value!');
        }

        this._data[this._size++] = value;
    };

    exports.Stack.prototype.pop = function() {
        if (!this._size === 0) {
            return null;
        }

        const valueToReturn = this.peek();
        this._data.splice(this._size--, 1);

        return valueToReturn;
    }

    exports.Stack.prototype.peek = function() {
        return this._data[this._size - 1];
    }

    Object.defineProperty(exports.Stack.prototype, 'isEmpty', {
        get: function() {
            return this._size === 0;
        },
    });

})(typeof window === 'undefined' ? module.exports : window);