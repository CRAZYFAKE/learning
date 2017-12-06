[TOC]

# Laravel 项目引入 jwt-auth

## 1.安装

1）通过 `composer` 安装 `jwt-auth`

编辑 `composer.json` 文件，添加下面代码，

```php
"require": {
    "tymon/jwt-auth": "0.5.*"
}
```

然后执行：

```shell
composer update
```

安装成功后，往下走

2）编辑 `config/app.php` 文件

在 `providers` 数组中添加服务提供者，

```php
Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class
```

在 `aliases` 数组中添加下面代码，

```php
'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
```

 Also included is a Facade for the PayloadFactory：

```Php
'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class
```

3）添加配置文件

**Laravel 4：**

```shell
php artisan config:publish tymon/jwt-auth
```

**Laravel 5：**

```shell
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
```

会自动生成 `config/jwt.php` 配置文件

生成随机加密密钥（有坑）：

```shell
php artisan jwt:generate
```

生成的密钥，会自动填写到 `config/jwt.php` 文件的 `secret` 字段中。

## 2.配置

- ttl：token有效期（分钟）
- refresh_ttl：刷新token时间（分钟）
- algo：token签名算法
- user：指向User模型的命名空间路径
- identifier：用于从token的sub中获取用户
- require_claims：必须出现在token的payload中的选项，否则会抛出`TokenInvalidException`异常
- blacklist_enabled：如果该选项被设置为false，那么我们将不能废止token，即使我们刷新了token，前一个token仍然有效
- providers：完成各种任务的具体实现，如果需要的话你可以重写他们
  - user —— providers.user：基于sub获取用户的实现
  - Jwt —— providers.jwt：加密/解密token
  - auth —— providers.auth：通过证书/ID获取认证用户
  - storage —— providers.storage：存储token直到它们失效

## 3.生成 token

这里有 N 种方法生成 token，简单的方式是完全不需要配置任何东西，直接使用，还有一种需要配置很多参数的。

这里有6个字段都是由JWT的标准所定义的。

- sub: 该 JWT 所面向的用户
- iss: 该 JWT 的签发者
- iat ( issued at ): 在什么时候签发的token
- exp ( expires ): token什么时候过期
- nbf ( not before )：token在此时间之前不能被接收处理
- jti：JWT ID 为 web token 提供唯一标识

### 通过用户凭证生成 token

**Laravel 5：**

```php
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthenticateController extends Controller
{
    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token'));
    }
}
```

**Laravel 4：**

```php
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthenticateController extends Controller
{
    public function authenticate()
    {
        // grab credentials from the request
        $credentials = Input::only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return Response::json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return Response::json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return Response::json(compact('token'));
    }
}
```

### 使用用户对象生成 token

1）用户对象

```php
// grab some user
$user = User::first();
$token = JWTAuth::fromUser($user);
```

2）attempt 和 fromUser 第二个参数还可以添加其他字段

```php
$customClaims = ['foo' => 'bar', 'baz' => 'bob'];

JWTAuth::attempt($credentials, $customClaims);
// or
JWTAuth::fromUser($user, $customClaims);
```

### 使用任何事物生成 token

这时候就用到了 `Tymon\JWTAuth\PayloadFactory` 这个类，

```php
$customClaims = ['foo' => 'bar', 'baz' => 'bob'];

$payload = JWTFactory::make($customClaims);

$token = JWTAuth::encode($payload);
```

还可以这样，

```php
// add a custom claim with a key of `foo` and a value of ['bar' => 'baz']
$payload = JWTFactory::sub(123)->aud('foo')->foo(['bar' => 'baz'])->make();

$token = JWTAuth::encode($payload);
```

## 4.验证 token

### 怎么传 token？

用户登录完成后会生成一个 token，那么**这个 token 怎么用呢？**

1）很简单，在请求头 `headers` 里添加如下：

```http
Authorization: Bearer {yourtokenhere}
```

这里需要注意一点，如果项目配置在 `Apache` 服务器上的话，需要修改 `apache` 配置文件，

