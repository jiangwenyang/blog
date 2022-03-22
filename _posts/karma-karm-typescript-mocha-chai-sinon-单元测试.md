---
title: karma + karm-typescript + mocha + chai+ sinon 单元测试
date: 2017-12-20
tags:
  - 前端测试
  - E2E测试
---

## karma + karm-typescript + mocha + chai+ sinon 单元测试

karma 是 Google 开源的一款测试运行器框架，本身并不提供测试框架功能，可以与如 mocha、jasmine 等测试框架轻松的继承在一起。并且支持在真实环境中允许测试（通过将测试用例在真实的浏览器中执行），并且方便调试，以及测试率覆盖。

### 环境配置

安装`karm` `mocha` `chai` `sinon`等测试基础框架，`karma-typescript`编译插件，`karma-mocha` `karma-chai` `karma-sinon` 测试框架对应的 karma 插件，以及 chrome 浏览器 driver `karma-chrome-launcher`

```bash
yarn add -D karma karma-typescript mocha karma-mocha chai karma-chai sinon karma-sinon karma-chrome-launcher
```

karm-cli 不是必须的，但是如果你想全局使用`karma start`命令需要进行安装。

```
yarn global add karma-cli
```

全局执行`karma init`进入交互式的配置界面（windows 下建议使用 powershell，使用 git-bash 无法交互）
![Alt text](http://ow67vzejn.bkt.clouddn.com/1513347099266.png)
完成之后会生成 karma 的配置文件`karma.conf.js`

其中比较重要的配置项：

- `frameworks`：指定用到的测试框架，需要在`plugins`中指定对应的 karma 插件
- `files`：指定测试要引入的文件，会以 script 标签的形式引入到浏览器中
- `exclude`：忽略的文件（使用 karma-typescript 需要忽略`.d.ts`文件，否则会编译报错，很诡异的问题）
- `preprocessors`：预编译，指定哪些文件需要进行预编译
- `browsers`：要启动的测试浏览器，需要在`plugins`中指定对应的 lancher
- `plugins`：要用到的 karma 插件

配置好后使用`karma start`命令启动测试，便能得到测试结果，并且生成测试报告。

![Alt text](http://ow67vzejn.bkt.clouddn.com/1513348189954.png)

_karma.conf.js_

```javascript
// Karma configuration
// Generated on Fri Dec 15 2017 09:35:14 GMT+0800 (中国标准时间)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha", "chai", "sinon", "karma-typescript"],

    // list of files / patterns to load in the browser
    files: [
      "libs/fake-server-factory.ts",
      "libs/es6-shim.min.js",
      "libs/es6-sham.min.js",
      "libs/es6-promise.auto.min.js",
      "util/**/*.ts",
      "src/**/*.ts",
    ],

    // list of files to exclude
    exclude: [
      "util/**/*d.ts",
      "util/**/*test.ts",
      "src/**/*.d.ts",

      // 下面这些测试超时，暂时先排除
      "src/skin/*.ts",
      "src/config/*test.ts",
      "src/language/*test.ts",
      "src/openapi/*test.ts",
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "libs/fake-server-factory.ts": ["karma-typescript"],
      "util/**/*.ts": ["karma-typescript"],
      "src/**/*.ts": ["karma-typescript"],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "karma-typescript"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      "Chrome",
      // 'Firefox',
      // 'IE'
    ],

    plugins: [
      "karma-mocha",
      "karma-chai",
      "karma-sinon",
      "karma-typescript",
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-ie-launcher",
      "karma-typescript-es6-transform",
    ],

    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [require("karma-typescript-es6-transform")()],
      },
      tsconfig: "./tsconfig.json",
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
```

> karma-typescript 的配置有很多坑,目前还有些问题。能否整合 enzyme 做 react 组件的单元测试还没有进行尝试，应该问题不大。使用测试中调用 async await 导致测试超时的问题还未解决，考虑引入 chai-as-promise

参考：

- karma 官方文档：https://karma-runner.github.io/1.0/index.html
- karma-typescript 库文档： https://github.com/monounity/karma-typescript
- How to setup testing using Typescript, Mocha, Chai, Sinon, Karma and Webpack：https://templecoding.com/blog/2016/02/02/how-to-setup-testing-using-typescript-mocha-chai-sinon-karma-and-webpack/
