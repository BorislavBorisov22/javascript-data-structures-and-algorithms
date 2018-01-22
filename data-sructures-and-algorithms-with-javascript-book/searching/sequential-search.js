const defaultComparator = (a, b) => a - b;

/**
 * Performs sequential search for a specific item through the provided array
 * Complexity: O(n)
 * 
 * @param {Array} arr The array to search through
 * @param {any} data the target data value to search for
 * @param {Function} cmp Optional. A function that defines an
 * alternative comparison. The function should return a negative,
 * zero, or positive value, depending on the arguments
 * @returns {Number} The index of the target data of -1 if target data
 * is not present in the array
 * 
 * @memberOf ArrayHelper
 */
const sequentialSearch = (arr, targetData, cmp) => {
    if (!Array.isArray(arr)) {
        throw new Error('Passed arr parameter must be of type array!');
    }

    if (typeof targetData === 'undefined') {
        throw new Error('Passed targetData param is undefined!');
    }

    cmp = cmp || defaultComparator;

    for (let i = 0; i < arr.length; ++i) {
        if (cmp(arr[i], targetData) === 0) {
            return i;
        }
    }

    return -1;
};

module.exports = sequentialSearch;
