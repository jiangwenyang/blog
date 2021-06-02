---
layout: blog-post

title: 单元测试填坑-JSDOM中的session以及Sinon的FakeXMLHttpRequest
date: 2017-12-20 22:54:24
tags:
  - JSDOM
  - Sinon
categories:
  - 单元测试
---

## JSDOM 中使用 sessionStorage

部分单元测试对象中用到了 session，JSDOM 本身并没有提供对 session 操作的接口，因此采用置换 window 下的 sessionStorage 对象的方式达到模拟操作 session。可以简单的自定义，目前的项目中使用了第三方的`sessionStorage`包，封装了`setItem`,`getItem`,`remove`,`clear`等 session 操作。通过一下方式使用`sessionStorage`模块模拟 session 调用：

```javascript
// 引入sessionStorage第三方模块并全局替换window.sessionStorage对象
lodash.default(global.window.sessionStorage, window);
const SessionStroage = require("sessionStorage");
global.window.sessionStroage = SessionStroage;
```

后面再 node 的环境中调用`window.sessionStorage`的所有方法都相当于调用了`global.window.sessionStorge`也就是第三方的`sessionStorage`模块，达到模拟 session 操作的效果。

> 这里有个坑：`require('sessionStorage')`的时候，包内部会检查全局对象下的`navigator`对象是否存在，并且`cookieEnable`是否为 ture。因此必须在`global`
> 对象复制`window.navigator`的属性后才能 require，否则得到的`sessionStorage`的所有方法都是空函数`nope`。

## FakeXMLHttpRequest 时遇到同一个函数中多次异步请求

当使用 sion.useFakeXMLHttpRequest()进行请求模拟时，如果同一个函数中包含了多次异步请求，使用`requests[0].respond()`;`requests[1].respond()`,`requests[2].respond()`则后面的两次请求将响应不到。

**目前的解决方式**：使用`setInterval`进行轮询，当后续收到后续请求时立即进行响应，通过判断`requests.length`来判断响应哪一个请求。但是这里又有另外一个问题：当第一个请求响应了之后，第二个请求还没有发起，但是轮询又到了，此时`requests.length`仍然没有变化，将会再次响应`requests[0]`而之前已经响应过则会报错，因此需要引入一个标志，不再响应已响应过的请求。
