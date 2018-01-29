

[TOC]

参考：[Laravel 虚拟开发环境 Homestead](https://d.laravel-china.org/docs/5.5/homestead)

​	   [安装 Homestead 可能会出现的一些 Problems](https://pigjian.com/article/homestead-problems)

<div id="I1001"></div>

# 准备安装

启动 `Homestead` 之前，需要安装以下软件：

| 软件          | 名称                                       | 功能                                       |
| ----------- | ---------------------------------------- | ---------------------------------------- |
| 虚拟机软件       | [VirtualBox 5.1](https://www.virtualbox.org/wiki/Downloads)<br>[VMWare](https://www.vmware.com/)<br>[Parallels](http://www.parallels.com/products/desktop/) | 三选一虚拟机软件，自动创建虚拟机，<br>推荐使用 [VirtualBox 5.1](https://www.virtualbox.org/wiki/Downloads)，因为它是免费的。<br>其余的软件见[附录：软件安装](##软件安装)， |
| 构建虚拟开发环境的工具 | [Vagrant](https://www.vagrantup.com/downloads.html) | *Vagrant* 是一款用来构建虚拟开发环境的工具，<br>非常适合 php/python/ruby/java 这类语言开发 web |

**安装 Homestead**

使用Git命令克隆代码来安装，命令如下：

```shell
cd /
git clone https://github.com/laravel/homestead.git Homestead

cd Homestead
// Clone the desired release...
git checkout v6.1.0

// Mac / Linux...
bash init.sh

// Windows...
init.bat
```

**安装Homestead Vagrant Box**，导入box

进入 /Homestead 目录下，运行：

```shell
vagrant box add laravel/homestead
```

**坑：**被墙了，所以需要翻墙，关键是一个 box 大小在 1G 左右。

或者

**安装离线包**，以 virtualbox 为例

```shell
vagrant box add laravel/homestead ~/Downloads/virtualbox.box
```

离线 virtualbox.box 地址，包含 v4.0.0、v5.0.0、v5.0.1三个版本，后续会继续添加：

链接：https://pan.baidu.com/s/1mkaJHmK  密码：f6t5



# 配置 Homestead

## 配置提供器和IP

Homestead下的`Homestead.yaml` 中的 `provider` 参数设置决定了你用的是哪一个 Vagrant 提供器：`virtualbox`、`vmware_fusion`、`vmware_workstation` 或者 `parallels`，

也就是 [准备安装](#A1001) 里的 `虚拟软件` 三者之一。

你可以根据自己的喜好来设置提供器，和 ip 地址：

```yaml
ip: "192.168.10.10"
provider: virtualbox
```

一般约定 ip 地址为 `192.168.10.10`

提供器是 `virtualbox`（免费）



## 配置共享文件夹

`Homestead.yaml` 文件的 `folders` 属性里列出所有与 Homestead 环境共享的文件夹。

这些文件夹中的文件若有变更，它们会保持本地机器与 Homestead 环境之间同步。

你可以根据需要配置多个共享文件夹：

```yaml
folders:
    - map: /Users/yaoyixiang/Documents/workspace/MAMP/mtime-ex
      to: /home/vagrant/Code/mtime-ex
```

配置多个

```yaml
folders:
    - map: /Users/yaoyixiang/Documents/workspace/MAMP/larabbs
      to: /home/vagrant/Code/larabbs
    - map: /Users/yaoyixiang/Documents/workspace/MAMP/blog
      to: /home/vagrant/Code/blog
    - map: /Users/yaoyixiang/Documents/workspace/MAMP/mtime-ex
      to: /home/vagrant/Code/mtime-ex
```



## 配置 Nginx 站点

`sites` 属性可以帮助你可以轻松地将 `域名` 映射到 homestead 环境中的文件夹。

`Homestead.yaml` 文件中已包含示例站点配置。

同样的，你也可以增加多个站点到你的 Homestead 环境中。

 Homestead 可以同时为多个 Laravel 应用提供虚拟化环境：

```yaml
sites:
    - map: mtime.test
      to: /home/vagrant/Code/mtime-ex/public
```

配置多个站点：

```yaml
sites:
    - map: larabbs.test
      to: /home/vagrant/Code/larabbs/public
    - map: blog.fuck
      to: /home/vagrant/Code/blog/public
    - map: mtime.test
      to: /home/vagrant/Code/mtime-ex/public
```

更改了 `sites` 节点之后，需要运行 `vagrant reload --provision` 来更新虚拟机上 Nginx 的配置。

## 修改hosts

将 `sites` 的站点名配置到 `hosts` 上，`hosts` 文件会将 Homestead 站点的请求重定向到 Homestead Box 中。

**Mac或Linux上：**该文件位于 `/etc/hosts`

**Windows上：**位于 `C:\Windows\System32\drivers\etc\hosts`

添加内容如下

```hosts
192.168.10.10  mtime.test
```

[启动vagrant]() 之后，你就可以在浏览器访问站点：

```html
http://mtime.test
```



# Vagrant 常用命令

前提：进入 /Homestead 目录

**初始化：**

```shell
// Mac / Linux...
bash init.sh

// Windows...
init.bat
```

**启动虚拟机：**

```shell
vagrant up
```

**关闭虚拟机：**

```shell
vagrant halt
```

**重启虚拟机：**

```shell
vagrant reload
```

**更新配置重启：**

```shell
vagrant reload --provision
```

**连接虚拟机：**

```shell
vagrant ssh
```

**更新 Homestead：**

```shell
vagrant box update
```

**销毁当前虚拟机：**

```shell
vagrant destroy
```

**挂起虚拟机：**

```shell
vagrant suspend
```

**唤醒虚拟机：**

```shell
vagrant resume
```

**查看本地box列表：**

```shell
vagrant box list
```

**添加box到列表：**

```shell
vagrant box add
```

**从box列表移除：**

```shell
vagrant box remove
```





# 附录

## 软件安装

若要使用 VMware 提供器，你需要同时购买 VMware Fusion／Workstation 以及 [VMware Vagrant 插件](https://www.vagrantup.com/vmware)。尽管 VMware 不是免费的，但 VMware 可以提供更快的共享文件夹性能。

若要使用 Parallels 提供器，你需要安装 [Parallels Vagrant 插件](https://github.com/Parallels/vagrant-parallels)。这是免费的。

所以我选 [VirtualBox 5.1](https://www.virtualbox.org/wiki/Downloads) 。