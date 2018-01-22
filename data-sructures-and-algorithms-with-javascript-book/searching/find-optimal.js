/**
 * Performs sequential search for an optimal value based on the provided cmp function
 * Complexity: O(n)
 * 
 * @param {Array} arr The array to search through
 * @param {Function} cmp Optional. A function that defines an
 * alternative comparison. The function should return a negative when first argument is not as optimal as the second,
 * zero, when the two arguments are considered equal
 * and a positive is the first argument is more optimal
 * @returns {any} The optimal value if found, or null if not found
 * 
 * @memberOf ArrayHelper
 */
const findOptimal = (arr, cmp) => {
    if (!Array.isArray(arr)) {
        throw new Error('Provided arr parameter must be of type array!');
    }

    if (typeof cmp !== 'function' || cmp.length < 2) {
        throw new Error('Passed cmp parameter must be a comparison function accepting two arguments!');
    }

    if (arr.length < 1) {
        return null;
    }

    return arr.reduce((prevOptimal, current) => {
        return cmp(current, prevOptimal) > 0 ? current : prevOptimal;
    }, arr[0]);
};

module.exports = findOptimal;
