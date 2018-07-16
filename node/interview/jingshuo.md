[TOC]

### 一.Nodejs事件循环是什么？

Event loop

在进程启动时，Node会创建一个类似于while(true) 的循环，每执行一个循环体的过程我们称之为Tick。每个Tick的过程就是查看是否有事件需要处理。如果有，就取出事件以及其相关的回调函数。如果存在关联的回调函数，就执行它们。然后进入下一个循环，如果不再有事件处理，就退出进行。

​     ┌───────────────────────┐
┌>│        timers                                                                    │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks                                                           │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare                                                            │
│  └──────────┬────────────┘                     ┌───────────────┐
│  ┌──────────┴────────────┐                     │   incoming:                                     │
│  │         poll                                                                        │<─────┤  connections,                                 │
│  └──────────┬────────────┘                     │   data, etc.                                       │
│  ┌──────────┴────────────┐                     └───────────────┘
│  │        check                                                                     │
│  └──────────┬────────────┘
│   ┌──────────┴────────────┐
└─┤    close callbacks                                                         │
       └──────────────────────┘

* **timers 阶段:** 这个阶段执行setTimeout(callback) and setInterval(callback)预定的callback;
* **I/O callbacks 阶段: **This phase executes callbacks for some system operations such as types of TCP errors. For example if a TCP socket receives `ECONNREFUSED` when attempting to connect, some *nix systems want to wait to report the error. This will be queued to execute in the I/O callbacks phase;
* **idle, prepare 阶段:** 仅node内部使用;
* **poll 阶段: **获取新的I/O事件, 适当的条件下node将阻塞在这里;
* **check 阶段:** 执行setImmediate() 设定的callbacks;
* **close callbacks 阶段:** 比如socket.on(‘close’, callback)的callback会在这个阶段执行.2.GET和POST请求的区别



### 二.()=>{} 和 function的区别

箭头函数使用注意点：

1. 函数体内的 `this` 对象，是定时时所在的对象，而不是使用时所在的对象。

2. 不可以当做构造函数，也就是不能使用 `new` 命令，会报错：

   ```javascript
   TypeError: () => {} is not a constructor
   ```

3. 不可以使用 `arguments` 对象，该对象在函数体内不存在，如要要用，可以用rest参数代替

4. 不可以使用 `yiled` 命令，因此箭头函数不能用作 `Generator` 函数

### 三.如何解决回调地狱

1. 事件发布/监听模式 `events` 模块

   ```javascript
   const events = require('events');
   const eventEmitter = new events.EventEmitter();
   ```

2. `Promise` 第三方库，bluebird、Q

3. Generator

4. async / await

### 四.如何解决未捕捉的异常

1. try catch
2. domain模块

### 五.Promise的catch何时被触发？

1. 异步操作抛出错误，状态转为 `rejected`，就会调用 `catch` 方法指定的回调函数，处理这个错误
2. `then` 方法指定的回调函数，如果在运行中抛出错误，也会被 `cache` 方法捕捉

### 六.node项目部署

`shipit`

```javascript
module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    shipit.initConfig({
        default: {
            workspace: '/Users/yaoyixiang/Documents/workspace/shipit-test',
            deployTo: '/root/apps',
            repositoryUrl: 'https://github.com/CRAZYFAKE/shipit-test.git',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            deleteOnRollback: false,
            key: '',
            shallowClone: true
        },
        staging: {
            servers: [''],
            branch: 'master'
        }
    });
}
```

### 七.node libuv

![](https://images2015.cnblogs.com/blog/592743/201611/592743-20161111221753077-40148008.png)

### 八.es6 Generator 



### 八.闭包

```javascript
var foo = function () {
    var count = 0;
    return function () {
        return count += 1;
    }
};

var fn = foo();
console.log(fn()); // 1
console.log(fn()); // 2
console.log(fn(3));// 3
```

### 九.作用域考察

`````javascript
var person = {
    age: 18,
    say: function () {
        return this.age;
    }
}
var say = person.say;
console.log(person.say());  // 18
console.log(person.say(20));// 18
console.log(person.say({ age: 20 }));// 18
console.log(say());// undefined 因为this指向global
console.log(say.call(person));// 18
person.age += 1;
console.log(say.call(person));// 19
console.log(say.apply(person, [32]));// 19
`````

