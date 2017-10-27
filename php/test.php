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
    return "<br>$eachSide $type $eachSide<br>";
}
echo head('变量');
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
echo head('变量');

echo head('常量');
function myTest1() {
    static $x=0;
    echo $x."<br>";
    $x++;
}
myTest1();
myTest1();
myTest1();
echo head('常量');

echo head('echo和print');
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
echo head('echo和print');

echo head('数据类型');

echo head('数据类型');

?>