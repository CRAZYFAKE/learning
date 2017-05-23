// 'use strict';
/**
 * Generator函数是一个普通函数，但是有两个特征。
 * 一是，function关键字与函数名之间有一个星号；
 * 二是，函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）。
 */

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())

function* gen() {
    yield 123 + 456;
    return 'done';
}
var ge = gen();
console.log(ge.next())
console.log(ge.next())

function* f() {
    console.log('1秒后，执行的')
}
function f1() {
    console.log('立即执行');
}

var generator = f();
var ordinary = f1();
setTimeout(function () {
    // generator.next();
}, 1000);

{
    function* foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        return 6;
    }
    for (let v of foo()) {
        console.log(v);
    }
}

function getFoo() {
    return new Promise(function (resolve, reject) {
        resolve('foo');
    });
}

var g = function* () {
    try {
        var foo = yield getFoo();
        console.log(foo);
    } catch (e) {
        console.log(e);
    }
};

function run(generator) {
    var it = generator();
    function go(result) {
        if (result.done) {
            return result.value;
        }
        return result.value.then(function (value) {
            return go(it.next(value));
        }, function (error) {
            return go(it.throw(error));
        });
    }
    go(it.next());
}

run(g);