'use strict';

/**
 * Array.from方法用于将两类对象转为真正的数组：
 * 类似数组的对象（array-like object）和可遍历（iterable）的对象
 *（包括ES6新增的数据结构Set和Map）。
 */
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log(arr2);

let namesSet = new Set(['a', 'b'])
let arr3 = Array.from(namesSet) // ['a', 'b']
console.log(arr3);



//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
let a1 = Array.from([1, 2, 3], (x) => x * x);
console.log(a1);

//将数组中布尔值为false的成员转为0。
let a2 = Array.from([1, , 2, , 3], (n) => n || 0);
console.log(a2);

//返回各种数据的类型。
function typesOf() {
    return Array.from(arguments, value => typeof value)
}
console.log(typesOf(null, [], NaN));

/**
 * 2.Array.of() § ⇧
 * Array.of方法用于将一组值，转换为数组。
 * 弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
 */

/**
 * 3.copyWithin() § ⇧
 * 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），
 * 然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
 * 三个参数：
 * target（必需）：从该位置开始替换数据。
 * start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
 * end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
 */
let arr1 = [1, 2, 3, 4, 5];
arr1.copyWithin(0, 3);
console.log(arr1);

/**
 * 4.find()和findIndex() § ⇧
 * 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
 * 
 */
console.log([1, 4, -5, 10].find((n) => n < 0)); //-5
console.log([1, 4, -5, 10].findIndex((n) => n < 0)); //2
console.log([1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
})); // 10
console.log([1, 5, 10, 15].findIndex(function (value, index, arr) {
    return value > 9;
})); // 2


/**
 * 5.fill()
 * fill方法使用给定值，填充一个数组。
 */
let b = ['a', 'b', 'c'].fill(7);// [7, 7, 7]
console.log(b)
let b1 = new Array(3).fill(7);// [7, 7, 7]
console.log(b1)
//fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
let b2 = ['a', 'b', 'c'].fill(7, 1, 2);// ['a', 7, 'c']
console.log(b2);


/**
 * 6.entries()，keys()和values() § ⇧
 */
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

/**
 * 7.includes()
 * Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
 * 该方法属于ES7，但Babel转码器已经支持。
 */
//简易版本
const contains = (() =>
    Array.prototype.includes
        ? (arr, value) => arr.includes(value)
        : (arr, value) => arr.some(el => el === value)
)();
contains(["foo", "bar"], "baz"); // => false

/**
 * 8.数组的空位
 */