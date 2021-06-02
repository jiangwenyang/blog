---
layout: blog-post

title: call和apply以及bind的区别
date: 2017-12-20 22:34:52
tags:
  - JavaScript
categories:
  - JavaScript
---

所有的函数都从 Function.prototype 上继承了这三个方法，通过使用这三个方法改变函数内容 this 的值。三者的主要区别是：

- call
  Function.prototype.call(thisArg,arg1,arg2,...)
  call 的第一个参数传入 this，后续参数作为函数执行的正常参数，**以单个分开的形式传递，会直接执行函数**。
- apply
  Function.prototype.apply(thisArg,[arg1,arg2,...])
  apply 的第一个参数和 call 一样，**和 call 唯一的区别是正常参数通过数组的形式传入，并且也会直接执行函数**。
- bind
  Function.prototype.bind(thisArg,[,arg1[,arg2[,...]]])
  绑定 this，并且**返回一个预先提供了参数的新函数，但是不会立即执行。**
  > 值得注意的是：call 和 apply 会用传入参数直接执行原函数，bind 则会返回一个新的预设参数的新函数，并且一旦调用 bind 之后则之后无法再更改 this 的指向，即使再调用 bind 也不行。使用 bind 可以很简单的实现一个偏函数。
  > 如果将 bind 后的函数作为构造函数来使用，即使用 new 操作符调用，则原本绑定的 this 会被忽略，但是预设的参数则会保留。

```javascript
function a(a, b) {
  return a + b;
}
sum1 = a.bind(this, 1);
sum1(2);
```
