[TOC]

### 1.Node的特点

#### 异步I/O

以读取文件为例：

```javascript
var fs = require('fs');
fs.readFile('/path',(err,file)=>{
  	console.log('读取成功');
});
console.log('开始读文件');
```

在这里的“开始读文件”是在“读取成功”之前输出的，因为读取成功的执行也取决于读取文件的异步调用何时结束。下图为经典的异步调用：


![经典异步调用](https://raw.githubusercontent.com/CRAZYFAKE/learning/master/_picture/%E5%BC%82%E6%AD%A5%E8%B0%83%E7%94%A8.png)

并且在Node中，绝大多数的操作都是以异步的方式进行调用。

#### 事件与回调函数

事件的编程方式具有轻量级、松耦合、只关注事件等优势。

#### 单线程

在Node中，JS与其他线程是无法共享任何状态的。单线程最大的好处就是不用像多线程那样在意状态的同步问题，没有死锁的存在，也不存在线程上下文的切换所带来的性能消耗。

同样单线程也有弱点：

1. 无法利用多核CPU
2. 错误会引起整个应用退出
3. 大量计算会占用CPU导致无法继续调用异步I/0

#### 跨平台

最开始Node只能在Linux上运行，知道后来微软注意到了它并且搬了一队人马帮助Node团队实现了Windows平台的兼容。基于libuv实现的跨平台架构：

![Node基于libv实现跨平台](https://raw.githubusercontent.com/CRAZYFAKE/learning/master/_picture/node%20libv%E8%B7%A8%E5%B9%B3%E5%8F%B0.png)

此外Node的第三方C++模块也可以通过libuv实现跨平台

