[TOC]

### Nodejs

#### 1. 面向对象特征，怎么理解js的封装继承和多态

原型链

#### 2. 怎么让变量私有化

第一种: 

```javascript
function car(){ 
    var wheel = 3; //私有变量 
    this.wheel = 4; //公有变量 
    alert(wheel); 
    alert(this.wheel); 
} 
var car1 = new car(); //结果是：3 4
```

#### 3. js怎样实现单线程机制（事件循环队列）

#### 4. 什么是闭包

闭包就是能够读取其他函数内部变量的函数。

闭包就是将函数内部和函数外部连接起来的一座桥梁

闭包用途: 

1) 可以读取函数内部的变量

2) 让这些变量的值始终保存在内存中

#### 5. this相关问题，如何手动实现函数的bind方法，什么场景下用apply

this问题：

call和apply方法都是在调用之后立即执行的。而bind调用之后是返回原函数，需要再调用一次才行

应用apply：

改变this指向，实现继承，实现柯里化（把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数）

#### 6. 如何判断一个变量是数组，如何判断一个对象是object（不能是null）

判断数组：

1. 

```javascript
function isArrayFn (o) { 
	return Object.prototype.toString.call(o) === '[object Array]'; 
} 
```

2. 

```javascript
Array.isArray()
```

#### 7.如何处理异步回调，如何实现一个Promise， co模块实现原理

co模块原理：自动执行 generator 函数

Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。

（1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

（2）Promise 对象。将异步操作包装成 Promise 对象，用`then`方法交回执行权。

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的`yield`命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co

#### 8. 什么是函数式编程，什么是偏函数与柯里化？

函数式编程：

此处的函数的意义是指数学上的函数

偏函数：创建一个调用另外一个部分-----参数或变量已经预置的函数-----的函数

```javascript
var toString = Object.prototype.toString;
var isString = function(obj){
    return toString.call(obj) == '[object String]';
}
var isFunction = function(obj){
    return toString.call(obj) == '[object Function]';
}
```

如果需要判断的对象类型很多，那么isXXX一个一个写，代码繁冗。

这时候我们可以观察上面几个isXXX的规律，发现都是用传入的对象执行toString()来判断类型。

这时候，我们引入一个新的函数：

```javascript
var isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) == '[object ' + type + ']';
    }
}
```

这种通过指定部分参数来产生一个新的定制函数的形式就是偏函数。

柯里化：将一个低阶函数转换为高阶函数的过程就叫柯里化，简单理解是：传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

#### 9. ES6相关特性

