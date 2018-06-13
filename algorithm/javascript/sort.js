var array = [
    4, -5, 6, 8, -9
];

/**
 * 冒泡排序
 */
function bubbleSort(arr) {
    var length = arr.length;
    var flag = true;
    for (var i = 0; i < length - 1; i++) {
        for (var j = 0; j < length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = false;
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
        if (flag) {
            break;
        }
    }
    console.log(arr);
    return arr;
}
// bubbleSort(array);

/**
 * 选择排序
 */
function selectSort(array) {
    var length = array.length;
    var minIndex, tmp;
    for (var i = 0; i < length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            tmp = array[minIndex];
            array[minIndex] = array[i];
            array[i] = tmp;
        }
    }
    console.log(array)
}
// selectSort(array);

/**
 * 插入排序
 */
function insertSelect(arr) {
    for (var i = 1; i < arr.length; i++) {
        var key = arr[i];
        var j = i - 1;
        while (arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    console.log(arr);
}
// insertSelect(array);

/**
 * 希尔排序
 */
function shellSort(arr) {

}

/**
 * 归并排序
 */
function mergeSort(arr) {//采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }
    return result;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
// console.log(mergeSort(arr))

var quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var middleIndex = Math.floor(arr.length / 2);
    var middle = arr.splice(middleIndex, 1)[0]
    var left = []
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < middle) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([middle], quickSort(right));
};
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(arr));