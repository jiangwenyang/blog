---
title: CSS媒体查询入门
tags:
  - CSS
date: 2018-09-10 16:59:18
---

## 一、介绍

媒体查询（media-query）是 CSS3 添加的用于识别满足指定条件的设备以应用不同的样式的新特性。条件由媒体类型和媒体属性组成。

媒体查询可以全局应用到 link 元素上，通过设置 media 属性，根据不同的媒体类型选择不同的样式表：

```html
<link rel="stylesheet" href="style.css" media="screen and (min-width:1000px)" />
```

也可以在样式表中应用：

```css
@media screen and (min-width: 1000px) {
  color: #ccc;
}
```

## 二、语法

一条媒体查询有一个可选的媒体类型和多个媒体属性组成，多条媒体查询之间通过逗号 `,` 分隔，表示满足其中任意一个条件。

媒体查询本质上相当于多个判断表达式，每个表达式为 true 或者 false，然后通过每个表达式的结果得到最终的结果，如果最终的结果为 true 则应用命名空间下的 CSS，否则不应用。

### 2.1 媒体类型

媒体类型用于限定当前设备的类型，例如手持设备、屏幕设备、默认为 all。

- all 所有设备
- aural -- 听觉设备
- braille -- 盲文设备
- handheld -- 手持设备（手机、PAD）
- print -- 打印设备
- projection -- 投影设备
- screen -- 屏幕设备 (PC)
- tty -- 固定字母间距的网格的媒体，电传打印机
- tv -- 电视
- embossed -- 盲文打印

### 2.2 媒体属性

媒体属性用于限定当前设备的属性，例如宽高、颜色、方向等。

媒体属性非常丰富，但是日常开发中用到的可能不多。

`max-device-width`：用于创建手机版网站

`max-width`：用于针对窗口宽度设定不同的样式

`orientation`：用于根据平板电脑或 iPad 的横向或者竖向来改变布局

[所有可用的媒体属性]: https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries#%E5%AA%92%E4%BD%93%E7%89%B9%E5%BE%81

### 2.3 逻辑表达式

媒体查询支持 `and` `not` `only` 三种逻辑操作符：

- `and`

  and 表示类似于 JavaScript 中的 `&&` 操作符，当所有条件都满足时，才返回 true。用于声明同时满足多个媒体属性。

  ```css
  @media handheld and (color) and (max-width: 300px) and (orientation: landscape);
  ```

  上面的媒体查询表示设备为手持设备，可以显示颜色，最大宽度为 300px，并且屏幕方向为横屏。

  使用 and 时如果媒体类型为 all 则媒体类型可以省略：

  ```css
  @media all and (max-width: 300px) /* 等于 */ @media (max-width: 300px) @media all and (max-width: 300px) and (orientation: landscape) /* 等于 */ @media (max-width: 300px) and (orientation: landscape);
  ```

- `not`

  `not` **应用于整条媒体查询**，对整条媒体查询进行取反，表示“不满足后面的条件”。

  ```css
  @media not all and (monochrome) {
    ...;
  }
  /* 等于 */
  @media not (all and (monochrome)) {
    ...;
  }
  /* 不等于 */
  @media (not all) and (monochrome) {
    ...;
  }
  ```

  > 使用`not`时，媒体类型不可省略

- `only`

  `only` 比较有意思，MDN 上的文档描述比较粗糙。

  > `only`关键字防止老旧的浏览器不支持带媒体属性的查询而应用到给定的样式。

  然后通过搜索引擎搜到的资料也比较少，Google 出的结果包含一条百度知道的高赞答案却明显答非所问。查看 W3C 的文档描述。

  > The keyword ‘`only`’ can also be used to hide style sheets from older user agents. User agents must process media queries starting with ‘`only`’ as if the ‘`only`’ keyword was not present.

  翻译过来就是：only 关键词被用来对老的用户代理隐藏样式表，用户代理处理媒体查询时必须忽略开头的'only'。

  ```css
  media="only screen and (min-width: 401px) and (max-width: 600px)"
  /* 在支持媒体查询的浏览器中等于*/
  media="screen and (min-width: 401px) and (max-width: 600px)"

  /*在不支持媒体查询的浏览器中解析到带only的媒体查询时，会将only视为媒体类型。（由于没有only这种媒体类型，因此将不会被应用）*/
  media="only"

  /*如果不带only，在不支持媒体查询的浏览器中*/
  media="screen and (min-width: 401px) and (max-width: 600px)"
  /*将被解析为screen，将会被应用到屏幕类型设备上*/
  media="screen"
  ```

  > 与 `not` 一样，使用 `only` 时，媒体类型不可省略

  参考链接：

  [w3c media queries]: Thekeyword‘only’canalsobeusedtohidestylesheetsfromolderuseragents.Useragentsmustprocessmediaqueriesstartingwith‘only’asifthe‘only’keywordwasnotpresent.
  [what-is-the-difference-between-screen-and-only-screen-in-media-queries]: https://stackoverflow.com/questions/8549529/what-is-the-difference-between-screen-and-only-screen-in-media-queries/14168210#14168210
