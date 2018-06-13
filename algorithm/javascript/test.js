function merge(left, right) {
	var result = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
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

function mergeSort(arr) {
	var length = arr.length;
	if (length < 2) {
		return arr;
	}
	var middle = Math.floor(length / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle);
	return merge(mergeSort(left), mergeSort(right));
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr))

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
}

console.log(quickSort(arr))