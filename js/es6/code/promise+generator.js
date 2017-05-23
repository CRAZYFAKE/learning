/**
 * 使用Generator函数管理流程
 */
function getFoo() {
    return new Promise(function (resolve, reject) {
        resolve('foo');
    });
}
function getBar() {
    return new Promise(function (resolve, reject) {
        resolve('bar');
    });
}
var g = function* () {
    try {
        var foo = yield getFoo();
        var bar = yield getBar();
        // console.log(foo);
        // console.log(bar);
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
            console.log(value);
            return go(it.next(value));
        }, function (error) {
            return go(it.throw(error));
        });
    }

    go(it.next());
}
run(g);


// var x = 1;

// function f(m){
//   return m * 2;
// }

// var xx = f(x + 5)
// console.log(xx)


var y = 1;
function f(a, b){
    console.log(a)
    console.log(b)
  return b;
}

f(y + 3, y);