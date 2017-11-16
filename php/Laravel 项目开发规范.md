[TOC]



> 参考 [Laravel 项目开发规范](https://fsdhub.com/books/laravel-specification)

#一. 前言

#二. 项目规范

## 2.1 Laravel版本选择

以下是 [Laravel 的版本路线图](https://laravel-china.org/articles/2594/laravel-release-roadmap)：

| 版本          | 发布日期        | 版本类型     | 维护周期                                |
| ----------- | ----------- | -------- | ----------------------------------- |
| Laravel 5.1 | 2015 年 6 月  | LTS 长久支持 | Bug 修复 2017 年 6 月份，安全修复 2018 年 6 月份 |
| Laravel 5.2 | 2015 年 12 月 | 一般发行     | 提供 6 个月的 Bug 修复支持，一年的安全修复支持         |
| Laravel 5.3 | 2016 年 8 月  | 一般发行     | 提供 6 个月的 Bug 修复支持，一年的安全修复支持         |
| Laravel 5.4 | 2017 年 1 月  | 一般发行     | 提供 6 个月的 Bug 修复支持，一年的安全修复支持         |
| Laravel 5.5 | 2017 年 8 月  | LTS 长久支持 | Bug 修复 2019 年 8 月份，安全修复 2020 年 8 月份 |

选择 Laravel 版本时，**应该** 优先考虑 LTS 版本，因为安全性和稳定性考虑，商业项目开发中 **不应该** 使用最新版本的 『Laravel 一般发行版』 。扩展阅读：[如何选择 Laravel 框架版本](https://laravel-china.org/topics/2595/how-to-select-the-laravel-framework-version)。

请使用以下命令来创建指定版本的 Laravel 项目：

```shell
composer create-project laravel/laravel project-name --prefer-dist "5.5.*"
```

##2.2 开发和线上环境

[开发和线上环境](https://fsdhub.com/books/laravel-specification/511/development-environment)

## 2.3 开发专用扩展包

[开发专用扩展包](https://fsdhub.com/books/laravel-specification/513/development-specific-extensions-package)

## 2.4 配置信息与环境变量

假如我们有个『CDN 域名』的变量，在 Laravel 中有以下几种方法：

1. 硬代码，直接写死。- ❌ 可维护性低
2. 写死在 `config/app.php` 文件中。 - ❌ 无法区分环境进行配置
3. 存储于 `.env` 文件中，使用 `env()` 方法直接读取。 - ❌ 虽然解决了环境变量问题但是不推荐
4. 存储在 `.env` 和 `config/app.php` 文件中，然后使用 `config()` 函数来读取。- ✅ 最佳实践

### 代码示例

`.env` 文件中设置：

```
CDN_DOMAIN=cdndomain.com
```

`config/app.php` 文件中设置：

```
'cdn_domain' => env('CDN_DOMAIN', null),
```

程序中两种获取 `相同配置` 的方法：

1. `env('CDN_DOMAIN')`
2. `config('app.cdn_domain')`

在此统一规定：所有程序配置信息 **必须** 通过 `config()` 来读取，所有的 `.env` 配置信息 **必须** 通过 `config()` 来读取，**绝不** 在配置文件以外的范围使用 `env()`。

##2.5 辅助函数

Laravel 提供了很多 [辅助函数](http://d.laravel-china.org/docs/5.5/helpers)，有时候我们也需要创建自己的辅助函数。

**必须** 把所有的『自定义辅助函数』存放于 `bootstrap` 文件夹中。

并在 `bootstrap/app.php` 文件的最顶部进行加载：

```php
<?php

require __DIR__ . '/helpers.php';

...
```

## 2.6 项目文档编写规范

文档页面排版 **必须** 遵循 [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines) ，在此基础上。

##2.7 工具统一

[工具统一](https://fsdhub.com/books/laravel-specification/525/tool-unification)

#三. 编码规范

## 3.1 代码风格

代码风格 **必须** 严格遵循 [PSR-2](http://www.php-fig.org/psr/psr-2/) 规范。

[PhpStorm设置PSR-2代码规范](http://laraveldaily.com/how-to-configure-phpstorm-for-psr-2/)，具体操作如下：

```operate
Preferences -> Editor -> Code style[PHP] -> Set From -> Predefined Style[PSR1/PSR2]
```



##3.2

#四. 杂项

#五. 附录