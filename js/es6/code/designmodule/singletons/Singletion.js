//Singletion.js
var PI = Math.PI;
function circle(radius) {
    return radius * radius * PI;
}
//你引用多少次都没有关系;它将只存在一个单一的实例。
module.exports.circle = circle;