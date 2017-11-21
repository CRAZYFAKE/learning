

[TOC]

[Laravel 虚拟开发环境 Homestead](https://d.laravel-china.org/docs/5.5/homestead)

# 准备安装

启动 `Homestead` 之前，需要安装以下软件：

| 软件          | 名称                                       | 功能                                       |
| ----------- | ---------------------------------------- | ---------------------------------------- |
| 虚拟机软件       | [VirtualBox 5.1](https://www.virtualbox.org/wiki/Downloads)<br> [VMWare](https://www.vmware.com/)<br> [Parallels](http://www.parallels.com/products/desktop/) | 三选一虚拟机软件，自动创建虚拟机，<br>推荐使用 [VirtualBox 5.1](https://www.virtualbox.org/wiki/Downloads)，因为它是免费的。<br>其余的软件见[附录：软件安装](##软件安装)， |
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

**安装Homestead Vagrant Box**

进入 /Homestead 目录下，运行：

```shell
vagrant box add laravel/homestead
```

可能会比较慢，建议翻墙



# 配置 Homestead

##配置提供器

Homestead下的`Homestead.yaml` 中的 `provider` 参数设置决定了你用的是哪一个 Vagrant 提供器：`virtualbox`、`vmware_fusion`、`vmware_workstation` 或者 `parallels`。你可以根据自己的喜好来设置提供器：

```yaml
provider: virtualbox
```



##配置共享文件夹

`Homestead.yaml` 文件的 `folders` 属性里列出所有与 Homestead 环境共享的文件夹。这些文件夹中的文件若有变更，它们会保持本地机器与 Homestead 环境之间同步。你可以根据需要配置多个共享文件夹：

```yaml
folders:
    - map: ~/Code
      to: /home/vagrant/Code
```

若要启动 [NFS](https://www.vagrantup.com/docs/synced-folders/nfs.html)，只需要在共享的文件夹配置中添加一个简单的标志：

```yaml
folders:
    - map: ~/Code
      to: /home/vagrant/Code
      type: "nfs"
```

> 使用 NFS 时，建议你安装 [vagrant-bindfs](https://github.com/gael-ian/vagrant-bindfs) 插件。这个插件会替你处理 Homestead Box 中的文件或目录权限问题。



##配置 Nginx 站点

`sites` 属性可以帮助你可以轻松地将 `域名` 映射到 homestead 环境中的文件夹。`Homestead.yaml` 文件中已包含示例站点配置。同样的，你也可以增加多个站点到你的 Homestead 环境中。 Homestead 可以同时为多个 Laravel 应用提供虚拟化环境：

```yaml
sites:
    - map: homestead.app
      to: /home/vagrant/Code/Laravel/public
```

更改了 `sites` 节点之后，需要运行 `vagrant reload --provision` 来更新虚拟机上 Nginx 的配置。



## 修改hosts

将 `sites` 的站点名配置到 `hosts` 上，`hosts` 文件会将 Homestead 站点的请求重定向到 Homestead Box 中。

**Mac或Linux上：**该文件位于 `/etc/hosts`

**Windows上：**位于 `C:\Windows\System32\drivers\etc\hosts`

添加内容如下

```hosts
192.168.10.10  homestead.app
```

[启动vagrant]()这样，你就可以在浏览器访问站点：

```html
http://homestead.app
```



# vagrant命令

前提：进入 /Homestead 目录

**初始化：**

```shell
// Mac / Linux...
bash init.sh

// Windows...
init.bat
```

**启动：**

```shell
vagrant up
```

**关闭：**

```shell
vagrant destroy --force
```

**重启：**

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

**更新 Homestead**

```shell
vagrant box update
```



# 附录

## 软件安装

若要使用 VMware 提供器，你需要同时购买 VMware Fusion／Workstation 以及 [VMware Vagrant 插件](https://www.vagrantup.com/vmware)。尽管 VMware 不是免费的，但 VMware 可以提供更快的共享文件夹性能。

若要使用 Parallels 提供器，你需要安装 [Parallels Vagrant 插件](https://github.com/Parallels/vagrant-parallels)。这是免费的。