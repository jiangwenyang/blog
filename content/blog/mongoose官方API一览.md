---
layout: blog-post

title: mongoose官方API一览
date: 2017-04-16 11:30:16
tags:
  - Node.js
  - MongoDB
  - Mongoose
categories:
  - Node.js
  - MongoDB
  - Mongoose
---

## 简单起步

### 一、安装

使用 npm 安装 mongoose，在这之前应该安装配置好 mongoDB，具体安装方法可以参考 MongoDB 官方安装指导。

```shell
npm install mongoose
```

### 二、连接数据库

预连接（mongoose 监听数据库端口，尝试进行连接）到默认的*localhost*的*test*数据库。

```javascript
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test"); //mongoDB的数据库连接都是以mongodb://打头，后面跟数据库路径
```

### 三、判断是否成功连接数据库

前面已经进行数据库的预连接，在数据库开启成功，连接路径没有问题的情况下一般就能正常连接了。

```javascript
var db = mongoose.connection;
db.on(error, console.error.bind(console, "connection error:"));
db.once("open", function(callback) {
  // 连接成功，后续数据库操作都在回调中进行
});
```

### 四、定义模式

模式是 mongoose 的核心，相当于 SQL 的数据表结构，在这里定义文档的键以及对应的值的类型，以及定义文档的实例方法和模型的静态方法。

```javascript
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
  age: Number
});
```

值对应的类型是 SchemaType，可用的有：

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

### 五、导出模型

真正能对数据库进行操作的是模型和文档，模型是我们构建文档的类，文档是模型的实例，文档的颗粒度比文档更小。

```javascript
var Model = mongoose.model;
var user = new Model("user", UserSchema);
```

### 六、生成文档

文档相当于 SQL 中的一行，是真正存储在数据库中的数据。

```javascript
var tom = new user({
  name: "tom",
  age: 20
});
```

### 七、将文档保存到数据库

在上一步我们仍然没有在数据库中保存任何数据，只是生成了文档，但是并没有存入数据库，我们可以使用在文档上*save（）*方法将生成的文档存入数据库。

```javascript
tom.save(function(err, tom) {
  if (err) return console.error(err);
  //进行其他操作
});
```

### 八、查询数据库

查询数据库文档，通过在*model*上使用*find*方法。

```javascript
user.find({ name: "tom" }, function(err, doc) {
  console.log(doc);
});
```

_如果不传入查询条件将会查询所有文档_

---

## 相关 API

### 模式

#### 定义 Schema

```javascript
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
```

#### 创建模型

```javascript
var Blog = mongoose.model("Blog", blogSchema);
```

#### 实例方法

文档是模型的实例，文档拥有许多自己的内置方法，我们也可以通过在 Schema 上定义自己的实例方法给文档使用。`[SchemaName].methods.[functionName]`

```javascript
// define a schema
var animalSchema = new Schema({ name: String, type: String });
// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model("Animal").find({ type: this.type }, cb);
};
```

因为实例方法是暴露给文档的，因此实例方法内部的 this 指向文档，所以它拥有 model 和 type 属性，可以通过*model*属性来回溯使用模型来进行同类文档的查询

```javascript
var Animal = mongoose.model("Animal", animalSchema);
var dog = new Animal({ type: "dog" });
dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs); // woof
});
```

_避免重新内置的实例方法，可能会导致不可预料的问题_

#### 静态方法

静态方法是模型上的方法，静态方法同样是在模式上进行定义的。`[SchemaName].statics.[functionName]`

```javascript
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
  this.find({ name: new RegExp(name, "i") }, cb);
};
var Animal = mongoose.model("Animal", animalSchema);
Animal.findByName("fido", function(err, animals) {
  console.log(animals);
});
```

#### 索引

定义 Schema 的时候，对属性建立索引

```javascript
var animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true } // field level
});
animalSchema.index({ name: 1, type: -1 }); // schema level
```

#### 虚拟属性

虚拟属性是文档中的你希望可以得到并且设置的但是又不能存入数据库中的属性。获取一般用于格式化多个属性值，设置一般用于将单个属性值分解为多个值来进行存储。

Getter

