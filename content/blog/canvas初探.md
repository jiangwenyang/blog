---
layout: blog-post

title: canvas初探
date: 2018-08-28 10:56:03
tags:
  - Canvas
categories:
  - JavaScript
---

本文是阅读 MDN 上 Canvas 教程的一些心得和笔记，同时附上现学现用写的一个小的仪表盘 demo。

## 一、什么是 canvas

Canvas 中文名称叫“画布” ，Canvas API 是 HTML5 定义的一套用于在浏览器上使用 Javascript 操作位图的可用规范。Internet Explorer 9+, Firefox, Opera, Chrome, 和 Safari 支持 \<canvas\> 标记.通过 Canvas 浏览器端绘图被极大的简化，同时也能实现很多原本很难实现的一些动画效果。

## 二、基本用法

### 1. canvas 元素

HTML5 新增 Canvas 标签，用于在 HTML 中插入供 JavaScript 操作的上下文环境。canvas 标签的使用和其他 HTML 标签的使用没有任何差别:

```html
<canvas id="mycanvas" width="150" height="150"></canvas>
```

canvas 只有两个特殊的属性，`width`和`height`，其他的属性都是普通的 HTML 属性。一般而言我们会为 canvas 标签定义一个`id`属性作为“钩子”方便 Javascript 引用，当然这不是必须的。事实上，`width`和`height`属性也不是必须的，当你不指定时 canvas 将会默认 300x150 的宽高。

> canvas 标签不是自闭合标签，必须写作\</canvas\>是必须的。并且标签内部可以定义**替换内容**，对于一些不支持 canvas 的浏览器将会显示内部的内容，而忽略 canvas 标签，而对于支持 canvas 的浏览器则不会显示，建议总是定义替换内容以便老的浏览器显示。
>
> 例如下面的这段代码在支持 canvas 的浏览器中不会显示中间的文字，在不支持 canvas 的浏览器中则只会显示中间的文字内容。
>
> `<canvas>抱歉你的浏览器不支持canvas<canvas>`

### 2. canvas 上下文

HTML 的\<canvas\>元素定义了一个**渲染上下文**，提供了一块供我们操作的”画布“，通过 JavaScript 调用 Canvas 提供的画笔(Canvas API)，便可以在 canvas 上进行图像绘制。canvas 提供了多种类型的渲染上下文，不仅仅有 2D，也支持 3D 的渲染上下文，一般网页上 2D 图像应用较多，这里只讨论 2D 渲染上下文。

> 将大象装进冰箱要几步?

1. 拿到`<canvas>`元素对应的 DOM 对象

   ```js
   var canvas = document.getElementById("mycanvas");
   ```

2. 通过`getContext()`获取 Canvas DOM 对象的渲染上下文以进行绘图

   ```
   var ctx = canvas.getContext('2d')
   ```

3. 使用绘图上下文 ctx 调用绘图 API 进行图像绘制

> 通过简单测试 Canvas DOM 对象上是否有 getContext 方法可以判断脚本是否支持 Canvas API
>
> `if(!canvas.getContext)return;`

## 三、绘制

### 1. 坐标

Canvas 使用坐标系来进行定位， 默认以\<canvas\>元素左上角为原点坐标(0,0)，水平向右作为 X 轴正方向，竖直向下作为 Y 轴正方向，1px 对应一个单位。可以通过`translate()`改变原点位置以及通过`rotate()`旋转坐标系。

### 2. 形状

不同于 SVG 中提供了如\<rect\> \<circle\> \<ellipse\> \<line\> \<polyline\> \<polygon\> \<path\> 等预定于形状元素使用，在 Canvas 中默认只提供了 Rect（矩形）的绘制，其他形状都可以使用路径来进行绘制。

- `fillRect(x,y,width,height)`

  绘制一个填充的矩形

- `strokeRect(x,y,width,height)`

  绘制一个只有边框路径的矩形

- `clearRect(x,y,width,height)`

  清除目标矩形区域的所有像素

### 3. 路径

路径绘制是 Canvas 中最重要的操作，Canvas 对于路径绘制的 API 相当的简洁。

总结就是”我要开始画了，嗯从这里开始画，画到这里“，具体到 API 而言即使用下面几个步骤进行路径的绘制：

1. `beginPath()` 新建路径
2. `closePath()` 关闭路径
3. `moveTo(x,y)` 移动笔触到坐标(x,y)处
4. `lineTo(x,y)` 从上一个位置画到坐标(x,y)处
5. `stroke()` 路径描边
6. `fill()` 填充路径内容区域

Canvas 也提供了几种常用路径：

1. `rect(x,y,width,height)` 绘制矩形路径，`fillRect`、 `strokeRect` 、`clearRect`的路径版。

2. `arc(x, y, radius, startAngle, endAngle, anticlockwise)` 以 x,y 为原点，radius 为半径，顺时针（anticlockwise 为 false）或逆时针（anticlockwise 为 true）从圆角为 startAngle 到 endAngle 绘制圆弧。

3. `quadraticCurveTo(cp1x, cp1y, x, y)`

   绘制二次贝塞尔曲线，`cp1x,cp1y`为一个控制点，`x,y为`结束点。

4. `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

   绘制三次贝塞尔曲线，`cp1x,cp1y`为控制点一，`cp2x,cp2y`为控制点二，`x,y`为结束点。

> 参考：
>
> - [MDN 文档 -- 贝塞尔曲线使用](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#%E4%BA%8C%E6%AC%A1%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF%E5%8F%8A%E4%B8%89%E6%AC%A1%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF)
> - [Path2D 对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Path2D_%E5%AF%B9%E8%B1%A1)

### 4. 文本

- `strokeText(text,x,y[,maxWidth])` 在(x,y)处开始绘制文本边框，最大宽度为 maxWidth(可选)
- `fillText(text,x,y[,maxWidth])` 在(x,y)处开始填充文本，最大宽度为 maxWidth(可选)

> 文本也可以设置一些样式，如 font textAlign textBaseLine direction，具体使用参考 [MDN Canvas 教程 - 有样式的文本](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_text#%E6%9C%89%E6%A0%B7%E5%BC%8F%E7%9A%84%E6%96%87%E6%9C%AC)

## 四、样式

### 1. 路径颜色

通过`stokeStyle()`来指定路径颜色，其后调用`stoke()`和`stokeRect()`时将使用设置的颜色，默认是黑色，可以设置任何 CSS 合法（web 颜色名，16 禁止颜色值，rgb，rbga）的颜色值。

```js
ctx.strokeStyle = "rgba(255,0,0,0.5)";
```

### 2. 填充颜色

通过`fillStyle()`来指定填充颜色，其后调用`fill()`和`fillRect()`时将使用设置的颜色默认是黑色，可以设置任何 CSS 合法（web 颜色名，16 禁止颜色值，rgb，rbga）的颜色值。

```js
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

### 3. 透明度

可以通过`globalAlpha` 属性设置全局的透明度（其后的 stroke 和 fill 都将带有透明度），也可以在设置 strokeStyle 和 fillStyle 时使用 rbga 作为颜色单位局部设置透明度。

### 4. 线形

### 5. 渐变

## 五、操作图片

## 六、变形

## 七、动画
