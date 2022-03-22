---
title: Cypress 端到端测试
date: 2018-09-11
tags:
  - 前端测试
  - E2E测试
---

# Cypress 端到端测试

## 介绍

[Cypress](https://www.cypress.io/)是一个非常优秀的测试平台，提供了从单元测试到端到端测试完善的解决方案。cypress 基于现有的一些测试框架和测试工具做了高层封装，提供了简单的链式的 API，并且对于网络请求、元素发现等端到端测试的痛点提供了比较优秀的解决方案。并且 cypress 提供了 Electron 的 GUI 界面，方便测试用例的管理和执行。

相比其他测试框架，cypress 有以下显著的优点：

- 默认元素等待，不需要手动指定等待时间
- 与测试对象运行在同一个执行环境内，因此能获取到 Window document 等对象
- 能够拦截并模拟请求响应（对于 edge cases 非常有用），并且提供了简洁的 API 执行响应内容
- 应用的每一个状态改变自动生成截图，以及良好的调试体验
- cy.command 提供了灵活的全局自定义函数封装

## 安装

cypress 提供了两种安装方式：

1. 通过 npm 进行安装（推荐，cypress 和其他依赖统一管理，并且方便持续集成）

   ```bash
   $ npm install cypress --save-dev
   ```

2. 直接下载安装

   从 CDN 下载http://download.cypress.io/desktop之后双击安装即可

## 使用

### 打开 cypress

在当前目录下执行

```
$ ./node_modules/.bin/cypress open
```

或者使用 npm bin 命令

```bash
$ $(npm bin)/cypress open
```

或者将上面的命令写入项目 package.json

```json
{
  "scripts": {
    "test": "cypress open"
  }
}
```

### 目录结构

![](http://ow67vzejn.bkt.clouddn.com/18-6-11/62840927.jpg)

- fixtures-- 存放测试用到的资源文件，如模拟请求响应时的 json 文件，或其他任意的资源文件，使用时只需要指定文件相对 fixtures 目录的相对路径即可。
- integration -- 存放测试用例，cypress 将会默认读取这个目录下的测试用例。
- plugins -- cypress 插件，主要包括一些预编译等扩展，也可以根据需求自行扩展
- support -- 允许用户通过 cy.command.add(command_name,fn)自定义全局命令,可以在这里封装一些如登录登出等常用操作
- screenshots --- 默认的截图保存目录
- videos --- 默认的录制视频保存目录

> 以上目录可以通过 cypress.json 中进行自定义，参考 https://docs.cypress.io/guides/references/configuration.html#Folders-Files

### 组织测试用例

默认 Cypress 将会读取项目 integration 目录下的文件作为测试用例（对目录层次、文件名、文件格式没有限制），然后 Cypress 会在测试运行的时候尝试找到这些文件中的测试用例。Cypress 使用 Mocha 作为测试框架，因此是熟悉的 `describe` + `it` 的测试代码组织形式。同样的像`before` `after` `beforeEach` `afterEach` 这些测试钩子函数也可以正常使用。

## 调试

由于 Cypress 默认是异步，也就是说所有操作都是推入到 task queue 中，因此常用的 debug 和 console 可能无法简单的使用。

调试主要有以下三种方式：

1. 使用 GUI 界面运行，打开控制台点击每一个步骤能在 console 面板中看到该步骤的相关输出信息
2. 在`.then(）`中调用`console.log()`或`debugger`
3. 使用官方的语法糖`.debug()`

> 参考: https://docs.cypress.io/guides/guides/debugging.html#

## TroubleShooting

- 在一个用例中使用多个 fixture 时如何避免多层嵌套？

  使用资源文件时需要保证资源文件成功加载，因此一般会有下面的写法:

  ```js
  cy.fixture("mockData/user.json").then((user) => {
    console.log(user.name); // test
    console.log(user.password); // eisoo.com
  });
  ```

  如果有多个资源文件依赖,这种写法可能就比较 hell 了

  ```js
  cy.fixture("mockData/user.json").then((user) => {
    cy.fixture("mockData/config.json").then((config) => {
      console.log(user.name); // test
      console.log(user.password); // eisoo.com
      console.log(config.open); // true
    });
  });
  ```

  **解决办法：**

  在 beforeEach 中获取到资源文件并使用 as 保存到上下文中

  ```js
  beforeEach("fixture", () => {
    cy.fixture("Login/oem_lang.json").as("oemconfig_lang");
    cy.fixture("Login/oem_anyshare.json").as("oemconfig_anyshare");
    cy.fixture("Login/getconfig.json").as("config");
  });

  it("产品标语", function () {
    cy.get("._-ShareWebComponents-src-Index-styles-desktop---oem-organization")
      .contains(this.oemconfig_lang.slogan)
      .debug();
  });
  ```

  > - 由于依赖 Mocha 的 context，因此不能使用箭头函数，[原因在这里](https://mochajs.org/#arrow-functions)。
  > - 如果有多个用例会使用到同一个资源文件则必须写到 beforeEach 中，因为资源文件在被使用后将被自动回收。

- 如何监听和模拟请求响应？

  Cypress 支持监听并拦截浏览器请求，因此在涉及到一些如后台配置项，异步请求等场景时将会很有用。

  cypress 提供了`cy.server()` 和 `cy.route()` 两个方法，前者表明开启监听服务，后者用于匹配指定的路由。

  Example:

  ```js
  it("监听请求", () => {
    cy.server();
    cy.route("POST", "/v1/file?method=osendupload**") // 匹配请求url中包括/v1/file?method=osendupload的请求
      .as("osendupload"); //保存请求句柄
    cy.get("button").click(); // 发起请求，响应时间可能很长
    cy.wait("@osendupload"); //等待请求成功响应
    cy.contains("success"); //界面更新
  });

  it("拦截并模拟请求响应", () => {
    cy.server();
    cy.route("POST", "/v1/file?	    method=osendupload**", "fx:mockData.json") // 拦截请求url中包括/v1/file?method=osendupload的请求,并用fixture中的本地json文件内容进行响应
      .as("osendupload"); //保存请求句柄
    cy.get("button").click(); // 发起请求，响应时间可能很长
    cy.wait("@osendupload"); //等待请求成功响应
    cy.contains("success"); //界面更新
  });
  ```

- 没有`.hover()`,并且`.click()` `.invoke()` `.trigger()`无法在“不可操作”元素上触发

  由于一些[原因](https://github.com/cypress-io/cypress/issues/10)，Cypress 并没有提供`cy.hover()`这一常用的 API，取而代之的是`.invoke()`和`.trigger()`,对于原生事件，一般使用`.trigger()`。Cypress 在触发`.trigger()`指定的事件前会检测元素的可操作性(是否可视，是否被禁用等)。

  想象一下这样的场景：一个导航栏，当悬浮的时候显示下拉菜单项，下拉菜单绑定了点击事件，我们需要测试点击事件是否正确。

  你可能会这样写测试：

  ```js
  cy.get("ui>li:nth-child(0)").click();
  ```

  但是结果可能并不像你预期的那样，因为你在一个隐藏的项目上尝试触发`.click()`

  用户的正常操作应该是：

  1. 悬浮到导航栏
  2. 等待下拉菜单项出现
  3. 点击下拉菜单项

  ```
  cy.get('div').trigger('mouserover')
  cy.get('ui>li:nth-child(0)').click()
  cy.get('div').trigger('mouseout')
  ```

  但是我们只是期望测试列表项点击事件是否能够正确触发，而不是下拉菜单是否能正确显示，完全模拟用户行为在这里其实意义不大，Cypress 也提供了"逃生舱"让我们规避“可操作性检查”

  ```js
  cy.get('ui>li:nth-child(0)').click({force：true})
  cy.get('ui>li:nth-child(0)').trigger('mouseover',{force：true})
  cy.get('ui>li:nth-child(0)').invoke('show',{force：true}) // jquery的.show() .hidden()
  ```

  > 以上的 mouseover 只适用于 JS 绑定的事件监听器，对于 CSS 的伪类:hover 目前 Cypress 不支持。。。

- CSS 伪类:hover 无法模拟

  当元素的显示隐藏通过:hover 来进行控制时，Cypress 无法进行模拟，这是已知的问题，只能等待官方修复这个问题，暂时没有办法规避。

  > 参考[相关 issue](https://github.com/cypress-io/cypress/issues/1485)

- Cypress 在 Chrome 运行模式下无法录制视频

  官方只支持在 Electron 运行模式下进行视频录制，当使用 Chrome 运行时无法视频录制。

- 导出测试报告无法合并

  Cypress 在 GUI 模式下手动点击执行不会导出测试报告，使用 cypress run 运行时以及指定浏览器执行时支持导出测试报告，但是由于技术原因 Cypress 将每一个测试文件视为一个单独的测试，因此将会导出单独的测试结果文件，同名测试报告将会默认被覆盖，因此最后只会保存最后运行的一个测试文件的测试报告。

  解决方案：

  - 使用 mochawesome，在 cypress.json 中指定 reporterOptions,设置 overwrite 为 false 或自定义测试结果文件名添加时间戳后缀的方式避免被覆盖。

    ```json
    {
      "reporterOptions": {
        "timestamp": "yyyy-mm-dd HH:MM:ss"
      }
    }
    ```

    能解决获取到所有测试用例测试报告的问题，但是仍然无法合并这些测试报告。

    > 参考：https://github.com/adamgruber/mochawesome-report-generator#timestamp

  - 起一个 node 服务，监听生成的测试结果 json 文件，进行合并，调用第三方 json->html 的测试报告生成器生成 HTML。

- 如何自动代码提示？

  cypress 安装的时候会自动安装 d.ts，因此可以通过三斜线指令调用 vs-code 的语法提示。

  使用方法：在需要用到的模块顶部引用

  ```js
  /// <reference types="Cypress" />
  ```

- 不想每次都写很长的访问 url？

  `cy.visit()` 是默认以 cypress.json 中的 baseUrl 作为前缀进行访问的。因此可以在 baseUrl 中配置需要测试的服务器地址

  ```json
  // cypress.json
  {
    "baseUrl": "http://www.example.com"
  }
  ```

  ```js
  cy.visit("/"); // 相当于cy.visit('http://www.example.com/')
  cy.visit("/login"); // 相当于cy.visit('http://www.example.com/login')
  cy.visit("/search?query1=test1&query2=test2"); // 相当于cy.visit('http://www.example.com/search?query1=test1&query2=test2')
  ```

  ​

- ​

  ​
