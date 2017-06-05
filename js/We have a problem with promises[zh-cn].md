[原文链接](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

Promise的用法，简单说就是一句话：使用`then`方法添加回调函数。但是，不同的写法有一些细微的差别，请看下面四种写法，它们的差别在哪里？

为了便于讲解，下面这四种写法都再用`then`方法接一个回调函数`finalHandler`。

首先实现这三个函数，代码如下：

```javascript
const doSomething = function() {
    return new Promise((resolve, reject) => {
        console.log("Run [doSomething]");
        resolve("result of doSomething()");
    });
}

const doSomethingElse = function(param) {
    console.log(`Run [doSomethingElse] Param : { ${param} }`);
    return `result of [doSomethingElse]`;
}

const finalHandler = function(param) {
    console.log(`Run [finalHandler] Param : { ${param} }`);
}
```

然后逐一分析四种写法。

**写法一**

```javascript
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);
```

输出：

```shell
Run [doSomething]
Run [doSomethingElse] Param : { undefined }
Run [finalHandler] Param : { result of [doSomethingElse] }
```

解答：

`finalHandler`回调函数的参数，是`doSomethingElse`函数的运行结果。

```
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                                     finalHandler(result Of doSomethingElse())
                                     |------------------|
```

**写法二**

```javascript
doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);
```

等同于：

```javascript
doSomething().then(function () {
  doSomethingElse();
  return;
}).then(finalHandler);
```

输出：

```
Run [doSomething]
Run [doSomethingElse] Param : { undefined }
Run [finalHandler] Param : { undefined }
```

解答：

`finalHandler`回调函数的参数是`undefined`。

```
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                  finalHandler(undefined)
                  |------------------|
```

**写法三**

```javascript
doSomething().then(doSomethingElse())
  .then(finalHandler);
```

输出：

```
Run [doSomething]
Run [doSomethingElse] Param : { undefined }
Run [finalHandler] Param : { result of doSomething() }
```

解答：

`finalHandler`回调函数的参数，是`doSomething`函数返回的回调函数的运行结果

```
doSomething
|-----------------|
doSomethingElse(undefined)
|---------------------------------|
                  finalHandler(result Of doSomething)
                  |------------------|
```

**写法四**

```
doSomething().then(doSomethingElse)
  .then(finalHandler);
```

输出：

```
Run [doSomething]
Run [doSomethingElse] Param : { result of doSomething() }
Run [finalHandler] Param : { result of [doSomethingElse] }
```

解答：

写法一只有一个差别，那就是`doSomethingElse`会接收到`doSomething()`返回的结果。

```
doSomething
|-----------------|
                  doSomethingElse(result Of doSomething)
                  |------------------|
                                     finalHandler(result Of doSomethingElse)
                                     |------------------|
```
[^《We have a problem with promises》  Nolan Lawson]: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
[^《JavaScript 标准参考教程（alpha）》阮一峰]: http://javascript.ruanyifeng.com/advanced/promise.html#toc13