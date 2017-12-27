class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(value) {
        const node = new Node(value);
        if (this.head === null && this.tail === null) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;

            this.tail = node;
        }
    }

    unshift(value) {
        const node = new Node(value);

        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;

            this.head = node;
        }
    }

    inOrder(callback) {
        let currentNode = this.head;

        while (currentNode) {
            callback(currentNode);
            currentNode = currentNode.next;
        }
    }

    remove(value) {
        if (!this.head) {
            return false;
        }

        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                // removing node from list
                const currentNodeNext = currentNode.next;
                const currentNodePrev = currentNode.prev;

                if (next) {
                    next.prev = prev;
                }

                if (prev) {
                    prev.next = next;
                }

                if (currentNode === this.head) {
                    this.head = next;
                }

                if (currentNode === this.tail) {
                    this.tail = prev;
                }

                return true;
            }

            currentNode = currentNode.next;
        }

        return false;
    }

    hasCycle() {
        let fast = this.head;
        let slow = this.head;

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
    }

    pop() {
        if (!this.tail) {
            return null;
        }

        const oldTail = this.tail;
        this.tail = oldTail.prev;
        this.tail.next = null;

        return oldTail;
    }

    shift() {
        if (!this.head) {
            return null;
        }

        const oldHead = this.head;
        this.head = oldHead.next;
        this.head.prev = null;

        return oldHead;
    }

    recursiveReverse() {
        const inverse = (current, next) => {
            if (!current || !next) {
                return;
            }

            inverse(next, next.next);
            next.next = current;
            current.prev = next;
        };

        if (!this.head || !this.head.next) {
            return;
        }

        inverse(this.head, this.head.next);

        const temp = this.head;
        this.head = this.tail;
        this.tail = temp;

        this.head.prev = null;
        this.tail.next = null;
    }

    reverse() {
        if (!this.head || !this.head.next) {
            return;
        }

        let current = this.head;

        while (current) {
            const next = current.next;
            current.next = current.prev;
            current.prev = next;

            current = next;
        }

        const temp = this.head;
        this.head = this.tail;
        this.tail = temp;
    }
}

const traverseReverse = (node) => {
    while (node) {
        console.log(node.value);
        node = node.prev;
    }
};

module.exports = LinkedList;