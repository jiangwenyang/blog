---
layout: blog-post

title: SVG入门
tags:
  - SVG
categories:
  - SVG
date: 2018-09-10 13:52:34
---

> 参考：
>
> - [W3C SVG 教程]: http://www.w3school.com.cn/svg/
>
> - [阮一峰-SVG 图像入门教程]: http://www.ruanyifeng.com/blog/2018/08/svg.html

### SVG 使用方式

1. 单独的 SVG 文件，通过`<img>` `<object>` `embed` `<iframe>` 标签插入

   SVG 可以保存为单独的文件，然后可以利用上面几种标签插入到 DOM 中。

   文件：_test.svg_

   ```html
   <svg
     id="mysvg"
     xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 800 600"
   ></svg>
   ```

   上面的代码将 SVG 单独保存到文件`test.svg`中

   ```html
   <!-- img标签引入，通过src指定svg图像路径 -->
   <img src="test.svg" />

   <!-- object标签引入，通过data指定svg图像路径 -->
   <object data="test.svg"></object>

   <!-- embed标签引入，通过src指定svg图像路径 -->
   <embed src="test.svg" />

   <!-- iframe标签引入，通过src指定svg图像路径 -->
   <iframe src="test.svg"></iframe>
   ```

2. 直接插入网页

   ```html
   <body>
     <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
       <circle cx="150" cy="75" r="75"></circle>
     </svg>
   </body>
   ```

3. base64 方式引入

   ```html
   <body>
     <img
       src="data:image/svg+xml;base64,PHN2Zw0KICAgIGlkPSJteXN2ZyINCiAgCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgCXZpZXdCb3g9IjAgMCA4MDAgNjAwIg0KPg0KICAgIDxjaXJjbGUNCiAgICAgICAgY3g9IjE1MCINCiAgICAgICAgY3k9Ijc1Ig0KICAgICAgICByPSI3NSINCiAgICA+DQogICAgPC9jaXJjbGU+DQo8L3N2Zz4="
     />
   </body>
   ```

### SVG 语法

#### `<svg>`标签

`<svg>`标签是相当于 Canvas 中的`<canvas>`标签，为其他 SVG 图像元素提供了“画布”。`<svg>`主要有以下几个属性：

1. `width`&`height`

   和 `<img>` `<canvas>` 标签的同名属性效果一样，用于设置元素的宽高，相当于设置了”画布“的大小。默认大小和 `<img>` `<canvas>` 一样为 300\*150。

2. `viewBox`

   > The **viewBox** attribute defines the position and dimension, in user space, of an SVG viewport.

   上面是 MDN 上关于 viewbox 的介绍，意思就是 viewbox 定义了 svg 在用户的视口中如何显示。viewBox 属性有四个值：

   - min-x 左上角的 x 坐标
   - min-y 左上角的 y 坐标
   - width 宽度
   - height 高度

   即相当于定义了一个矩形，SVG 将只显示这个矩形内的图像。

   备注：如果只定义了`viewBox`而未定义`width`和`height`，则 SVG 图像将相当于指定了长宽比，将等于所在 HTML 父元素的大小。

3. `xmlns`

   定义 DTD，包含所有允许的 SVG 元素。如果不指定，浏览器将不知道如何渲染 SVG 而只是显示 XML。

#### 线

- 直线 `<line x1="0" y1="0" x2="0" y2="100">`

  画一条从(x1,y1)到(x2,y2)的直线。

- 折线 `<polyline points="x1,y1 x2,y2 x3,y3 xn,yn"/>`

  从(x1,y1)画直线到(x2,y2)，再折到(x3,y3)，然后再折到(xn,yn)。

#### 内置图形

- 圆形 `<circle cx="0" cy="0" r="100"/>`

  以坐标 (cx,cy) 为圆心，r 为半径，画一个圆。

- 矩形 `<rect x="0" y="0" width="200" height="100" />`

  以坐标 (x,y) 为左上角顶点，width 为 200，高度为 100，画一个矩形。

