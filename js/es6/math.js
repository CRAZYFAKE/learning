'use strict';
//ES6在Math对象上新增了17个与数学相关的方法。所有这些方法都是静态方法，只能在Math对象上调用。

/**
 * 1.Math.trunc § ⇧
 * 方法用于去除一个数的小数部分，返回整数部分。
 * 对于非数值，Math.trunc内部使用Number方法将其先转为数值。
 */
console.log(Math.trunc(3.1415926));
console.log(Math.trunc('3.1415926'));
//对于空值和无法截取整数的值，返回NaN。
console.log(Math.trunc(NaN));      // NaN
console.log(Math.trunc('foo'));    // NaN
console.log(Math.trunc());         // NaN


/**
 * 2.Math.sign § ⇧
 * 方法用来判断一个数到底是正数、负数、还是零。
 * 它会返回五种值。
 * 参数为正数，返回+1；
 * 参数为负数，返回-1；
 * 参数为0，返回0；
 * 参数为-0，返回-0;
 * 其他值，返回NaN。
 */
console.log(Math.sign(-5)); //-1

/**
 * 3.Math.cbrt § ⇧
 * 方法用于计算一个数的立方根。
 * 对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值。
 */
console.log(Math.cbrt(2));
console.log(Math.cbrt('8'));
console.log(Math.cbrt('hello world'));

/**
 * 4.Math.clz32() § ⇧
 * JavaScript的整数使用32位二进制形式表示，Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。
 */
console.log(Math.clz32(1));


/**
 * 5.Math.imul() § ⇧
 * Math.imul方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。
 */
console.log(Math.imul(2, 3));
console.log(Math.imul(-2, -3));
console.log(Math.imul(-2, 3));

/**
 * 6.Math.fround() § ⇧
 * Math.fround方法返回一个数的单精度浮点数形式。
 */
console.log(Math.fround(1.337)); //1.3370000123977661

/**
 * 7.Math.hypot() § ⇧
 * Math.hypot方法返回所有参数的平方和的平方根。
 */
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

/**
 * 8.Math.expm1()
 * Math.expm1(x)返回ex - 1，即Math.exp(x) - 1。
 */
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045

/**
 * 9.Math.log1p()
 *  Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
 */
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN

/**
 * 10.Math.log10()
 * Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN。
 */
console.log(Math.log10(2))
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5

/**
 * 11.Math.log2()
 * Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN。
 */
console.log(Math.log2(3));
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29

/**
 * 12 - 17.
 * Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
 * Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
 * Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
 * Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
 * Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
 * Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
 */
console.log(Math.sinh(1));