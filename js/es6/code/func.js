'use strict';

/**
 * 尾递归函数
 */
function factorial(n, total) {
    if (n === 1) {
        return total;
    }
    return factorial(n - 1, n * total);
}

console.log(factorial(5, 1)) // 120


function Fibonacci2(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) {
        return ac2
    };
    return Fibonacci2(n - 1, ac2, ac1 + ac2);
}

console.log(Fibonacci2(100)); // 89
console.log(Fibonacci2(1000));
console.log(Fibonacci2(10000));

