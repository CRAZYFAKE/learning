'use strict';

/**
 * 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
 * 从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。
 */

/**
 * （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。
 * 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
 *
 * （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。
 * 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，
 * 事件的特点是，如果你错过了它，再去监听，是得不到结果的。
 */

{
    var promise = new Promise(function (resolve, reject) {
        //两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。
        // ... some code
        if (1/* 异步操作成功 */) {
            resolve(value);
        } else {
            reject(error);
        }
    });
    /**
     * Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
     * 
     * then方法可以接受两个回调函数作为参数
     * 第一个回调函数是Promise对象的状态变为Resolved时调用
     * 第二个回调函数是Promise对象的状态变为Reject时调用。其中，第二个函数是可选的，不一定要提供。
     */
    promise.then(function (value) {
        // success
    }, function (error) {
        // failure
    });
}

{
    //简单例子
    let promise = new Promise(function (resolve, reject) {
        console.log('Promise');
        resolve('return params');
    });
    promise.then(function (re) {
        console.log(re);
        console.log('Resolved.');
    });
    console.log('Hi!');
}

/**
 * 使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法。
 * @param url 图片链接
 */
function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();

        image.onload = function () {
            resolve(image);
        };

        image.onerror = function () {
            reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    });
}

{
    var p1 = new Promise(function (resolve, reject) {
        resolve('呵呵呵呵');
    })

    p1.then(re => {
        console.log('Promise1 : ' + re);
        return re;
    }).then(name => {
        console.log('Promise2 : ' + name);
        return name;
    }).then(name => {
        console.log('Promise3 : ' + name);
        return name;
    }).then(name => {
        console.log('Promise4 : ' + name);
        res.status(200);
        res.json('name : ' + name);
    });
}

{
    /**
     * Promise.all()
     * 
     * var p = Promise.all([p1, p2, p3]);
     * p的状态由p1、p2、p3决定，分成两种情况。
     * （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
     * （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
     */
    let p1 = new Promise(function (resolve, reject) {
        resolve('Promise : p1');
    });
    let p2 = new Promise(function (resolve, reject) {
        // reject('Promise : p2');
        resolve('Promise : p2');
    });
    let p3 = new Promise(function (resolve, reject) {
        resolve('Promise : p3');
    });
    let p = Promise.all([p1, p2, p3]).then(resolve => {
        console.log(resolve);
    }, reject => {
        console.log(reject);
    });
}

{
    /**
     * done() § ⇧
     * Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到
     * （因为Promise内部的错误不会冒泡到全局）.因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错
     * 
     */
    //实现方法
    Promise.prototype.done = function (onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected)
            .catch(function (reason) {
                // 抛出一个全局错误
                console.log(reason);
                setTimeout(() => { throw reason }, 0);
            });
    };

    var p1 = new Promise(function (resolve, reject) {
        resolve('呵呵呵呵');
    })

    p1.then(re => {
        console.log('Promise11 : ' + re);
        return re;
    }).then(name => {
        s = 2;
        console.log('Promise22 : ' + name);
        return name;
    }).then(name => {
        console.log('Promise33 : ' + name);
        res.status(200);
        res.json('name : ' + name);
    })/*.done()*/;
}

{
    /**
     * finally() § ⇧
     * 
     * finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。
     * 它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。
     */
    //实现方法
    Promise.prototype.finally = function (callback) {
        let P = this.constructor;
        return this.then(
            value => P.resolve(callback()).then(() => value),
            reason => P.resolve(callback()).then(() => { throw reason })
        );
    };
    let p1 = new Promise(function (resolve, reject) {
        console.log('呵呵呵呵');
        resolve('呵呵呵呵');
    });
    p1.then(result => {
        resolve()
    }).finally('finally');
}


