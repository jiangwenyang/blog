---
layout: blog-post

title: ES6增加的新特性
date: 2017-12-20 23:13:19
tags:
  - JavaScript
  - ES6
categories:
  - JavaScript
---

## 1. 字符串扩展

### 字符串遍历接口

字符串可以使用`for...of`循环遍历字符串，并且可以识别大于 0xFFF 的码点

```javascript
for (let char of "abc") {
  console.log(char);
}
// "a"
// "b"
// "c"
```

### at()

> 目前还是提案，可以使用垫片库实现
> charAt 方法对于 Unicode 编号大于 0xFFF 的字符无法正常显示，使用 at()可以正常显示

### includes()，startsWith(),endsWith()

- includes()：返回 boolean，表示是否包含参数字符串
- startsWith()：返回 boolean，表示参数字符串是否是原字符串的开头
- endsWith()：返回 boolean，标识参数字符串是否是原字符串的结尾
  可以传递第二个参数，表示开始搜索的位置，默认为 0，即从首字符开始搜索

### repeat()

返回一个新字符串，表示将源字符串重复 n 次

### padStart(),padEnd()

接受两个参数，第一个指定字符串的最小长度，第二个为补全字符串。当字符串小于最小长度的时候使用补全字符串进行补全。第二个参数不传，默认使用空格补全。

### 模板字符串

使用` `` `包裹一个字符串，字符串中使用\${}来使用 JavaScript 表达式，你可以在里面使用变量调用函数。

> 如果字符串中包含反引号，使用`/`转义

## 2. 数值扩展

### 二进制和八进制

1.二进制和八进制分别用前缀`0b`和`0o`或者大写的形式表示。

### Number.isFinite(),Number.isNaN()

将原本全局的 isFinite 和转 isNaN 换到 Number 对象上。

```
//ES5
isFinite(Infinity)
//ES6
Number.isFinite(Infinity)
```

### Number.parseInt(),Number.parseFloat()

同上

### Number.isInteger()

判断一个值是否为整数

> 3.0 和 3 都会返回 true

### Math.trunc()

去除数值小数部分，只返回整数部分

## 3. 函数扩展

### 函数参数默认值

可以给函数传递默认值参数

```javascript
function(x=1,y=2){

}
```

注意：

- 参数是默认声明的，因此不能在函数体里使用 let 和 const 再次声明
- 默认值参数是不是传值的，意思就是如果参数默认值是表达式，则每次调用函数的时候都会重新计算
- 可以与解构赋值结合起来使用
- 默认值参数应该是函数的尾参数，否则是没办法省略的

### 函数 length 属性

返回没有该函数预期传入的参数个数
注意：

- length 将会只记录设置默认值参数前的参数个数，如果默认值参数不是尾参数，那么它后面的参数将被忽略，得到的结果将会失真

### rest 参数

```javascript
function(...args){
    let sum=0;
    for(let i of args){
        sum+=i;
    }
    return sum;
}
```

这样就不需要使用 arguments 对象了

> arguments 是一个类数组对象，因此不能只在在 arguments 对象上直接使用数组方法。
> 将类数组转换为数组：Array.prototype.slice.call(arguments)

### name 属性

函数的 name 属性返回函数的函数名

```javascript
var f = function() {};

// ES5
f.name; // ""

// ES6
f.name; // "f"
```

### 箭头函数

注意：

- 箭头函数 this 指向定义时所在的对象
- 不能当作构造函数，不能对箭头函数使用`new`
- 不可以使用`arguments`对象，使用 rest 参数代替
- 不能用作 Generator 函数

### 尾调用优化

尾调用：某个函数的最后一步是调用另一个函数，即最后返回一个函数。

尾调用优化：函数调用会形成调用栈，后调用的在上层，最开始调用的在底层。而尾调用是最外层的调用，因为没有其他调用会依赖它了，因此可以直接使用内层的调用栈取代外层的调用栈。这样每次调用的时候都会减少调用栈，节省内存。

### 尾递归

函数尾调用自身，成为尾递归。

递归非常消耗内存，需要保存很多的调用栈，造成“栈溢出”。如果使用尾递归就只存在一个调用栈，避免出现“栈溢出”。

### 递归函数改写为尾递归函数

> 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
> ES6 尾递归优化在正常模式下是无效的，必须使用严格模式

### 函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号，这一点和数组与对象的逗号规则保持一致

## 4. 数组扩展

### Array.form()

用于将类数组对象和可遍历的对象转换为真正的数组。常见的是 arguments 对象和 NodeList 对象

> 也可以使用扩展运算符`...`更加方便的将这些对象转换为数组，调用遍历器接口（`Symbol.iterator`）如果没有遍历器接口则不能转换。
> Array.form()的本质是只要有 length 属性的对象都能转换

