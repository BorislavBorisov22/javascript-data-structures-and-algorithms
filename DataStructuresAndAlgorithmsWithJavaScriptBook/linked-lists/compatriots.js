/* According to legend, the first-century Jewish historian Flavius Josephus was about
to be captured along with a band of 40 compatriots by Roman soldiers during the
Jewish-Roman War. The Jewish soldiers decided that they preferred suicide to being
captured and devised a plan for their demise. They were to form a circle and kill
every third soldier until they were all dead. Josephus and one other decided they
wanted no part of this and quickly calculated where they needed to place themselves
so they would be the last survivors. Write a program that allows you to place n
people in a circle and specify that every mth person will be killed. The program
should determine the number of the last two people left in the circle. Use a circularly
linked list to solve the problem. */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(...elements) {
        if (!elements || !elements.length) {
            return false;
        }

        elements.forEach(element => this._push(element));
        return true;
    }

    _push(value) {
        if (!value) {
            throw new Error('Value cannot be null or undefined!');
        }

        const node = new Node(value);

        if (!this.head && !this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;

            this.tail = node;
        }
    }

    remove(value) {
        if (!this.head) {
            return false;
        }

        let current = this.head;

        while (current) {
            if (current.value === value) {
                const next = current.next;
                const prev = current.prev;

                if (next) {
                    next.prev = prev;
                }

                if (prev) {
                    prev.next = next;
                }

                if (current === this.head) {
                    this.head = next;
                }

                if (current === this.tail) {
                    this.tail = prev;
                }

                return true;
            }

            current = current.next;
        }
    }

    makeCircular() {
        if (this.head && this.head !== this.tail) {
            this.tail.next = this.head;
            return true;
        }

        return false;
    }
}