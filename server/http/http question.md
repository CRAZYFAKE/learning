[TOC]

### headers

HTTP headers 是在进行 HTTP 请求的交互过程中互相支会对方一些信息的主要字段. 比如请求 (Request) 的时候

告诉服务端自己能接受的各项参数, 以及之前就存在本地的一些数据等. 详细各位可以参见 wikipedia:

- [Request fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields)
- [Response fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields)

### cookie 与 session 的区别? 服务端如何清除 cookie?

主要区别在于, session 存在服务端, cookie 存在客户端. session 比 cookie 更安全. 而且 cookie 不一定一直能用 

(可能被浏览器关掉). 服务端可以通过设置 cookie 的值为空并设置一个及时的 expires 来清除存在客户端上的 

cookie.

### 什么是跨域请求? 如何允许跨域?

出于安全考虑, 默认情况下使用 XMLHttpRequest 和 Fetch 发起 HTTP 请求必须遵守同源策略, 即只能向相同域名请求. 向不同域名的请求被称作跨域请求 (cross-origin HTTP request). 可以通过设置 [CORS headers](https://developer.mozilla.org/en-US/docs/Glossary/CORS) 即 `Access-Control-Allow-` 系列来允许跨域. 例如:

```
location ~* ^/(?:v1|_) {
  if ($request_method = OPTIONS) { return 200 ''; }
  header_filter_by_lua '
    ngx.header["Access-Control-Allow-Origin"] = ngx.var.http_origin; # 这样相当于允许所有来源了
    ngx.header["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, PATCH, OPTIONS";
    ngx.header["Access-Control-Allow-Credentials"] = "true";
    ngx.header["Access-Control-Allow-Headers"] = "Content-Type";
  ';
  proxy_pass http://localhost:3001;
}
```

