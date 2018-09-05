<?php

/**
 * strlen()计算时，对于一个UTF-8的中文字符，
 * 会把它当做长度为3来处理。当出现中英文混排的情况下，
 * 怎么准确的计算字符串的长度呢？这里，得引入另外一个函数mb_strlen()。
 * mb_strlen()函数的用法与strlen()几乎一摸一样，只是多了一个指定字符集编码的参数。
 */
function head($type) {
    $maxLength = 60;
    $currentLength = strlen($type);
    $eachSideLength = ($maxLength - $currentLength) / 2;
    $eachSide = "";
    for($i = 0; $i < $eachSideLength; $i++) {
        $eachSide .= "=";
    }
    // return "<br>$eachSide $type $eachSide<br>";
    echo "<br>$eachSide $type $eachSide<br>";
}

function console($value) {
    echo "{$value}<br>";
}

head('变量');
// 在 PHP 中，所有用户定义的函数、类和关键词（例如 if、else、echo 等等）都对大小写不敏感。
ECHO "Hello World!\n";
echo "Hello World!\n";
EcHo "Hello World!\n";

// 对变量名大小写敏感
$color = "red";
echo "My car is ".$color."\n";
echo "My car is ".$COLOR."\n";
echo "My car is ".$COLOr."\n";

/**
 * PHP 变量规则：
 * 变量以 $ 符号开头，其后是变量的名称
 * 变量名称必须以字母或下划线开头
 * 变量名称不能以数字开头
 * 变量名称只能包含字母数字字符和下划线（A-z、0-9 以及 _）
 * 变量名称对大小写敏感（$y 与 $Y 是两个不同的变量）
 */
$x = 5;
$y = 6;
$z = 7;
$a = $x + $y + $z;
echo $a."\n";

/**
 * 作用域：
 * 函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问。
 * 函数内部声明的变量拥有 LOCAL 作用域，只能在函数内部进行访问。
 */

$xx=5; // 全局作用域

function myTest() {
  $yy=10; // 局部作用域
  echo "<p>测试函数内部的变量：</p>";
  echo "变量 xx 是：$xx";
  echo "<br>";
  echo "变量 yy 是：$yy";
}

myTest();

echo "<p>测试函数之外的变量：</p>";
echo "变量 xx 是：$xx";
echo "<br>";
echo "变量 yy 是：$yy";
head('变量');

head('常量');
function myTest1() {
    static $x=0;
    echo $x."<br>";
    $x++;
}
myTest1();
myTest1();
myTest1();
head('常量');

head('echo和print');
/**
 * echo 和 print差异：
 * 1.echo - 能够输出一个以上的字符串
 * 2.print - 只能输出一个字符串，并始终返回 1
 * 提示：echo 比 print 稍快，因为它不返回任何值。
 */
echo "<h2>PHP is fun!</h2>";
echo "Hello world!<br>";
echo "I'm about to learn PHP!<br>";
// 输出多个字符串
echo "This", " string", " was", " made", " with multiple parameters.<br><br>";

$txt1="Learn PHP";
$txt2="W3School.com.cn";
$cars=array("Volvo","BMW","SAAB");

echo $txt1;
echo "<br>";
echo "Study PHP at $txt2<br>";
echo "My car is a {$cars[0]}<br>";
echo "My car is a {$cars[1]}<br>";
echo "My car is a {$cars[2]}<br>";

print "<h2>PHP is fun!</h2>";
print "Hello world!<br>";
print "I'm about to learn PHP!";

print $txt1;
print "<br>";
print "Study PHP at $txt2<br>";
print "My car is a {$cars[0]}<br>";
head('echo和print');

head('数据类型');

echo "php数据类型有以下几种：字符串、整数、浮点数、逻辑、数组、对象、NULL。<br>";
echo "php var_dump() 会返回变量的数据类型和值：";

echo "<br>*** 对象 ***<br>";
class Car {
    var $color;
    function Car($color="green") {
        $this->color = $color;
    }

    function getColor() {
        return $this->color;
    }
}
$myCar = new Car("black");
echo $myCar->getColor();
echo "<br>*** 对象 ***<br>";

$cars=array("Volvo","BMW","SAAB");
var_dump($cars);

$x="Hello world!";
$x=null;
var_dump($x);
head('数据类型');

head('字符串函数');

echo "<h3>PHP strlen() 函数</h3>";
echo "strlen() 函数返回字符串的长度，以字符计。";

echo "<h3>PHP strpos() 函数</h3>";
echo "strpos() 函数用于检索字符串内指定的字符或文本。<br>";
echo "strpos('Hello world!','world') ==> ".strpos("Hello world!","world")."<br>";
echo "上例中字符串 'world' 的位置是 6。是 6（而不是 7）的理由是，字符串中首字符的位置是 0 而不是 1。";
head('字符串函数');

head('常量');
echo "如需设置常量，请使用 define() 函数 - 它使用三个参数：<br>
1.首个参数定义常量的名称<br>
2.第二个参数定义常量的值<br>
3.可选的第三个参数规定常量名是否对大小写不敏感。默认是 false。<br>";
define("GREETING", "Welcome to W3School.com.cn!");
echo GREETING."<br>";

$string = "hahaha";
echo "a{$string} a";
head('常量');

switch ($x = 4)
{
case 1:
  echo "Number 1";
  break;
case 2:
  echo "Number 2";
  break;
case 3:
  echo "Number 3";
  break;
default:
  echo "No number between 1 and 3";
  break;
}

head('循环');

echo "for循环与c/c++都没啥区别<br>";
console("foreach 循环只适用于数组，并用于遍历数组中的每个键/值对。");
$colors = array("red","green","blue","yellow"); 
foreach ($colors as $value) {
  console("$value ");
}

head('循环');

head("数组");
console("数组在单个变量中存储多个值，array() 函数用于创建数组。");
console("在 PHP 中，有三种数组类型：");
console("索引数组 - 带有数字索引的数组");
console("关联数组 - 带有指定键的数组");
console("多维数组 - 包含一个或多个数组的数组");

console("***索引数组***");
$cars = array("Volvo","BMW","SAAB");
foreach ($cars as $car) {
    console("$car ");
}
console("***索引数组***");

console("获得数组的长度 - count() 函数");
$cars=array("Volvo","BMW","SAAB");
console(count($cars));

console("***关联数组***");
console("有两种创建关联数组的方法：");
console("\$age=array('Peter'=>'35','Ben'=>'37','Joe'=>'43');");
console("\$age['Peter']=35;<br>\$age['Ben']=37;<br>\$age['Joe']=43;<br>");

console("遍历关联数组");
$age=array("Bill"=>"35","Steve"=>"37","Peter"=>"43");
foreach($age as $key => $value) {
  echo "Key=" . $key . ", Value=" . $value;
  echo "<br>";
}
console("***关联数组***");

console("***索引数组***");


console("***索引数组***");

head("数组");

?>