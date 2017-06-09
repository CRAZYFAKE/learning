[TOC]

## Elasticsearch搜索

### 1.特性

- 安装方便：没有其他依赖，下载后安装非常方便；只用修改几个参数就可以搭建起来一个集群
- JSON：输入/输出格式为 JSON，意味着不需要定义 Schema，快捷方便
- RESTful：基本所有操作（索引、查询、甚至是配置）都可以通过 HTTP 接口进行
- 分布式：节点对外表现对等（每个节点都可以用来做入口）；加入节点自动均衡
- 多租户：可根据不同的用途分索引；可以同时操作多个索引 

### 2.基本概念

#### Data：

- Index：Elasticsearch用来存储数据的逻辑区域，它类似于关系型数据库中的database 概念。一个index可以在一个或者多个shard上面，同时一个shard也可能会有多个replicas。

- Document：Elasticsearch里面存储的实体数据，类似于关系数据中一个table里面的一行数据。 document由多个field组成，不同的document里面同名的field一定具有相同的类型。document里面field可以重复出现，也就是一个field会有多个值，即multivalued。

- Document type：为了查询需要，一个index可能会有多种document，也就是document type. 它类似于关系型数据库中的 table 概念。但需要注意，不同document里面同名的field一定要是相同类型的。

- Mapping：它类似于关系型数据库中的 schema 定义概念。存储field的相关映射信息，不同document type会有不同的mapping。

  ​

  与关系数据对比：

  ![对比图](https://raw.githubusercontent.com/siddontang/elasticsearch-note/master/data/comparison.png)

| 关系数据库                       | ES                       |
| --------------------------- | ------------------------ |
| Database（数据库）               | Index（索引）                |
| Table（表）                    | Type（类型）                 |
| Row（行）                      | Document（文档）             |
| Column（列/字段）                | Field（字段）                |
| Schema（模式，包括：表、视图、存储过程、索引等） | Mapping（映射）              |
| Index（索引）                   | Everthing is indexed（索引） |
| SQL（sql语句）                  | Query DSL（查询方法）          |
| SELECT * FROM table         | GET http:// ...          |
| UPDATE table SET            | PUT http:// ..           |

#### Server：

- Node: 一个server实例
- Cluster：多个node组成cluster
- Shard：数据分片，一个index可能会有多个shards，不同shards可能在不同nodes
- Replica：shard的备份，有一个primary shard，其余的叫做replica shards
- Gateway：管理cluster状态信息

### 3.分片

ES是一个分布式系统，**我们一开始就应该以集群的方式来使用它** ，这句话是重点圈起来要考的。

保存索引时会选择适合的“**主**分片”（Primary Shard），分片默认为5。

有主分片也有副本分片，副本分片作用：

1. 高可用：某分片节点挂了的话可走其他副本分片节点，节点恢复后上面的分片数据可通过其他节点恢复
2. 负载均衡：ES 会自动根据负载情况控制搜索路由，副本分片可以将负载均摊

### 4.RESTful

这个特性非常方便，最关键的是 ES 的 HTTP 接口不只是可以进行业务操作（索引/搜索），还可以进行配置，甚至是关闭 ES 集群。下面我们介绍几个很常用的接口：

-  /_cat/nodes?v：查集群状态
-  /_cat/shards?v：查看分片状态
-  /${index}/${type}/_search：搜索

v 是 verbose 的意思，这样可以更可读（有表头，有对齐），_cat 是监测相关的 APIs，/_cat?help 来获取所有接口。${index} 和 ${type} 分别是具体的某一索引某一类型，是分层次的。我们也可以直接在所有索引所有类型上进行搜索：/_search。

#### RESTful API with JSON over HTTP

一个 Elasticsearch 请求和任何 HTTP 请求一样由若干相同的部件组成：

```url
curl -X<VERB> '<PROTOCOL>://<HOST>:<PORT>/<PATH>?<QUERY_STRING>' -d '<BODY>'
```

被 `< >` 标记的部件：

| VERB         | 适当的 HTTP *方法* 或 *谓词* : `GET`获取、 `POST`修改、 `PUT`增加、 `HEAD`检测是否存在 或者 `DELETE`删除数据。 |
| ------------ | :--------------------------------------- |
| PROTOCOL     | `http` 或者 `https`（如果你在 Elasticsearch 前面有一个 `https` 代理） |
| HOST         | Elasticsearch 集群中任意节点的主机名，或者用 `localhost` 代表本地机器上的节点。 |
| PORT         | 运行 Elasticsearch HTTP 服务的端口号，默认是 `9200` 。 |
| PATH         | API 的终端路径（例如 `_count` 将返回集群中文档数量）。Path 可能包含多个组件，例如：`_cluster/stats` 和 `_nodes/stats/jvm` 。 |
| QUERY_STRING | 任意可选的查询字符串参数 (例如 `?pretty` 将格式化地输出 JSON 返回值，使其更容易阅读) |
| BODY         | 一个 JSON 格式的请求体 (如果请求需要的话)                |

#### 索引/添加数据

```javascript
curl -XPUT 'http://localhost:9200/megacorp/employee/3/?pretty' -d '{
    "first_name" :  "Douglas",
    "last_name" :   "Fir",
    "age" :         35,
    "about":        "I like to build cabinets",
    "interests":  [ "forestry" ]
}'
```

`/megacorp/employee/3` 包含了三部分的信息：

​    `megacorp`

​	索引名称

​    `employee`

​	类型名称

​    `1`

​	特定雇员的ID

返回结果：

```java
{
  "_index" : "megacorp",
  "_type" : "employee",
  "_id" : "1",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "created" : false
}
```



#### 检索文档

```java
GET /megacorp/employee/1
curl -XGET 'http://localhost:9200/megacorp/employee/1/?pretty'
```

返回结果包含了文档的一些元数据，以及 `_source` 属性，内容是 John Smith 雇员的原始 JSON 文档：

```java
{
  "_index" :   "megacorp",
  "_type" :    "employee",
  "_id" :      "1",
  "_version" : 1,
  "found" :    true,
  "_source" :  {
      "first_name" :  "John",
      "last_name" :   "Smith",
      "age" :         25,
      "about" :       "I love to go rock climbing",
      "interests":  [ "sports", "music" ]
  }
}
```

将 HTTP 命令由 `PUT` 改为 `GET` 可以用来检索文档，同样的，可以使用 `DELETE` 命令来删除文档，以及使用 `HEAD` 指令来检查文档是否存在。如果想更新已存在的文档，只需再次 `PUT` 。

#### 轻量搜索

```java
GET /megacorp/employee/_search
curl -XGET 'http://localhost:9200/megacorp/employee/_search/?pretty'
```

我们仍然使用索引库 `megacorp` 以及类型 `employee`，但与指定一个文档 ID 不同，这次使用 `_search` 。返回结果包括了所有三个文档，放在数组 `hits` 中。一个搜索默认返回十条结果。

```java
{
  "took" : 99,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 3,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "2",
        "_score" : 1.0,
        "_source" : {
          "first_name" : "Jane",
          "last_name" : "Smith",
          "age" : 32,
          "about" : "I like to collect rock albums",
          "interests" : [
            "music"
          ]
        }
      },
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "first_name" : "John",
          "last_name" : "Smith",
          "age" : 25,
          "about" : "I love to go rock climbing",
          "interests" : [
            "sports",
            "music"
          ]
        }
      },
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "3",
        "_score" : 1.0,
        "_source" : {
          "first_name" : "Douglas",
          "last_name" : "Fir",
          "age" : 35,
          "about" : "I like to build cabinets",
          "interests" : [
            "forestry"
          ]
        }
      }
    ]
  }
}
```

注意：返回结果不仅告知匹配了哪些文档，还包含了整个文档本身：显示搜索结果给最终用户所需的全部信息。

第二搜索姓氏为 ``Smith`` 的雇员，我们将使用一个 *高亮* 搜索，很容易通过命令行完成。这个方法一般涉及到一个 *查询字符串* （_query-string_） 搜索，因为我们通过一个URL参数来传递查询信息给搜索接口：

```java
GET /megacorp/employee/_search?q=last_name:Smith
curl -XGET 'localhost:9200/megacorp/employee/_search?q=last_name:Smith&pretty'
```

搜索结果：

```java
{
  "took" : 13,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.2876821,
    "hits" : [
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "2",
        "_score" : 0.2876821,
        "_source" : {
          "first_name" : "Jane",
          "last_name" : "Smith",
          "age" : 32,
          "about" : "I like to collect rock albums",
          "interests" : [
            "music"
          ]
        }
      },
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "1",
        "_score" : 0.2876821,
        "_source" : {
          "first_name" : "John",
          "last_name" : "Smith",
          "age" : 25,
          "about" : "I love to go rock climbing",
          "interests" : [
            "sports",
            "music"
          ]
        }
      }
    ]
  }
}
```

#### 使用查询表达式搜索

Elasticsearch 提供一个丰富灵活的查询语言叫做 *查询表达式* ， 它支持构建更加复杂和健壮的查询。

*领域特定语言* （DSL）

以像这样重写之前的查询所有 Smith 的搜索 ：

```java
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "match" : {
            "last_name" : "Smith"
        }
    }
}
'
```

搜索结果与之前完全相同，但还是可以看到有一些变化。其中之一是，不再使用 *query-string* 参数，而是一个请求体替代。这个请求使用 JSON 构造，并使用了一个 `match` 查询（属于查询类型之一，后续将会了解）。

#### 更复杂的搜索

同样搜索姓氏为 Smith 的雇员，但这次我们只需要年龄大于 30 的。查询需要稍作调整，使用过滤器 *filter* ，它支持高效地执行一个结构化查询。

```java
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "bool": {
            "must": {
                "match" : {
                    "last_name" : "smith" 
                }
            },
            "filter": {
                "range" : {
                    "age" : { "gt" : 30 } 
                }
            }
        }
    }
}
'
```

#### 全文搜索

一项传统数据库确实很难搞定的任务。

搜索下所有喜欢攀岩（rock climbing）的雇员：

```java
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "match" : {
            "about" : "rock climbing"
        }
    }
}'
```

使用之前的 `match` 查询在`about` 属性上搜索 “rock climbing” 。得到两个匹配的文档：

```java
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.53484553,
    "hits" : [
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "1",
        "_score" : 0.53484553,
        "_source" : {
          "first_name" : "John",
          "last_name" : "Smith",
          "age" : 25,
          "about" : "I love to go rock climbing",
          "interests" : [
            "sports",
            "music"
          ]
        }
      },
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "2",
        "_score" : 0.26742277,
        "_source" : {
          "first_name" : "Jane",
          "last_name" : "Smith",
          "age" : 32,
          "about" : "I like to collect rock albums",
          "interests" : [
            "music"
          ]
        }
      }
    ]
  }
}
```

```_score```为相关性得分，Elasticsearch 默认按照相关性得分排序，即每个文档跟查询的匹配程度。第一个最高得分的结果很明显：John Smith 的 `about` 属性清楚地写着 “rock climbing” 。

但为什么 Jane Smith 也作为结果返回了呢？原因是她的 `about` 属性里提到了 “rock” 。因为只有 “rock” 而没有 “climbing” ，所以她的相关性得分低于 John 的。

这是一个很好的案例，阐明了 Elasticsearch 如何 *在* 全文属性上搜索并返回相关性最强的结果。Elasticsearch中的 *相关性* 概念非常重要，也是完全区别于传统关系型数据库的一个概念，数据库中的一条记录要么匹配要么不匹配。

#### 短语搜索

默认为10条

找出一个属性中的独立单词是没有问题的，但有时候想要精确匹配一系列单词或者*短语* 。 比如， 我们想执行这样一个查询，仅匹配同时包含 “rock” *和* “climbing” ，*并且* 二者以短语 “rock climbing” 的形式紧挨着的雇员记录。

为此对 `match` 查询稍作调整，使用一个叫做 **`match_phrase`** 的查询：

```java
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    }
}'
```

返回结果仅有 John Smith 的文档：

```java
{
  "took" : 16,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.53484553,
    "hits" : [
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "1",
        "_score" : 0.53484553,
        "_source" : {
          "first_name" : "John",
          "last_name" : "Smith",
          "age" : 25,
          "about" : "I love to go rock climbing",
          "interests" : [
            "sports",
            "music"
          ]
        }
      }
    ]
  }
}
```

#### 高亮搜索

每个搜索结果中 *高亮* 部分文本片段

再次执行前面的查询，并增加一个新的 `highlight` 参数：

```java
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    },
    "highlight": {
        "fields" : {
            "about" : {}
        }
    }
}'
```

当执行该查询时，返回结果与之前一样，与此同时结果中还多了一个叫做 `highlight` 的部分。这个部分包含了 `about` 属性匹配的文本片段，并以 HTML 标签 `<em></em>` 封装：

```java
{
  "took" : 8,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.53484553,
    "hits" : [
      {
        "_index" : "megacorp",
        "_type" : "employee",
        "_id" : "1",
        "_score" : 0.53484553,
        "_source" : {
          "first_name" : "John",
          "last_name" : "Smith",
          "age" : 25,
          "about" : "I love to go rock climbing",
          "interests" : [
            "sports",
            "music"
          ]
        },
        "highlight" : {
          "about" : [
            "I love to go <em>rock</em> <em>climbing</em>"
          ]
        }
      }
    ]
  }
}
```

#### 分析数据

asticsearch 有一个功能叫聚合（aggregations），允许我们基于数据生成一些精细的分析结果。聚合与 SQL 中的 `GROUP BY` 类似但更强大。

举个例子，挖掘出雇员中最受欢迎的兴趣爱好：

```java
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "aggs": {
    "all_interests": {
      "terms": { "field": "interests" }
    }
  }
}'
```

在5.x版本查询时报错：

搜了一下应该是5.x后对排序，聚合这些操作用单独的[数据结构](http://lib.csdn.net/base/datastructure)(fielddata)缓存到内存里了，需要单独开启，官方解释在此[fielddata](https://www.elastic.co/guide/en/elasticsearch/reference/current/fielddata.html)

简单来说就是在聚合前执行如下操作：

```java
curl -XPUT 'localhost:9200/megacorp/_mapping/employee?pretty' -H 'Content-Type: application/json' -d'
{
  "properties": {
    "interests": { 
      "type":     "text",
      "fielddata": true
    }
  }
}'
```

返回：

```java
{
  "acknowledged" : true
}
```

之后再执行上面的查询，即可得到以下数据：

```java
{
   ...
   "hits": { ... },
   "aggregations": {
      "all_interests": {
         "buckets": [
            {
               "key":       "music",
               "doc_count": 2
            },
            {
               "key":       "forestry",
               "doc_count": 1
            },
            {
               "key":       "sports",
               "doc_count": 1
            }
         ]
      }
   }
}
```

可以看到，两位员工对音乐感兴趣，一位对林地感兴趣，一位对运动感兴趣。这些聚合并非预先统计，而是从匹配当前查询的文档中即时生成。

如果想知道叫 Smith 的雇员中最受欢迎的兴趣爱好，可以直接添加适当的查询来组合查询：

```java
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": {
    "match": {
      "last_name": "smith"
    }
  },
  "aggs": {
    "all_interests": {
      "terms": {
        "field": "interests"
      }
    }
  }
}'
```

`all_interests` 聚合已经变为只包含匹配查询的文档：

```java
{
  ....
  "aggregations" : {
    "all_interests" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "music",
          "doc_count" : 2
        },
        {
          "key" : "sports",
          "doc_count" : 1
        }
      ]
    }
  }
}
```

聚合还支持分级汇总 。比如，查询特定兴趣爱好员工的平均年龄：

```java
GET /megacorp/employee/_search
{
    "aggs" : {
        "all_interests" : {
            "terms" : { "field" : "interests" },
            "aggs" : {
                "avg_age" : {
                    "avg" : { "field" : "age" }
                }
            }
        }
    }
}
```

得到的聚合结果有点儿复杂，但理解起来还是很简单的：

```
 ...
  "all_interests": {
     "buckets": [
        {
           "key": "music",
           "doc_count": 2,
           "avg_age": {
              "value": 28.5
           }
        },
        {
           "key": "forestry",
           "doc_count": 1,
           "avg_age": {
              "value": 35
           }
        },
        {
           "key": "sports",
           "doc_count": 1,
           "avg_age": {
              "value": 25
           }
        }
     ]
  }
```

#### 支持脚本更新文档

举个栗子，我要更改``megacorp/employee/1``的年龄

```java
POST /megacorp/employee/1/_update
{
   "script" : "ctx._source.age+=1"
}

DSL:
curl -XPOST 'http://localhost:9200/megacorp/employee/1/_update/?pretty' -d '{
  "script": "ctx._source.age+=1"
}'
```

### 5.[排序与相关性](https://www.elastic.co/guide/cn/elasticsearch/guide/current/_Sorting.html)

默认为相关性排序，可以对搜索的字段进行排序，也可以多级排序

#### 按字段值排序

通过时间来对 tweets 进行排序是有意义的，最新的 tweets 排在最前。 我们可以使用`sort` 参数进行实现：

```java
curl -XGET 'localhost:9200/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "bool" : {
            "filter" : { "term" : { "user_id" : 1 }}
        }
    },
    "sort": { "date": { "order": "desc" }}
}'
```

得到的结果会发现：``_score``不被计算，因为它并没有用于排序。

每个结果中有一个新的名为 `sort` 的元素，它包含了用于排序的值。 在这个栗子中，按照 `date` 进行排序，在内部被索引为 *自 epoch 以来的毫秒数* 。 long 类型数 `1411516800000` 等价于日期字符串 `2014-09-24 00:00:00 UTC` 。

其次 `_score` 和 `max_score` 字段都是 `null` 。 计算 `_score` 的花销巨大，通常仅用于排序； 我们并不根据相关性排序，所以记录 `_score` 是没有意义的。如果无论如何你都要计算 `_score` ， 你可以将`track_scores` 参数设置为 `true` 。

#### 多级排序

假定我们想要结合使用 `date` 和 `_score` 进行查询，并且匹配的结果首先按照日期排序，然后按照相关性排序：

```java
curl -XGET 'localhost:9200/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "bool" : {
            "must":   { "match": { "tweet": "manage text search" }},
            "filter" : { "term" : { "user_id" : 2 }}
        }
    },
    "sort": [
        { "date":   { "order": "desc" }},
        { "_score": { "order": "desc" }}
    ]
}'
```

排序条件的顺序是很重要的。结果首先按第一个条件排序，仅当结果集的第一个 `sort` 值完全相同时才会按照第二个条件进行排序，以此类推。

多级排序并不一定包含 `_score` 。你可以根据一些不同的字段进行排序， 如地理距离或是脚本计算的特定值。

#### 字段多值的排序

一种情形是字段有多个值的排序， 需要记住这些值并没有固有的顺序；一个多值的字段仅仅是多个值的包装，这时应该选择哪个进行排序呢？

对于数字或日期，你可以将多值字段减为单值，这可以通过使用 `min` 、 `max` 、 `avg` 或是 `sum` *排序模式* 。例如你可以按照每个 `date` 字段中的最早日期进行排序，通过以下方法：

```java
"sort": {
    "dates": {
        "order": "asc",
        "mode":  "min"
    }
}
```



[字符串排序与多字段排序](https://www.elastic.co/guide/cn/elasticsearch/guide/current/multi-fields.html)

[什么是相关性](https://www.elastic.co/guide/cn/elasticsearch/guide/current/relevance-intro.html)

[Doc Values介绍](https://www.elastic.co/guide/cn/elasticsearch/guide/current/docvalues-intro.html)



### 6.数据输入和输出

#### 文档元数据

一个文档不仅仅包含它的数据 ，也包含 *元数据* —— *有关* 文档的信息。 三个必须的元数据元素如下：

- `_index`

  文档在哪存放

- `_type`

  文档表示的对象类别

- `_id`

  文档唯一标识

##### _index

一个 *索引* 应该是因共同的特性被分组到一起的文档集合。 例如，你可能存储所有的产品在索引 `products`中，而存储所有销售的交易到索引 `sales` 中。 虽然也允许存储不相关的数据到一个索引中，但这通常看作是一个反模式的做法。

实际上，在 Elasticsearch 中，我们的数据是被存储和索引在 *分片* 中，而一个索引仅仅是逻辑上的命名空间， 这个命名空间由一个或者多个分片组合在一起。 然而，这是一个内部细节，我们的应用程序根本不应该关心分片，对于应用程序而言，只需知道文档位于一个 *索引*内。 Elasticsearch 会处理所有的细节。

我们将在 [*索引管理*](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index-management.html) 介绍如何自行创建和管理索引，但现在我们将让 Elasticsearch 帮我们创建索引。 所有需要我们做的就是选择一个索引名，这个名字必须小写，不能以下划线开头，不能包含逗号。我们用`website` 作为索引名举例。

##### _type

数据可能在索引中只是松散的组合在一起，但是通常明确定义一些数据中的子分区是很有用的。 例如，所有的产品都放在一个索引中，但是你有许多不同的产品类别，比如 "electronics" 、 "kitchen" 和 "lawn-care"。

这些文档共享一种相同的（或非常相似）的模式：他们有一个标题、描述、产品代码和价格。他们只是正好属于“产品”下的一些子类。

Elasticsearch 公开了一个成为 *types* （类型）的特性，它允许您在索引中对数据进行逻辑分区。不同 types 的文档可能有不同的字段，但最好能够非常相似。 我们将在 [类型和映射](https://www.elastic.co/guide/cn/elasticsearch/guide/current/mapping.html) 中更多的讨论关于 types 的一些应用和限制。

一个 `_type` 命名可以是大写或者小写，但是不能以下划线或者句号开头，不应该包含逗号， 并且长度限制为256个字符. 我们使用 `blog` 作为类型名举例。

##### _id

*ID* 是一个字符串， 当它和 `_index` 以及 `_type` 组合就可以唯一确定 Elasticsearch 中的一个文档。 当你创建一个新的文档，要么提供自己的 `_id` ，要么让 Elasticsearch 帮你生成。

#### 领域特定语言（DSL）

[传送门](https://www.elastic.co/guide/cn/elasticsearch/guide/current/data-in-data-out.html)

### 6.配置

#### jdk

jdk-8u131-linux-x64.tar.gz放在 ``/usr/local/``目录下

解压：

```shell
tar -zxvf jdk-8u131-linux-x64.tar.gz
```

配置：

```shell
vi /etc/profile
```

添加以下内容

```java
# set java environment
export JAVA_HOME=/usr/local/jdk-8u131-linux-x64
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:${PATH}
```

保存文件，执行：

```shell
source /etc/profile
```

查看是否安装成功：

```shell
[elastic@localhost elasticsearch-5.4.0]$ java -version
java version "1.8.0_131"
Java(TM) SE Runtime Environment (build 1.8.0_131-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)
```

配置成功。

#### elastic

elasticsearch-5.4.0.tar.gz放在 ``/usr/local/``目录下

解压：

```shell
tar -zxvf elasticsearch-5.4.0.tar.gz
```

5.x版本不能用root用户登陆，只能新建用户来启动elastic

```shell
useradd elastic
chown -R elastic:elastic  elasticsearch-5.4.0
su elastic

cd elasticsearch-xxxx
bin/elasticsearch
```

后台运行：

```shell
bin/elasticsearch -d
```

#### X-Pack

X-Pack是一个Elastic Search的扩展，将安全，警报，监视，报告和图形功能包含在一个易于安装的软件包中。在Elasticsearch 5.0.0之前，您必须安装单独的Shield，Watcher和Marvel插件才能获得在X-Pack中所有的功能。

##### 安装X-Pack

```shell
cd /usr/local/elasticsearch-5.4.0
bin/elasticsearch-plugin install x-pack
```

##### 移除X-Pack

```shell
cd /usr/local/elasticsearch-5.4.0
bin/kibana-plugin remove x-pack
```

> ElasticSearch：默认用户名和密码
>
> 用户名：elastic
>
> 密码：changeme

安装X-pack之后，所有对ES的访问，增加了security机制，即需要用户名和密码，所有的RESTful API都需要在请求的header中添加``Authentication``参数，比如在PHP中：

```java
$context = array(  
    'http' => array(  
        'method' => 'GET',  
        'header' => "Content-Type: application/json\r\n".  
            "Authorization: Basic ZWxhc3RpYzpjaGFuZ2VtZQ==",  
        'content' => $payload,  
        'timeout' => 600, // 10 min  
    ),  
);  
$context = stream_context_create($context);  
$resp = @file_get_contents($url, false, $context);  
```

其中`Basic`后的字符串由```name:password```base64加密而来，此例子中为 ```elastic:changeme```

##### 更改默认密码

需要用RESTful API或者通过kibana界面管理，

```shell
http://[ipaddress]:[port]/_xpack/security/user/elastic/_password
{
	"password": "eisoo.com"
}
```

不要忘了在`header`中设置`Authorization`

### 7.启动错误

1.错误：

```shell
max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```

操作系统的vm.max_map_count参数设置太小导致的，请使用root用户登录系统，执行以下命令：

```shell
sysctl -w vm.max_map_count=655360
```

并用以下命令查看是否修改成功

```shell
sysctl -a | grep "vm.max_map_count"
```

2.

```java
max number of threads [1024] for user [elastic] is too low, increase to at least [2048]
```

修改/etc/security/limits.d/90-nproc.conf 

```shell
*          soft    nproc     1024
*          soft    nproc     2048
```

3.

```shell
max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]
```

[解决方案](https://www.elastic.co/guide/en/elasticsearch/reference/current/file-descriptors.html)

4.

```error
ERROR: bootstrap checks failed
system call filters failed to install; check the logs and fix your configuration or disable system call filters at your own risk
```

[解决方案](https://github.com/elastic/elasticsearch/issues/22899)

```shell
vim elasticsearch.yml
bootstrap.system_call_filter: false
```











































