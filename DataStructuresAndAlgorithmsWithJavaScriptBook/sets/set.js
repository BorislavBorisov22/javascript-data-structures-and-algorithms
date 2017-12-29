class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class Set {
    constructor(size = 100) {
        this.data = [];
        this.maxSize = size;
    }

    /**
     * Returns the numbers of values present in the set
     * 
     * @readonly
     * @returns {Number}
     * 
     * @memberOf Set
     */
    get count() {
        let size = 0;
        this.inOrder(_ => ++size);

        return size;
    }

    _generateHashCode(value) {
        let i = 0;
        let hashCode = 0;
        let character;

        if (value.length === 0 || value.length === undefined) {
            return value;
        }

        for (let i = 0; i < value.length; i++) {
            character = value.charCodeAt(i);

            hashCode = ((hashCode << 5) - hashCode) + character;
            hashCode = hashCode & hashCode;
        }

        return Math.abs(hashCode % this.maxSize);
    }

    /**
     * Addes value to the set. Returns true if the value was not previously
     * present in the set and it was added successfully
     * 
     * @param {any} value 
     * @returns {bool}
     * 
     * @memberOf Set
     */
    add(value) {
        if (!value) {
            throw new Error('Cannot add undefined value!');
        }

        const newNode = new Node(value);
        const hashCode = this._generateHashCode(value);

        // if no such hashcode has been generated
        if (this.data[hashCode] === undefined) {
            this.data[hashCode] = newNode;
            return true;
        }

        // check if collision has occured
        let current = this.data[hashCode];

        while (current.next !== null && current.data !== value) {
            current = current.next;
        }

        if (current.data === value) {
            return false;
        }

        current.next = newNode;
        newNode.prev = current;
        return true;
    }

    /**
     * Removes value from the set. Returns true if value was
     * successfully removed from the set
     * 
     * @param {any} data 
     * @returns {bool}
     * 
     * @memberOf Set
     */
    remove(data) {
        if (data === undefined) {
            throw new Error('Passed data cannot be undefined!');
        }

        const hashCode = this._generateHashCode(data);

        if (this.data[hashCode] === undefined) {
            return false;
        }

        const first = this.data[hashCode];
        let current = this.data[hashCode];

        while (current.next !== null && current.data !== data) {
            current = current.next;
        }

        if (current.data === data) {
            const prev = current.prev;
            const next = current.next;

            if (prev) {
                prev.next = next;
            }

            if (next) {
                next.prev = prev;
            }

            if (current === first) {
                this.data[hashCode] = first.next;
            }

            return true;
        } else {
            return false;
        }
    }


    /**
     * Returns true if passed value is present in the set
     * 
     * @param {any} value 
     * @returns {bool}
     * 
     * @memberOf Set
     */
    contains(value) {
        if (value === undefined) {
            throw new Error('Passed value cannot be undefined!');
        }

        const hashCode = this._generateHashCode(value);

        if (this.data[hashCode] === undefined) {
            return false;
        }

        let current = this.data[hashCode];
        while (current.next !== null && current.data !== value) {
            current = current.next;
        }

        return current.data === value;
    }

    /**
     * Invokes the passed callback function
     * on each value in the set
     * 
     * @param {function(value)} callback 
     * 
     * @memberOf Set
     */
    inOrder(callback) {
        const filledData = this.data.filter(n => !!n);

        filledData.forEach((node) => {
            let current = node;

            while (current !== null) {
                callback(current.data);
                current = current.next;
            }
        });
    }

    /**
     * Unions all values of two sets and returns a new one
     * with all the value
     * 
     * @param {Set} set 
     * @returns {Set}
     * 
     * @memberOf Set
     */
    union(set) {
        const tempSet = new Set();

        this.inOrder((value) => tempSet.add(value));
        set.inOrder((value) => tempSet.add(value));

        return tempSet;
    }

    /**
     * Returns new set containing only values that 
     * were present in both sets
     * 
     * @param {Set} set 
     * @returns {Set}
     * 
     * @memberOf Set
     */
    intersect(set) {
        const tempSet = new Set();

        this.inOrder((value) => {
            if (set.contains(value)) {
                tempSet.add(value);
            }
        });

        return tempSet;
    }

    /**
     * Returns true if the first set's all values are contained
     * in the second set
     * 
     * @param {Set} set 
     * @returns {bool}
     * 
     * @memberOf Set
     */
    isSubsetOf(set) {
        if (this.count > set.count) {
            return false;
        }

        let isSubset = true;
        this.inOrder((value) => {
            if (!isSubset) {
                return;
            }

            if (!set.contains(value)) {
                isSubset = false;
                return;
            }
        });

        return isSubset;
    }


    /**
     * Returns a set that contains those members
     * of the first set that are not in the second
     * set
     * 
     * @param {Set} set 
     * @returns {Set}
     * 
     * @memberOf Set
     */
    difference(set) {
        const tempSet = new Set();

        this.inOrder((value) => {
            if (!set.contains(value)) {
                tempSet.add(value);
            }
        });

        return tempSet;
    }
}

module.exports = Set;