// ES6严格模式
'use strict';
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add() {
        console.log('inner method');
        return this.x + this.y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

var p = new Point(22, 33);
console.log(p.toString());
console.log(p.add());

var methodName = "getArea";
class Square {
    constructor(length) {
        // ...
    }

    [methodName]() {
        console.log('methodName is :' + methodName);
    }
}
var s = new Square();
s.getArea();