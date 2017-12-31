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


    /**
     * Adds value to the end of the list
     * 
     * @param {any} value value to add 
     * 
     * @memberOf LinkedList
     */
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


    /**
     * Adds value to the beggining of the list
     * 
     * @param {any} value value to add
     * 
     * @memberOf LinkedList
     */
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

    /**
     * Traverses list in order and calls the passed callback function
     * on each node by passing the node's data to the callback
     * 
     * @param {any} callback the callback that is executed on each node
     * 
     * @memberOf LinkedList
     */
    inOrder(callback) {
        let currentNode = this.head;

        while (currentNode) {
            callback(currentNode);
            currentNode = currentNode.next;
        }
    }

    /**
     * Removes the first occurence of a target value from the list
     * 
     * @param {any} value value to remove from the list
     * @returns {bool} if the value was successfully remove from the list 
     * 
     * @memberOf LinkedList
     */
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

    /**
     * Checks if the linked list has cycle
     * 
     * @returns {bool} if the linked list is cyclic
     * 
     * @memberOf LinkedList
     */
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

    /** 
     * Removes the last element from the list and returns it
     * 
     * @returns {any} the value of the last node in the list
     * 
     * @memberOf LinkedList
     */
    pop() {
        if (!this.tail) {
            return null;
        }

        const oldTail = this.tail;
        this.tail = oldTail.prev;
        this.tail.next = null;

        return oldTail;
    }

    /** 
     * Removes the first element from the list and returns it
     * 
     * @returns {any} the value of the first node in the list
     * 
     * @memberOf LinkedList
     */
    shift() {
        if (!this.head) {
            return null;
        }

        const oldHead = this.head;
        this.head = oldHead.next;
        this.head.prev = null;

        return oldHead;
    }

    /**
     * Reverses the order of the elements in the list
     * recursivley
     * 
     * @memberOf LinkedList
     */
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


    /**
     * Reverses the order of the elements in the list iterativley
     * 
     * @memberOf LinkedList
     */
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

module.exports = LinkedList;