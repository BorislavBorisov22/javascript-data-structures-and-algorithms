(function(exports) {
    const LinkedNode = function(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    };

    const LinkedList = function() {
        this._head = null;
        this._tail = null;
        this.size = 0;
    };

    LinkedList.prototype.push = function(value) {
        if (typeof value === 'undefined') {
            throw new Error('Cannot push an undefined value.');
        }

        const nodeToAdd = new LinkedNode(value);
        if (this._head === null) {
            this._head = this._tail = nodeToAdd;
        } else {
            this._tail.next = nodeToAdd;
            nodeToAdd.prev = this._tail;
            this._tail = nodeToAdd;
        }

        ++this.size;
        return this;
    };

    LinkedList.prototype.unshift = function(value) {
        if (typeof value === 'undefined') {
            throw new Error('Cannot push an undefined value.');
        }

        const nodeToAdd = new LinkedNode(value);
        if (this._head === null) {
            this._head = this._tail = nodeToAdd;
        } else {
            this._head.prev = nodeToAdd;
            nodeToAdd.next = this._head;
            this._head = nodeToAdd;
        }

        ++this.size;
        return this;
    };

    LinkedList.prototype.pop = function() {
        if (this._tail === null) {
            return null;
        }

        var valueToReturn = this._tail.value;

        var prev = this._tail.prev;
        this._tail = prev;
        if (this._tail) {
            this._tail.next = null;
        }

        --this.size;
        return valueToReturn;
    };

    LinkedList.prototype.shift = function() {
        if (this._head === null) {
            return null;
        }

        var valueToReturn = this._head.value;
        this._head = this._head.next;

        --this.size;
        return valueToReturn;
    };

    LinkedList.prototype.remove = function(value) {
        if (this._head === null) {
            return false;
        }

        var current = this._head;

        while (current.next !== null && current.value !== value) {
            current = current.next;
        }

        if (current.value !== value) {
            return false;
        }

        var next = current.next;
        var prev = current.prev;

        if (next) {
            next.prev = prev;
        }

        if (prev) {
            prev.next = next;
        }

        if (current === this._head) {
            this._head = next;
        }

        if (current === this._tail) {
            this._tail = prev;
        }

        return true;
    };

    LinkedList.prototype.inOrder = function(callback) {
        if (typeof callback !== 'function' || callback.length < 1) {
            throw new Error('Passed callback must be of type function and accept a at least a single parameter.');
        }

        var current = this._head;
        let index = 0;
        while (current) {
            callback(current, index);
            current = current.next;
            ++index;
        }

        return this;
    };

    LinkedList.prototype.recursiveReverse = function() {
        var inverse = function(current, next) {
            if (!next) {
                return;
            }

            inverse(next, next.next);

            next.next = current;
            current.prev = next;
        };

        if (!(this._head && this._head.next)) {
            return;
        }

        inverse(this._head, this._head.next);

        // swapping head and tail
        var headStore = this._head;
        this._head = this._tail;
        this._tail = headStore;

        this._tail.next = null;
        this._head.prev = null;
        return this;
    };

    LinkedList.prototype.reverse = function() {
        if (!(this._head && this._head.next)) {
            return;
        }

        var current = this._head;
        var next;
        while (current) {
            next = current.next;

            current.next = current.prev;
            current.prev = next;

            current = next;
        }

        var headStore = this._head;
        this._head = this._tail;
        this._tail = headStore;
        return this;
    };

    LinkedList.prototype.hasCycle = function() {
        var fast = this._head;
        var slow = this._head;

        while (true) {
            if (fast === null) {
                return false;
            }

            fast = fast.next;
            if (fast === null) {
                return false;
            }

            fast = fast.next;
            slow = slow.next;

            if (fast === slow) {
                return true;
            }
        }

        return false;
    };

    exports.LinkedNode = LinkedNode;
    exports.LinkedList = LinkedList;

})(typeof window === 'undefined' ? module.exports : window);