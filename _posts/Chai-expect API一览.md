---
title: 断言库Chai-expect-API一览
date: 2017-12-20
tags:
  - Chai
---

花了几天时间简单的翻译并学习了 chai 的官方 API 文档，了解如何写出可读性更好的ＢＤＤ的风格的测试断言。官方的一个核心建议是：尽量使用 language chains 提高可读性，尽量进行正面断言而不是反面断言，即断言被测对象是什么，而不是断言对象不是什么，断言对象包含什么，而不是不包含什么，因为往往能确定的东西是更少部分的、容易覆盖的，不确定的方面可能是多方面的、难以覆盖的。

## 概述

Chai 提供了 BDD/TDD 风格的断言库，并且支持在 node 和浏览器端搭配任意测试框架进行使用。

## 安装

**Node.js**

```
npm install chai
```

**Brower**

```
<script src="chai.js" type="text/javascript"></script>
```

通过 script 标签引入，然后作为全局变量使用。

## 断言风格

### Assert

TDD 风格的断言，和 node 的 assert 断言相似，并且进行了扩展和浏览器兼容。可读性较差。

### Should&&Expect

和 Expect 都是 BDD 风格，可读性强。两者使用相同的可连缀的语法来构建断言，两者的不同之处在于 Expect 是使用构造函数来创建断言，例：`expect(foo).to.be.a('string');`，而 Should 通过在 Object.prototype 上新增方法来进行断言，例：`expect(answer).to.equal(42);`
**注意点：**

- 引用

```
var chai = require('chai')
 , expect = chai.expect
 , should = chai.should();
```

- 兼容性
  Should 不兼容 IE 浏览器，Should 在使用上有一些坑，例如断言不存在的对象 obj，可能会这样写：`obj.should.not.exist`，但是既然 obj 已经是 undefind 了，因此会报错。

## Expect/Should API 一览

**Language Chains**
为了让测试用例更加可读，提供了无断言功能的语言连接词。

- to
- be
- been
- is
- that
- which
- and
- has
- have
- with
- at
- of
- same
- but
- does

**.not**
连接在其他断言如`.equal`之前，表示“非”的意思，建议进行正面断言，即断言结果是什么，而不是去断言结果不是什么。

**.deep**
作为`.equal`,`.include`,`.members`,`.keys`,`.property`的前缀，使得断言将使用深比较而不是严格相等（`===`）。

**.nested**
允许在`.property`,`.include`中使用`.`语法和`[]`语法。

```
expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
```

> 如果属性字面量中包含.或者[]使用`//`进行转译。

**.own**
作为`.property`,`.include`的前缀，使得断言将忽略继承属性，而只检查自身属性。

> `.own`不能连接到`.nested`后

**.ordered**
作为`.members`的前缀，使 members 断言时要求顺序一致。

**.any**
作为`.keys`的前缀，断言目标有所给 keys 中的任意一个。

**.all**
作为`.keys`的前缀，断言目标有所给的全部 keys。

> `.all`是`.keys`的默认前置状态，即当`.keys`前不跟`.all`和`.any`时返回`.all.keys`的结果

**.a(type[, msg])**

- @param { String } type 类型（如 string | object | error | promise）
- @param { String } msg _optional_ 可选描述，断言失败后显示

> - 可以前置`.not`但是建议正面断言，而不是反面断言，因为往往正面的 type 更少，而反面的 type 难以覆盖。例如应该断言‘aaa’是一个 string，而不是应该断言它不是一个 object。
> - `.a`在做为语言连接词时不起断言作用，只是提高可读性，并且可以使用`.an`代替。

**.include(val[,msg])**

- @param { Mixed } val 任意类型的值
- @param { String } msg _optional_

根据 target 的类型进行“包含”断言：

- string
  断言是否包含所传入子串 subtring。
- object
  断言所传入对象的属性是否为 target 的属性的子集。
- Set 或 WeakSet
  断言所传入的值包含在是 target 的成员（使用 SameValueZero 算法进行比较，即两个 NaN 和正负零都视为相同）。
- Map
  断言传入的值是 target 的值中的一个。

> - 由于`.inculde`的行为是根据 target 来表现的，因此在这之前检查 target 的类型是很重要的，因此在`.include`之前使用`.a(type)`进行断言。
> - 默认使用严格相等（===）进行比较，可以在之前使用`.deep`来使用深比较的方式
> - 当 target 为 object 时断言会检查对象的原型链，可以使用`.own`作为前缀排除原型属性
> - `.contain`,`.contains`作为`.include`的别名使用
> - `.include`也可以作为语言连接词使用

**.ok**
断言 target 是`==`true 的，更多时候建议使用`===`或者深比较来代替

**.true .false .null .undefined**
断言 target 是`===`true false null undefined

**.NaN**
断言 target 为 NaN

**.exist**
断言 target 不`===`null 或者 undefined

**.empty**

- target 为 string 或者 array 时，断言 length 属性`===`0
- target 为 map 或者 set，断言 size 属性`===`0

