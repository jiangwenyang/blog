---
layout: blog-post

title: JavaScript跨浏览器获取视口和元素大小
date: 2016-05-30 14:04:13
tags:
  - JavaScript
    - 浏览器兼容性
categories:
  - JavaScript
---

## 跨浏览器获取窗口大小

> 相关 API：innerWidth、innerHeight、outerWidth、outerHeight
> 跨浏览器获取窗口大小因为浏览器的差异性因此存在极大的困难性：
> 浏览器兼容性问题:
>
> 1. 在 IE9+、safari 和 firefox 中 outerWidth 和 outerHeight 返回浏览器窗口本身的尺寸
> 2. 在 opera 中 outerWidth 和 outerHeight 则返回的是页面视图容器的大小（页面标签对应浏览器窗口），innerWidth 和 innerHeight 表示的是页面视图区的大小（不包括边框）
> 3. 在 chrome 中 innerWidth、innerHeight 和 outerWidth 和 outerHeight 都返回视口的大小

因此只能在 IE9+和 safari 以及 firfox 中完全获得浏览器窗口的属性，在 opera 中能部分获得窗口信息，而在 chrome 中则只能获得浏览器视口的大小

## 跨浏览器获取浏览器视口

> 相关 API: clientWidth、clientHeight
> 浏览器兼容性问题：
> 在 IE6 中,如果文档的模式为标准模式则可以和其他浏览器一样使用 document.docuemntElement 对象进行访问，如果是混杂模式则必须通过 document.body 进行访问

代码:

```javascript
function getViewport() {
  var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
  if (typeof pageWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
      //如果是标准模式
      pageWidth = document.docuemntElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      //如果是混杂模式，主要针对IE6
      pageWidth = document.body.clientWidht;
      pageHeight = docuemnt.body.clientHeight;
    }
  }
  return {
    width: pageWidth,
    height: pageHeight
  };
}
```

## 跨浏览器获取元素相对于整个文档的偏移值（在网页中的绝对位置）

> 相关 API：offsetHeight(内容+内边距+边框)、offsetWidth、offsetLeft、offsetTop、offsetParent

```javascript
function getElementLeft(element) {
  var actualLeft = element.offsetLeft,
    parentContainer = element.offsetParent;
  while (parenetContainer) {
    actualLeft += parentContainer.offsetLeft;
    parentContainer = parentContainer.offsetParent;
  }
  return actualLeft;
}
function getElementTop(element) {
  var actualTop = element.offsetTop,
    parentContainer = element.offsetParent;
  while (parenetContainer) {
    actualTop += parentContainer.offsetTop;
    parentContainer = parentContainer.offsetParent;
  }
  return actualTop;
}
```

> 这些偏移量属性每次访问都要重新计算，因此出于性能考虑建议避免重复访问，最好将需要的属性存在局部变量中，上面的两个函数性能很差

offsetWidth、offsetHeight 和 clientWidth、clientHeight 的区别在于前者在计算的时候包含边框，后者则只计算内容区和内边距的值

## 跨浏览器获取网页元素的相对位置（相对浏览器视口的位置）

> 思路：利用上面获取的绝对位置减去页面滚动过的距离就可以获取到相对位置

```javascript
function getElementViewLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  if (document.compatMode == "BackCompat") {
    var elementScrollLeft = document.body.scrollLeft;
  } else {
    var elementScrollLeft = document.documentElement.scrollLeft;
  }
  return actualLeft - elementScrollLeft;
}
function getElementViewTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  if (document.compatMode == "BackCompat") {
    var elementScrollTop = document.body.scrollTop;
  } else {
    var elementScrollTop = document.documentElement.scrollTop;
  }
  return actualTop - elementScrollTop;
}
```

## 跨浏览器获取文档的大小

> 相关 API：scrollHeight、scrollWidth、scrollLeft、scrollTop
> `scrollHeight`：在没有滚动条的情况下，元素内容的总高度
> `scrollWidth`：在没有滚动条的情况下，元素内容的总高度
> `scorllLeft`：被隐藏在内容区域左侧的像素，相当于向右拖过的滚动条像素，可以进行设置
> `scrollTop`：被隐藏在内容区域上面的像素，相当于向下拖过的滚动条像素，可以进行设置

```javascript
function getPagearea() {
  if (document.compatMode == "BackCompat") {
    return {
      width: Math.max(document.body.scrollWidth, document.body.clientWidth),
      height: Math.max(document.body.scrollHeight, document.body.clientHeight)
    };
  } else {
    return {
      width: Math.max(
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth
      ),
      height: Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight
      )
    };
  }
}
```
