---
layout: blog-post

title: Javascript类型判断
date: 2018-06-19 11:21:33
tags:
  - Javascript
categories:
  - Javascript
---

## JavaScript 的类型

Javascript 有 6 种基本类型（ES6 新增了 Symbol）：

- Undefined
- Null
- Boolean
- Number
- String
- Symbol（ES6）

以及引用类型：

- Array
- Object
- Function
- 其他对象

## typeof 可能不像我们期望的那样

在 Javascript 中做类型判断，用得最多的就是`typeof`了，但是`typeof`在判断引用类型上，可能无法获得预期的结果。下面是[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)上关于 typeof 在各个类型上返回值的表格：

![](http://ow67vzejn.bkt.clouddn.com/18-6-19/13085261.jpg)

从这张图可以总结出：**对于 Undefined、Boolean、Number、String、Symbol 几种基本类型可以通过 typeof 来判断类型，但是对于引用类型一般不能直接使用 typeof 来进行类型判断。**

## typeof 不灵的时候该怎么办？

### 判断 Null

由于 Null 的含义就是“空对象”，因此`typeof null`返回`'object'`也很合理，判断 null 为 Null 类型也很简单，只需要`null===null`就可以了。

### 判断 Function 类型

直接使用 typeof 也能直接判断，但是在非常老的版本的 Firefox 浏览器中，对正则表达式使用`typeof`也会返回`'function'`,不考虑老版本的浏览器的话可以直接使用`typeof`，考虑兼容性的话，建议使用`Object.prototype.toString.call(fn)`,返回值为`'[object Function]'`

### 判断数组

由于 Array 的原型继承自 Object，因此`typeof []`返回的自然是`'object'`，因此也不能使用`typeof`进行判断。判断一个变量是否为数组主要有以下的方法：

- instanceOf

  通过 instanceOf 判断数组的原型链上是否有 Array，即可判断是否为数组

  ```js
  [] instanceOf Array // true
  [] instanceOf Object // true
  ```

- constructor

  数组实例其实都是由构造函数 Array 生成的：

  ```js
  [].constructor; //Array() { [native code] }
  ```

- Object.prototype.toString

  对象的 toString 方法放回的是'object [type]',type 为对应的类型，因此可以借用对象的 toString 方法来判断任意类型

  ```js
  Object.prototype.toString.call(null); // '[obejct Null]'
  Object.prototype.toString.call(undefined); // '[obejct Undefined]'
  Object.prototype.toString.call(true); // '[obejct Boolean]'
  Object.prototype.toString.call(""); // '[obejct String]'
  Object.prototype.toString.call(0); // '[obejct Number]'
  Object.prototype.toString.call(Symbol("")); // '[obejct Symbol]'
  Object.prototype.toString.call([]); // '[obejct Array]'
  Object.prototype.toString.call({}); // '[obejct Object]'
  Object.prototype.toString.call(function a() {}); // '[obejct Function]'
  Object.prototype.toString.call(document.getElementsByTagName("p")); //'[object HTMLCollection]'
  ```

  这几乎是个万能的判断类型的方法。

- Array.isArray()

  ES5 新增的方法，简单准确并且语义清晰。lodash 的[isArray](https://github.com/lodash/lodash/blob/4.17.10/lodash.js#L11285)直接使用的这个方法。

  ```
  Array.isArray([]) // true
  ```

  缺点是可能老版本的浏览器不支持，但是可以通过判断是否存在 isArray 方法或者直接使用 polyfill 的方式解决。

### 判断类数组对象

对于类数组对象比如 NodeList

使用`Object.prototype.toString.call()`进行判断。

```
Object.prototype.toString.call(document.getElementsByTagName('p')) //'[object HTMLCollection]'
```

## 总结

JavaScript 由于其自身的一些问题，对于简单的类型判断上都有许多的“坑”，非常考验开发者的“经验”以及对语言的了解程度，上面只是简单的探讨了一下。比较完善的解决方案可以参考入 lodash 这些开源库的实现。

> [lodash 官方文档](https://lodash.com/docs/4.17.10) Lang 这一分类中包含了常见的类型判断，可以直接参考源码。
>
> 点击希望查看函数的 source 跳转到 github 源码中对应的函数声明的行：
>
> ![](http://ow67vzejn.bkt.clouddn.com/18-6-19/16969041.jpg)
>
> ![](http://ow67vzejn.bkt.clouddn.com/18-6-19/92438752.jpg)