```javascript
// define a schema
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});
// compile our model
var Person = mongoose.model("Person", personSchema);
// create a document
var bad = new Person({
  name: { first: "Walter", last: "White" }
});
//define virtual property
personSchema.virtual("name.full").get(function() {
  return this.name.first + " " + this.name.last;
});
console.log("%s is insane", bad.name.full); // Walter White is insane
```

Setter

```javascript
personSchema.virtual('name.full').set(function (name) {
  var split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
});
...
mad.name.full = 'Breaking Bad';
console.log(mad.name.first); // Breaking
console.log(mad.name.last);  // Bad
```

#### options

Schemas 有一些配置选项可以通过在构造的时候或者直接通过*set*来进行设置

```javascript
new Schema({..}, options);
// or
var schema = new Schema({..});
schema.set(option, value);
```

可选项有：

- autoIndex
- capped
- id
- \_id
- read
- safe
- shardKey
- strict
- toJSON
- toObject
- versionKey

### 模型

模型是通过编译而成的构造函数，模型的实例是能够从数据库中保存和检索的文档，数据库中所有的文档保存和检索都通过模型进行处理。

#### 编译模型

```javascript
var schema = new mongoose.Schema({ name: "string", size: "string" });
var Tank = mongoose.model("Tank", schema);
```

#### 构造文档

文档是模型的实例。创建并保存文档到数据库有两种方式

```javascript
var Tank = mongoose.model("Tank", yourSchema);
var small = new Tank({ size: "small" });
small.save(function(err) {
  if (err) return handleError(err);
  // saved!
});
// or
Tank.create({ size: "small" }, function(err, small) {
  if (err) return handleError(err);
  // saved!
});
```

#### 查询

文档可以被检索通过使用每一个模型的*find,findById,findOne,where*静态方法

```javascript
Tank.find({ size: "small" })
  .where("createdDate")
  .gt(oneYearAgo)
  .exec(callback);
```

#### 移除

模型有一个*remove*静态方法可以移除所有匹配 conditions 的文档

```javascript
Tank.remove({ size: "large" }, function(err) {
  if (err) return handleError(err);
  // removed!
});
```

#### 更新

使用每一个模型的*update*来修改数据库中的文档，但是这个方法不会返回这些文档给你。\*\*

```javascript
MyModel.update({ age: { $gt: 18 } }, { oldEnough: true }, fn);
MyModel.update({ name: "Tobi" }, { ferret: true }, { multi: true }, function(
  err,
  numberAffected,
  raw
) {
  if (err) return handleError(err);
  console.log("The number of updated documents was %d", numberAffected);
  console.log("The raw response from Mongo was ", raw);
});
```

_如果你想更新单个文档并且希望得到返回值，使用 findOneAndUpdate 方法来代替。_

### 文档

#### 检索

文档的检索通过模型的一些静态方法

例如：

```javascript
var Person = mongoose.model("Person", yourSchema);
// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ "name.last": "Ghost" }, "name occupation", function(
  err,
  person
) {
  if (err) return handleError(err);
  console.log(
    "%s %s is a %s.",
    person.name.first,
    person.name.last,
    person.occupation
  ); // Space Ghost is a talk show host.
});
```

也可以使用连缀的形式添加更加细致的查询条件

```javascript
Person.find({ occupation: /host/ })
  .where("name.last")
  .equals("Ghost")
  .where("age")
  .gt(17)
  .lt(66)
  .where("likes")
  .in(["vaporizing", "talking"])
  .limit(10)
  .sort("-occupation")
  .select("name occupation")
  .exec(callback);
```

#### 更新

有多种方式来更新文档

- 传统方式

```javascript
Tank.findById(id, function(err, tank) {
  if (err) return handleError(err);

  tank.size = "large";
  tank.save(function(err) {
    if (err) return handleError(err);
    res.send(tank);
  });
});
```

- 通过模型进行文档的更新（不会返回文档）

  ```javascript
  Tank.update({ _id: id }, { $set: { size: "large" } }, callback);
  ```

- 通过模型查找更新（返回更新的文档）

  ```javascript
  Tank.findByIdAndUpdate(id, { $set: { size: "large" } }, function(err, tank) {
    if (err) return handleError(err);
    res.send(tank);
  });
  ```

### 子文档

