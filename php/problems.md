[TOC]

## 清除响应头信息的X-Powered-By

修改`php.ini`文件的`expose_php=Off`

## MAMP开启Apache请求日志

MAMP开启Apache请求日志[参考](https://sites.google.com/site/mamppro/en/mamp/faq/where-can-i-find-the-logs/how-can-i-enable-the-apache-access-logs)：

   1）运行`vim /Applications/MAMP/conf/apache/httpd.conf`

   2）找到`#CustomLog logs/access_log`这一行

   3）修改为`CustomLog "/Applications/MAMP/logs/apache_access.log" combined`

   4）重启Apache服务，`/Applications/MAMP/bin/apache2/bin/apachectl restart`

   5）运行命令`tail -f /Applications/MAMP/logs/apache_access.log`，查看Apache请求日志，如下：

   ```
::1 - - [04/Jun/2010:10:32:20 -0700] "GET /favicon.ico HTTP/1.1" 200 1406 "-" "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3 GTB7.0"
   ```

   上面这种方式，是坑爹的，

   因为这样配置会有一个问题，MAMP并不是加载的`/Applications/MAMP/conf/apache/httpd.conf`，如果重启MAMP的话，会造成日志不可用。

   如果永久修改的话[参考](http://blog-en.mamp.info/2015/02/editing-your-httpdconf-file-in-mamp-pro.html)，需要点击`File->Edit Template->Apache->httpd.conf`，如下图[图](http://2.bp.blogspot.com/-QCjkNUlt0EE/VOWcf3R5t4I/AAAAAAAAAd8/J4Q9KD509N8/s1600/Screen%2BShot%2B2015-02-06%2Bat%2B08.07.06.png)：

   ![操作图](../_picture/MAMP.png)

   执行上面的1）~ 3）步，然后重启MAMP，执行第5步

   >  **重点：**
   >
   >  MAMP日志所在位置：`/Applications/MAMP/logs`，包括Apache、Nginx、PHP、MySQL、Cloud

## Navicat连接MAMP连接的MySQL

首先下载Navicat

查看MAMP连接的MySQL所占端口

并修改MAMP的MySQL配置，点击`Allow network access to MySQL`，选择`only from this Mac`

然后配置Navicat连接即可

## PHP 7.1无法使用dd()函数

原因：https://stackoverflow.com/questions/40057476/php-laravel-a-non-well-formed-numeric-value-encountered-on-string

> This is a bug in the symfony/var-dumper package when using PHP7.1. It was fixed in version 2.7.16, 2.8.9, 3.0.9 and 3.1.3. See the pull request: [https://github.com/symfony/symfony/pull/19379](https://github.com/symfony/symfony/pull/19379)
>
> In my case, I needed to `composer update` my laravel framework packages, as my vendor directory copy of that package was at 2.7.9. (I'm using Laravel 5.1; later versions use 2.8 and 3.0 of symfony, which also had the bug)
>
> 项目下执行composer update，或者只更新symfony/var-dumper的版本到` 2.7.16, 2.8.9, 3.0.9 and 3.1.3`就行

## 启动MySQL时，报错：

错误信息：

```shell
2017-11-04 10:40:16 5081 [ERROR] Can't start server : Bind on unix socket: Address already in use
2017-11-04 10:40:16 5081 [ERROR] Do you already have another mysqld server running on socket: /Applications/MAMP/tmp/mysql/mysql.sock ?
2017-11-04 10:40:16 5081 [ERROR] Aborting
```

根据上面提示的意思是：`/Applications/MAMP/tmp/mysql/mysql.sock`被占用了

用`ps -ef|grep mysql`检查没有其它MySQL进程

用`netstat -an|grep 8889`检查端口也不存在。

对比正常关闭MySQL时分析，MySQL关闭后`/Applications/MAMP/tmp/mysql/mysql.sock`文件就会被删除，而现在依然存在，猜测上次关闭MySQL时出现了异常，或未正常关闭导致。

**解决办法：**

删除`/Applications/MAMP/tmp/mysql/mysql.sock`文件夹，重启MySQL



