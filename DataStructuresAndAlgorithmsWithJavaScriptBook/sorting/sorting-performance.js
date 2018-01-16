const ArrayHelper = require('./array-helper');

// tests a sorting algorithm's time performance from the array helper class and prints time elapsed in milliseconds
const runSortingAlogirthm = (helper, methodToInvoke, cmp = undefined) => {
    const start = new Date().getTime();
    helper[methodToInvoke](cmp);
    const end = new Date().getTime();

    console.log(`${methodToInvoke} with ${helper.dataStore.length} elements, lasted ${end - start}`);
};

const testSortingPerformance = (dataSize, callback, methods, message, cmp = undefined) => {
    const helper = new ArrayHelper();

    methods.forEach(method => {
        const helper = new ArrayHelper(dataSize);
        callback(helper);
        runSortingAlogirthm(helper, method, cmp)
    });
};

const sortingMethodsNames = ['bubbleSort', 'selectionSort', 'insertionSort', 'shellSort', 'mergeSort', 'quickSort'];

/*1. Run the three algorithms discussed in this chapter with string data rather than
numeric data and compare the running times for the different algorithms. Are the
results consistent with the results of using numeric data? */
const sortWithStrings = () => {
    testSortingPerformance(1000, (helper) => {
        let strings = ['randomString', 'someOtherRandomString', 'moreRandomTextHere', 'andSomeMore'];
        for (let i = 0; i < 11; ++i) {
            strings = [...strings, ...strings];
        }

        helper.dataStore = strings;

    }, sortingMethodsNames, 'Sorting String values', (a, b) => {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }

        return 0;
    });
};

/* 2. Create an array of 1,000 integers already sorted into numeric order. Write a program
that runs each sorting algorithm with this array, timing each algorithm and com‐
paring the times. How do these times compare to the times for sorting an array in
random order? */
const sortAlreadySortedElements = () => {
    testSortingPerformance(1000, (helper) => {
        helper.setData();
        helper.mergeSort();
    }, sortingMethodsNames, 'Sorting already sorted data');
};

// sortAlreadySortedElements();