1. [let 和 const 命令](http://es6.ruanyifeng.com/#docs/let)
2. [变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)
3. [数值的扩展](http://es6.ruanyifeng.com/#docs/number)
4. [函数的扩展](http://es6.ruanyifeng.com/#docs/function) 箭头函数
5. [数组的扩展](http://es6.ruanyifeng.com/#docs/array)
6. [Set 和 Map 数据结构](http://es6.ruanyifeng.com/#docs/set-map)
7. [Promise 对象](http://es6.ruanyifeng.com/#docs/promise)
8. [Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)
9. [Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)

#### 10. 比较一下js与其他语言的优缺点

优点：



缺点：

### Nodejs层面

#### 1. 应用什么框架（express/koa/koa2/egg等），并阐述此框架的优缺点

koa和express：

1. koa的中间件洋葱图，所有的请求经过一个中间件的时候都会执行两次，对比 Express 形式的中间件，Koa 的模型可以非常方便的实现后置处理逻辑
2. Express 只有 Request 和 Response 两个对象不同，Koa 增加了一个 Context 的对象，作为这次请求的上下文对象
3. 通过同步方式编写异步代码带来的另外一个非常大的好处就是异常处理非常自然，使用 `try catch` 就可以将按照规范编写的代码中的所有错误都捕获到

egg：

1. Egg 1.x 发布时，Node.js 的 LTS 版本尚不支持 async function，所以 Egg 1.x 仍然基于 Koa 1.x 开发，但是在此基础上，Egg 全面增加了 async function 的支持，再加上 Egg 对 Koa 2.x 的中间件也完全兼容，应用层代码可以完全基于 `async function` 来开发
2. Node.js 8 正式进入 LTS 后，async function 可以在 Node.js 中使用并且没有任何性能问题了，Egg 2.x 基于 Koa 2.x，框架底层以及所有内置插件都使用 async function 编写

#### 2. node的web框架如何实现中间件

https://zhuanlan.zhihu.com/p/30384677

https://cnodejs.org/topic/58824b20250bf4e2390e9e59

#### 3. 如何进行流式编程，如何实现一个可读可写流，pipe方法的原理是什么

#### 4. node如何进行错误处理

1. Promise.cache
2. try cache

#### 5. 代码框架如何分层

#### 6. node优缺点，v8垃圾回收机制（新生代和老生代区别）以及v8内存限制问题

1. 主要的回收算法

   > 回收策略主要基于分代式垃圾回收
   >
   > 新生代的对象为存活时间较短的对象，老生代的对象是存活时间较长或常驻内存的对象。
   >
   > 不同代的对象采用不同的算法进行垃圾回收。新生代采用scavenge算法，老生代采用mark-sweep&mark-compact算法

   内存分代: 新生代内存空间 和 老生代内存空间

   |        | 64位系统 | 32位系统 |
   | ------ | -------- | -------- |
   | 老生代 | 1400MB   | 700MB    |
   | 新生代 | 32MB     | 16MB     |
   | 最大值 | 1464MB   | 732MB    |

   默认情况下, V8堆内存最大值在64位上为 1464MB, 在32位上为 732MB

2. Scavenge算法

   这是一种采用复制的方式实现内存回收的算法。具体采用 Cheney 算法.

   它将堆内存分为两部分，from空间和to空间。分配对象内存时在from空间进行，to空间处于闲置状态。

   

   当开始垃圾回收时复制from空间中的存活对象到to空间去，非存活对象占用的空间会被释放掉。

   > 复制的过程中需要进行检查, 将符合两个条件的对象, 移动到老代区, 也叫做晋升
   >
   > 条件一 : 对象是否经理过Scavenge回收
   >
   > 条件二 : To空间的内存占用比例是否超过 25%，当从From空间复制一个对象到To空间时，如果To空间已经使用了超过25%，则这个对象直接晋升到老生代空间中

   完成后，两个空间角色互换。

   

   很显然，这是一种典型的牺牲空间换取时间的算法。新生代对象的生命周期较短且存活对象只占少部分，因此这个算法很适合新生代。

3. Mark-Sweep & Mark-Compact

   > Mark-Sweep [标记清除], 分为 **标记** 和 **清除** 两个阶段
   >
   > Mark-Compact [标记整理], 为了解决 Mark-Sweep清理内存之后, 出现内存不连续, 内存碎片问题

   由于 Mark-Compact 需要移动对象, 所以执行效率不是很快, 因此V8主要采用 Mark-Sweep, 在内存空间不足以对从新生代中晋升过来的对象进行分配时, 才使用 Mark-Compact

    Mark-Sweep算法就是一般意义上的标记清除，标记阶段标记存活的对象，清除阶段清除没有被标记的对象。这个算法最大的问题就是内存碎片问题

   Mark-Compact就是为了解决这个问题而提出的，即标记整理。标记整理，顾名思义就是说在标记后整理存活的对象，将其往一端移动，移动完成后，清理掉死亡对象。

4. Incremental Marking

   > 增量式整理

   上述3种算法的执行都需要将应用逻辑暂停下来，等到垃圾回收执行完再恢复应用逻辑，这样的行为称为全停顿（stop-the-world）。

   这样的操作应用于新生代垃圾回收时影响不大，但是老生代就不一样了，内存配置得大，存活对象也多，全堆垃圾回收时造成应用的停顿就会比较长了。

   为了降低全堆垃圾回收带来的停顿时间，V8先从标记阶段入手，将原本要一口气停顿完成的动作改为 `增量标记` 也就是拆分为许多小 “步进”，每做完一步 “步进” 就让JavaScript应用逻辑执行一小会，垃圾回收和应用逻辑交替执行直到标记阶段完成。

   改善方法有增量标记（incremental marking）、延迟清理（lazy sweeping）和增量式整理（incremental compaction），同时还有并行标记和并行清理，这是利用多核进行性能优化。

#### 7. 如何部署node，pm2或者forever优缺点

部署node使用 `shipit` 第三方包工具

pm2 可以多进程部署，根据cpu核数开启相对应的进程，分为 fork 和 cluster 模式

1. cluster_mode：用cluster来做负载均衡，你的业务代码不用做任何改动。
2. fork_mode：用fork模式启动（默认）。这种模式下有个特性，你可以修改`exec_interpreter`，比如你的代码不是纯js，而是类似coffee script，那么，fork模式可能更适合你。

#### 8. node如何跨系统实现事件循环机制

#### 9. node单线程，挂掉如何处理

#### 10 nodejs的日志管理，是否了解ELK

node日志使用 `log4js `

ELK：

Elasticsearch：负责日志检索和分析 

Logstash：负责日志的收集，处理和储存 

Kibana：负责日志的可视化 

### 设计模式

#### 1.观察者模式

#### 2.代理模式

#### 3.单例模式

### 网络协议

#### 1 tcp三次握手和四次挥手

#### 2 网络七层模型和五层模型

七层：物理层，数据链路层，网络层，传输层，会话层，表达层，应用层

五层：物理层，数据链路层，网络层，传输层，应用层

#### 3 tcp与http的关系

TCP是传输层，而http是应用层 

 http是要基于TCP连接基础上的 ，http的传输功能由tcp完成

#### 4 https和http的区别

1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

#### 5 了解代理、缓存等，CDN原理等



#### 6 http安全验证的几种方式

1. Http Basic Authentication 基本认证

   需要提供用户名密码

   1）客户端访问一个受http基本认证保护的资源。

   2）服务器返回401状态，要求客户端提供用户名和密码进行认证。

   ​           401 Unauthorized

   ​           WWW-Authenticate： Basic realm="WallyWorld"

   3）客户端将输入的用户名密码用Base64进行编码后，采用非加密的明文方式传送给服务器。

   ​           Authorization: Basic xxxxxxxxxx.

   4）如果认证成功，则返回相应的资源。如果认证失败，则仍返回401状态，要求重新进行认证。

2. Http Digest Authentication Digest 摘要认证

   

3. JWT

4. OAuth

#### 7 http缓存相关协议头，私有缓存和公共缓存等。什么是协商缓存，请求头带if什么意思，Etag做什么用的

#### 8 了解http状态码，（200、404、100、101、500、502、301、302、307、304等）

| 状态码 | 状态码英文名称                  | 中文描述                                                     |
| ------ | ------------------------------- | ------------------------------------------------------------ |
| 100    | Continue                        | 继续。[客户端](http://www.dreamdu.com/webbuild/client_vs_server/)应继续其请求 |
| 101    | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
|        |                                 |                                                              |
| 200    | OK                              | 请求成功。一般用于GET与POST请求                              |
| 201    | Created                         | 已创建。成功请求并创建了新的资源                             |
| 202    | Accepted                        | 已接受。已经接受请求，但未处理完成                           |
| 203    | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 204    | No Content                      | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205    | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206    | Partial Content                 | 部分内容。服务器成功处理了部分GET请求                        |
|        |                                 |                                                              |
| 300    | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301    | Moved Permanently               | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302    | Found                           | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303    | See Other                       | 查看其它地址。与301类似。使用GET和POST请求查看               |
| 304    | Not Modified                    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305    | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                       |
| 306    | Unused                          | 已经被废弃的HTTP状态码                                       |
| 307    | Temporary Redirect              | 临时重定向。与302类似。使用GET请求重定向                     |
|        |                                 |                                                              |
| 400    | Bad Request                     | 客户端请求的语法错误，服务器无法理解                         |
| 401    | Unauthorized                    | 请求要求用户的身份认证                                       |
| 402    | Payment Required                | 保留，将来使用                                               |
| 403    | Forbidden                       | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404    | Not Found                       | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405    | Method Not Allowed              | 客户端请求中的方法被禁止                                     |
| 406    | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                   |
| 407    | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408    | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                     |
| 409    | Conflict                        | 服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突 |
| 410    | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411    | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息       |
| 412    | Precondition Failed             | 客户端请求信息的先决条件错误                                 |
| 413    | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414    | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理               |
| 415    | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                             |
| 416    | Requested range not satisfiable | 客户端请求的范围无效                                         |
| 417    | Expectation Failed              | 服务器无法满足Expect的请求头信息                             |
|        |                                 |                                                              |
| 500    | Internal Server Error           | 服务器内部错误，无法完成请求                                 |
| 501    | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                         |
| 502    | Bad Gateway                     | 充当网关或代理的服务器，从远端服务器接收到了一个无效的请求   |
| 503    | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504    | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505    | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理               |

#### 9 cookie和session，跨域如何共享cookie



#### 10 http协议传输编码、实体编码等

### 数据库

#### 1.mysql、mongo、redis的应用场景

#### 2.mysql的存储引擎怎么理解

#### 3 mysql ACID 特性

#### 4 mysql支持几种索引，innodb支持几种

#### 5 索引的数据结构都是什么，为什么使用这种数据结构

#### 6 btree和b+tree的去呗

#### 7 redis有什么特点

#### 8 mysql的主从同步原理

#### 9 如何用redis实现分布式锁

#### 10 三大范式是什么，什么时候适合反范式设计数据库

#### 11 如何进行sql优化，如何知道哪些sql比较耗时

#### 12 mysql 适合建外键吗

### 架构层面

#### 1.单点服务，挂机导致在线不可用，如何进行集群部署与集群管理

#### 2.什么是预验证，什么是灰度发布

#### 3. 正向代理和反向代理的区别

**正向代理：**例如翻墙工具

![](http://7d9py7.com1.z0.glb.clouddn.com/proxy.jpg)

**反向代理：**

当我们访问 www.baidu.com 的时候，背后可能有成千上万台服务器为我们服务，但具体是哪一台，你不知道，也不需要知道，你只需要知道反向代理服务器是谁就好了 

![](http://7lryy3.com1.z0.glb.clouddn.com/reverse-proxy.jpg)

#### 4. nginx 为什么性能高

Nginx使用了最新的epoll（Linux 2.6内核）和kqueue（freebsd）网络I/O模型，而Apache则使用的是传统的select模型。

 而Apache则使用的是传统的select模型。 nginx使用事件驱动模型

#### 5 单表数据库太大怎么办（3000W+）

#### 6 数据库并发量大怎么办

#### 7 如何提高QPS，如何提高单次请求响应时间

#### 8 数据库双主写入，如何协调

https://www.cnblogs.com/luckcs/articles/7105206.html

#### 9 集群部署，session 个用一套，如何做登录

#### 10 什么是虚拟ip，在什么场景下会用到虚拟ip

### 安全层面

#### 1 前端攻击（xss与csrf） 服务器如何防护

1）xss 跨站脚本攻击 使用 `npm i xss ` 模块

2）csrf 跨站请求伪造，也被称为：one click attack/session riding，缩写为：CSRF/XSRF （攻击者盗用了你的身份，以你的名义发送恶意请求 ）

解决方法：在HTTP请求头中自定义属性并验证，具体：使用token，用户登录成功之后，token可以在用户登录后产生并存放于session中，然后每次请求时把token从session中拿出，与请求中的token进行对比。前端在发送请求时，把token放到HTTP请求头中自定义的属性里如 `csrftoken  `，通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上`csrftoken ` 这个HTTP头属性，并把 token 值放入其中

#### 2 sql注入，如何防护

为了防止SQL注入，可以将SQL中传入参数进行编码，而不是直接进行字符串拼接 

使用  `node-mysql` 模块有以下四种：

1）使用escape()对传入参数进行编码

2）使用connection.query()的查询参数占位符

```javascript
var userId = 1, name = 'test';
var query = connection.query('SELECT * FROM users WHERE id = ?, name = ?', [userId, name], function(err, results) {
    // ...
});
console.log(query.sql);
```

3） 使用escapeId()编码SQL查询标识符：

4）使用mysql.format()转义参数：

```javascript
var userId = 1;
var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts); // SELECT * FROM users WHERE id = 1
```

#### 3.说说dns劫持

客户端发送域名请求给 dns，dns通过遍历查询dns数据库，来解析此域名对应的ip，然后反馈至浏览器客户端，客户端通过ip与对方建立数据连接;这时，很关键的一环，就是dns服务，如果dns把你想要解析的地方，解析为错误的另一个地方，这地方是劫持者有自身利益的地方，例：明明访问 www.linwan.net.cn,却被引导至另外一个网址，比如：www.smallit.cn ，这就是DNS劫持

#### 4.有恶意大量刷接口，造成服务器压力过大怎么办

分析nginx日志

过滤请求接口的ip

只要超过指定次数

然后就用防火墙禁掉

### 算法层面

#### 1.快排

```javascript
function quickSort(arr, low, high) {
    let pivot;
    if (low < high) {
        pivot = partition(arr, low, high);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
    return arr;
};

function partition(arr, low, high) {
    let pivotKey = arr[low];
    while (low < high) {
        while (low < high && arr[high] >= pivotKey)
            high--;
        [arr[low], arr[high]] = [arr[high], arr[low]];
        while (low < high && arr[low] <= pivotKey)
            low++;
        [arr[low], arr[high]] = [arr[high], arr[low]];
    }
    return low;
};

let a = [8, 3, 4, 1, 9, 7, 6, 10, 2]

a = quickSort(a, 0, 8);
console.log(a);
```

#### 2.二分法

#### 3 哈希表实现

[散列表](https://baike.baidu.com/item/%E6%95%A3%E5%88%97%E8%A1%A8)（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的[数据结构](https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/1450)。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做[散列函数](https://baike.baidu.com/item/%E6%95%A3%E5%88%97%E5%87%BD%E6%95%B0)，存放记录的[数组](https://baike.baidu.com/item/%E6%95%B0%E7%BB%84)叫做[散列表](https://baike.baidu.com/item/%E6%95%A3%E5%88%97%E8%A1%A8)。 

哈希表防冲突：

1. 拉链法

   ![](https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=249bc83ec45c10383073c690d378f876/c9fcc3cec3fdfc035f8e2b9cd63f8794a4c22624.jpg)

2. 1

3. 2

   

#### 4 AVL树与红黑树（说区别和应用场景）

**二叉查找树：**

1. 左子树上的所有结点的值均小于或等于它的根节点的值
2. 右子树上的所有节点的值均大于或等于它的根结点的值
3. 左、右子树也分别为二叉查找树

特点是，查找所需要的最大次数等于二叉查找树的高度，在插入的时候也是按照类似的方法，一层一层比较大小，找到新节点合适插入的位置。

缺点：会出现一边倒的情况，多次插入新节点导致二叉树不平衡，为了解决这个问题才有了红黑树

**红黑树：**

是一种自平衡的二叉查找树

1. 节点是红色或黑色
2. 根节点是黑色
3. 每个叶子节点都是黑色的空节点（NULL节点）
4. 每个红色节点的两个子节点都是黑色，从每个叶子到根的所有路径上不能有两个连续的红色节点
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。 

当插入或删除节点的时候，红黑树的规则有可能被打破。这时候就需要作出**一些调整**

1）变色

为了重新符合红黑树的原则，尝试把红色节点变成黑色，或者把黑色节点变为红色

2）旋转，左旋转和右旋转

**左旋转：**

逆时针旋转红黑树的两个节点，使得父节点被自己的右子树取代，而自己成为右子树的左子树节点

![](http://5b0988e595225.cdn.sohucs.com/images/20171102/b3cd82550b29445eac5b6e6b0f40f03c.png)

**右旋转：** 

顺时针旋转红黑树的两个节点，使得父节点被自己的左叶子节点取代，而自己成为左子树的右叶子节点

![](http://5b0988e595225.cdn.sohucs.com/images/20171102/c739da55ba784729919bc18b57c3a5c3.png)



**应用：**

1. JDK集合类TreeMap和TreeSet底层就是红黑树，JAVA8里的 HashMap也是红黑树
2. Nodejs 的 `setTimeout` 和 `setInterval` 两个方法

**AVL：**平衡二叉树



#### 5 如何判断单向链表是否有环

使用追赶的方法，设定两个指针slow、slow，均从头指针开始，每次分别前进1步、2步。如存在环，则两者相遇；如不存在环，fast遇到NULL退出。

#### 6 最大堆实现优先队列

#### 7 1000万个url找出访问频率最高的前50个

TOP-K

#### 8 如何表示一个无向图

#### 9 正则表达式，如何减少回朔

### web应用层

#### 1 用户在浏览器敲下baidu.com然后回车，发生了什么

#### 2 如何进行整站的性能优化

#### 3 如何打造监控警告