子文档是拥有模式的文档，它们通常是父文档中的一个数组元素。子文档拥有正常文档一样的功能，唯一的不同是他们不能单独保存，只有父文档被保存的时候才能被保存。

```javascript
var childSchema = new Schema({ name: "string" });
var parentSchema = new Schema({
  children: [childSchema]
});
```

```javascript
var Parent = mongoose.model("Parent", parentSchema);
var parent = new Parent({ children: [{ name: "Matt" }, { name: "Sarah" }] });
parent.children[0].name = "Matthew";
parent.save(callback);
```

#### 查询子文档

每一个文档都有一个*\_id*属性，文档数组有一个特殊的 id()方法用来通过*\_id*查找文档。

```javascript
var doc = parent.children.id(id);
```

#### 添加子文档

通过向父文档中对应的数组添加子文档数组元素来添加子文档。

```javascript
var Parent = mongoose.model("Parent");
var parent = new Parent();
// create a comment
parent.children.push({ name: "Liesl" });
var subdoc = parent.children[0];
console.log(subdoc); // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
subdoc.isNew; // true
parent.save(function(err) {
  if (err) return handleError(err);
  console.log("Success!");
});
```

子文档也可以被创建而不哦那个添加他们到数组中通过使用*create()*方法。

```javascript
var newdoc = parent.children.create({ name: "Aaron" });
```

#### 移除子文档

每一个子文档有它自己的*remove()*方法

```javascript
var doc = parent.children.id(id).remove();
parent.save(function(err) {
  if (err) return handleError(err);
  console.log("the sub-doc was removed");
});
```

在 mongoose V3 以上的版本你不再需要单独声明子文档的 schema 然后在父文档中进行引用，你只需要简单声明一个对象字面量就可以。

### 查询

通过内嵌的 query 语句进行查询

模型上面的查询有两种方式

- 传递 callback,操作将会立即执行并且结果会返回到 callback 中
- 不传递 callback，将会返回一个 query 实例，这个实例将会暴露一些 QueryBuilder 接口给你进行使用

方式一：

```javascript
var Person = mongoose.model("Person", yourSchema);
// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ "name.last": "Ghost" }, "name occupation", function(
  err,
  person
) {
  if (err) return handleError(err);
  console.log(
    "%s %s is a %s.",
    person.name.first,
    person.name.last,
    person.occupation
  ); // Space Ghost is a talk show host.
});
```

方式二：

```javascript
// find each person with a last name matching 'Ghost'
var query = Person.findOne({ "name.last": "Ghost" });
// selecting the `name` and `occupation` fields
query.select("name occupation");
// execute the query at a later time
query.exec(function(err, person) {
  if (err) return handleError(err);
  console.log(
    "%s %s is a %s.",
    person.name.first,
    person.name.last,
    person.occupation
  ); // Space Ghost is a talk show host.
});
```

方式二的链式写法

```javascript
// find each person with a last name matching 'Ghost'
var query = Person.findOne({ "name.last": "Ghost" });
// selecting the `name` and `occupation` fields
query.select("name occupation");
// execute the query at a later time
query.exec(function(err, person) {
  if (err) return handleError(err);
  console.log(
    "%s %s is a %s.",
    person.name.first,
    person.name.last,
    person.occupation
  ); // Space Ghost is a talk show host.
});
```

### 验证器

mongoose 有一些自己的内置验证器：

- 所有的 SchemaTyps 有内置的验证
- Number 类型有*min*和*max*验证
- String 类型有*enum*和*match*验证

如果内置的验证器不能满足要求，我们自己可以进行定制

```javascript
var toySchema = new Schema({
  color: String,
  name: String
});
var Toy = mongoose.model("Toy", toySchema);
Toy.schema.path("color").validate(function(value) {
  return /blue|green|white|red|orange|periwinkle/i.test(value);
}, "Invalid color");
var toy = new Toy({ color: "grease" });
toy.save(function(err) {
  // err is our ValidationError object
  // err.errors.color is a ValidatorError object

  console.log(err.errors.color.message); // prints 'Validator "Invalid color" failed for path color with value `grease`'
  console.log(String(err.errors.color)); // prints 'Validator "Invalid color" failed for path color with value `grease`'
  console.log(err.errors.color.type); // prints "Invalid color"
  console.log(err.errors.color.path); // prints "color"
  console.log(err.errors.color.value); // prints "grease"
  console.log(err.name); // prints "ValidationError"
  console.log(err.message); // prints "Validation failed"
});
```

