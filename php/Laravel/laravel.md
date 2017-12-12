[TOC]





## Laravel目录介绍

| 文件夹名称                | 简介                                       |
| -------------------- | ---------------------------------------- |
| app                  | 应用程序的业务逻辑代码存放文件夹                         |
| app/Console          | 存放自定义 Artisian 命令文件                      |
| app/Http/Controllers | 存放控制器文件                                  |
| app/Http/Middleware  | 存放「中间件」文件                                |
| bootstrap            | 框架启动与自动加载设置相关的文件                         |
| composer.json        | 应用依赖的扩展包                                 |
| composer.lock        | 扩展包列表，确保这个应用的副本使用相同版本的扩展包                |
| config               | 应用程序的配置文件                                |
| database             | 数据库操作相关文件（数据库迁移和数据填充）                    |
| node_modules         | 存放 NPM 依赖模块                              |
| package.json         | 应用所需的 NPM 包配置文件                          |
| phpunit.xml          | 测试工具 PHPUnit 的配置文件                       |
| public               | 前端控制器和资源相关文件（图片、JavaScript、CSS）          |
| readme.md            | 项目介绍说明文件                                 |
| resources            | 应用资源                                     |
| resources/assets     | 未编译的应用资源文件（图片、JavaScript、CSS）            |
| resources/lang       | 多语言文件                                    |
| resources/views      | 视图文件                                     |
| routes/api.php       | 用于定义 API 类型的路由                           |
| routes/channels.php  | 事件转播注册信息                                 |
| routes/console.php   | 用于定义 Artisan 命令                          |
| routes/web.php       | 用于定义 Web 类型的路由（重点，大部分情况下本书会用到）           |
| server.php           | 使用 PHP 内置服务器时的 URL 重写（类似于 Apache 的 "mod_rewrite" ） |
| storage              | 编译后的视图、基于会话、文件缓存和其它框架生成的文件               |
| storage/app          | 目录可用于存储应用程序使用的任何文件                       |
| storage/framework    | 目录被用于保存框架生成的文件及缓存                        |
| storage/logs         | 应用程序的日志文件                                |
| tests                | 应用测试相关文件                                 |
| vendor               | Composer 依赖模块                            |
| webpack.mix.js       | Laravel 的前端工作流配置文件                       |
| yarn.lock            | Yarn 依赖版本锁定文件                            |
| .gitignore           | 被 Git 所忽略的文件                             |
| .env                 | 环境变量配置文件                                 |

具体的目录与 Laravel 的版本有关系，但是涉及到的差异也并不是很大。

### laravel-package-top-100

laravel使用前100名的第三方包：[laravel-package-top-100](https://github.com/summerblue/laravel-package-top-100)

## php artisan的使用

1. 创建模型和迁移文件

   ```shell
   php artisan make:model Models/Article -m
   ```


   创建模型以及对应的控制器，以及数据库迁移文件

   ```shell
   php artisan make:model Models/User -m
   php artisan make:controller UsersController -r
   ```

   麻烦，下面一行命令解决

   ```shell
   php artisan make:model Models/Item -crm
   ```


2. 执行数据库迁移文件

   ```shell
   php artisan migrate
   ```
   执行上面命令的时候，查询一张名字叫做`migrations`的记录表，如果表儿名已经存在该数据库，则不会新建表，如果不存在，则新建。如果重复创建的话，会报错：

   ```shell
                                                                                           
     [PDOException]                                                                        
     SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'jobs' already exists 
     
   ```

   如果没有表需要迁移的话，会打印以下信息：

   ```shell
   Nothing to migrate.
   ```
   迁移回滚：

   ```shell
   php artisan migrate:rollback
   ```

3. 数据填充

   ```Shell
   #创建填充文件
   php artisan make:seeder ArticleTableSeeder
   #执行单个填充文件
   php artisan db:seed --class=ArticleTableSeeder
   #批量执行填充文件
   php artisan db:seed
   ```

4. 单元测试

   ```shell
   #创建单元测试
   php artisan make:test UserTest 
   ```

   ​

   ​

## artisan 命令修改数据库字段

**如何修改已存在的字段类型、重命名字段以及删除字段等操作？**

**1）**前提条件：需要添加 `doctrine/dbal` 依赖，有下面两个依赖

a）在 `composer.json` 文件的 `require` 字段中添加：

```json
"require": {
    "doctrine/dbal": "^2.6"
}
```

b）直接运行下面命令：

```shell
composer require doctrine/dbal
```

**2）** 创建数据库迁移文件：

```shell
php artisan make:migration v1_update_tables
```

『 v1_update_tables 』名称可以自定义，运行完之后，会在 `database/migrations` 目录下生成一个文件：

`2017_12_12_161615_v1_update_tables.php` 修改字段的代码在『 这个文件』内写。

**3）** 编写修改字代码，举栗子：

**修改：** `change` 方法让你可以修改一些已存在的字段类型，或修改字段属性

我们把 `users` 的 `name` 字段长度增加到 50，在 `up` 函数，添加一下代码

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('name', 50)->change();
});
```

我们也能将字段修改为 nullable：

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('name', 50)->nullable()->change();
});
```