Array.form()的第二个参数允许传入一个函数，对每一个元素进行处理之后返回，类似 map

### Array.of()

返回参数值组成的数组

```javascript
Array.of(3); // [3]
Array(3); //[,,,]
```

### 数组实例的 copyWithin(target,start=0,end=this.length)

用 start-end 位置的数组元素替换 target 开始的数组元素，修改当前数组并返回。

### 数组实例的 find() 和 findIndex()

```javascript
[-1, 0, 1, 2, 3, 4, 5]
  .find(function(value, index, array) {
    console.log(value); // 当前值
    console.log(index); // 当前索引
    console.log(array); // 当前数组
    return value < 0;
  }) // -1 返回匹配的值

  [(-1, 0, 1, 2, 3, 4, 5)].findIndex(function(value, index, array) {
    console.log(value); // 当前值
    console.log(index); // 当前索引
    console.log(array); // 当前数组
    return value < 0;
  }); // 0 返回匹配值的索引
```

> `indexOf()` 无法查询到`NaN`，使用`find`/`findIndex`配合`Object.is()`能识别`NaN`

### 数组实例的 fill()

```javascript
["a", "b", "c"].fill(7, 1, 2);
// ['a', 7, 'c']
```

使用参数填充数组
第一个参数为填充值，第二和第三个参数可选，为填充的起始位置，不指定的话默认为 0 和数组长度

### 数组实例的 entries(),keys(),values()

分别返回键值对、键、值的遍历器对象，可以再使用`for..of`进行遍历，或者直接使用`next`方法遍历。

> values()在最新的 chrome 和 firefox 下不能用

### 数组实例的 includes()

返回 boolean，表示当前数组是否包含给定的值,第二个参数为搜索的起始位置

> 可以识别`NaN`

### 数组空位

数组空位的处理，在数组各个方法中表现不一致，最好避免。

## 5. 对象

### 属性简洁表示法

可以直接使用变量和函数作为对象的属性和方法。

### 属性名表达式

ES5 中不允许在字面量定义对象的时候属性名中有变量，ES6 可以使用[]的形式定义。

```javascript
let obj = {
  ["a" + "b"]: 123
};
```

> 简洁写法和属性名表达式不能同时使用
> 如果表达式的结果是一个对象，则会被转换为字符串`[object Object]`

### Object.is()

用来比较两个数是否同值等(只要值是一样的就相等)。

> `===` 的问题：`NaN`不等于自身；`+0`不等于`-0`(新版 chrome 浏览器和 firefox 中没有这个问题)
> `==` 的问题：会转换数据类型

### Object.assign()

`Object.assign(target,source1,source2)`
将源对象的**可枚举属性**复制到目标对象

> 如果存在同名属性，则后面的会覆盖前面的。
> 得到的是**浅拷贝**即只是如果源对象中的属性值是一个对象，则拷贝的只是这个对象的引用，源对象的修改会反应到拷贝的对象上。
> 可以用来处理数组。

### 对象实例的**proto**

用来读取或者设置对象的原型，不推荐使用

### Object.setPrototypeOf(),Object.getPrototypeOf(),Object.create()

Object.setPrototype()：设置对象的原型
`Object.setPrototypeOf(object, prototype)`
Object.getPrototype():得到对象的原型
`Object.getPrototype(object)`
Object.create():创建基于给定原型的对象
`Object.create(prototype)`

### Object.keys()，Object.values(),Object.entries()

> **注意：**Array 的同名方法返回的是遍历器对象，Object 下返回的都是数组。

### 克隆对象

克隆实例：

```javascript
// 方式一
let obj1 = { a: 1, b: 2 };
let obj2 = Object.assign({}, obj1);
// 方式二
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1 };
```

完整克隆（包含原型）：

```
// 方式一
let obj1={a:1,b:2};
let obj2={
    __proto__:Object.getPrototypeOf(obj1),
    ...obj1
}
// 方式二 推荐使用
let obj1={a:1,b:2};
let obj2=Object.assign(Object.create(Object.getPrototyeOf(obj)),obj)
```

### 读取对象内部属性：Null 传导运算符

当读取对象的某个属性的时候，对象内部是否有这个属性我们是不能确定的，因此需要判断。

> 比如，要读取 message.body.user.firstName，安全的写法是写成下面这样。

```javascript
const firstName =
  (message &&
    message.body &&
    message.body.user &&
    message.body.user.firstName) ||
  "default";
```

目前有一个**提案**，使用“Null 传导运算符“`?.`

```javascript
const firstName = message?.body?.user?.firstName || "default";
```
