const defaultComparator = (a, b) => a - b;

/**
 * Performs binary search on provided sorted data and compare function
 * Complexity: O(log(n))
 * 
 * @param {Array} arr The array to search through
 * @param {Function} cmp Optional. A function that defines an
 * alternative comparison. The function should return a negative when first argument is not as optimal as the second,
 * zero, when the two arguments are considered equal
 * and a positive is the first argument is more optimal
 * @returns {Number} The index of the target data value of -1 if none
 * 
 * @memberOf ArrayHelper
 */
const binarySearch = (arr, targetData, cmp) => {
    if (!Array.isArray(arr)) {
        throw new Error('Passed arr parameter must be of type array!');
    }

    if (typeof targetData === 'undefined') {
        throw new Error('Passed targetData param is undefined!');
    }

    cmp = cmp || defaultComparator;

    let lowerBoundIndex = 0;
    let upperBoundIndex = arr.length - 1;
    while (lowerBoundIndex <= upperBoundIndex) {
        const middleIndex = Math.floor((lowerBoundIndex + upperBoundIndex) / 2);

        const compareResult = cmp(targetData, arr[middleIndex]);
        if (compareResult === 0) {
            return middleIndex;
        } else if (compareResult > 0) {
            lowerBoundIndex = middleIndex + 1;
        } else {
            upperBoundIndex = middleIndex - 1;
        }
    }

    return - 1;
}

module.exports = binarySearch;
