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
     * @param {Function} cmp Optional. A function that defines an
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
     * @param {Function} cmp Optional. A function that defines an
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
     * @param {Function} cmp Optional. A function that defines an
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
     * Shellsort algorithm
     * Complexity: O((nlog(n))^2)
     * 
     * @param {Function} cmp Optional. A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    shellSort(cmp) {
        cmp = cmp || defaultComparator;

        let gap = 1;
        while (gap < this.dataStore.length / 3) {
            gap = 3 * gap + 1;
        }

        while (gap >= 1) {
            for (let index = gap; index < this.dataStore.length; index++) {
                let element = this.dataStore[index];
                let i = index;

                while (i - gap >= 0 && cmp(element, this.dataStore[i - gap]) < 0) {
                    this.dataStore[i] = this.dataStore[i - gap];
                    i -= gap;
                }

                this.dataStore[i] = element;
            }

            gap = (gap - 1) / 3;
        }
    }

    /**
     * Merge sort algorithm.
     * Complexity: O(nlog(n))
     * 
     * @param {Function} cmp Optional. A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    mergeSort(cmp) {
        // array with less than two elements is considered to be already sorted.
        if (this.dataStore.length < 2) {
            return;
        }

        cmp = cmp || defaultComparator;

        for (let step = 1; step < this.dataStore.length; step *= 2) {
            let left = 0;
            let right = step;

            while (right + step <= this.dataStore.length) {
                this._mergeArrays(this.dataStore, left, right, right + step, cmp);
                left = right + step;
                right = left + step;
            }

            if (right < this.dataStore.length) {
                this._mergeArrays(this.dataStore, left, right, this.dataStore.length, cmp);
            }
        }
    }

    /**
     * Divides and sort merges two subarray of given array
     * 
     * @param {any} arr The array that should have it's subarrays sorted
     * @param {any} startIndex the start index of the first subarray
     * @param {any} middleIndex the start index of the second subarray
     * @param {any} stopIndex the end index (excluded) of the second subarray 
     * @param {any} cmp  A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    _mergeArrays(arr, startIndex, middleIndex, stopIndex, cmp) {
        const leftArr = Array.from({ length: middleIndex - startIndex + 1 });
        const rightArr = Array.from({ length: stopIndex - middleIndex + 1 });

        let index = startIndex;
        for (let i = 0; i < leftArr.length - 1; ++i) {
            leftArr[i] = arr[index];
            ++index;
        }

        index = middleIndex;
        for (let i = 0; i < rightArr.length - 1; ++i) {
            rightArr[i] = arr[index];
            ++index;
        }

        leftArr[leftArr.length - 1] = Infinity;
        rightArr[rightArr.length - 1] = Infinity;

        let leftArrIndex = 0;
        let rightArrIndex = 0;

        for (let i = startIndex; i < stopIndex; ++i) {
            if (cmp(leftArr[leftArrIndex], rightArr[rightArrIndex]) <= 0) {
                arr[i] = leftArr[leftArrIndex];
                ++leftArrIndex;
            } else {
                arr[i] = rightArr[rightArrIndex];
                ++rightArrIndex;
            }
        }
    }

    /**
     * Quicksort algorithm
     * Complexity: O(nlog(n))
     * 
     * @public
     * @param {Function} cmp Optional. A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    quickSort(cmp) {
        cmp = cmp || defaultComparator;
        this.dataStore = this._quickSort(this.dataStore, cmp);
    }

    /**
     * Quicksort algorithm
     * Complexity: O(nlog(n))
     * 
     * @private
     * @param {Array} arr The array to be sorted
     * @param {Function} cmp Optional. A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments
     * 
     * @memberOf ArrayHelper
     */
    _quickSort(arr, cmp) {
        if (arr.length < 2) {
            return arr;
        }

        const lessThanPivot = [];
        const greaterThanPivot = [];

        const pivot = arr[0];

        for (let i = 1; i < arr.length; ++i) {
            if (cmp(arr[i], pivot) < 0) {
                lessThanPivot.push(arr[i]);
            } else {
                greaterThanPivot.push(arr[i]);
            }
        }

        return this._quickSort(lessThanPivot, cmp).concat(pivot, this._quickSort(greaterThanPivot, cmp));
    }
}

module.exports = ArrayHelper;