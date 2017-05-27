[TOC]

### HTTP METHOD

一个常见的 method 列表, 关于这些 method 在 RESTful 中的一些应用的详细可以参见[Using HTTP Methods for RESTful Services](http://www.restapitutorial.com/lessons/httpmethods.html)

| methods | CRUD           | 幂等   | 缓存   |
| ------- | -------------- | ---- | ---- |
| GET     | Read           | ✓    | ✓    |
| POST    | Create         |      |      |
| PUT     | Update/Replace | ✓    |      |
| PATCH   | Update/Modify  | ✓    |      |
| DELETE  | Delete         | ✓    |      |

**幂等：**

在HTTP/1.1规范中幂等性的定义是：

> Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request.

从定义上看，HTTP方法的幂等性是指一次和多次请求某一个资源应该具有同样的副作用。幂等性属于语义范畴，

正如编译器只能帮助检查语法错误一样，HTTP规范也没有办法通过消息格式等语法手段来定义它，这可能是它不

太受到重视的原因之一。但实际上，幂等性是分布式系统设计中十分重要的概念，而HTTP的分布式本质也决定了

它在HTTP中具有重要地位。

### 1.HTTP方法

在一个RESTful系统里，客户端向服务端发起索取资源的操作只能通过**HTTP协议语义**来进行交互。最常用的HTTP协议语义有以下5个：

- GET : 从服务器取出资源（一项或多项）
- POST：在服务器新建一个资源
- PUT：在服务器更新资源（客户端提供完整资源数据）
- DELETE：从服务器删除资源
- HEAD : 从服务器获取报头信息（不是资源）

### 2.关于http方法的疑问

**疑问**

写了一段时间的后端代码了，包括网上查找资料，很多资料都说`GET/POST/PUT/DELETE`这四个方法对应的是对于

资源的增删改查操作。但我的问题是，服务器端的代码是自己写的，到底是增还是删还是改查，不都是我自己代码

控制的么？为什么一定要严格按照这种http定义的标准呢？

并且目前项目中的绝大多数接口都是，`POST`方法，少量用的是`GET`方法

换句话说，我不管什么增删改查，所有 http 请求，一律用 POST，在业务功能的实现上也没问题吧？

没错，确实没有问题。

**解惑：**

所有 http 请求，一律用 `POST`，在业务功能的实现是没有问题的。

`post,get,put,delete` 是标准, 大家都遵循这样的规则. 这样的`api`对于它人来说一目了然, `get`就是获取数

据,`post`就是提交数据, `put`就是更新数据, `delete`就做删除操作. 如果一律使用`post`对一个项目组的内部人员来

说是没有问题的, 

但是对于对外公开的接口就让调用者摸不着头脑了。

另外这四种方法还有特殊的用意.

举个栗子：

`GET` 请求可被缓存, 请求可保留在浏览器历史记录中, 请求可被收藏为书签, `get`方法具有Safe特性会影响是否可以

快取(`post`不支持快取)

`POST` 请求不会被缓存, 请求不会保留在浏览器历史记录中, 不能被收藏为书签

这就是为什么取数据要使用`get`而不是`post`. 因为`get`可以快取, 缓存和保留历史记录及书签等特殊功能.

除了上面的4种常见方法还有一个很重要的方法`PATCH`.

### 3.GET 和 POST 有什么区别?

网上有很多讲这个的, 比如从书签, url 等前端的角度去看他们的区别这里不赘述. 而从后端的角度看, 前两年出来一

个 《GET 和 POST 没有区别》(出处不好考究, 就没贴了) 的文章比较有名, 早在我刚学 PHP 的时候也有过这种疑惑, 

刚学 Node 的时候发现不能像 PHP 那样同时处理 GET 和 POST 的时候还很不适应. 后来接触 RESTful 才意识到, 这

两个东西最根本的差别是语义, 引申了看, 协议 (protocol) 这种东西就是人与人之间协商的约定, 什么行为是什么作

用都是"约定"好的, 而不是强制使用的, 非要把 GET 当 POST 这样不遵守约定的做法我们也爱莫能助.

简而言之, 讨论这二者的区别最好从 RESTful 提倡的语义角度来讲~~比较符合当代程序员的逼格~~比较合理.

### 4.POST 和 PUT 有什么区别?

POST 是新建 (create) 资源, 非幂等, 同一个请求如果重复 POST 会新建多个资源. PUT 是 Update/Replace, 幂等, 同一个 PUT 请求重复操作会得到同样的结果.