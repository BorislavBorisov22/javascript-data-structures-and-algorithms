const ArrayHelper = require('./array-helper');

// tests a sorting algorithm's time performance from the array helper class and prints time elapsed in milliseconds
const testSortingPerformance = (helper, methodToInvoke) => {
    const start = new Date().getTime();
    helper[methodToInvoke]();
    const end = new Date().getTime();

    console.log(`${methodToInvoke} with ${helper.dataStore.length} elements, lasted ${end - start}`);
};

const methods = ['bubbleSort', 'selectionSort', 'insertionSort'];
methods.forEach(method => {
    const helper = new ArrayHelper(10000);
    testSortingPerformance(helper, method)
});