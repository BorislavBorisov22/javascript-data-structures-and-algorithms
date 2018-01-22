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

const idGen = (() => {
    let id = 1;
    return () => {
        return id++;
    };
})();

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
        this.id = idGen();
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    push(...elements) {
        if (!elements || !elements.length) {
            return false;
        }

        elements.forEach(element => this.pushSingle(element));
        return true;
    }

    pushSingle(value) {
        if (typeof value === 'undefined') {
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

        this.count++;
    }

    remove(callback) {
        if (!this.head) {
            return false;
        }

        let current = this.head;

        while (current) {
            if (callback(current)) {
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

                this.count--;
                return true;
            }

            current = current.next;
        }

        return false;
    }

    removeNodes(...nodes) {
        if (!nodes || !nodes.length) {
            throw new Error('Invalid node parameters');
        }

        nodes.forEach(node => this.remove((currentNode) => currentNode === node));
    }

    makeCircular() {
        if (this.head && this.head !== this.tail) {
            this.tail.next = this.head;
            this.head.prev = this.tail;
            return true;
        }

        return false;
    }

    inOrder(callback) {
        let current = this.head;
        let index = 0;

        while (current) {
            callback(current, index);
            current = current.next;
            ++index;
        }
    }
}

const determineLastTwoInCircle = (peopleCount, m) => {
    const list = new LinkedList();

    for (let i = 1; i <= peopleCount; i++) {
        list.pushSingle(i);
    }

    while (list.count > m - 1) {
        const nodesToRemove = [];
        list.inOrder((node, index) => {
            if ((index + 1) % m === 0) {
                nodesToRemove.push(node);
            }
        });

        list.removeNodes(...nodesToRemove);
    }

    // immortal positions
    const survivors = [];
    list.inOrder((node) => survivors.push(node.value));
    return survivors;
};

const compatriotsCount = 6;
const nthKilled = 3;

const immortalPositions = determineLastTwoInCircle(20, 5);
console.log(immortalPositions, 'immortal positions');