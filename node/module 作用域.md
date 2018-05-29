[TOC]

# Node.js module作用域问题

## 1.node.js是如何给每个文件一个独立的上下文来避免作用域被污染的？

首先node.js使用的CommonJS规范就是给每个文件都是独立的作用域。

Node关于module的[源码](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L668)：

```javascript
var wrapper = Module.wrap(content);

var compiledWrapper = vm.runInThisContext(wrapper, {
  filename: filename,
  lineOffset: 0,
  displayErrors: true
});

// ...

var result = compiledWrapper.call(this.exports, this.exports, require, this,
  filename, dirname);
```

简单理解可以分为以下几个步骤：

1.例如`console.js`有以下内容，

```javascript
console.log(module)
```

那么源码中的`content`就是`'console.log(module)'`

2.之后`Module.wrap(content)`：

```javascript
'(function (exports, require, module, __filename, __dirname) { console.log(module)\n});'
```

> 注意这里是字符串

3.之后运行`vm.runInThisContext`，将上面的字符串变成可执行的代码：

```javascript
function(exports, require, module, __filename, __dirname) {
  console.log(module)
});
```

4.最后执行这个函数，也就是`compiledWrapper.call(this.exports, this.exports, require, this, filename, dirname)` 就是执行了这个模块。

**显然，.js 文件的代码都是包裹在一个函数里执行的，并不会产生作用域污染。**

## 2.如果不小心定义了全局变量怎么办

如果不小心，写成下面：

```javascript
function(exports, require, module, __filename, __dirname) {
  globalVar = 1
});
```

那么会变成什么样的呢？[查看文档](https://nodejs.org/api/vm.html#vm_vm_runinthiscontext_code_options)

> `vm.runInThisContext()` compiles `code`, runs it within the context of the current `global` and returns the result. Running code does not have access to local scope, but does have access to the current `global` object.

仔细阅读以下，会发现有两个问题：

1. `vm.runInThisContext` 使得包裹函数执行时无法影响本地作用域
2. 但 global 对象是可以访问的，因此` globalVar = 1` 等价于` global.globalVar = 1`

如何避免污染全局变量呢？

```javascript
'use strict';
globalVar = 1
```

添加 'use strict';，禁止这样意外创建全局变量，代码执行时将抛出 globalVar 未定义的错误。

更准确地回答题主的问题：**Node.js 模块正常情况对作用域不会造成污染，意外创建全局变量是一种例外**，可以采用严格模式来避免。

[参考](https://zhuanlan.zhihu.com/p/25916585)