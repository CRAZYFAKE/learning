[TOC]

# Set

## 基本用法

类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。

````javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2,3,5,4
````

**初始化**

```javascript
// 1.
const set = new Set([1, 2, 3, 4, 4]);
[...set] // [1,2,3,4]

// 2.
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5
```

数组去重的简易方式：

```javascript
[...new Set(array)]
```

Set中添加值时，不会发生类型转换，如'1'和1 是不同的的值，Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（`===`），主要的区别是`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身。

向Set中添加两个`NaN`只能加入一个，说明在Set内NaN是相等的。

## 属性和方法

**Set 结构的实例有以下属性。**

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。

**Set 实例的方法分为两大类**：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

- `add(value)`：添加某个值，返回Set结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

**遍历操作。**

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

Set的键和值是同一个值。

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let x of set) {
  console.log(x);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

数组的`map`和`filter`方法也可以用于 Set 。

```javascript
let set = new Set([1, 2, 3, 4]);
set = new Set([...set].map(x => x * 2));
// Set { 2, 4, 6, 8 }

let set1 = new Set([1, 2, 3, 4, 5, 6, 8, 10]);
set1 = new Set([...set1].filter(x => (x % 2) == 0));
// Set { 2, 4, 6, 8, 10 }
```

`Map`实现并集（Union）、交集（Intersect）和差集（Difference）。

```javascript
let
    a = new Set([1, 2, 3]),
    b = new Set([2, 3, 4]);

//并集
let union = new Set([...a, ...b]);
console.log(union); // Set {1, 2, 3, 4}

//交集
let intersect = new Set([...a].filter(x => b.has(x)));
console.log(intersect); // set {2, 3}

//差集
let difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference); // Set {1}
```

# WeakSet

**与Set的区别**

1. WeakSet 的成员只能是对象，而不能是其他类型的值
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用

# Map

## 基本用法

传统的Js对象（Object）只能用字符串或者数字当做键，限制很大。

为此，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

如果对同一个键多次赋值，后面的值将覆盖前面的值。

```javascript
const map = new Map();

map.set(1, 'aaa').set(1, 'bbb');

map.get(1) // "bbb"
```

如果读取一个未知的键，则返回`undefined`。

```javascript
new Map().get('asfddfsasadf') // undefined
```

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。

```javascript
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

同样的值的两个实例，在 Map 结构中被视为两个键。

```javascript
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

另外，`undefined`和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。

## 属性和方法

**属性**

- `size`：返回 Map 结构的成员总数。

**方法**

- `set(key, value)`：`set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。
- `get(key)`：`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。
- `has(key)``has`：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- `delete(key)`：`delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。
- `clear()`：`clear`方法清除所有成员，没有返回值。

**遍历方法**

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

需要特别注意的是，Map 的遍历顺序就是插入顺序。

```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

# WeakMap

与`Map`用法的区别：

（1）`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

（2）`WeakMap`的键名所指向的对象，不计入垃圾回收机制。所以它叫`WeakMap`

与 Map 在 API 上的区别主要是两个：

（1）没有遍历操作（即没有`key()`、`values()`和`entries()`方法），也没有`size`属性。因为没有办法列出所有键名，这个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。

（2）无法清空，即不支持`clear`方法。`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()` 。