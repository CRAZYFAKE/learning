[TOC]

# ECMAScript6 函数扩展

------

> ES6中关于函数新增了许多扩展



## 1.函数默认值

在ES6之前，只能通过`param = param || 'World'`的方式来指定默认值。如下：

```javascript
function foo(param){
  	param  = param || 'hello world';
  	console.log(param);
}

foo()     //hello world
foo('no') //no
foo('')   //hello world
```

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```javascript
function foo(param = 'hello world'){
  	console.log(param);
}

foo()     //hello world
foo('no') //no
foo('')   //hello 
```

特点：

1. 写法简单
2. 方便阅读
3. 利于优化

参数变量是默认声明的，所以不能用`let`或`const`再次声明。

```javascript
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

另外，参数默认值是惰性的。

```javascript
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```

上面代码中，参数`p`的默认值是`x + 1`。这时，每次调用函数`foo`，都会重新计算`x + 1`，而不是默认`p`等于 100。

此外定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。



**函数的length属性**

指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。

```javascript
(function (a) {}).length           // 1
(function (a = 5) {}).length       // 0
(function (a, b, c = 5) {}).length // 2
```

rest参数也不会计入`length`属性。

```javascript
(function(...args) {}).length // 0
```

如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了。

```javascript
(function (a, b, c = 5) {}).length              // 2
function (a, b, c = 5, d, e, f, g) { }).length  // 2
```



**作用域**

函数设置了参数默认值的话，函数进行声明初始化时，参数会形成一个单独的作用域。并且在调用时也是一个单独的作用域。

```javascript
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

上面代码中，调用`f()`函数时，形成了单独的做域，所以最后输出的是`2`，而不是全局变量的`x=1`

如果默认参数是一个函数的话，函数的作用域规则也与变量相同。



可以将参数默认值设为`undefined`，表明这个参数是可以省略的。





















