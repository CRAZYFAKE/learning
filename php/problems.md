[TOC]

## 清除响应头信息的X-Powered-By

修改`php.ini`文件的`expose_php=Off`

## MAMP开启请求日志

1. MAMP开启请求日志[参考](https://sites.google.com/site/mamppro/en/mamp/faq/where-can-i-find-the-logs/how-can-i-enable-the-apache-access-logs)：

   1）运行`vim /Applications/MAMP/conf/apache/httpd.conf`

   2）找到`#CustomLog logs/access_log`这一行

   3）修改为`CustomLog "/Applications/MAMP/logs/apache_access.log" combined`

   4）重启Apache服务，`/Applications/MAMP/bin/apache2/bin/apachectl restart`

   5）运行命令`tail -f /Applications/MAMP/logs/apache_access.log`，查看Apache请求日志，如下：

   ```
   ::1 - - [04/Jun/2010:10:32:20 -0700] "GET /favicon.ico HTTP/1.1" 200 1406 "-" "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3 GTB7.0"
   ```

   上面这种方式，是坑爹的，

   这样有一个问题，MAMP并不是加载的`/Applications/MAMP/conf/apache/httpd.conf`

   如果永久修改的话[参考](http://blog-en.mamp.info/2015/02/editing-your-httpdconf-file-in-mamp-pro.html)，需要点击`File->Edit Template->Apache->httpd.conf`，如下图[图](http://2.bp.blogspot.com/-QCjkNUlt0EE/VOWcf3R5t4I/AAAAAAAAAd8/J4Q9KD509N8/s1600/Screen%2BShot%2B2015-02-06%2Bat%2B08.07.06.png)：

   ![操作图](../_picture/MAMP.png)

   执行上面的1）~ 3）步，然后重启MAMP，执行第5步

   >  **重点：**
   >
   >  MAMP日志所在位置：`/Applications/MAMP/logs`，包括Apache、Nginx、PHP、MySQL、Cloud

2. ​

   ​