> 下面的字段类型不能被「修改」:
>
> **char，double，enum，mediumInteger，timestamp，tinyInteger，ipAddress，json，jsonb，macAddress，mediumIncre**

**重命名：**使用数据库结构构造器的 `renameColumn` 方法

我们把 `users` 中的 `from` 字段改为 `to`

```php
Schema::table('users', function (Blueprint $table) {
    $table->renameColumn('from', 'to');
});
```

**移除字段：**使用数据库结构构造器的 `dropColumn` 方法

```php
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('votes');
});
```

你可以传递多个字段的数组至 `dropCloumn` 方法来移除多个字段：

```php
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```

> SQLite 数据库并不支持在单个迁移中移除或修改多个字段。

**4）** 执行数据库迁移命令

```shell
php artisan migrate
```





## 创建自定义的 PHP 辅助函数

Laravel 提供了很多优秀的 [辅助函数](https://d.laravel-china.org/docs/5.5/helpers) 来处理数组、文件路径、字符串和路由，还有最受欢迎的 `dd()` 函数。

你还可以利用 Composer 的自动加载为你的 Laravel 应用和 PHP 程序包定义自己的辅助函数。

要在 Laravel 应用程序中引用辅助函数，你可以根据偏好决定辅助函数文件的位置，下面有几个建议的位置：

- `app/helpers.php`
- `app/Http/helpers.php`

这里更推荐保存在应用程序命名空间的根目录下 `app/helpers.php`。

**1）**在 `app` 目录下创建 `helpers.php` 文件

**2）**在 Laravel 的 `composer.json` 文件中看到 `autoload` 和 `autoload-dev` 这两个键

如果想添加辅助函数文件，`composer.json` 中 `autoload` 有一个 `files` 键，添加下面代码：

      ```php
"autoload": {
    "files": [
        "app/helpers.php"
    ]
}
      ```

**3）**添加了新的路径到 `files` 数组中之后，你需要执行以下命令：

```shell
composer dump-autoload
```

**4）** 现在每个请求中，都会自动加载 `helpers.php` 文件，因为 Laravel 在 `public/index.php` 中使用 Composer 的自动加载器：

```php
require __DIR__.'/../vendor/autoload.php';
```

**5）** 定义函数

在辅助函数类中定义函数是很简单的，但是有些事情要注意：所有的 Laravel 辅助函数文件都包含在一个检查中以避免函数定义冲突：

```php
if (! function_exists('env')) {
    function env($key, $default = null) {
        // ...
    }
}
```

因为你可能会遇到你正在使用的函数定义，而你根本不知道哪一个是第一个定义的，这可能会变得棘手。

更推荐在辅助函数文件中使用 `function_exists` 检查，但是如果在单个文件中定义辅助函数，那就不需要了。

## 单元测试

### 安装phpunit

#### linux下安装

1. 下载脚本

   ```shell
   wget https://phar.phpunit.de/phpunit.phar
   ```

   > [phpunit](https://phar.phpunit.de)里有全部版本的phpunit

2. 添加执行权限

   ```shell
   chmod +x phpunit.phar
   ```

3. 全局安装

   ```shell
   mv phpunit.phar /usr/local/bin/phpunit
   ```

4. 查看phpunit版本（确认phpunit是否安装成功）

   ```shell
   phpunit --version
   ```

   mac自带PHP版本太低会有提示：

   ```shell
   PHPUnit 6.4.3 by Sebastian Bergmann and contributors.

   This version of PHPUnit is supported on PHP 7.0 and PHP 7.1.
   You are using PHP 5.6.30 (/usr/bin/php).
   ```

   > **需要更新PHP版本**

#### windows下安装

window下安装phpunit需要先安装pear，安装过程如下：

1. 下载go-pear.phar。链接：http://pear.php.net/go-pear.phar

2. 将go-pear.phar移到php目录，运行

   ```shell
   php go-pear.phar
   ```

注：安装过程中可以根据提示，选择全局安装还是局部安装，设置目录。最后会提示需要修改php.ini，点击确定即可。最后，运行pear，显示用法，即表示安装成功。如需要升级，可以执行```pear upgrade-all```。

#### PHPUnit版本

1. PHPUnit 6.4 是目前的 **稳定** 版本[公告](https://github.com/sebastianbergmann/phpunit/wiki/Release-Announcement-for-PHPUnit-6.4.0)

   它 *稳定* 于 2017年10月06日，PHPUnit 6于2019年02月08日结束支持。

   PHPUnit 6.4 支持 PHP 7.0, 和 PHP 7.1.


2. PHPUnit 5.7 是之前旧的 **稳定** 版本[公告](https://github.com/sebastianbergmann/phpunit/wiki/Release-Announcement-for-PHPUnit-5.7.0)

   它 *稳定* 于 2016年12月02日。

   PHPUnit 5.7 支持于 PHP 5.6, PHP 7.0 和 PHP 7.1， PHPUnit 5 将于2018年02月02日结束维护支持。

> **由于mac自带php5.6，而且升级比较麻烦，下面的例子以PHPunit5.7版本为例**

### 写测试代码

执行下面命令：

```shell
php artisan make:test UserTest 
```

会在`tests`目录下生成一个`UserTest.php`文件，我们测试代码写到里面就好，下面`/hello`路由，会返回json如下

```json
{
  id: 1,
  name: "yyx"
}
```

测试代码：

```php
class UserTest extends TestCase {
	/**
	 * 测试post方法，返回json
	 * A basic test example.
	 *
	 * @return void
	 */
	public function testExample() {
		$this->get('/hello', [])
			->seeJson([
				'id'   => 1,
				'name' => 'yyx'
			]);
    }
}
```

粗略验证json使用方法`seeJson`，精确验证json使用方法`seeJsonEquals`。

如果你想要在应用中生成自定义HTTP请求并获取完整的`Illuminate\Http\Response`对象，可以使用`call`方法：

```php
public function testApplication(){
    $response = $this->call('GET', '/');
    $this->assertEquals(200, $response->status());
}
```

**处理数据库**

你可以使用帮助函数`seeInDatabase`来断言数据库中的数据是否和给定数据集合匹配。

```php
public function testDatabase(){
    // 调用应用...
    $this->seeInDatabase('users', ['email' => 'sally@foo.com']);
}
```

还可以使用所有PHPUnit内置的断言函数来补充测试。

一种方式是每次测试后回滚数据库并在下次测试前重新迁移。Lumen提供了一个简单的`DatabaseMigrations` trait来自动为你处理。

```php
<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ExampleTest extends TestCase{
    use DatabaseMigrations;

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->get('/foo');
    }
}
```

另一种方式是将每一个测试用例包裹到一个数据库事务中，Lumen提供了方便的 `DatabaseTransactions` trait自动为你处理：

```php
<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ExampleTest extends TestCase{
    use DatabaseTransactions;

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->get('/foo');
    }
}
```

测试时，通常需要在执行**测试前插入新数据到数据库**，在创建测试数据时，Lumen允许你使用“factories”为每个[Eloquent模型](http://laravelacademy.org/post/6184.html)定义默认的属性值集合，而不用手动为每一列指定值。

我们看一下`atabase/factories/ModelFactory.php`文件，该文件包含了一个工厂定义：

```php
$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});
```

**测试中使用工厂**

定义好工厂后，可以在测试或数据库填充文件中通过全局的`factory`方法使用它们来生成模型实例。

```php
public function testDatabase(){
    $user = factory(App\User::class)->make();
    // 用户模型测试...
}
```

如果你想要覆盖模型的一些默认值，可以传递数组值到`make`方法。只有指定值被替换，其他数据保持不变：

```php
$user = factory(App\User::class)->make([
    'name' => 'Abigail',
]);
```

**持久化工厂模型**

`create`方法不仅能创建模型实例，还可以使用Eloquent的`save`方法将它们保存到数据库：

```php
public function testDatabase(){
    $user = factory(App\User::class)->create();
    //用户模型测试...
}
```

你仍然可以通过传递数组到create方法覆盖模型上的属性：

```php
$user = factory(App\User::class)->create([
    'name' => 'Abigail',
]);
```

**添加关联关系到模型**

你甚至可以持久化多个模型到数据库。在本例中，我们添加一个关联到创建的模型，使用`create`方法创建多个模型的时候，会返回一个[Eloquent集合](http://laravelacademy.org/post/6201.html)实例，从而允许你使用集合提供的所有便利方法，例如`each`：

```php
$users = factory(App\User::class)
           ->create()
           ->each(function($u) {
                $u->posts()->save(factory(App\Post::class)->make());
            });
```

**模拟事件**

暂时没用到

### 执行测试

在前面配置好所有的东西即可，在项目根目录下执行

```shell
phpuint
```