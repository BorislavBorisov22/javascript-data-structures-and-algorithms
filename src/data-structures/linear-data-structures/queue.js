class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {

    constructor() {
        this._head = null;
        this._tail = null;
        this.size = 0;
    }

    enqueue(value) {
        if (typeof value === 'undefined') {
            throw new Error('Cannot enqueue an undefined value');
        }

        const nodeToAdd = new QueueNode(value);
        if (this._head === null) {
            this._head = nodeToAdd;
            this._tail = nodeToAdd;
        } else {
            this._tail.next = nodeToAdd;
            this._tail = nodeToAdd;
        }

        ++this.size;
    }

    dequeue() {
        if (this._head === null) {
            return null;
        }

        var _headValue = this._head.value;
        this._head = this._head.next;

        --this.size;
        return _headValue;
    }

    peek() {
        return this._head === null ? null : this._head.value;
    }

    get isEmpty() {
        return this.size === 0;
    }
}

module.exports = Queue;
