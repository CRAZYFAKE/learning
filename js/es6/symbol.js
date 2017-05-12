'use strict';

/**
 * Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
 */
let s = Symbol();
console.log(s)
console.log(typeof s)// "symbol"

var s1 = Symbol('foo');
var s2 = Symbol('bar');
console.log(s1) // Symbol(foo)
console.log(s2) // Symbol(bar)
console.log(s1.toString()) // "Symbol(foo)"
console.log(s2.toString()) // "Symbol(bar)"


//注意，Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
console.log(s1 === s2);
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false
console.log(s1 === s2);

//Symbol值不能与其他类型的值进行运算，会报错。

/**
 * 作为属性名的Symbol § ⇧
 * 
 */