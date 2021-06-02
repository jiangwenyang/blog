---
layout: blog-post

title: 前端E2E测试基础
date: 2017-12-20 23:21:55
tags:
  - E2E
categories:
  - E2E测试
---

## 前端 E2E（端到端）测试

### 了解测试用例、以及 GUI 测试

大学学过的软件工程基本上被忘光了，但是还是有一些测试的基础知识。大致回顾了一下测试的一些名词。
**白盒测试:**结构测试，测试代码的内部逻辑。测试用例主要是侧重于逻辑覆盖，即尽可能覆盖到代码的执行逻辑。
**黑盒测试：**只关注模块的输入输出，不关心细节。主要有等价类划分、边界值分析等测试方式。
**GUI 测试：**GUI 的测试因为输入时事件，并且受到初始状态和操作历史等影响，因此测试起来很复杂，测试用例难以定义，并且自动执行也需要时刻监视 GUI 状态和变化，难以控制。

### 了解 chromeless phantomjs 以及 casperjs

**Chromeless**
提供了简单易用的基于 Chrome 的 headless 浏览器，语法简单，并且支持本地和 AWS Lamda 远程两种运行模式，利用 AWS Lamda 可以并行运行多个独立的浏览器。
**Phantomjs**
基于 webkit 内核的 headless 浏览器，语法简单，支持多种语言，有多种测试框架支持，提供了丰富的 API，以及支持 CSS 选择器，并且支持 JS 注入，可以在当前页面注入 Jquery 等工具库。
**casperjs**
基于 Phantomjs 的封装，API 更好用，同时也是一个测试框架。
Phantomjs 和 casperjs 都能对当前页面进行截图，并且可以搭配 PhantomCss 进行图像 diff，可以实现页面的监控以及组件的 GUI 测试。

casperjs 能很方便的模拟几乎所有人的一些操作，并且结合 fakerjs 等数据生成工具可以进行一些复杂的测试，但是由于使用 headless，因此同样受限于网络，因此测试速度上会比较慢，同时写 demo 的时候也发现调试比较麻烦，甚至很难调试，并且无论是 phantomjs 还是 chromeless，都不支持浏览器兼容性测试，这是比较大的痛点。并且测试 case 的维护成本也较高，GUI 测试一般需要对 GUI 结构有了解对测试人员要求较高。GUI 测试最好针对 UI 组件以及核心组件进行，能得到较大的收益。

别人这样总结自动化:

> 自动化的收益 = 迭代次数 _ 全手动执行成本 - 首次自动化成本 - 维护次数 _ 维护成本

参考

- [前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)
- [[从入门到不放弃]多浏览器的自动化测试-本地测试](https://zhuanlan.zhihu.com/fullstacker)
- [百度百科-GUI 软件测试](https://baike.baidu.com/item/GUI%E8%BD%AF%E4%BB%B6%E6%B5%8B%E8%AF%95/4169201?fr=aladdin)
