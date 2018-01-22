class PriorityQueue {
    constructor(compareFunc) {
        this.compareFunc = compareFunc;
        this.heap = [];
        this.heap[0] = null;
    }

    get count() {
        return this.heap.length - 1;
    }

    get peek() {
        return this.heap[1];
    }

    get isEmpty() {
        return this.count === 0;
    }

    enqueue(element) {
        let index = this.heap.length;

        while (index > 1 && this.compareFunc(element, this.heap[Math.floor(index / 2)])) {
            this.heap[index] = this.heap[Math.floor(index / 2)];
            index = Math.floor(index / 2);
        }

        this.heap[index] = element;
    }

    dequeue() {
        const top = this.heap[1];
        const value = this.heap[this.heap.length - 1];

        this.heap.splice(this.heap.length - 1, 1);

        if (this.isEmpty) {
            return top;
        }

        const index = 1;

        this.heapifyDown(index, value);

        return top;
    }

    heapifyDown(index, value) {
        while (index * 2 + 1 < this.heap.length) {
            const smallerKidIndex =
                this.compareFunc(this.heap[index * 2], this.heap[index * 2 + 1]) ?
                index * 2 :
                index * 2 + 1;

            if (this.compareFunc(this.heap[smallerKidIndex], value)) {
                this.heap[index] = this.heap[smallerKidIndex];
                index = smallerKidIndex;
            } else {
                break;
            }
        }

        if (index * 2 < this.heap.length && this.compareFunc(this.heap[index * 2], value)) {
            this.heap[index] = this.heap[index * 2];
            index *= 2;
        }

        this.heap[index] = value;
    }
}

// testing heap
const heap = new PriorityQueue((a, b) => a < b);

const numbers = [2234, 3232, 432, 1231, 111, 44, 33, 22, 11, -4, 14];
numbers.forEach(n => {
    heap.enqueue(n);
});

const sorted = [];
while (!heap.isEmpty) {
    const dequeued = heap.dequeue();
    sorted.push(dequeued);
    console.log(dequeued);
}

console.log(sorted);