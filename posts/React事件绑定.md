---
layout: blog-post

title: React事件绑定
date: 2017-12-20 23:11:56
tags:
  - React
  - 事件
categories:
  - React
---

由于类的方法默认不会绑定 this，因此在调用的时候如果忘记绑定，this 的值将会是 undefined。
通常如果不是直接调用，应该为方法绑定 this。绑定方式有以下几种：

## 1. 在构造函数中使用 bind 绑定 this

```javascript
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("this is:", this);
  }
  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

## 2. 在调用的时候使用 bind 绑定 this

```javascript
class Button extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Click me</button>;
  }
}
```

## 3. 在调用的时候使用箭头函数绑定 this

```javascript
class Button extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }
  render() {
    return <button onClick={() => this.handleClick()}>Click me</button>;
  }
}
```

## 4. 使用属性初始化器语法绑定 this(实验性)

```javascript
class Button extends React.Component {
  handleClick = () => {
    console.log("this is:", this);
  };
  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

## 比较

**方式 2**和**方式 3**都是在调用的时候再绑定 this。

- **优点：**写法比较简单，当组件中没有 state 的时候就不需要添加类构造函数来绑定 this
- **缺点：**每一次调用的时候都会生成一个新的方法实例，因此对性能有影响，并且当这个函数作为属性值传入低阶组件的时候，这些组件可能会进行额外的重新渲染，因为每一次都是新的方法实例作为的新的属性传递。

**方式 1**在类构造函数中绑定 this，调用的时候不需要再绑定

- **优点：**只会生成一个方法实例，并且绑定一次之后如果多次用到这个方法也不需要再绑定。
- **缺点：**即使不用到 state，也需要添加类构造函数来绑定 this，代码量多一点。。。

**方式 4：**利用属性初始化语法，将方法初始化为箭头函数，因此在创建函数的时候就绑定了 this。
**优点：**创建方法就绑定 this，不需要在类构造函数中绑定，调用的时候不需要再作绑定。结合了**方式 1**、**方式 2**、**方式 3**的优点
**缺点：**目前仍然是实验性语法，需要用 babel 转译

## 总结

方式 1 是官方推荐的绑定方式，也是性能最好的方式。方式 2 和方式 3 会有性能影响并且当方法作为属性传递给子组件的时候会引起重渲问题。方式 4 目前属于实验性语法，但是是最好的绑定方式，需要结合 bable 转译
