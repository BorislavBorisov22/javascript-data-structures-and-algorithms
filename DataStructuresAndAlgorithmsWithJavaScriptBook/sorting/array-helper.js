const defaultComparator = (a, b) => {
    return a - b;
}

/**
 * Array wrapper class that provides random numbers insertion in the array
 * and executes different sorting algorithms on the underlying array. 
 * 
 * @class ArrayHelper
 */
class ArrayHelper {
    constructor(elementsCount) {
        this.elementsCount = elementsCount;
        this.dataStore = Array.from({ length: this.elementsCount });
    }

    /**
     * Fills the array size with random numbers between 1 and
     * the total number of elements
     * 
     * @memberOf ArrayHelper
     */
    setData() {
        this.dataStore = this.dataStore.map(_ => {
            return Math.floor(Math.random() * this.elementsCount + 1);
        });
    }

    /**
     * Clears all values currently in  the array
     * 
     * 
     * @memberOf ArrayHelper
     */
    clear() {
        this.dataStore = this.dataStore.map(_ => 0);
    }


    /**
     * Adds element to the array
     * 
     * @param {any} element element to be added 
     * 
     * @memberOf ArrayHelper
     */
    insert(element) {
        this.dataStore.push(element);
    }


    /**
     * Prints out the values in the array (10 values on a single line)
     * 
     * @returns {String} 
     * 
     * @memberOf ArrayHelper
     */
    toString() {
        let result = '';
        this.dataStore.forEach((element, index) => {
            result += `${element} `;
            if (index > 0 && index % 10 === 0) {
                result += '\n';
            }
        });

        return result;
    }

    /**
     * Determines wheter the array is sorted or not.
     * 
     * @param {Function} cmp Optional. . A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @returns {Bool} Wheter the array is sorted or not.
     * 
     * @memberOf ArrayHelper
     */
    isSorted(cmp) {
        cmp = cmp || defaultComparator;

        for (let i = 1; i < this.dataStore.length; i++) {
            if (cmp(this.dataStore[i] < this.dataStore[i - 1]) < 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Swaps the elements values at the provided indeces
     * 
     * @param {Array} arr 
     * @param {Number} firstIndex 
     * @param {Number} secondIndex 
     * 
     * @memberOf ArrayHelper
     */
    swap(arr, firstIndex, secondIndex) {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
    }

    /**
     * Bubble sort algorithm
     * Complexity: O(n^2)
     * 
     * @param {Function} cmp Optional. . A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    bubbleSort(cmp) {
        cmp = cmp || defaultComparator;

        for (let i = this.dataStore.length; i > 1; i--) {
            for (let j = 0; j < i - 1; j++) {
                if (cmp(this.dataStore[j], this.dataStore[j + 1]) > 0) {
                    this.swap(this.dataStore, j, j + 1);
                }
            }
        }
    }

    /**
     * Selection sort algorithm
     * Complexity: O(n^2)
     * 
     * @param {Function} cmp Optional. . A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    selectionSort(cmp) {
        cmp = cmp || defaultComparator;

        for (let i = 0; i < this.dataStore.length; i++) {
            let smallestIndex = i;
            for (let j = i + 1; j < this.dataStore.length; j++) {
                if (cmp(this.dataStore[j], this.dataStore[smallestIndex]) < 0) {
                    smallestIndex = j;
                }
            }

            if (smallestIndex !== i) {
                this.swap(this.dataStore, i, smallestIndex);
            }
        }
    }

    /**
     * Insertion sort algorithm
     * Complexity: O(n^2)
     * 
     * @param {Function} cmp Optional. A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    insertionSort(cmp) {
        cmp = cmp || defaultComparator;

        for (let index = 1; index < this.dataStore.length; index++) {
            const element = this.dataStore[index];
            let i = index;
            while (i > 0 && cmp(this.dataStore[i - 1], element) > 0) {
                this.dataStore[i] = this.dataStore[i - 1];
                i--;
            }

            this.dataStore[i] = element;
        }
    }

    /**
     * Shellsort which uses the gaps 5,3,1 and
     * insertion sort to sort sub-arrays which match for the different gaps.
     * 
     * @param {Function} cmp Optional. A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    shellSort(cmp) {
        this.gaps = [5, 3, 1];
        for (var g = 0; g < this.gaps.length; ++g) {
            for (var i = this.gaps[g]; i < this.dataStore.length; ++i) {
                var temp = this.dataStore[i];
                for (var j = i; j >= this.gaps[g] &&
                    this.dataStore[j - this.gaps[g]] > temp; j -= this.gaps[g]) {
                    this.dataStore[j] = this.dataStore[j - this.gaps[g]];
                }
                this.dataStore[j] = temp;
            }
        }
    }
}

const helper = new ArrayHelper(0);
const numbers = [3, 1, 15, 0, 19, 3];
numbers.forEach(n => helper.insert(n));
console.log(helper.dataStore, 'before');
helper.shellSort();
console.log(helper.dataStore, 'after');

module.exports = ArrayHelper;