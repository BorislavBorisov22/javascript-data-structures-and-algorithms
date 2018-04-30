const defaultComparator = (a, b) => a - b;

class BinaryHeap {
    constructor(cmp) {
        this.cmp = cmp || defaultComparator;
        this.size = 0;
        this.data = [null];
    }

    insert(value) {
        if (typeof value === 'undefined') {
            throw new TypeError('Passed value must be defined');
        }

        let index = this.data.length;

        while (parseInt(index / 2) > 0 && this.cmp(value, this.data[parseInt(index / 2)]) < 0) {
            this.data[index] = this.data[parseInt(index / 2)];
            index = parseInt(index / 2);
        }

        this.data[index] = value;
        this.size++;
    }

    removeTop() {
        if (this.isEmpty) {
            throw new Error('No elements to remove from heap!');
        }

        const returnValue = this.data[1];
        const value = this.data[this.data.length - 1];
        this.data.splice(this.data.length - 1, 1);
        this.size--;

        let index = 1;
        while (index * 2 + 1 < this.data.length) {
            let smallerKidIndex = this.cmp(this.data[index * 2], this.data[index * 2 + 1]) < 0 ?
                index * 2 : index * 2 + 1;

            const compareResult = this.cmp(value, this.data[smallerKidIndex]);
            if (compareResult > 0) {
                this.data[index] = this.data[smallerKidIndex];
                index = smallerKidIndex;
            } else {
                break;
            }
        }

        if (index * 2 < this.data.length) {
            let smallerKidIndex = index * 2;
            const compareResult = this.cmp(value, this.data[smallerKidIndex]);

            if (compareResult > 0) {
                this.data[index] = this.data[smallerKidIndex];
                index = smallerKidIndex;
            }
        }

        this.data[index] = value;

        return returnValue;
    }

    get top() {
        if (this.isEmpty) {
            throw new Error('Binary heap is empty!');
        }

        return this.data[1];
    }

    get isEmpty() {
        return this.size === 0;
    }
}

module.exports = BinaryHeap;