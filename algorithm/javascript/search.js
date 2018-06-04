/**
 * 二分查找
 * 数组从小到大排列
 */
function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;
    while (low <= high) {
        var middle = parseInt((low + high) / 2);
        if (arr[middle] == key) {
            return middle + 1;
        } else if (arr[middle] > key) {
            high = middle - 1;
        } else if (arr[middle] < key) {
            low = middle + 1;
        } else {
            return -1;
        }
    }
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binary_search(arr, 5));