```apache
RewriteEngine On
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```

2）在请求地址上添加参数（query string）

```Url
http://api.mysite.com/me?token={yourtokenhere}
```

###怎么验证 token？

在 Laravel 中获取用户凭证：**

```php
// this will set the token on the object
JWTAuth::parseToken();

// and you can continue to chain methods
$user = JWTAuth::parseToken()->authenticate();
```

获取 `token` 的值：

```php
$token = JWTAuth::getToken();
```

####通过 token 获取用户信息

**局部解析认证错误信息：**

```php
public function getAuthenticatedUser()
{
	try {

		if (! $user = JWTAuth::parseToken()->authenticate()) {
			return response()->json(['user_not_found'], 404);
		}

	} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

		return response()->json(['token_expired'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

		return response()->json(['token_invalid'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

		return response()->json(['token_absent'], $e->getStatusCode());
	}
	// the token is valid and we have found the user via the sub claim
	return response()->json(compact('user'));
}
```

**全局错误信息捕捉：**

**Laravel 4：**

在 `app/start/global.php` 文件加入下面代码：

```php
App::error(function(Tymon\JWTAuth\Exceptions\JWTException $e, $code)
{
	if ($e instanceof Tymon\JWTAuth\Exceptions\TokenExpiredException) {
		return Response::json(['token_expired'], $e->getStatusCode());
	} else if ($e instanceof Tymon\JWTAuth\Exceptions\TokenInvalidException) {
		return Response::json(['token_invalid'], $e->getStatusCode());
	}
});
```

**Laravel 5：**

在 `app/Exceptions/Handler.php` 文件加入下面代码：

```php
public function render($request, Exception $e)
{
	if ($e instanceof Tymon\JWTAuth\Exceptions\TokenExpiredException) {
		return response()->json(['token_expired'], $e->getStatusCode());
	} else if ($e instanceof Tymon\JWTAuth\Exceptions\TokenInvalidException) {
		return response()->json(['token_invalid'], $e->getStatusCode());
	}

	return parent::render($request, $e);
}
```

### 怎么使用中间件？

**Laravel 5**

有两个中间件可以使用：*GetUserFromToken* 和 *RefreshToken*

首先需要在 `app/Http/Kernel.php` 文件注册路由中间件，在 `$routeMiddleware` 变量中设置，

```php
protected $routeMiddleware = [
	...
	'jwt.auth'    => \Tymon\JWTAuth\Middleware\GetUserFromToken::class,
    'jwt.refresh' => \Tymon\JWTAuth\Middleware\RefreshToken::class,
];
```



## 问题

### 运行 php artison jwt:generate 出错

```shell
$ art jwt:generate

In BoundMethod.php line 135:
                                                                             
  Method Tymon\JWTAuth\Commands\JWTGenerateCommand::handle() does not exist  
```

报错信息：

```shell
Method Tymon\JWTAuth\Commands\JWTGenerateCommand::handle() does not exist  
```

目前只有 Laravel 5 有这个错误

解决方法：

https://github.com/tymondesigns/jwt-auth/issues/1298

原文：

> Hi all,
> I came upon one issue when I try to run `php artisan jwt:generate`
>  I get the Reflection Exception saying "[ReflectionException]  Method 
> Tymon\JWTAuth\Commands\JWTGenerateCommand::handle() does not exist"
>
> Both Facades and service providers are entered properly and they are valid.
>
> Also for people who have a struggle to make it work I can advise one solution. Go to **JWTGenerateCommand.php** file located in **vendor/tymon/src/Commands** and paste this part of code `public function handle() { $this->fire(); }`
>
> I know this is not an elegant solution, but it works. I hope this might help until official fix arrive.
>
> Have a nice day.

具体操作：

1）打开 `/vendor/tymon/jwt-auth/src/Commands/JWTGenerateCommand.php` 文件

或者全局搜索文件名 `JWTGenerateCommand.php`

2）加入下面代码：

```php
public function handle() { 
  $this->fire(); 
}
```

