[TOC]

### Nodejs

#### 1. 面向对象特征，怎么理解js的封装继承和多态

原型链

#### 2. 怎么让变量私有化

第一种: 

```javascript
function car(){ 
    var wheel = 3; //私有变量 
    this.wheel = 4; //公有变量 
    alert(wheel); 
    alert(this.wheel); 
} 
var car1 = new car(); //结果是：3 4
```

#### 3. js怎样实现单线程机制（事件循环队列）

#### 4. 什么是闭包

闭包就是能够读取其他函数内部变量的函数。

闭包就是将函数内部和函数外部连接起来的一座桥梁

闭包用途: 

1) 可以读取函数内部的变量

2) 让这些变量的值始终保存在内存中

#### 5. this相关问题，如何手动实现函数的bind方法，什么场景下用apply

this问题：

call和apply方法都是在调用之后立即执行的。而bind调用之后是返回原函数，需要再调用一次才行

应用apply：

改变this指向，实现继承，实现柯里化（把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数）

#### 6. 如何判断一个变量是数组，如何判断一个对象是object（不能是null）

判断数组：

1. 

```javascript
function isArrayFn (o) { 
	return Object.prototype.toString.call(o) === '[object Array]'; 
} 
```

2. 

```javascript
Array.isArray()
```

#### 7.如何处理异步回调，如何实现一个Promise， co模块实现原理

co模块原理：自动执行 generator 函数

Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。

（1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

（2）Promise 对象。将异步操作包装成 Promise 对象，用`then`方法交回执行权。

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的`yield`命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co

#### 8. 什么是函数式编程，什么是偏函数与柯里化？

函数式编程：

此处的函数的意义是指数学上的函数

偏函数：创建一个调用另外一个部分-----参数或变量已经预置的函数-----的函数

```javascript
var toString = Object.prototype.toString;
var isString = function(obj){
    return toString.call(obj) == '[object String]';
}
var isFunction = function(obj){
    return toString.call(obj) == '[object Function]';
}
```

如果需要判断的对象类型很多，那么isXXX一个一个写，代码繁冗。

这时候我们可以观察上面几个isXXX的规律，发现都是用传入的对象执行toString()来判断类型。

这时候，我们引入一个新的函数：

```javascript
var isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) == '[object ' + type + ']';
    }
}
```

这种通过指定部分参数来产生一个新的定制函数的形式就是偏函数。

柯里化：将一个低阶函数转换为高阶函数的过程就叫柯里化，简单理解是：传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

#### 9. ES6相关特性

