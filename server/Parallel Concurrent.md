[TOC]

# 并发和并行

[原文链接](http://joearms.github.io/2013/04/05/concurrent-and-parallel-programming.html)

[翻译链接](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/event-async.md#%E5%B9%B6%E8%A1%8C%E5%B9%B6%E5%8F%91)

并行 (Parallel) 与并发 (Concurrent) 是两个很常见的概念.

![](https://camo.githubusercontent.com/a986e69f6ef3236fda5fb7e0e0e9b5cb1133f6ba/687474703a2f2f6a6f6561726d732e6769746875622e696f2f696d616765732f636f6e5f616e645f7061722e6a7067)

并发 (Concurrent) = 2 队列对应 1 咖啡机.

并行 (Parallel) = 2 队列对应 2 咖啡机.

Node.js 通过事件循环来挨个抽取实践队列中的一个个 Task 执行, 从而避免了传统的多线程情况下 `2个队列对应 1个咖啡机` 的时候上线文切换以及资源争抢/同步的问题, 所以获得了高并发的成就.

至于在 node 中并行, 你可以通过 cluster 来再添加一个咖啡机.