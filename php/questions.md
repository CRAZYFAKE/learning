[TOC]

### 一.const和defined的区别

一般是define在类外定义常量，const在类内定义常量，并且const必须通过类名::变量名来进行访问。

但是php5.3以上支持类外通过const定义常量。

1. `const`不能再条件语句中定义常量，但是`define`是可以
2. `const`采用一个普通的常量名称，`define`可以采用表达式作为名称
3. `const`只能接受静态的标量，而`define`可以采用任何表达式。
   * const不支持位运算符（<<）
   * const不支持算术运算符（+-*/）
   * const不支持比较运算符（===）
   * const不支持变量形式的值（$value）
   * const不支持逻辑运算符（||）
   * const不支持字符串运算符（.）
   * const不支持类型运算符（instanceof）
4. `const`本身就是一个语言结构。而`define`是一个函数。所以使用`const`速度要快的多
5. `const`对大小写敏感，`define`可以设置对大小写不敏感



###二.

