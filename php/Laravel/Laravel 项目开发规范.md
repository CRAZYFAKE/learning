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

##3.2 路由器

**路由闭包：**

**绝不** 在路由配置文件里书写『闭包路由』或者其他业务逻辑代码，因为一旦使用将无法使用 [路由缓存](http://d.laravel-china.org/docs/5.5/controllers#route-caching) 。

路由器要保持干净整洁，**绝不** 放置除路由配置以外的其他程序逻辑。

**路由命名：**

**必须** 优先使用 Restful 路由，配合资源控制器使用，见 [文档](http://d.laravel-china.org/docs/5.5/controllers#RESTful-%E8%B5%84%E6%BA%90%E6%8E%A7%E5%88%B6%E5%99%A8)。

![1](https://fsdhubcdn.phphub.org/uploads/images/201705/19/1/09GHC72ygP.png)

超出 Restful 路由的，**应该** 模仿上图的方式来定义路由

## 3.3 数据模型

**位置：**

所有的数据模型文件，都 **必须** 存放在：`app/Models/` 文件夹中。

命名空间：

```php
namespace App\Models;
```

**使用基类：**

所有的 **Eloquent 数据模型** 都 **必须** 继承统一的基类 `App/Models/Model`，此基类存放位置为 `/app/Models/Model.php`，内容参考以下：

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Model extends EloquentModel
{
    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
```

以 Photo 数据模型作为例子继承 Model 基类：

```php
<?php

namespace App\Models;

class Photo extends Model
{
    protected $fillable = ['id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

**命名规范：**

- 数据模型类名 `必须` 为「单数」, 如：`App\Models\Photo`
- 类文件名 `必须` 为「单数」，如：`app/Models/Photo.php`
- 数据库表名字 `必须` 为「复数」，多个单词情况下使用「[Snake Case](https://en.wikipedia.org/wiki/Snake_case)」 如：`photos`, `my_photos`
- 数据库表迁移名字 `必须` 为「复数」，如：`2014_08_08_234417_create_photos_table.php`
- 数据填充文件名 `必须` 为「复数」，如：`PhotosTableSeeder.php`
- 数据库字段名 `必须` 为「[Snake Case](https://en.wikipedia.org/wiki/Snake_case)」，如：`view_count`, `is_vip`
- 数据库表主键 `必须` 为「id」
- 数据库表外键 `必须` 为「resource_id」，如：`user_id`, `post_id`
- 数据模型变量 `必须` 为「resource_id」，如：`$user_id`, `$post_id`

**关于SQL文件：**

- **绝不** 使用命令行或者 PHPMyAdmin 直接创建索引或表。**必须** 使用 [数据库迁移](http://laravel-china.org/docs/5.5/migrations) 去创建表结构，并提交版本控制器中；
- **绝不** 为了共享对数据库更改就直接导出 SQL，所有修改都 **必须** 使用 [数据库迁移](http://laravel-china.org/docs/5.5/migrations) ，并提交版本控制器中；
- **绝不** 直接向数据库手动写入伪造的测试数据。**必须** 使用 [数据填充](http://laravel-china.org/docs/5.5/seeding) 来插入假数据，并提交版本控制器中。

**全局作用域：**

Laravel 的 [Model 全局作用域](https://laravel-china.org/docs/5.3/eloquent#global-scopes) 允许我们为给定模型的所有查询添加默认的条件约束。

所有的全局作用域都 **必须** 统一使用 `闭包定义全局作用域`，如下：

```php
/**
 * 数据模型的启动方法
 *
 * @return void
 */
protected static function boot()
{
    parent::boot();

    static::addGlobalScope('age', function(Builder $builder) {
        $builder->where('age', '>', 200);
    });
}
```

## 3.4 控制器

**必须** 使用资源的复数形式，如：

> - 类名：PhotosController
> - 文件名：PhotosController.php

## 3.5 视图

https://fsdhub.com/books/laravel-specification/506/view

## 3.6 表单验证

https://fsdhub.com/books/laravel-specification/507/form-validation

## 3.7 授权策略

**授权策略：**

**必须** 使用 [授权策略](http://d.laravel-china.org/docs/5.5/authorization#policies) 类来做用户授权。

https://fsdhub.com/books/laravel-specification/508/policy

## 3.8 数据填充

**factory 辅助函数：**

`必须` 使用 `factory` 方法来做数据填充，因为是框架提倡的，并且可以同时为测试代码服务。

**运行效率：**

开发数据填充时，`必须` 特别注意 `php artisan db:seed` 的运行效率，否则随着项目的代码量越来越大，`db:seed` 的运行时间会变得越来越长，有些项目多达几分钟甚至几十分钟。

原则是：

> Keep it lighting speed.

只有当 `db:seed` 运行起来很快的时候，才能完全利用数据填充工具带来的便利，而不是累赘。

**批量入库：**

所有假数据入库操作，都 **必须** 是批量操作，配合 `factory` 使用以下方法：

```php
$users = factory(User::class)->times(1000)->make();
User::insert($users->toArray());
```

以上只执行一条数据库语句，推荐阅读 [大批量假数据填充的正确方法](https://laravel-china.org/topics/2066/the-correct-method-for-filling-large-quantity-of-false-data)。

## 3.9 日期和时间

**必须** 使用 [Carbon](https://github.com/briannesbitt/Carbon) 来处理日期和时间相关的操作。

Laravel 5.1 中文的 `diffForHumans` 可以使用 [jenssegers/date](https://github.com/jenssegers/date)。

Laravel 5.3 及以上版本的 `diffForHumans`，只需要在 `config/app.php` 文件中配置 `locale` 选项即可 ：

```php
'locale' => 'zh-CN',
```

#四. 其他

## 4.1 Laravel 安全实践

**关闭DEBUG：**

Laravel Debug 开启时，会暴露很多能被黑客利用的服务器信息，所以，生产环境下请 **必须** 确保：

```php
APP_DEBUG=false
```

**防XSS：**

跨站脚本攻击（cross-site scripting，简称 XSS），具体危害体现在黑客能控制你网站页面，包括使用 JS 盗取 Cookie 等，关于 XSS 的介绍请前往 [IBM 文档库：跨站点脚本攻击深入解析](https://www.ibm.com/developerworks/cn/rational/08/0325_segal/) 。

默认情况下，在无法保证用户提交内容是 100% 安全的情况下，**必须** 使用 Blade 模板引擎的 `{{ $content }}`语法会对用户内容进行转义。

Blade 的 `{!! $content !!}` 语法会直接对内容进行 **非转义** 输出，使用此语法时，**必须** 使用 [HTMLPurifier for Laravel 5](https://github.com/mewebstudio/Purifier) 来为用户输入内容进行过滤。使用方法参见： [使用 HTMLPurifier 来解决 Laravel 5 中的 XSS 跨站脚本攻击安全问题](https://laravel-china.org/articles/4798/the-use-of-htmlpurifier-to-solve-the-xss-xss-attacks-of-security-problems-in-laravel)

**防SQL注入：**

> Laravel 的 [查询构造器](http://d.laravel-china.org/docs/5.3/queries) 和 [Eloquent](http://d.laravel-china.org/docs/5.3/eloquent) 是基于 PHP 的 PDO，PDO 使用 `prepared` 来准备查询语句，保障了安全性。

在使用 `raw()` 来编写复杂查询语句时，**必须** 使用数据绑定。

正确操作，利用 [select 方法](http://d.laravel-china.org/api/5.3/Illuminate/Database/ConnectionInterface.html#method_select) 的第二个参数做数据绑定：

```php
Route::get('sql-injection', function() {
    $name = "admin"; // 假设用户提交
    $password = "xx' OR 1='1"; // // 假设用户提交
    $result = DB::select(
        DB::raw("SELECT * FROM users WHERE name =:name and password = :password"),
        [
            'name' => $name,
            'password' => $password,
        ]
    );
    dd($result);
});
```

`DB` 类里的大部分执行 SQL 的函数都可传参第二个参数 `$bindings` ，详见：[API 文档](http://d.laravel-china.org/api/5.3/Illuminate/Database/ConnectionInterface.html) 。

**批量赋值：**

Laravel 提供白名单和黑名单过滤（`$fillable` 和 `$guarded`），开发者 **应该** 清楚认识批量赋值安全威胁的情况下合理灵活地运用。

批量赋值安全威胁，指的是用户可更新本来不应有权限更新的字段。举例，`users` 表里的 `is_admin` 字段是用来标识用户『是否是管理员』，某不怀好意的用户，更改了『修改个人资料』的表单，增加了一个字段：

```javascript
<input name="is_admin" value="1" />
```

这个时候如果你更新代码如下：

```php
Auth::user()->update(Request::all());
```

此用户将获取到管理员权限。可以有很多种方法来避免这种情况出现，最简单的方法是通过设置 User 模型里的 `$guarded` 字段来避免：

```php
protected $guarded = ['id', 'is_admin'];
```

**CSRF: **

CSRF 跨站请求伪造是 Web 应用中最常见的安全威胁之一，具体请见 [Wiki - 跨站请求伪造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0) 或者 [Web 应用程序常见漏洞 CSRF 的入侵检测与防范](https://www.ibm.com/developerworks/cn/rational/r-cn-webcsrf/)。

Laravel 默认对所有『非幂等的请求』强制使用 `VerifyCsrfToken` 中间件防护，需要开发者做的，是区分清楚什么时候该使用『非幂等的请求』。

> 幂等请求指的是：'HEAD', 'GET', 'OPTIONS'，既无论你执行多少次重复的操作都不会给资源造成变更。

- 所有删除的动作，**必须** 使用 DELETE 作为请求方法；
- 所有对数据更新的动作，**必须** 使用 POST、PUT 或者 PATCH 请求方法。

## 4.2 Laravel 程序优化

https://fsdhub.com/books/laravel-specification/527/laravel-optimization

## 4.3 代码生成器 

[代码生成器](https://fsdhub.com/books/laravel-specification/527/laravel-optimization)

#五. 附录