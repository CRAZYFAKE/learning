'use strict';
//输出变量
/**
 * 第一种
 */
// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;

/**
 * 第二种,可以在脚本尾部，一眼看清楚输出了哪些变量
 */
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;



/**
 * 输出函数
 * export输出的变量就是本来的名字，但是可以使用as关键字重命名。
 */
function v1() {
    console.log('v1');
}
function v2() {
    console.log('v2');
}



/**
 * export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
 */
export { firstName, lastName, year };
export {
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamLatestVersion
};