[TOC]

# ECMAScript6 新特性Class

---
JavaScript与C/C++/Java这些传统的面向对象语言还是有很大不同的，Class就是其中之一，在ES6标准出来之前，js根本就没有类```Class```这个东西，都是用```function```表示的，刚刚接触js的时候比较困惑和迷茫，慢慢的熟悉之后就好很多了。废话不多说，直接上代码。


# Class类

## 1.Class基本语法

### 概念
首先来看一下，ES6以前的实现方式,JavaScript语言的传统方法是通过构造函数，定义并生成新对象：
```
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```
ES6的Class更接近传统语言的写法：
```
//定义类
class Point {
  //构造函数
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //类的方法
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
上面的类，有一个```constructor```方法，就是构造方法了，但是没有析构函数，可能是因为Chrome V8做的比较牛吧，```this```代表实例对象。其中还定义了一个```toString```方法，方法前无需添加```function```关键字，且方法之前无需用逗号隔开。

使用的时候，也是直接对类使用```new```命令，跟构造函数的用法完全一致。
```
class Bar {
  foo() {
    console.log('foo');
  }
}

var b = new Bar();
b.foo() // "foo"
```

类的方法名还可以采用表达式，如下：
```
let methodName = "getArea";
class Square{
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

### constructor方法

```constructor``` 方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
```
constructor() {
    
}
```

### 类的实例
生成类的实例对象的写法，与ES5完全一样，也是使用```new```命令。如果忘记加上```new```，像函数那样调用```Class```，将会报错。
```
// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```

实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
```
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```
上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。与ES5一致。而且类的所有实例共享一个对象

### 不存在变量提升
Class不存在变量提升
```
new Foo(); // ReferenceError
class Foo {}
```
Foo类使用在前，定义在后，这样会报错，因为ES6不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

### 私有方法
ES6不提供私有方法，只能通过模拟自己来实现(这一点很坑)

阮一峰老师的ES6入门中，说了三种方式，但是只有其中一种能真正实现私有方法，另外两种暂时不谈，这里先说能真正实现的方式，就是使用```Symbol```,将私有方法命名为一个```Symbol```值。
```
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```
```bar``` 和 ```snaf```都是```Symbol```值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。



## 2.Class继承

### 基本用法
通过```extends```关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。
```
class ColorPoint extends Point {
    constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
上面代码中，```constructor```方法和```toString```方法之中，都出现了```super```关键字，它在这里表示父类的构造函数，用来新建父类的```this```对象。

子类必须在```constructor```方法中调用```super```方法，否则新建实例时会报错。这是因为子类没有自己的```this```对象，而是继承父类的```this```对象，然后对其进行加工。如果不调用```super```方法，子类就得不到```this```对象。

### super 关键字
```super``` 这个关键字，既可以当作函数使用，也可以当作对象使用
第一种情况，```super```作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次```super```函数。
```
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```
注意，```super```虽然代表了父类A的构造函数，但是返回的是子类B的实例，即```super```内部的```this```指的是B。

第二种情况，super作为对象时，指向父类的原型对象。
```
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```
上面代码中，子类B当中的```super.p()```，就是将```super```当作一个对象使用。这时，```super```指向```A.prototype```，所以```super.p()```就相当于```A.prototype.p()```。

这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

## 3.Class的取值函数（getter）和存值函数（setter）
与ES5一样，在Class内部可以使用```get```和```set```关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```
上面代码中，```prop```属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

存值函数和取值函数是设置在属性的```descriptor```对象上的。
```
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html");
"get" in descriptor  // true
"set" in descriptor  // true
```
上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与ES5完全一致。


## 4.Class的静态方法
在一个方法前，加上```static```关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。下面有个例子。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```
父类的静态方法，可以被子类继承。
静态方法也是可以从super对象上调用的。


## 5.Class的静态属性和实例属性
静态属性指的是Class本身的属性，而不是定义在实例对象（this）上的属性。
```
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```
上面的写法为Foo类定义了一个静态属性prop(定义的方式有点奇怪)。
目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。

---
我写的这些，都是参考的阮一峰老师的《ECMAScript 6 入门》，其中的例子都是直接从书上拷下来的，表述的很清楚的话，我就没有再修改，直接拷贝下来了。

参考：[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)