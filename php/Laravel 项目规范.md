1. PHP 版本、Laravel 版本

   [Laravel 版本选择](https://fsdhub.com/books/laravel-specification/512/laravel-version-selection)

   根据Laravel版本选择最合适的PHP版本

   >  建议
   >
   >  Laravel 5.5
   >
   >  PHP >= 7.0.0

2. 返回数据封装

   ```json
   {
     "status": 1,
     "msg": "success",
     "data": []
   }
   ```

   mtime代码：

   ```php
   //否则插入插入
   $data['phone'] = $phone;
   $data['code'] = $code;
   $insert_id = DB::table('main_sms')->insertGetid($data);
   if ($insert_id) {
       $newdata['status'] = 1;
       $newdata['msg'] = '成功';
       $newdata['data'] = array();
       return json_encode($newdata);
   } else {
       $newdata['status'] = 0;
       $newdata['msg'] = '失败';
       $newdata['data'] = array();
       return json_encode($newdata);
   }
   ```

3. 代码风格

   PSR1/PSR2

   mtime代码：

   ```php
   $data['username']=addslashes(trim($request->input('username')));
   $data['password']=addslashes(trim($request->input('password')));
   $result=DB::table('system_admin')->where($data)->first();
   if($result){
       $result=$this->objectToArray($result);
       Session::put('phone', $result['username']);
       Session::put('password', $result['password']);
       Session::save();
       return view('admin/site');
   }else{
       return view('admin/login');
   }
   ```

   等号之间没有空格等。

4. 用户认证

   token、session、passport？

   mtime代码：

   ```php
   //更新用户的token
   $uid_token = time() . mt_rand(1000, 9999);
   DB::table('main_user')->where('phone', $data['phone'])->update(['uid_token' => $uid_token]);
   $result = DB::table('main_user')->where($data)->first();
   $result = $this->objectToArray($result);
   ```

   使用 `时间戳 + 1000~9999` 的随机数。

5. 单元测试

   PHPunit

   mtime代码：

   ```php
   无单元测试
   ```

6. 数据库Model

   使用 `Eloquent`， [Eloquent](http://d.laravel-china.org/docs/5.3/eloquent) 是基于 PHP 的 PDO，PDO 使用 `prepared` 来准备查询语句，保障了安全性。

   1）数据库模型放在 `app/Http/Models` 还是 `app/Models`目录下？ 

   2）使用 [数据库迁移](http://laravel-china.org/docs/5.5/migrations) 去创建表结构

   3）使用 [数据填充](http://laravel-china.org/docs/5.5/seeding) 来插入假数据

   mtime代码：

   ```php
   $data = array();
   $data['phone'] = addslashes(trim($request->input('phone')));
   $data['password'] = addslashes(trim($request->input('password')));
   //判断密码是否正确
   $result = DB::table('main_user')->where($data)->first();
   ```

   如果不用 Eloquent ，使用`DB::table()`的方式，使用 `raw()` 来编写复杂查询。

   例如：

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

7. 静态常量存储文件，包括错误码

   类似于 node.js 项目的 `value.js`

   mtime代码：

   ```php
   无
   ```

8. 参数过滤，主要防止sql注入

   `idoool/mtime` 项目中使用PHP函数 `addslashes()` 防sql注入

   >  [Eloquent](http://d.laravel-china.org/docs/5.3/eloquent) 是基于 PHP 的 PDO，PDO 使用 `prepared` 来准备查询语句，保障了安全性。

