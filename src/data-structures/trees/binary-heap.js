(function(exports) {
    const BinaryHeap = function(cmp) {
        if (typeof cmp !== 'function' || cmp.length < 2) {
            throw new Error('Passed cmp method must be of type function accepting two parameters!');
        }

        this.cmp = cmp;
        this._data = [null];
        this.size = 0;
    };

    BinaryHeap.prototype.enqueue = function(value) {
        if (typeof value === 'undefined') {
            throw new Error('cannot enqueue an undefined value!');
        }

        var index = this._data.length;
        while (index > 1 && this.cmp(value, this._data[Math.floor(index / 2)]) < 0) {
            this._data[index] = this._data[Math.floor(index / 2)];
            index = Math.floor(index / 2);
        }

        ++this.size;
        this._data[index] = value;
    };

    BinaryHeap.prototype.enqueueMany = function(...values) {
        values.forEach(v => this.enqueue(v));
    };

    BinaryHeap.prototype.dequeue = function() {
        if (this.isEmpty) {
            return null;
        }

        var valueToReturn = this._data[1];

        var value = this._data[this._data.length - 1];
        this._data.splice(this._data.length - 1, 1);
        --this.size;

        if (!this.isEmpty) {
            var index = 1;
            this._heapifyDown(index, value);
        }

        return valueToReturn;
    };

    BinaryHeap.prototype._heapifyDown = function(index, value) {
        if (Number.isNaN(index) || index < 0 || index > this.size) {
            throw new Error('Passed index must be a number in the range of the heap size!');
        }

        if (typeof value === 'undefined') {
            throw new Error('Passed value parameter cannot be undefined!');
        }

        while (index * 2 + 1 < this._data.length) {
            var smallerKidIndex =
                this.cmp(this._data[index * 2], this._data[index * 2 + 1]) < 0 ? index * 2 : index * 2 + 1;

            if (this.cmp(this._data[smallerKidIndex], value) < 0) {
                this._data[index] = this._data[smallerKidIndex];
                index = smallerKidIndex;
            } else {
                break;
            }
        }

        if (index * 2 < this._data.length) {
            if (this.cmp(this._data[index * 2], value) < 0) {
                this._data[index] = this._data[index * 2];
                index *= 2;
            }
        }

        this._data[index] = value;
    };

    Object.defineProperty(BinaryHeap.prototype, 'isEmpty', {
        get: function() {
            return this.size === 0;
        }
    });

    exports.BinaryHeap = BinaryHeap;

})(typeof window === 'undefined' ? module.exports : window);