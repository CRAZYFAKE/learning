[TOC]

## ES6 箭头函数

### 1.基本用法

```javascript
var f = v => v;
```

等同于：

```javascript
var f = function(v) {
  return v;
};
```

### 2.注意点

1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
3. 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
4. 不可以使用`yield`命令，因此箭头函数不能用作Generator函数。
5. 除了`this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`。

### 3.绑定this

ES7