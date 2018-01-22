class Node {
    constructor(key, data) {
        this.key = key;
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class HashTable {
    constructor(size = 100) {
        this.maxBucketSize = size;
        this.buckets = [];
    }

    generateHashCode(value) {
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

        return hashCode;
    }

    getHashCode(value) {
        return this.generateHashCode(value) % this.maxBucketSize;
    }

    put(key, data, hashCode) {
        if (key === undefined) {
            throw new Error('Passed key cannot be undefined!');
        }

        const generateCodeFrom = hashCode === undefined ? key : hashCode;
        hashCode = this.getHashCode(generateCodeFrom);

        const newNode = new Node(key, data);

        if (this.buckets[hashCode] === undefined) {
            this.buckets[hashCode] = newNode;
        } else if (
            this.buckets[hashCode].next === null &&
            this.buckets[hashCode].key === key) {

            this.buckets[hashCode].data = newNode.data;
        } else {
            const first = this.buckets[hashCode];
            let current = first;

            while (current.next !== null && current.key !== key) {
                current = current.next;
            }

            if (current.key === key) {
                current.data = newNode.data;
                return;
            }

            current.next = newNode;
            newNode.prev = current;
        }
    }

    get(key, hashCode) {
        if (key === undefined) {
            throw new Error('Passed key cannot be undefined!');
        }

        const generateCodeFrom = hashCode === undefined ? key : hashCode;
        hashCode = this.getHashCode(generateCodeFrom);

        if (this.buckets[hashCode] === undefined) {
            return undefined;
        } else if (
            this.buckets[hashCode].next === null &&
            this.buckets[hashCode].key === key) {

            return this.buckets[hashCode].data;
        } else {
            const first = this.buckets[hashCode];
            let current = first;

            while (current.next !== null && current.key !== key) {
                current = current.next;
            }

            if (current.key !== key) {
                return undefined;
            }

            return current.data;
        }
    }

    remove(key, hashCode) {
        if (!key) {
            throw new Error('Passed key cannot be undefined!');
        }

        const generateCodeFrom = hashCode === undefined ? key : hashCode;
        hashCode = this.getHashCode(generateCodeFrom);

        if (this.buckets[hashCode] === undefined) {
            return false;
        } else if (
            this.buckets[hashCode].next === null &&
            this.buckets[hashCode].key === key) {

            delete this.buckets[hashCode];
            return true;
        } else {
            const first = this.buckets[hashCode];
            let current = this.buckets[hashCode];

            while (current.next !== null && current.key !== key) {
                current = current.next;
            }

            if (current.key !== key) {
                return false;
            }

            const prev = current.prev;
            const next = current.next;

            if (next) {
                next.prev = prev;
            }

            if (prev) {
                prev.next = next;
            }

            if (current === first) {
                this.buckets[hashCode] = first.next;
            }

            return true;
        }
    }
}

module.exports = HashTable;