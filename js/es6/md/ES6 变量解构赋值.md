[TOC]

### 变量的解构赋值

> ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
>
> 解构不成功，变量的值就等于`undefined`。

#### 1. 数组解构赋值

##### 完全解构

```javascript
let [a, b, c] = [1, 2, 3];
```

这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

##### 不完全解构

```javascript
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

> 如果等号的右边不是数组, 或者严格的说是不可遍历的结构, 那么就会报错

##### 默认值

解构赋值允许指定默认值

```JavaScript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

> **注意**
>
> ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。
>
> 所以，只有当一个数组成员严格等于`undefined`，默认值才会生效

```javascript
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```javascript
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

上面代码中，因为`x`能取到值，所以函数`f`根本不会执行。

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

#### 2. 对象解构赋值

```javascript
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```

对象的解构与数组有一个重要的不同, 数组的元素是按照次序排列的, 变量的取值由它的位置决定, 而对象的属性没有次序, 变量名必须与属性名相同, 才能取到正确的值

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。下面代码将`Math`对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。

```javascript
let { log, sin, cos } = Math;
```

#### 3. 字符串解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

#### 4. 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```javascript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

#### 5. 函数参数解构赋值

函数的参数也可以使用解构赋值。

```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

下面是另一个例子。

```javascript
[[1, 2], [3, 4]].map(([a, b]) => a + b);
```

也可以使用默认值 :

```Javascript
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面代码中，函数`move`的参数是一个对象，通过对这个对象进行解构，得到变量`x`和`y`的值。如果解构失败，`x`和`y`等于默认值。

#### 6. 圆括号解构赋值

#### 7. 用途

##### 1) 交换变量的值

下面是交换 `x` 和 `y` 的值

```javascript
let x = 1;
let y = 2;
[x, y] = [y, x];
```

##### 2) 从函数分返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```javascript
// 返回一个数组
function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example2() {
    return {
        foo: 1,
        bar: 2
    };
}
let {foo, bar} = example2();
```

##### 3) 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

##### 4) 提取 JSON 数组

```javascript
let jsonData = {
    id: 42,
    status: "OK",
    data: [86, 5309]
};

let {id, status, data: number} = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

##### 5) 函数参数默认值

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

##### 6) 遍历 Map 结构

任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

##### 7) 输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

