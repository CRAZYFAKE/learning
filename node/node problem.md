[1.Node.js 热更新](http://blog.csdn.net/u013444046/article/details/51509053)

[2.Node.js 模块循环依赖](https://cnodejs.org/topic/4f16442ccae1f4aa27001045)

[3.module.exports 和 exports 的区别](https://cnodejs.org/topic/5734017ac3e4ef7657ab1215)

[4.console.log()是异步的吗 ，不确定](http://blog.csdn.net/kissliux/article/details/19195817)

[5.进程的当前工作目录是什么? 有什么作用?](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/process.md#process)

> 当前进程启动的目录, 通过 `process.cwd()` 获取当前工作目录 (current working directory), 通常是命令行启动的时候所在的目录 (也可以在启动时指定), 文件操作等使用相对路径的时候会相对当前工作目录来获取文件.
>
> 一些获取配置的第三方模块就是通过你的当前目录来找配置文件的. 所以如果你错误的目录启动脚本, 可能没法得到正确的结果. 在程序中可以通过 `process.chdir()` 来改变当前的工作目录.

[6.child_process.fork 与 POSIX 的 fork 有什么区别?](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/process.md#child-process)

> Node.js 的 `child_process.fork()` 在 Unix 上的实现最终调用了 POSIX [fork(2)](http://man7.org/linux/man-pages/man2/fork.2.html), 而 POSIX 的 fork 需要手动管理子进程的资源释放 (waitpid), child_process.fork 则不用关心这个问题, Node.js 会自动释放, 并且可以在 option 中选择父进程死后是否允许子进程存活.

[7.父进程或子进程的死亡是否会影响对方? 什么是孤儿进程?](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/process.md#child-process)

> 子进程死亡不会影响父进程, 不过子进程死亡时（线程组的最后一个线程，通常是“领头”线程死亡时），会向它的父进程发送死亡信号. 反之父进程死亡, 一般情况下子进程也会随之死亡, 但如果此时子进程处于可运行态、僵死状态等等的话, 子进程将被`进程1`（init 进程）收养，从而成为孤儿进程. 另外, 子进程死亡的时候（处于“终止状态”），父进程没有及时调用 `wait()` 或 `waitpid()` 来返回死亡进程的相关信息，此时子进程还有一个 `PCB` 残留在进程表中，被称作僵尸进程.

[8.Nodejs编写守护进程](https://cnodejs.org/topic/57adfadf476898b472247eac)

[9.在 IPC 通道建立之前, 父进程与子进程是怎么通信的? 如果没有通信, 那 IPC 是怎么建立的?](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/process.md#%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1)

[10.node.js stream](https://github.com/zoubin/streamify-your-node-program)

[11.动态修改 NodeJS 程序中的变量值](http://code.oneapm.com/nodejs/2015/06/27/intereference)

[12.如何分析 Node.js 中的内存泄漏](https://zhuanlan.zhihu.com/p/25736931?group_id=825001468703674368)

[]()

[]()

[]()

[]()

[]()

[]()

[]()

[]()

[]()

[]()

[]()

[]()

