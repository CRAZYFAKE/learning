[TOC]

### next()的工作原理

猜测代码实现：

```javascript
//express.js
function express() {
    var funcs = [];

    var expr = function(req, res) {
        var i = 0;
		//next()函数依次执行funcs里函数
        function next() {
            var task = funcs[i++];
            if (!task) return;
            task(req, res, next);
        }
        next();
    }
    //app.use()添加中间件，在funcs里push中间件函数
    expr.use = function(f) {
        funcs.push(f);
    }
    return expr;
}
```

使用：

```javascript
//api.js
const 
	 http = require('http'),
     express = require('./express');
const app = express();

app.use(function(req, res, next) {
    console.log('haha');
    next();
});
app.use(function(req, res, next) {
    console.log('hehe');
    next();
});
app.use(function(req, res) {
    res.end("there is nothing happened");
});


http.createServer(app).listen('3000', function() {
    console.log('Express server listening on port 3000');
});
```

执行：`node api.js`，浏览器访问：`http://127.0.0.1:3000`

控制台打印：

```javascript
haha
hehe
```

浏览器打印：

```javascript
there is nothing happened
```

