[TOC]

## php开发app接口

### app接口定义：

1.地址：

2.文件：（处理一些业务逻辑）

3.接口数据：

### 与app如何通信

client端（APP、前端） => server端 ===>（返回数据，json/xml）client端

RESTful api

**xml**

Extensible Markup Language，扩展标记语言，用来标记数据、定义数据类型，允许用户对自己的标记语言进行定义的源语言。意思是：xml的节点可以自定义的。xml格式统一，跨语言和平台。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<item>
  <title>标题</title>
  <test id="1"/>
  <info>信息</info>
</item>
```

**json**

JavaScript Object Notation 数据交换格式，可在不同平台之间进行数据交换。

```json
{
  "id": 1001,
  "name": "CRAZYFAKE",
  "age": 18,
  "sex": 10,
  "created_at": "1509454044",
  "updated_at": "1509454044"
}
```

区别：

1. 可读性：xml数据方面

2. 生成数据方面：

   json：json_encode()函数，传入数组。

   xml：手动拼装字符串、DomDocument、XMLWriter、SimpleXML

3. 传输速度：

   json数据量相对要小

### 接口要做什么

#### 获取数据

从数据库、缓存中获取数据，通过接口返回。

#### 提交数据

通过接口，提交数据给服务器，然后服务器处理，存入数据库或者其他操作。

### 封装json/xml数据

通信数据标准格式：

Code: 状态码

Message:提示信息，格式不正确，数据返回成功等

Data:返回数据



1. 清除响应头信息的X-Powered-By，修改`php.ini`文件的`expose_php=Off`

2. MAMP开启请求日志[参考](https://sites.google.com/site/mamppro/en/mamp/faq/where-can-i-find-the-logs/how-can-i-enable-the-apache-access-logs)：

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

3. ​

   ​
