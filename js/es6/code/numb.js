0b111110111 === 503 // true
0o767 === 503 // true

// Number.isFinite()用来检查一个数值是否为有限的（finite）
// Number.isNaN()用来检查一个值是否为NaN
console.log(Number.isFinite(15)); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// ES6的写法
console.log(Number.parseInt('12.34')) // 12
console.log(Number.parseFloat('123.45#')) // 123.45


//es6 极小变量
console.log(Number.EPSILON);
console.log(Number.EPSILON.toFixed(20));

/**
 * 极小值可以用来设置 能够接受的误差范围
 * 设置一个非常小的值, 如果两个数的差小于这个值, 那么可以认为这两个值相等
 **/
0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17
// 很明显 0.1 + 0.2 不等于 0.3, 我们可以通过上面的方法来检测误差
function withinErrorMargin (left, right) {
	return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3); //true
1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true


//es6 变量范围Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

//Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
console.log(Number.isSafeInteger('a')) // false
console.log(Number.isSafeInteger(null)) // false
console.log(Number.isSafeInteger(NaN)) // false
console.log(Number.isSafeInteger(Infinity)) // false
console.log(Number.isSafeInteger(-Infinity)) // false
console.log(Number.isSafeInteger(3)) // true
console.log(Number.isSafeInteger(1.2)) // false
console.log(Number.isSafeInteger(9007199254740990)) // true
console.log(Number.isSafeInteger(9007199254740992)) // false
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)) // false
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)) // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)) // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)) // false

console.log(Math.trunc(4.1111111111111111));