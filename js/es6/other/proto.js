'use strict';
// function f1(ss) { console.log(ss) };
// console.log(f1.prototype) //f1{}
// console.log(typeof f1.prototype) //Object
// console.log(typeof Function.prototype) // Function，这个特殊
// console.log(typeof Object.prototype) // Object
// console.log(typeof Function.prototype.prototype) //undefined


// function f1() { };
// var f2 = function () { };
// var f3 = new Function('str', 'console.log(str)');
// var o3 = new f1();
// var o1 = {};
// var o2 = new Object();
// console.log(typeof Object); //function
// console.log(typeof Function); //function
// console.log(typeof o1); //object
// console.log(typeof o2); //object
// console.log(typeof o3); //object
// console.log(typeof f1); //function
// console.log(typeof f2); //function
// console.log(typeof f3); //function 

// var person = function (name) {
//     this.name = name
// };
// person.prototype.getName = function () {
//     return this.name;
// }
// var zjh = new person('caoni baba');
// var name = zjh.getName(); //zhangjiahao
// console.log(name);

// console.log(zjh.__proto__ === person.prototype) //true
// console.log(person.prototype.__proto__ === Object.prototype) //true
// console.log(Object.prototype.__proto__) //null
// console.log(zjh.__proto__);


// function A(){
//     this.mark = "A";
//     this.changeMark = function(){
//         this.mark += "_changed";
//     }
// }
// A.prototype.mark2 = "A2";
// A.prototype.changeMark2 = function(){
//     this.mark2 += "_changed";
// }
// var a = new A();
// var a2 = new A();
// //下面则说明构造函数实例化后，分配着不同的实例对象，互不相关
// console.log(a.mark);  //"A"
// console.log(a2.mark); //"A"
//     a.changeMark();   //使用实例对象中的方法
// console.log(a.mark);  //"A_changed"
// console.log(a2.mark); //"A"
// //下面则说明了new操作符的一项作用，即将原型中的this指向当前对象，
// //在a.changeMark2执行时，changMark2中的方法先找 this.mark2 的值，
// //但是实例对象this中没有mark2值，则在原型链向上寻找，得到A原型对象中的mark2值，
// //在赋值时，将修改后的值添加在了a实例中。
// //总：虽然调用的是prototype方法，但是不会对prototype属性做修改，只会说是在实例中新增属性，但是在使用时，会最使用最近得到的属性（在后面原型链中可以加以理解）
// console.log(a.mark2);  //"A2"
// console.log(a2.mark2); //"A2"
//     a.changeMark2();   //使用原型链中的方法
// console.log(a.mark2);  //"A2_changed"
// console.log(a2.mark2); //"A2"



function A(mark) {
    this.mark = mark;
}
A.prototype.getMark = function () {
    return this.mark;
}
function B(mark) {
    this.mark = mark
}

//var temp = new A("A");
//B.prototype = temp;
//上面语句和下语句作用相同
B.prototype = new A("A"); //实例化一个A，其赋值于B.prototype
var b = new B("BB");
console.log(b.mark); //B， 结果如上面原型链分析的那样，向上找到最近的属性，则为b实例中的mark："B"
console.log(b.getMark());




var arr = new Array();
console.log(arr instanceof Array);      //true
console.log(arr.constructor === Array); //true
function TEMP() {
}
var temp = new TEMP();
console.log(temp instanceof TEMP); //true
console.log(temp.constructor === TEMP); //true