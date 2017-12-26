const Queue = require('./queue');

const queues = Array.from({ length: 10 }).map(_ => new Queue());

const distribute = (numbers, queues, digit) => {
    numbers.forEach(n => {
        if (digit === 1) {
            queues[n % 10].enqueue(n);
        } else {
            queues[(n / 10) | 0].enqueue(n);
        }
    });
};

const collect = (queues) => {
    const numbers = [];

    queues.forEach(q => {
        while (!q.isEmpty()) {
            numbers.push(q.dequeue());
        }
    });

    return numbers;
};


// before radix sort => 45 72 93 51 21 16 70 41 27 31
// after radix sort => 16 21 27 31 41 45 51 70 72 93
const numbers = [45, 72, 93, 51, 21, 16, 70, 41, 27, 31];

const onesDist = distribute(numbers, queues, 1);
const onesCollected = collect(queues);

const tensDist = distribute(onesCollected, queues, 10);
const tensCollected = collect(queues);

console.log(tensCollected);