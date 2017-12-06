

快捷键：

| 操作                  | 快捷键                        |                  |
| ------------------- | -------------------------- | ---------------- |
| 查找快捷键               | `CMD + Shift + A`          |                  |
| 打开文件                | `CMD + Shift + O`          | `CMD + P`        |
| 查找文件结构（方法和变量）       | `CMD + F12`                | `CMD + Ctrl + M` |
| 全局查找方法和变量名          | `CMD + Option + O`         |                  |
| 查找类名                | `CMD + O`                  |                  |
| 创建文件                | `CMD + N`                  |                  |
| 代码格式化               | `CMD + Shift + Option + L` | `Ctrl + Num 0`   |
| 代码重构（Refactor This） | `Ctrl + T`                 |                  |
| 修改变量名、函数名           | `Shitf + F6`               |                  |
| 多点编辑                | `Ctrl + G`                 |                  |
|                     |                            |                  |
|                     |                            |                  |



PSR 自动加载支持：

`Preferences -> Directories -> Sources`



快速创建文件：

`CMD + N`



文件模板配置：

1）`CMD + Shitf + A`

2）搜索 `File template`

3）呼出窗口，进行设置



Live Template 代码片段：

1）`CMD + Shitf + A`

2）搜索 `Live Templates`

3）添加代码片段



代码格式化：

快捷键：`CMD + Shift + Option + L`

设置：`Preferences -> Editor -> Code Style -> PHP`



代码重构：

快捷键：`Ctrl + T`

选择要重构的变量、方法、类等



多点编辑：

单个选中：`Ctrl + G`，重复按键，选中多个

全部选中：`CMD + Ctrl + G`



配置 XDebug：

1）MAC 上安装 XDebug

      ```shell
brew install homebrew/php/php71-xdebug
      ```

安装完毕之后，运行`php -v`命令，有以下结果：

```shell
PHP 7.1.11 (cli) (built: Oct 27 2017 11:00:43) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies
    with Xdebug v2.5.5, Copyright (c) 2002-2017, by Derick Rethans
```

2）`CMD + Shitf + A`

搜索 `CLI interpreter`

添加 php版本

3）添加调试的脚本，

`Run -> Edit Configurations`

点`+`号，选中 `PHP Script`

选择脚本的位置，保存

4）`Ctrl + D` 运行调试