### 中间件

中间件是一些函数，它被传递用来控制文档的 init,validate,save,remove 方法的执行。中间件是处于文档的层次而不是模型的层次，中间件分为*pre*和*post*两种

#### Pre

- Serial（串行的）

  ```javascript
  var schema = new Schema(..);
  schema.pre('save', function (next) {
    // do stuff
    next();
  });
  ```

- Parallel（并行的）

  ```javascript
  var schema = new Schema(..);
  schema.pre('save', true, function (next, done) {
    // calling next kicks off the next middleware in parallel
    next();
    doAsync(done);
  });
  ```

  使用异步的情况下关联的方法例如*save*将不会被立即执行直到*done*被每一个中间件调用

#### Post

post 中间件会立即执行，在关联的方法和它的*pre*中间件完成的时候，post 中间件不会对操作进行控制，相当于只是监听这些方法

```javascript
schema.post("init", function(doc) {
  console.log("%s has been initialized from the db", doc._id);
});
schema.post("validate", function(doc) {
  console.log("%s has been validated (but not saved yet)", doc._id);
});
schema.post("save", function(doc) {
  console.log("%s has been saved", doc._id);
});
schema.post("remove", function(doc) {
  console.log("%s has been removed", doc._id);
});
```

中间件在 update 操作直接执行的情况下不会被调用，例如`Model.update`,`.findByIdAndUpdate`,`.findOneAndUpdate`,`.findOneAndRemove`,`.findByIdAndRemove`，如果你要利用中间件就必须`find()`文档然后在文档上调用`init`,`validate`,`save`,`remove`函数。

### 填充

在 MongoDB 中没有类似于 SQL 中的 joins，如果我们想模拟这种操作就需要用到填充

#### 定义 schema

```javascript
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var personSchema = Schema({
  _id: Number,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }]
});
var storySchema = Schema({
  _creator: { type: Number, ref: "Person" },
  title: String,
  fans: [{ type: Number, ref: "Person" }]
});
var Story = mongoose.model("Story", storySchema);
var Person = mongoose.model("Person", personSchema);
```

#### 保存关联的 refs

```javascript
var aaron = new Person({ _id: 0, name: "Aaron", age: 100 });
aaron.save(function(err) {
  if (err) return handleError(err);

  var story1 = new Story({
    title: "Once upon a timex.",
    _creator: aaron._id // assign the _id from the person
  });

  story1.save(function(err) {
    if (err) return handleError(err);
    // thats it!
  });
});
```

#### 关联查询

```javascript
Story.findOne({ title: "Once upon a timex." })
  .populate("_creator")
  .exec(function(err, story) {
    if (err) return handleError(err);
    console.log("The creator is %s", story._creator.name);
    // prints "The creator is Aaron"
  });
```

#### 值域选择

只选择我们想要的属性

```javascript
Story.findOne({ title: /timex/i })
  .populate("_creator", "name") // only return the Persons name
  .exec(function(err, story) {
    if (err) return handleError(err);

    console.log("The creator is %s", story._creator.name);
    // prints "The creator is Aaron"

    console.log("The creators age is %s", story._creator.age);
    // prints "The creators age is null'
  });
```

#### 并联路径的填充

```javascript
Story
.find(...)
.populate('fans author') // space delimited path names
.exec()
```

如果**monggoose<3.6**需要这样使用

```javascript
Story
.find(...)
.populate('fans')
.populate('author')
.exec()
```

#### 填充查询条件

如果我们要填充我们的 fans 数组基于年龄进行查询，选择他们的名字并且返回最多 5 条数据

```javascript
Story
.find(...)
.populate({
  path: 'fans',
  match: { age: { $gte: 21 }},
  select: 'name -_id',
  options: { limit: 5 }
})
.exec()
```

### 连接

```javascript
mongoose.connect("mongodb://localhost/myapp");
```

这将会连接到默认的*27017*端口的*localhost*数据库实例下的*myapp*数据库，如果你想写入其他端口或者数据库可以像下面这样

```javascript
mongoose.connect("mongodb://username:password@host:port/database?options...");
```
