---
title: MongoDB入门
date: 2016-05-13
tags:
  - Node.js
  - MongoDB
---

## 数据库操作

### 定义数据库存储位置

安装完成后，自定义数据库储存位置，方法：
命令行进入安装目录的 bin 目录下使用`mongod --dbpath [自定义目录]`来定义目录并启动 mongodb

### 连接数据库

1. 使用 mongo 命令来连接数据库，默认连接到 test
2. 使用 use 命令来切换数据库，例：`use blog` ,若数据库不存在则会相应的创建数据库

### 检查数据库列表

`show dbs`命令可以列出当前数据库列表

### 删除数据库

`db.dropDatabase`将会删除当前的数据库，删除之后可以使用`show dbs`查看删除结果

## 集合操作

### 创建集合

- `db.createCollection(name,[option])` 用来创建集合其中 name 是集合的名字，option 是可选参数对象
- 使用`db.集合名.insert()`可以快捷创建并插入文档

### 查看集合

`show collections`命令用来列出当前数据库中的集合

### 删除集合

`db.集合名.drop()`命令用来删除集合，如果成功删除则该命令返回 true，否则返回 false

## 文档操作

### 插入文档

- insert()方法
  `db.集合名.insert(document)`,document 为文档对象或者文档组对象,如果在插入的文档中没有指定\_id 则数据库将会自动创建\_id
- save()方法
  `db.集合名.save()`
- insert()和 save()的区别 1.如果未指定\_id 字段则两者的作用一致，如果指定了\_id，save()将会检查是否已经存在相同\_id 字段，如果不存在则直接插入，如果存在则将进行 update()操作覆盖原来的文档;而 insert 则将忽略掉同\_id 字段的插入
  2.insert 可以一次性插入一个列表，而不用遍历，效率高， save 则需要遍历列表，一个个插入。

### 查询文档

- find()方法
  `db.集合名.find()`，将会以非结构化的方式来显示所有的文档。
- pretty()方法
  `db.集合名.find().pretty()`，以结构化的形式显示查询结果
- findOne()方法
  `db.集合名.findOne()`，只显示一个结果
- 条件子句
- 等于:`{<key>:<value>}`,范例:`db.user.find({"name":'tom'})`
- 小于:`{<key>:{$lt:<value>}}`,范例`db.user.find({"age":{$lt:20}})`
- 大于:`{<key>:{$gt:<value>}}`,范例`db.user.find({"age":{$gt:20}})`
- 小于等于:`{<key>:{$lte:<value>}}`,范例`db.user.find({"age":{$lte:20}})`
- 大于等于:`{<key>:{$gte:<value>}}`,范例`db.user.find({"age":{$gte:20}})`
- 不等于:`{<key>:{$ne:<value>}}`,范例`db.user.find({"name":{$ne:"tom"}})`
- AND 条件:多个条件之间使用','隔开构成 AND 子句,范例`db.user.find({"name":"tom","age":{$lte:20}})`,查询姓名为 tom 且年龄小于或者等于 20 岁的文档
- OR 条件：`{$or:[{<key1>:<value1>},{<key2:value2>}]}`,范例`db.user.find({$or:[{"name":"tom"},{"age":{$lt:20}}]})`，查询姓名为 tom 或者年龄小于 20 的文档

### 更新文档

- update()方法
- `db.集合名.update(SELECTION_CRITERIA,UPDATED_DATA)`,范例`db.user.update({"name":"tom"},{$set:{"name":"jack"}})`
- mongoDB 默认只更新单个文档，如果要更新多个需要设置参数{multi:true}
- save()方法
- `db.集合名.save({_id:ObjectId(),NEW_DATA})`,来覆盖同\_id 的文档达到更新的目的

### 删除文档

- remove()方法
  - `db.集合名.remove(DELETE_CRITERIA,justOne)`,其中 justONE 的取值为 1 或者 ture,默认 justOne 值为 false,范例`db.user.remove({"name":"tom"})`,删除所有名为 tom 的文档,`db.user.remove({"name":"tom"},true)`，删除一个名为 tom 的文档。
  - 如果 remove()方法不带任何参数则将会删除集合中的所有文档

### 映射

- find()方法
  - find()方法只带有查询条件的时候默认显示所有的字段，要对字段进行限制，需要使用第二个参数。find(db.集合名.find({},{<key1>:1,<key2>:0})),其中 1 为要显示的字段列表，0 为隐藏字段列表.
  - 范例：`db.user.find({},{_id:0,name:1})`将会显示集合中的所有文档，但是会隐藏掉 id 字段
- limit()方法
  - 语法：`.limit(num)`,参数为数字，限制显示的文档数目，find()方法默认显示所有文档
  - 范例：`db.user.find({},{_id:0,"name":"tom"}).limit(2)`,只是显示两条 name 值为 tom 的数据
- skip()方法
  - 语法：`db.集合名.find().skip(NUMBER)`，隐藏 NUMBER 个文档，默认值是 0
  - 范例： `db.user.find({},{_id:0,"name":"tom"}).limit(2).skip(2)`将会显示第三条和第四条数据

### 记录排序

- sort()方法
  - 语法：`db.集合名.find().sort({key:1})`,其中 1 表示按照指定字段升序，-1 表示按照指定字段降序
  - 范例：`db.user.find({},{_id:0,"name":1}).sort({"name":1})`,按照 name 字段对文档进行排序

### 索引

索引是一种数据结构，将一小块的数据集保存为容易遍历的结构，进行索引之后会进行查询更加迅速。

- ensureIndex()
  - 语法：`db.集合名.ensureIndex({<key>:1})`,1 为升序，-1 为降序。
  - 范例：`db.user.ensureIndex({"name":1,"age":-1})`，

### 聚合

- aggregate()方法
  对数据按照要求进行分组和统计，并返回统计的结果。类似于 SQL 语句中的 count(\*)组合 group by
  - 语法：`db.集合名.aggregate(OPTION)`
    - 范例：`db.user.aggregate([{$group:{_id:"$name",many:{$sum:1}}}])`

### 管道

MongoDB 的聚合管道将 MongoDB 文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

- \$project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- \$match：用于过滤数据，只输出符合条件的文档。\$match 使用 MongoDB 的标准查询操作。
- \$limit：用来限制 MongoDB 聚合管道返回的文档数。
- \$skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- \$unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- \$group：将集合中的文档分组，可用于统计结果。
- \$sort：将输入文档排序后输出。
- \$geoNear：输出接近某一地理位置的有序文档。
