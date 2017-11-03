Laravel目录介绍

app 核心代码
 Http 代码

config 配置文件

database 数据库

public 静态资源文件

resources 视图，原始资源文件
  views V

tests 单元测试

### php artisan的使用

1. 创建模型和迁移文件

   ```
   php artisan make:model Http/Models/Article -m
   ```


2. 执行数据库迁移文件

   ```
   php artisan migrate
   ```
   执行上面命令的时候，查询一张名字叫做`migrations`的记录表，如果表儿名已经存在该数据库，则不会新建表，如果不存在，则新建。如果重复创建的话，会报错：

   ```
                                                                                           
     [PDOException]                                                                        
     SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'jobs' already exists 
     
   ```

   如果没有表需要迁移的话，会打印以下信息：

   ```
   Nothing to migrate.
   ```
   迁移回滚：

   ```
   php artisan migrate:rollback
   ```

   ​

3. 数据填充

   ```
   #创建填充文件
   php artisan make:seeder ArticleTableSeeder
   #执行单个填充文件
   php artisan db:seed --class=ArticleTableSeeder
   #批量执行填充文件
   php artisan db:seed
   ```

   ​

4. 1

5. 1

6. 1

7. 1

8. 1

