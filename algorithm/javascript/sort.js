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

bubbleSort(array);