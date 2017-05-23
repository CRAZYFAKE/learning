// console.log(7000 - 5600 - 827.27);
// console.log(5357.54 + 7000 - 5600 - 827.27);


'use strict';

{
    var m = new Map();
    var o = { p: 'Hello World' };

    m.set(o, 'content')
    m.get(o) // "content"

    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false
}

{
    var map = new Map([
        ['name', '张三'],
        ['title', 'Author']
    ]);
    map.size // 2
    map.has('name') // true
    map.get('name') // "张三"
    map.has('title') // true
    map.get('title') // "Author"
    map.set('name', 'Ucfker');
    console.log(map);
}
/**
 * 注意事项:
 * 1.字符串true和布尔值true是两个不同的键。
 * 2.如果对同一个键多次赋值，后面的值将覆盖前面的值。
 * 3.如果读取一个未知的键，则返回undefined。
 * 4.只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。
 * 5.同样的值的两个实例，在Map结构中被视为两个键。
 * 6.如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键。
 */
{
    var m = new Map([
        [true, 'foo'],
        ['true', 'bar']
    ]);
    console.log(m.get(true));// 'foo'
    console.log(m.get('true'));// 'bar'
    console.log(m);
}

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
 * 这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，
 * 就不用担心自己的属性与原作者的属性同名。
 */

/**
 * 实例的属性和操作方法 § ⇧
 * 1.size属性返回Map结构的成员总数。
 * 2.set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。可以采用链式写法。
 * 3.get方法读取key对应的键值，如果找不到key，返回undefined。
 * 4.has方法返回一个布尔值，表示某个键是否在Map数据结构中。
 * 5.delete方法删除某个键，返回true。如果删除失败，返回false。
 * 6.clear方法清除所有成员，没有返回值。
 */

/**
 * 遍历方法 § ⇧
 * 1. keys()：返回键名的遍历器。
 * 2. values()：返回键值的遍历器。
 * 3. entries()：返回所有成员的遍历器。
 * 4. forEach()：遍历Map的所有成员。
 * {需要特别注意的是，Map的遍历顺序就是插入顺序。}
 */
{
    let map = new Map([
        ['F', 'no'],
        ['T', 'yes'],
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
    // 等同于使用map.entries()
    for (let [key, value] of map) {
        console.log(key, value);
    }
    //Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
    map.forEach(function (value, key, map) {
        console.log("Key: %s, Value: %s", key, value);
    });
}

{
    /**
     * Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
     */
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);
    console.log([...map.keys()])
    // [1, 2, 3]
    console.log([...map.values()])
    // ['one', 'two', 'three']
    console.log([...map.entries()])
    // [[1,'one'], [2, 'two'], [3, 'three']]
    console.log([...map])
    // [[1,'one'], [2, 'two'], [3, 'three']]
}


{
    /**
     * 结合数组的map方法、filter方法，可以实现Map的遍历和过滤（Map本身没有map和filter方法）。
     */
    let map0 = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');
    let map1 = new Map(
        [...map0].filter(([k, v]) => k < 3)
    );
    console.log(map1)
    // 产生Map结构 {1 => 'a', 2 => 'b'}
    let map2 = new Map(
        [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
    console.log(map2)
    // 产生Map结构 {2 => '_a', 4 => '_b', 6 => '_c'}
}

{
    /**
     * 与其他数据结构的互相转换 § ⇧
     */
    {
        //（1）Map转为数组
        let myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
        console.log([...myMap]);//// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
    }
    {
        //（2）数组转为Map
        new Map([[true, 7], [{ foo: 3 }, ['abc']]])
        // Map {true => 7, Object {foo: 3} => ['abc']}
    }
    {
        //（3）Map转为对象 ，如果所有Map的键都是字符串，它可以转为对象。
        // function strMapToObj(strMap) {
        //     let obj = Object.create(null);
        //     for (let [k, v] of strMap) {
        //         obj[k] = v;
        //     }
        //     return obj;
        // }
        // let myMap = new Map().set('yes', true).set('no', false);
        // strMapToObj(myMap)
        // { yes: true, no: false }
    }
    {
        //（4）对象转为Map
        // function objToStrMap(obj) {
        //     let strMap = new Map();
        //     for (let k of Object.keys(obj)) {
        //         strMap.set(k, obj[k]);
        //     }
        //     return strMap;
        // }
        // objToStrMap({ yes: true, no: false })
        // [ [ 'yes', true ], [ 'no', false ] ]
    }
    {
        //（5）Map转为JSON
        // Map转为JSON要区分两种情况。一种情况是，Map的键名都是字符串，这时可以选择转为对象JSON。
        // function strMapToJson(strMap) {
        //     return JSON.stringify(strMapToObj(strMap));
        // }

        // let myMap = new Map().set('yes', true).set('no', false);
        // strMapToJson(myMap)
        // '{"yes":true,"no":false}'
    }
    {
        //（6）JSON转为Map
        //JSON转为Map，正常情况下，所有键名都是字符串。
        //         function jsonToStrMap(jsonStr) {
        //   return objToStrMap(JSON.parse(jsonStr));
        // }
        // jsonToStrMap('{"yes":true,"no":false}')
        // Map {'yes' => true, 'no' => false}
    }
}