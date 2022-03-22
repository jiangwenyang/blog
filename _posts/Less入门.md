---
title: Less入门
date: 2018-08-02
tags:
  - Less
---

## 介绍

less 是一种支持`编程`的预编译样式语言，在原生的 CSS 基础上扩展了如变量、函数、继承、

运算等特性，支持客户端和服务器端。

## 特性

### 注释

less 中支持两种注释方式：

1. 原生的 CSS 注释方式

   ```less
   /* 原生的CSS的注释方式，会被保留到结果的CSS文件中 */
   @comFontSize: 13px;
   ```

2. 双斜线注释（不会被编译到结果 css 中）

   ```less
   // 双斜线的注释方式，编译时会被过滤掉
   @comFontSize: 13px;
   ```

### 变量

在 Less 中我们可以通过定义变量的方式将通用的属性值定义为变量以进行复用，并且在修改的时候只需要修改变量值而不用修改每一处。

```less
@bgColor: #fff; // 使用 @变量名 的方式定义变量

body {
  background: @bgColor; // 在需要用到的地方使用 @变量名
}
```

### 混合

混合类似于将 CSS 以函数化的方式进行复用，例如可以在 class B 中直接复用 class A 定义的规则，并且可以通过传入参数的方式使得 class 的复用更加灵活。

```less
// 不带参数
.classA {
  color: #ccc;
}

.classB {
  font-size: 16px;
  .classA;
}

// 带参数
.classA（@color） {
  color: @color;
}

.classB {
  font-size: 16px;
  .classA(#ccc);
}

// 使用默认参数
.classA（@color:#ccc） {
  color: @color;
}

.classB {
  font-size: 16px;
  .classA;
}
```

上面三种写法最终生成的 CSS 代码是一样的：

```css
.classA {
  color: #ccc;
}

.classB {
  font-size: 16px;
  color: #ccc;
}
```

### 允许嵌套

Less 允许使用类似于 HTML 标签嵌套的方式来实现 CSS 规则的集成，并且减少代码量。

原本你可能在 CSS 中需要这样写：

```css
#header {
  font-size: 20px;
}
#header > ul {
  font-size: 26px;
}
#header > ul > li {
  color: #ccc;
}
#header > ul > li:hover {
  color: #999;
}
```

借助 Less 的嵌套规则，你可以这样写：

```css
#header {
  font-size: 20px;
  ul {
    font-size: 26px;
    li {
      color: #ccc;
      &:hover {
        color: #999;
      }
    }
  }
}
```

相比之下 Less 的写法更加清晰，代码量更少。

### 运算

Less 中支持数字、颜色、变量的运算。

```less
@var: 1px + 5; // 6px,能够分辨单位
@var: (1px + 5) * 2; // 12px,支持复杂运算
border: (@var * 2) solid black; // 支持复合属性
```

### 内置函数

Less 内置了一些函数用于处理颜色和数值

#### 颜色函数

- lighten
- darken
- saturate
- desaturate
- fadein
- fadeout
- fade
- spin
- mix
- ...

#### Math 函数

- round
- ceil
- floor
- percentage
- ...

使用方式和就像普通的函数调用一样

```less
@base: #f04615;
h1 {
  color: saturate(@base, 5%);
  font-size: percentage(0.5);
}
```

## 命名空间

命名空间允许我们更好的组织 CSS，将某个模块用到的 CSS 属性集合统一到某个命名空间下。

```less
#namespaceA {
  @size: 26px;
  .button {
    font-size: @size;
  }
}
```

在用到的地方：

```less
#footer button {
  color: #ccc;
  #namespaceA > .button;
}
```

### 作用域

Less 的作用域规则和 JavaScript 类似，采用“就近原则”，即优先使用内部代码块中定义的变量。

```
@var: 1;

#header {
  @var: 2;
  #header {
    color: @var; // 2
  }
}

#footer {
  color: @var; // 1
}
```

### 模块导入

- 导入其他 less 文件

  ```less
  @import "ohterLess.less"; // 带后缀
  @import "otherLess"; // 不带后缀也可以识别
  ```

- 导入 css 文件

  ```
  @import "otherCSS.css" //后缀为css时不会被编译
  ```

### 字符串中使用变量

Less 支持在字符串中使用变量，类似于模板字符串。使用@{varname}的方式使用变量。

```
@url："http:test.com";
background-image:url("@{url}/image/test.png")
```

### 使用 JavaScript 表达式

在反引号``中可以使用 JavaScript 表达式。

```less
@var: ` "hello" .toUpperCase() + "!" `;
```
