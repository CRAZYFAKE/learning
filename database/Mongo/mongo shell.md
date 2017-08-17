[TOC]

# mongo shell

mongodb版本3.4.6

## mongodump

当前版本：r3.4.6

> 备份数据到本地 [官方文档](http://docs.mongodb.org/manual/reference/program/mongodump/)

1. `--help`

   返回使用mongodump帮助信息

2. `--version, -v`
   版本信息

3. `--quiet`

   运行mongodump不会打印很多信息

4. `--host <hostname><:port>, -h <hostname><:port>`

   默认是 `--host localhost:27017`

   可以同时备份多个数据库实例，使用方法`<replSetName>/<hostname1><:port>,<hostname2><:port>,<...>`

5. `--port <port>`

   通过TCP连接mongodb实例的端口号，默认是27017

6. `--ipv6`

   v3.0版本已经移除

7. `--ssl`

   v2.6新添加

   通过TLS/SSL连接mongo实例

8. `--sslCAFile <filename>`

   v2.6新添加

   通过TLS/SSL连接mongo实例，<filename>以.pem结尾的文件

9. `--username <username>, -u <username>`

   用户名

10. `--password <password>, -p <password>`

   对应用户名的密码

11. `--db <database>, -d <database>`

    选择要备份的数据库

12. `--collection <collection>, -c <collection>`

    选择要备份的集合

13. `--query <json>, -q <json>`

    备份符合条件的数据

14. `--queryFile <path>`

    与13相同，查询条件通过文件引入

15. `--gzip`

    备份的文件进行压缩，文件名以 .gz 结尾

16. `--out <path>, -o <path>`

    备份之后文件的存放目录，默认为当前执行备份命令的目录

## mongorestore

当前版本：r3.4.6

> 恢复mongodump导出的数据 [官方文档](https://docs.mongodb.com/manual/reference/program/mongorestore/)

1. `--objcheck`

   检测要导入的数据是否符合为object

2. `--oplogReplay `                                         replay oplog for point-in-time restore

3. `--oplogLimit=<seconds>[:ordinal]`   replay oplog for point-in-time restore

4. `--oplogFile=<filename> `                       oplog file to use for replay of oplog

5. `--archive=<filename> `                            restore dump from the specified archive file.  If flag is specified without a value, archive is read from stdin

6. `--dir=<directory-name>`                        input directory, use '-' for stdin 

7. `--gzip `                                                        decompress gzipped input 

   导入dump输出的.gz压缩文件

8. `--drop`                                                         drop each collection before import

   导入数据之前，删除原有的数据库数据             

9. `--noIndexRestore`

   不保存索引

10. `--noOptionsRestore`

   不保存集合的配置

11. `--keepIndexVersion`

    保持原有所以的版本

12. `--maintainInsertionOrder`

    使插入的数据库顺序与文档的数据顺序一致

13. `-j, --numParallelCollections=`

    并行插入数据，默认为4

14. `--stopOnError`

    遇到错误停止导入

15. `--bypassDocumentValidation`

    不保存无效数据

16. `--numInsertionWorkersPerCollection=`

    number of insert operations to run concurrently per collection (1 by default) (default: 1)

## mongoexport

当前版本：r3.4.6

> 官方文档

## mongoimport

当前版本：r3.4.6

> 官方文档

## mongofiles

当前版本：r3.4.6

> 官方文档

## mongooplog

当前版本：r3.4.6

> 官方文档

## mongoperf

当前版本：r3.4.6

> 官方文档

## mongos

当前版本：r3.4.6

> 官方文档

## mongostat

当前版本：r3.4.6

> 官方文档

## mongotop

当前版本：r3.4.6

> 官方文档

