---
layout: blog-post

title: CSS常见单位
date: 2017-12-20 23:01:01
tags:
  - CSS
categories:
  - CSS
---

## 相对尺寸单位

- **em**
  当前字体尺寸，如果当前元素设置了 font-size，则`1em=font-size`，否则将继承最近的父元素的 font-size
- **ex**
  表示元素的*x-height*，即含有“_x_”字母字体中小写字母“_x_”的高度，通常 1ex≈0.5em
  ![Alt text](http://ow67vzejn.bkt.clouddn.com/1510104790459.png)
- **ch**
  表示所用字体中"_0_"的宽度。
- **rem**
  代表根元素（html）元素的*font-size*的大小，如果用在根元素上，则代表了默认的初始值。

  > **rem 兼容性：**
  >
  > - IE6-8 不支持
  > - IE9&IE10 存在兼容性问题：不能在 font 的简写属性里面使用，不能在伪元素上使用
  >   ![Alt text](http://ow67vzejn.bkt.clouddn.com/1510105480168.png)

- **lh**
  表示`line-height`的计算值
- **rlh**
  表示根元素的`line-height`的计算值，当用于设置根元素的`line-height`或者`font-size`的时候，等于对应的`line-height`或者`font-size`的初始值。

## 视口长度单位

文档的可视部分，当`overflow:auto`时视口宽度包含滚动条，`overflow：scroll`视口宽度不包括滚动条。

- **vh**
  视口宽度的 1/100
- **vw**
  视口高度的 1/100
- **vmin**
  视口高度和宽度最小值的 1/100
- **vmax**
  视口高度和宽度最大值的 1/100

## 绝对长度单位

> The absolute length units are fixed in relation to each other and anchored to some physical measurement. They are mainly useful when the output environment is known. The absolute units consist of the physical units (in, cm, mm, pt, pc, q) and the visual angle unit (px).
> 绝对单位是关联在物理测量上的相对单位。当输出的环境（载体）是固定的时候，是很有用的。绝对单位包含物理单位（in,cm,mm,pt,pc,q）和视角单位(px)。

- **px**
  绝对单位中的视角单位，实际上是相对单位。像素真实的大小，首先和所在屏幕大小相关，其次和屏幕分辨率 DPI(Dot Per Inch 每英寸点数)关。例如屏幕宽 10 英寸(in)，36 的 DPI，则水平上一行包含 360 个像素点，一个像素就是 1/36 英寸。
  $ 1px实际大小=\frac {屏幕宽度} {屏幕宽度x屏幕分辨率}=\frac {1} {屏幕分辨率}$
  因此分辨率越高，则 1 像素的在物理视觉上就越小。
- **in**
  英寸，1 in = 2.54cm=96px
- **cm**
  厘米，1cm=37.8px
- **mm**
  毫米,1mm=3.78px
- **pc**
  派卡，印刷业使用的长度单位 1 pc = 1/6 in = 4.512 mm
- **pt**
  磅 ，1pt = 1/72 in = 0.352 777 mm， 1 in = 72pt
  绝对尺寸是物理上的尺寸，能更加直观但是无法保证在各种设备下显示友好，即无法适配。

> CSS 的单位不是根据物理上的英寸来表现的，而是表现为 96px。这意味着无论真实屏幕的像素密度是多少，（在 CSS 中）它都假设为 96dpi。在一个高像素密度的设备中，1in 会小于实际的 1 物理英寸。类似地 mm、cm 和 pt 都不是一个绝对的长度单位。

## 特别的百分比

百分比是基于父元素同一属性的度量单位，例如父元素宽度 400px，则对子元素宽度应用 50%就是 200px。

## 参考

兼容性：
![Alt text](http://ow67vzejn.bkt.clouddn.com/1510109315447.png)

常用换算：
![Alt text](http://ow67vzejn.bkt.clouddn.com/1510109616031.png)

- [MSDN length](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length#%E7%9B%B8%E5%AF%B9%E9%95%BF%E5%BA%A6%E5%8D%95%E4%BD%8D)
- [W3C length 规范](https://www.w3.org/TR/css3-values/#length-value)
