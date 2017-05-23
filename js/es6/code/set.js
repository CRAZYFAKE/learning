'use strict';
/**
 * ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
 *
 * Set本身是一个构造函数，用来生成Set数据结构。
 */
var s = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
console.log(s);
for (let i of s) {
    console.log(i);
}

var set = new Set([1, 2, 3, 4, 4]);
console.log(set)
console.log(typeof [...set]);// [1, 2, 3, 4]

// 去除数组的重复成员
var set = [...new Set([1, 2, 3, 4, 4, 4, 4])];
console.log(set);

{
    let set = new Set();
    let a = NaN;
    let b = NaN;
    let c = undefined;
    let d = undefined;
    set.add(a);
    set.add(b);
    set.add(c);
    set.add(d);
    set // Set {NaN}
    console.log(set.size);
    console.log(set);
}
{
    //两个对象总是不相等的。
    let set = new Set();
    set.add({});
    set.size // 1
    set.add({});
    set.size // 2
    console.log(set.size);
    console.log(set);
}


/**
 * Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
 * 下面先介绍四个操作方法。
 * add(value)：添加某个值，返回Set结构本身。
 * delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 * has(value)：返回一个布尔值，表示该值是否为Set的成员。
 * clear()：清除所有成员，没有返回值。
 */
{
    let s = new Set();
    s.add(1).add(2).add(2);
    // 注意2被加入了两次
    console.log(s.size) // 2
    console.log(s.has(1)); // true
    console.log(s.has(2));// true
    console.log(s.has(3)); // false
    s.delete(2);
    console.log(s.has(2)); // false
}


/**
 * Set结构的实例有四个遍历方法，可以用于遍历成员。
 * keys()：返回键名的遍历器
 * values()：返回键值的遍历器
 * entries()：返回键值对的遍历器
 * forEach()：使用回调函数遍历每个成员
 */
{
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
    for (let item of set.entries()) {
        console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]
}

{
    /**
     * forEach方法
     * Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。
     */
    let set = new Set([1, 2, 3]);
    set.forEach((value, key) => console.log(value * 2))
}


{
    /**
     * 用Set可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
     */
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    // 并集
    let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
    console.log(union);
    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));// set {2, 3}
    console.log(intersect);
    // 差集
    let difference = new Set([...a].filter(x => !b.has(x)));// Set {1}
    console.log(difference);
}

{
    /**
     * 如果想在遍历操作中，同步改变原来的Set结构，目前没有直接的方法，但有两种变通方法。
     * 1.一种是利用原Set结构映射出一个新的结构，然后赋值给原来的Set结构
     * 2.另一种是利用Array.from方法。  
     */
    // 方法一
    var set = new Set([1, 2, 3]);
    set = new Set([...set].map(val => val * 2));// set的值是2, 4, 6
    console.log(set);
    // 方法二
    var set = new Set([1, 2, 3]);
    set = new Set(Array.from(set, val => val * 2));// set的值是2, 4, 6f
    console.log(set);
}

/**
 * WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。
 * 
 * 首先，WeakSet的成员只能是对象，而不能是其他类型的值。
 * 
 * 其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，
 * 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，
 * 不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。
 * 
 * ====================================================================================
 * 
 * WeakSet不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，
 * 成员就取不到了。WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
 */