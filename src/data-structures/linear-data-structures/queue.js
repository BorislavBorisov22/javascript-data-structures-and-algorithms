(function (exports) {
    exports.QueueNode = function (value) {
        this.value = value;
        this.next = null;
    }

    exports.Queue = function () {
        this._head = null;
        this._tail = null;
        this.size = 0;
    };

    exports.Queue.prototype.enqueue = function (value) {
        if (typeof value === 'undefined') {
            throw new Error('Cannot enqueue an undefined value');
        }

        const nodeToAdd = new exports.QueueNode(value);
        if (this._head === null) {
            this._head = nodeToAdd;
            this._tail = nodeToAdd;
        } else {
            this._tail.next = nodeToAdd;
            this._tail = nodeToAdd;
        }

        ++this.size;
    };

    exports.Queue.prototype.dequeue = function (value) {
        if (this._head === null) {
            return null;
        }

        var _headValue = this._head.value;
        this._head = this._head.next;

        --this.size;
        return _headValue;
    };

    exports.Queue.prototype.peek = function () {
        return this._head === null ? null : this._head.value;
    };

    Object.defineProperty(exports.Queue.prototype, 'isEmpty', {
        get: function () {
            return this.size === 0;
        },
    });

})(typeof window === 'undefined' ? module.exports : window);
