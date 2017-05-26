http://www.restapitutorial.com/

http://www.ruanyifeng.com/blog/2011/09/restful.html

简单的说, RESTful 是把每个 URI 当做资源 (Resources), 通过 method 作为动词来对资源做不同的动作, 然后服务器返回 status 来得知资源状态的变化 (State Transfer)

一个常见的 method 列表, 关于这些 method 在 RESTful 中的一些应用的详细可以参见[Using HTTP Methods for RESTful Services](http://www.restapitutorial.com/lessons/httpmethods.html)

| methods | CRUD           | 幂等   | 缓存   |
| ------- | -------------- | ---- | ---- |
| GET     | Read           | ✓    | ✓    |
| POST    | Create         |      |      |
| PUT     | Update/Replace | ✓    |      |
| PATCH   | Update/Modify  | ✓    |      |
| DELETE  | Delete         | ✓    |      |

