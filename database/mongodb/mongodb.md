[TOC]

### 一.删除操作

#### 1.删除数据库

查看所有数据库

```Mongo
> show dbs
local   0.078GB
test    0.078GB
```

切换数据库

```mongo
> use test
switched to db test
> 
```

删除数据库

```mongo
> db.dropDatabase()
{ "dropped" : "runoob", "ok" : 1 }
```

#### 2.删除集合

```mongo
> db.collection.drop()
```

age:

```mongo
> use test
switched to db test
> show tables
site
> db.site.drop()
true
> show tables
> 
```

#### 3.删除文档

删除文档的基本语法如下：

**Mongodb 2.6版本以前的语法：**

```
db.collection.remove(
   <query>,
   <justOne>
)
```

**Mongodb 2.6版本以后的语法：**

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

参数详情：

- **query **:（可选）删除的文档的条件。
- **justOne **: （可选）如果设为 true 或 1，则只删除一个文档。
- **writeConcern **:（可选）抛出异常的级别。

如果要删除所有数据的话：

```mongo
> db.collections.remove({})
```

