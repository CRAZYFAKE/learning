[TOC]

## 1. 目录结构

| 文件夹名称                      | 简介                                       |
| -------------------------- | ---------------------------------------- |
| app                        | 应用程序的业务逻辑代码存放文件夹                         |
| app/Console                | 存放自定义 Artisian 命令文件                      |
| app/Console/Commands       | 自定义 Artisan 命令文件                         |
| app/Console/Commands/stubs | 自定义命令相关的文件模板                             |
| app/Exceptions             | 存放异常、错误码，以及处理异常文件                        |
| app/Http/Controllers       | 存放控制器文件                                  |
| app/Http/Middleware        | 存放「中间件」文件                                |
| app/Logic                  | 数据库逻辑层                                   |
| app/Models                 | 数据库 ORM 映射文件，每个文件对应一张表                   |
| bootstrap                  | 框架启动与自动加载设置相关的文件                         |
| bootstrap/tools            | 工具类文件夹，以文件区分不同功能的工具类                     |
| composer.json              | 应用依赖的扩展包                                 |
| composer.lock              | 扩展包列表，确保这个应用的副本使用相同版本的扩展包                |
| config                     | 应用程序的配置文件                                |
| config/custom.php          | 项目自定义配置文件                                |
| database                   | 数据库操作相关文件（数据库迁移和数据填充）                    |
| node_modules               | 存放 NPM 依赖模块                              |
| package.json               | 应用所需的 NPM 包配置文件                          |
| phpunit.xml                | 测试工具 PHPUnit 的配置文件                       |
| public                     | 前端控制器和资源相关文件（图片、JavaScript、CSS）          |
| readme.md                  | 项目介绍说明文件                                 |
| resources                  | 应用资源                                     |
| resources/assets           | 未编译的应用资源文件（图片、JavaScript、CSS）            |
| resources/lang             | 多语言文件                                    |
| resources/views            | 视图文件                                     |
| routes/api.php             | 用于定义 API 类型的路由                           |
| routes/channels.php        | 事件转播注册信息                                 |
| routes/console.php         | 用于定义 Artisan 命令                          |
| routes/web.php             | 用于定义 Web 类型的路由（重点，大部分情况下本书会用到）           |
| server.php                 | 使用 PHP 内置服务器时的 URL 重写（类似于 Apache 的 "mod_rewrite" ） |
| storage                    | 编译后的视图、基于会话、文件缓存和其它框架生成的文件               |
| storage/app                | 目录可用于存储应用程序使用的任何文件                       |
| storage/framework          | 目录被用于保存框架生成的文件及缓存                        |
| storage/logs               | 应用程序的日志文件                                |
| tests                      | 应用测试相关文件                                 |
| vendor                     | Composer 依赖模块                            |
| webpack.mix.js             | Laravel 的前端工作流配置文件                       |
| yarn.lock                  | Yarn 依赖版本锁定文件                            |
| .gitignore                 | 被 Git 所忽略的文件                             |
| .env                       | 环境变量配置文件                                 |

## 2. 自定义 Artisan 命令

**项目创建 Model 命令：**

```shell
php artisan mtime:model ModelName
```

查看帮助：

```shell
php artisan mtime:model -h
```

参数列表：

| 参数名              | 含义                          |
| ---------------- | --------------------------- |
| -c, --controller | 为该 Model 创建一个对应的 Controller |
| -f, --factory    | 创建数据填充文件                    |
| -m, --migration  | 创建数据库迁移文件                   |
| -p, --pivot      |                             |
| -r, --resource   | 资源                          |
| -l, --logic      | 创建数据库逻辑层                    |
| -a, --all        | 包含上面所有的命令，一个参数搞定            |
| --force          | 强制创建，及时 Model 以及存在          |

**创建 Controller 命令：**

```shell
php artisan mtime:controller Controller
```

查看帮助：

```shell
php artisan mtime:controller -h
```

**创建 Logic 命令：**

```shell
php artisan mtime:logic ModelLogic
```

查看帮助：

```shell
php artisan mtime:controller -h
```

## 3. 异常和错误处理

目录：`app/Exceptions`

包含：

* 错误码，包括与 **客户端定义和后端自用的错误** `ErrorCode.php`
* 自定义异常，如 参数错误异常 `ParamsExecption.php`
* 异常处理，代码在 `Handler.php` 的 `render()` 函数

## 4. 业务逻辑层

目录：`app/Http`

包含：

* 存放 controller , 目录`/Controllers/`

  所有的接口业务逻辑 **必须** 写到该目录下，且与 Model 对应，并且各个 Controller 之间 **禁止** 相互调用 

* 存放 中间件，目录 `/Middleware`

## 5. 模型逻辑层

目录：`app/Logic`

主要是 **隔离** Controller 和 Model 的调用，封装 Model 的 **增删改查**

Controller **禁止** 直接调用 Model 的方法，**必须** 通过 Logic 层来调用

每个 Model 对应一个 Logic，但是每个 Controller 可以对应多个 Logic

## 6. 模型层

目录：`app/Models`

数据库 ORM 映射文件，每个文件对应一张表

## 7. 工具类

目录：`app/bootstrap/tools`

所有的工具类 **必须** 放到该目录下

处理不同事物的工具类，**必须** 分文件放到该目录下，如有一个 图片处理的工具类，可以命名为 `image.php` 放到该目录下

最后，工具类需要在 `app/bootstrap/app.php` 文件中加载，使用 `require` 关键字

## 8. 配置文件

目录：`app/config`

项目中用到的所有配置都 **必须** 放到该目录下

目前自定义的配置放到了 `config/custom.php` 文件下，如果后期配置项非常多的时候，可以考虑分文件

> 注意事项：
>
> 所有程序配置信息 **必须** 通过 `config()` 来读取
>
> 所有的 `.env` 配置信息 **必须** 通过 `config()` 来读取
>
> **绝不** 在配置文件以外的范围使用 `env()`。

## 9. 数据库迁移和数据填充

目录：`app/database`

所有与此相关的文件，必须使用上面的 **自定义命令** 来创建

* 数据库迁移文件目录 `app/database/migrations`
* 数据填充目录 `app/database/factories`
* artisan seed命令 源文件 `app/database/seeds`

