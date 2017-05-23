// ES6严格模式
'use strict';
{
    let a = 10;
    var b = 1;
}
// console.log(a) // ReferenceError: a is not defined.
console.log(b) // 1





/**
 * 不存在变量提升
 */
console.log(foo); // 输出undefined
// console.log(bar); // 报错ReferenceError
var foo = 2;
let bar = 2;




/**
 * 暂时性死区 § ⇧
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
 * 
 */
var tmp = 123;
if (true) {
    // TDZ开始
    //   tmp = 'abc'; // ReferenceError
    //   console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}




/**
 * 不允许重复声明 § ⇧
let不允许在相同作用域内，重复声明同一个变量。
 */
// function func(arg) {
//   let arg; // 报错
// }
function func(arg) {
    {
        let arg; // 不报错
    }
}




/**
 * ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
 * 但在ES6引入了块级作用域，明确允许在块级作用域之中声明函数。
 */
function f() { console.log('I am outside!'); }
if (true) {
    function f() { console.log('I am inside!'); }
    f();
}
f();
// 不报错




/**
 * 1.允许在块级作用域内声明函数。
 * 2.函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
 * 3.同时，函数声明还会提升到所在的块级作用域的头部。
 * 注意，上面三条规则只对ES6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。
 */