- 椭圆形 `<ellipse cx="60" cy="60" rx="20" ry="40" />`

  以坐标 (cx,cy) 为圆心，rx 为 x 轴半径，ry 为 y 轴半径，画一个椭圆。

- other

  其他任意多边形可以通过 `<polygon>` 绘制，`<polygon points="x1,y1 x2,y2 x3,y3" />`

  顺序连接 (x1,y1) (x2,y2) (x3,y3) (x1,y1) ,以绘制封闭的多边形。（如果最后一个点不是起始点，则将自动封闭，即将连接最后一个点与起始点。）

#### 路径

上面的元素都只能定义规则的线条或图形，如果需要用到复杂的路径，就需要用到 `<path>` 标签了。

```xml
<svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <path d="M250 150 L150 350 L350 350 Z" />
</svg>
```

属性 d 表示绘制顺序，由多个 动作@坐标 组成。例如上面的代码表示：

1. 移动（M）到坐标 （250，150）
2. 绘制路径 (L) 到坐标 (150,350)
3. 绘制路径 (L) 到坐标 (350,350)
4. 封闭路径 (Z)

除了上面的几个动作外，支持以下动作：

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath

> 注：上面的动作均允许小写字母。大写表示绝对定位，小写表示相对定位。

#### 文本

text 标签用于绘制文本 `<text x="0" y="0"></text>`

`x` 和 `y` 属性用于指定文本的基线（baseline）的起点坐标。

#### `<use>`标签

`<use>` 和 `<defs>` 和 `<g>` 标签主要用于代码重用。

```xml
<svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <circle id="myCircle" cx="150" cy="75" r="75"></circle>
    <use href="#myCircle" x="0" y="0" />
</svg>
```

上面的代码 use 标签通过 href 属性指定复制 id 为"myCircle"的元素，然后指定 use 元素左上角坐标为 (x,y) 。

#### `<g>`标签

用于将多个 svg 元素进行分组(group)，然后可以通过 `<use>` 标签进行复用。

```xml
<svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <g id="myCircle">
     <text x="25" y="20">circle</text>
     <circle cx="0" cy="0" r="100"/>
  </g>
  <use href="#myCircle" x="0" y="0" />
</svg>
```

#### `<defs>`标签

`<defs>` 内部的代码不会渲染，只用于引用。因此可以将多次使用的 SVG 元素或元素组合使用 `<defs>` 包裹，然后使用 `<use>`标签进行重用。

```xml
<svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <g id="myCircle">
      <text x="25" y="20">circle</text>
      <circle cx="0" cy="0" r="100"/>
    </g>
  </defs>
  <use href="#myCircle" x="0" y="0" />
</svg>
```

#### 样式

可以直接作为属性设置在 SVG 元素上，也可以通过 CSS 或者 JS 设置。

- fill 填充颜色
- stroke 描边颜色
- stroke-width 边框宽度

### 通过 CSS 设置 SVG 样式

直接写在 HTML 中才可以使用 CSS

```html
<body>
  <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <circle cx="150" cy="75" r="75"></circle>
  </svg>
</body>
```

```css
circle {
  fill: #000;
  stroke: rgb(255, 0, 0);
  stroke-width: 1;
}
```

### 通过 JavaScript 操作 SVG

和 CSS 不一样，CSS 只有在 SVG 直接写在 HTML 中才可以对 SVG 进行设置。JavaScript 在这两种情形下有不同的方式操作 SVG。

- SVG 直接写在 HTML 中

  和普通的 DOM 元素一样进行操作即可。

- 使用`<object>`、`<embed>` 、`<iframe>` 标签插入（ `<img>` 标签无法获取 SVG DOM）。

  - `<object>` 标签 DOM 对象下的 `contentDocument` **属性**保存了嵌入元素的 DOM 对象，通过 `document.getElementById('object').contentDocument` 即可访问。
  - `<embed>` 标签的 Dom 对象下的**方法**`getSVGDocument()` 保存了对应的 SVG DOM。
  - `<iframe>` 和 `<object>` 标签类似，通过 `document.getElementById('object').contentDocument` 即可访问。