1. [let 和 const 命令](http://es6.ruanyifeng.com/#docs/let)
2. [变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)
3. [数值的扩展](http://es6.ruanyifeng.com/#docs/number)
4. [函数的扩展](http://es6.ruanyifeng.com/#docs/function) 箭头函数
5. [数组的扩展](http://es6.ruanyifeng.com/#docs/array)
6. [Set 和 Map 数据结构](http://es6.ruanyifeng.com/#docs/set-map)
7. [Promise 对象](http://es6.ruanyifeng.com/#docs/promise)
8. [Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)
9. [Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)

#### 10. 比较一下js与其他语言的优缺点

优点：



缺点：

### Nodejs层面

#### 1. 应用什么框架（express/koa/koa2/egg等），并阐述此框架的优缺点

koa和express：

1. koa的中间件洋葱图，所有的请求经过一个中间件的时候都会执行两次，对比 Express 形式的中间件，Koa 的模型可以非常方便的实现后置处理逻辑
2. Express 只有 Request 和 Response 两个对象不同，Koa 增加了一个 Context 的对象，作为这次请求的上下文对象
3. 通过同步方式编写异步代码带来的另外一个非常大的好处就是异常处理非常自然，使用 `try catch` 就可以将按照规范编写的代码中的所有错误都捕获到

egg：

1. Egg 1.x 发布时，Node.js 的 LTS 版本尚不支持 async function，所以 Egg 1.x 仍然基于 Koa 1.x 开发，但是在此基础上，Egg 全面增加了 async function 的支持，再加上 Egg 对 Koa 2.x 的中间件也完全兼容，应用层代码可以完全基于 `async function` 来开发
2. Node.js 8 正式进入 LTS 后，async function 可以在 Node.js 中使用并且没有任何性能问题了，Egg 2.x 基于 Koa 2.x，框架底层以及所有内置插件都使用 async function 编写

#### 2. node的web框架如何实现中间件

https://zhuanlan.zhihu.com/p/30384677

https://cnodejs.org/topic/58824b20250bf4e2390e9e59

#### 3. 如何进行流式编程，如何实现一个可读可写流，pipe方法的原理是什么

#### 4. node如何进行错误处理

#### 5. 代码框架如何分层

#### 6. node优缺点，v8垃圾回收机制（新生代和老生代区别）以及v8内存限制问题

#### 7. 如何部署node，pm2或者forever优缺点

#### 8. node如何跨系统实现事件循环机制

#### 9. node单线程，挂掉如何处理

#### 10 nodejs的日志管理，是否了解ELK

### 设计模式

#### 1.观察者模式

#### 2.代理模式

#### 3.单例模式

### 网络协议

#### 1 tcp三次握手和四次挥手

#### 2 网络七层模型和五层模型

#### 3 tcp与http的关系

#### 4 https和http的区别

#### 5 了解代理、缓存等，CDN原理等

#### 6 http安全验证的几种方式

#### 7 http缓存相关协议头，私有缓存和公共缓存等。什么是协商缓存，请求头带if什么意思，Etag做什么用的

#### 8 了解http状态码，（200,404,100、101、500、502、301、302、307、304等）

#### 9 cookie和session，跨域如何共享cookie

#### 10 http协议传输编码、实体编码等

### 数据库

#### 1.mysql、mongo、redis的应用场景

#### 2.mysql的存储引擎怎么理解

#### 3 mysql ACID 特性

#### 4 mysql支持几种索引，innodb支持几种

#### 5 索引的数据结构都是什么，为什么使用这种数据结构

#### 6 btree和b+tree的去呗

#### 7 redis有什么特点

#### 8 mysql的主从同步原理

#### 9 如何用redis实现分布式锁

#### 10 三大范式是什么，什么时候适合反范式设计数据库

#### 11 如何进行sql优化，如何知道哪些sql比较耗时

#### 12 mysql 适合建外键吗

### 架构层面

#### 1.单点服务，挂机导致在线不可用，如何进行集群部署与集群管理

#### 2.什么是预验证，什么是灰度发布

#### 3. 正向代理和反向代理的区别

#### 4. nginx 为什么性能高

#### 5 单表数据库太大怎么办（3000W+）

#### 6 数据库并发量大怎么办

#### 7 如何提高QPS，如何提高单次请求响应时间

#### 8 数据库双主写入，如何协调

#### 9 集群部署，session 个用一套，如何做登录

#### 10 什么是虚拟ip，在什么场景下会用到虚拟ip

### 安全层面

#### 1 前端攻击（xss与csrf） 服务器如何防护

#### 2 sql注入，如何防护

#### 3.说说dns劫持

#### 4.有恶意大量刷接口，造成服务器压力过大怎么办

### 算法层面

#### 1.快排

#### 2.二分法

#### 3 哈希表实现

#### 4 AVL树与红黑树（说区别和应用场景）

#### 5 如何判断单向链表是否有环

#### 6 最大堆实现优先队列

#### 7 1000万个url找出访问频率最高的前50个

#### 8 如何表示一个无向图

#### 9 正则表达式，如何减少回朔

### web应用层

#### 1 用户在浏览器敲下baidu.com然后回车，发生了什么

#### 2 如何进行整站的性能优化

#### 3 如何打造监控警告

