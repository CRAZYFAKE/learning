[TOC]

### 1.网络分层

	#### OSI七层与TCP/IP分层

**OSI 七层协议参考模型 与 TCP/IP协议 实现网络模型 对比:**

| OSI中的层                                   | 功能                  | TCP/IP协议族                          |
| ---------------------------------------- | ------------------- | ---------------------------------- |
| 应用层                                      | 文件传输，电子邮件，文件服务，虚拟终端 | TFTP，HTTP，SNMP，FTP，SMTP，DNS，Telnet |
| 表示层                                      | 数据格式化，代码转换，数据加密     | 没有协议                               |
| 会话层                                      | 解除或建立与别的接点的联系       | 没有协议                               |
| [传输层](http://hi.baidu.com/haifengjava/blog/item/e6b554cb91cba016bf09e672.html) | 提供端对端的接口            | TCP，UDP                            |
| 网络层                                      | 为数据包选择路由            | IP，ICMP，RIP，OSPF，BGP，IGMP          |
| [数据链路层](http://hi.baidu.com/haifengjava/blog/item/7a4983afdf5893c57dd92a6a.html) | 传输有地址的帧以及错误检测功能     | SLIP，CSLIP，PPP，ARP，RARP，MTU        |
| 物理层                                      | 以二进制数据形式在物理媒体上传输数据  | ISO2110，IEEE802。IEEE802.2          |

**OSI模型和TCP/IP协议之间的关系和区别：**

- IP协议对应OSI模型的第三层—网络层
- TCP协议对应OSI模型的第四层传输层和第五层会话层的部分功能
- TCP/IP协议并不对网络会话层(OSI模型第五层的一部分)发生的具体事情进行假设，而OSI模型定义了集中多层标准化功能。
- TCP/IP协议并不对IP网络层下的链路层再进行分层协定，而OSI模型指定了两个分层。

![](https://raw.githubusercontent.com/CRAZYFAKE/learning/master/_picture/osi%20tcpip.png)

#### 

### 传输层

**TCP连接**

三次握手：

![](http://img.blog.csdn.net/20170104214009596?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2h1c2xlaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



（1）第一次握手：建立连接时，客户端A发送SYN包（SYN=j）到服务器B，并进入SYN_SEND状态，等待服务器B确认。

（2）第二次握手：服务器B收到SYN包，必须确认客户A的SYN（ACK=j+1），同时自己也发送一个SYN包（SYN=k），即SYN+ACK包，此时服务器B进入SYN_RECV状态。

（3）第三次握手：客户端A收到服务器B的SYN＋ACK包，向服务器B发送确认包ACK（ACK=k+1），此包发送完毕，客户端A和服务器B进入ESTABLISHED状态，完成三次握手。

**TCP断开**

四次挥手：

![](http://hi.csdn.net/attachment/201108/7/0_1312718564tZXD.gif)

客户端或服务器均可主动发起挥手动作，在socket编程中，任何一方执行close()操作即可产生挥手操作

1. 客户端A发送一个FIN，用来关闭客户A到服务器B的数据传送。 
2. 服务器B收到这个FIN，它发回一个ACK，确认序号为收到的序号加1。和SYN一样，一个FIN将占用一个序号。 
3. 服务器B关闭与客户端A的连接，发送一个FIN给客户端A。 
4. 客户端A发回ACK报文确认，并将确认序号设置为收到序号加1。 

**【问题1】为什么连接的时候是三次握手，关闭的时候却是四次握手？**

因为当Server端收到Client端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。但是关闭连接时，当Server端收到FIN报文时，很可能并不会立即关闭SOCKET，所以只能先回复一个ACK报文，告诉Client端，"你发的FIN报文我收到了"。只有等到我Server端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送。故需要四步握手。

**【问题2】为什么TIME_WAIT状态需要经过2MSL(最大报文段生存时间)才能返回到CLOSE状态？**

虽然按道理，四个报文都发送完毕，我们可以直接进入CLOSE状态了，但是我们必须假象网络是不可靠的，有可以最后一个ACK丢失。所以TIME_WAIT状态就是用来重发可能丢失的ACK报文。