**.arguments**
断言 target 是一个`arguments`对象

**.equal(val[, msg])**

- @param { Mixed } val 值
- @param { String } msg _optional_ 断言描述信息
  断言 target`===`所给值
  > `.equals`,`.eq`是`.equal`的别名

**.eql(obj[, msg])**
断言 target 与所给值深度相等。

> - `.eqls`是`.eql`的别名
> - 和`.deep.equal`的唯一区别是`.eql()`后面不能再连缀

**.above(n[, msg]) .least(n[, msg]) .below(n[, msg]) .most(n[, msg])**

- @param { Number } n
- @param { String } msg _optional_
  断言 target（number 或者 date）`>`,`>=`,`<`,`<=`所给值
  > 最好断言这个值是什么,即使用`.equal`

**.within(start, finish[, msg])**
@param { Number } start lower bound inclusive
@param { Number } finish upper bound inclusive
@param { String } msg _optional_
断言 target（number 或者 date）处于某个闭区间[start,finish]

**.instanceof(constructor[, msg])**

- @param { Constructor } constructor
- @param { String } msg _optional_
  断言 target 是所给构造函数的实例
  > 当使用 bable 或 typescript 的时候可能会有问题

**.property(name[, val[, msg]])**

- @param { String } name
- @param { Mixed } val (optional)
- @param { String } msg _optional_
  断言 target 有所给键或者键值对

> - 默认使用`===`,可以使用`.deep`来使用深度比较\
> - 默认包含可枚举和不可枚举属性，如果只想断言可枚举属性可前置`.own`

**.lengthOf(n[, msg])**

- @param { Number } n
- @param { String } msg _optional_
  断言 target 的 length 属性`===`所给值

**.match(re[, msg])**

- @param { RegExp } re
- @param { String } msg _optional_
  断言 target 匹配所给正则

**.string(str[, msg])**

- @param { String } str
- @param { String } msg _optional_
  断言 target String 包含所给子字符串
  > 可以使用 contain()代替

**.keys(key1[, key2[, …]])**

- @param { String | Array | Object } keys
  断言 target object,array,map 或者 set 有所给的 keys

> 当传入的值是对象的时候，对象的值将被忽略

**.throw([errorLike], [errMsgMatcher], [msg])**

- @param { Error | ErrorConstructor } errorLike
- @param { String | RegExp } errMsgMatcher error message
- @param { String } msg _optional_
- @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
  断言 target 函数抛出的错误

**.respondTo(method[, msg])**

- @param { String } method
- @param { String } msg _optional_
  断言 target 是否有所给 method（自身或者继承）
- target 为构造函数时
  断言这个构造函数有所给 method 方法

```
function Foo(){}
expect(new Foo())
```

- target 为函数时

```
expect(Foo)
```

断言函数的**原型上**有所给方法（自身的或者继承的）

> 两者的区别是前者直接断言本身，后者断言 target 的 prototype。可以通过前置`.itself`使得断言函数时断言其本身

**.satisfy(matcher[, msg])**

- @param { Function } matcher
- @param { String } msg _optional_
  将 target 作为 matcher 的第一个参数传入，断言 matcher 函数的返回值为 true

**.closeTo(expected, delta[, msg])**

- @param { Number } expected
- @param { Number } delta
- @param { String } msg _optional_
  断言 target 是否在[expected-delta,expected+delta]的范围内

**.members(set[, msg])**

- @param { Array } set
- @param { String } msg _optional_
  断言 target 数组中包含所给数组

**.oneOf(list[, msg])**

- @param { Array.<\*> } list
- @param { String } msg _optional_
  断言 target 是所给 list 的一个成员

**.change(subject[, prop[, msg]])**

- @param { String } subject
- @param { String } prop name _optional_
- @param { String } msg _optional_
  断言 target 函数调用前后，subject 的值，或者 subject.prop 的值相等

**.increase(subject[, prop[, msg]]) .decrease(subject[, prop[, msg]])**

- @param { String | Function } subject
- @param { String } prop name _optional_
- @param { String } msg _optional_
  断言 target 函数调用前后 subject 的值，或者 subject.prop 的值增加或减少

**.by(delta[, msg])**

- @param { Number } delta
- @param { String } msg _optional_
  连缀在`.increase`,`.decrease`之后，断言增加减少的值

**.extensible**
断言 target 是可扩展的（可以添加新的属性）

**.sealed**
断言 target 是封闭的（不能添加新属性，不能重新分配或删除已有属性，但是可以对已有属性重新赋值）

**.frozen**
断言 target 是冻结的（不能添加新属性，不能重新分配已有属性，删除已有属性或对已有属性重新赋值）

**.finite**
断言 target 是 number，并且不是 NaN 或者正负无穷

**.fail(actual, expected, [message], [operator])**

- @param { Mixed } actual
- @param { Mixed } expected
- @param { String } message
- @param { String } operator
  抛出一个错误
