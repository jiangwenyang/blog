---
layout: blog-post

title: 如何测试Promise
date: 2017-12-21 20:05:00
tags:
  - Promise
categories:
  - 单元测试
---

## promise.then(callback)

在 callback 中使用 return 返回值时，return 的值会由 Promise.resolve()进行包装处理，返回一个新的 Promise 对象。无论返回的是什么值，promise.then()会将回调函数的返回值进行转换返回一个新的 Promise 对象，而不是简单的只是注册了回调函数。

## promise.then()和 promise.catch()的区别

promise.catch()其实本质上只是 promise.then(undefined,callback(err))的语法糖。但是两者最大的区别是在实际使用时错误的捕获范围，考虑下面两种情况：

1. promise.then(onResolve,onReject)
2. promise.then(onResolve).catch(onReject)
   两种调用方式当`promise chain`（每一次 promise 调用会增加 promise chain）上第一个 promise 状态变为 reject 时 Error 都会被捕获到，1 中 Error 会在.then 中被捕获，2 中 Error 会在.catch 中被捕获。
   但是后一次的`promise chain`即.then()新返回的 Promise 对象的 onResolve 回调中发生错误时，1 是无法捕获的，2 却能捕获到。

总结：
promise.catch()和 promise.then(onResolve,onReject)的 onReject 都能捕获到其之前的`promise chain`中抛出的 Error，但是 promise.then(onResolve,onReject)的 onReject 无法捕获 onResolve 中的错误。

## Promise 测试

Mocha 支持异步测试，因此同样也支持 Promise 的支持，并且针对 Promise 测试有一些特别的地方。

### Mocha 中普通异步测试

在 mocha 中使用回调函数的风格对异步处理进行测试。

```javascript
describe("this is a asynchronous test", function() {
  it("should use done", function(done) {
    setTimeout(function() {
      // assert
      done(); // tell mocha the test finish
    }, 100);
  });
});
```

和普通的测试几乎一样，唯一的区别是需要传入 done 回调函数，并在测试完成（通常是断言后）调用 done()通知测试完成。

### Mocha 中简单使用 done 的 Promise 测试

因此测试 Promise 时和测试其他的异步测试类似：

```javascript
describe("this is a asynchronous test", function() {
  it("should use done", function(done) {
    Promise.resolve.then(function(value) {
      // assert value
      done();
    });
  });
});
```

只需要在 promise 的 onResolve 回调中进行断言，但是这种方式会有问题：当断言失败的时候，throw 出来的 error 会被 Promise 所捕获而不会被测试框架捕获，因此测试不会结束，直到超时，并且在测试报告中显示的错误不是断言错误而是 done()未调用导致超时的错误。

**改进：**
针对这个问题我们可以简单的改一下 done 调用的时机来解决。

```javascript
describe("this is a asynchronous test", function() {
  it("should use done", function(done) {
    Promise.resolve
      .then(function(value) {
        // assert value
      })
      .then(done, done);
  });
});
```

当断言通过时调用`done()`,断言失败时调用`done(err)`，因此都能被 mocha 捕获到。
但是这种方式需要添加额外的`.then(done,done)`，忘记添加的话则会超时。

### Mocha 支持的 Promise 的测试风格

Mocha 官网关于 Promise 测试：

> Alternately, instead of using the done() callback, you can return a promise. This is useful if the APIs you are testing return promises instead of taking callbacks:

即可以简单的 return Promise 而不用使用 done 回调的形式进行测试。

### 良好的 Promise 测试

- 明确 Promise 状态应该为 Fulfilled 和 Reject 其中之一
- 在`.then(onFulfilled,onReject)`调用非期望回调抛出错误，调用期望回调则在期望回调中进行传入参数的断言。
  例如，期望 promise 状态为 Fulfilled，并且传入的值为期望的值

```javascript
return promise.then(
  function(value) {
    expect(value).to.equal("expect value");
  },
  function() {
    throw new Error("期望Promise状态为Fulfilled，但为Reject");
  }
);
```
