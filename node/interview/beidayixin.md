#### 1.nodejs 有哪些优缺点?

#### 2.nodejs 的同步和异步怎么理解?

#### 3.如何避免回调地狱?

#### 4.express如何获取路由参数?

#### 5.express中app和router的区别?

#### 6.node有哪些定时功能?

#### 7.apache和nginx有什么区别?

#### 8.Cookies 如何防范XSS攻击?

#### 9.什么是闭包, 闭包有哪些用处?

#### 10.使用mongo的有点和缺点?

#### 11.mongo有哪些优化措施?

#### 12.==和===有什么不同?

#### 13. MySQL优化

最佳实践

1. 使用 `EXPLAIN` 关键字查看所执行的语句, 是否用到了索引, 是否扫描的全表

2. 使用 `LIMIT 1` 来查询具有唯一数据的表

3. 避免使用 `SELECT *` , 否则会全表扫描, 浪费带宽

4. 分割比较长的 DELETE/UPDATE/INSERT 语句

5. 使用恰当的数据类型

6. Index clounms in the `WHERE` clause

7. Index columns used in `JOIN`

8. 开启慢查询日志

   1) 查看慢查询日志是否开启

   ```shell
   SHOW VARIABLES LIKE '%slow_query_log%';
   ```

   2) 开启慢查询日志

   ```shell
   SET GLOBAL slow_query_log=1;
   ```

   3) 查看慢查询日志阙值

   ```shell
   SHOW [GLOBAL] VARIABLES LIKE '%long_query_time%';
   ```

   这个值表示超过多长时间的SQL语句会被记录到慢查询日志中

   4) 设置慢查询日志阈值

   ```shell
   SET GLOBAL long_query_time=3;
   ```

   5) 查看多少SQL语句超过了阙值

   ```shell
   SHOW GLOBAL STATUS LIKE '%Slow_queries%';
   ```






