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