---
title: 基于karma的前端单元测试
date: 2017-12-20
excerpt: 简单介绍如何配置karma和webpack来进行前端测试
tags:
  - 前端测试
  - E2E测试
---

## karma + karma-webpack

- 开发语言：typescript + react
- 测试平台：karma
- 测试框架：mocha
- 断言库：chai
- 测试桩：sinon
- 打包|编译工具：karma-webpack | karma-typescript
- 测试覆盖率：istanbul-instrumenter-loader

因为开发语言使用的是 typescript，因此需要编译之后才能在浏览器上跑，但是编译后加入大量的 polyfill 导致覆盖率不准确的问题比较麻烦。

### 不用[karma-typescript](https://github.com/monounity/karma-typescript)？

利用 karma-typescript 直接运行 typescript 编写的单元测试而不用进行额外的编译，并且集成了 karma-coverage 和 Istanbul 进行代码覆盖率统计。
缺点是每个测试文件和源文件都需要通过 srcipt 标签引入并串行执行，用例太多时浏览器性能有影响。并且不支持图像资源、字体资源等的引入。

karma-typescript 支持的 transform：

- [karma-typescript-angular2-transform](https://github.com/monounity/karma-typescript-angular2-transform)
- [karma-typescript-cssmodules-transform](https://github.com/monounity/karma-typescript-cssmodules-transform)
- [karma-typescript-es6-transform](https://github.com/monounity/karma-typescript-es6-transform)
- [karma-typescript-postcss-transform](https://github.com/monounity/karma-typescript-postcss-transform)

因此在不涉及到图像资源等非 css 外部资源引用时，使用 karma-typescript 进行测试是比较好的，因此可以考虑使用 karma-typescript 进行 API 的测试。

**安装：**

```bash
yarn add -D karma-typescript
```

**karma-conf.js 配置**

```javascript
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "src/**/*.ts", // *.tsx for React Jsx
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript", // *.tsx for React Jsx
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["Chrome"],
  });
};
```

这是 karma-typescript 的官方配置 demo，但是这样配置会将测试用例的覆盖率也算进来。
官方的[cookbook](https://github.com/monounity/karma-typescript/blob/master/cookbook.md)项目上给出了测试代码分离的 demo

```javascript
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],

    files: [{ pattern: "src/**/*.ts" }, { pattern: "test/**/*.ts" }],

    preprocessors: {
      "src/**/*.ts": ["karma-typescript", "coverage"],
      "test/**/*.ts": ["karma-typescript"],
    },

    reporters: ["progress", "coverage", "karma-typescript"],

    browsers: ["Chrome"],
  });
};
```

当使用`coverage`的时候，只有使用`coverage`预编译的代码会算入覆盖率中，上面的 demo 中只有`src`目录下的代码会被统计覆盖率，`test`目录下的测试文件则不会被统计。

**陷阱：**

> ts.config.json 中如果"files"和"include"都没有被指定，编译器默认包含当前目录和子目录下所有的 TypeScript 文件（.ts, .d.ts 和 .tsx）。编译 d.ts 文件会报错，因此在 karma-conf.js 文件中使用 exclude 排除 d.ts 文件。-- https://www.tslang.cn/docs/handbook/tsconfig-json.html

### karma-webpack + istanbul-instrumenter-loader

[karma-webpack](https://github.com/webpack-contrib/karma-webpack#karma-webpack)
通过 karma-webpack 能在 karma 中集成 webpack，如果在项目中已经使用 webpack，那么使用 karma-webpack 可能是个更好的选择，能给直接使用原有的 webpack 配置。
**安装：**

```bash
yarn add karma-webpack
```

**使用：**

```javascript
module.exports = function(config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],

        files: [
            "test/**/*.ts"
        ],

        preprocessors: {
            "test/**/*.ts": ["webpack"], // 使用webpack进行编译
        },
        browsers: ["Chrome"]，
        webpack:{
            module：{}
            resolve：{}
            // 所有可用的webpack配置项
        }
    });
};
```

将需要编译的代码使用 webpack 预编译即可，同时因为 webpack 会自动打包依赖，因此`files`中只需要引入 test 文件，对应的被测文件会按照依赖被自动打包。

[istanbul-instrumenter-loader](https://github.com/webpack-contrib/istanbul-instrumenter-loader)
通过使用 webpack 插件 istanbul-instrumenter-loader 对代码进行打点，以实现代码覆盖率的统计。

```javascript
 webpack: {
  // karma watches the test entry points
  // (you don't need to specify the entry option)
  // webpack watches dependencies

  // webpack configuration
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [{
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          transpileOnly: true
        }
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|libs|\.test\.ts$)/, //排除不需要打点的测试代码和库
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post', //作为后置loader使用
        options: {
          esModules: true, //使用ES2015
        }
      }
    ]
  },
},
```

**管理依赖**
通过上面的方式打包的文件如果指定 output 能生成单个测试套件，但是如果测试套件很多的时候会生成多个大文件。解决这个问题可以通过 webpack 的[`require.context()`](https://doc.webpack-china.org/guides/dependency-management/#require-context) 解决，
require 能定义 require 的上下文，并且搜索目录，将满足正则的文件进行处理，返回一个包含两个方法 keys()和 resolve()以及一个属性 id 的方法。

_新建 test.js_

```javascript
// 导入所有测试用例
const testsContext = require.context("./src", true, /\.test\.ts$/);
testsContext.keys().forEach(testsContext);
```

然后在`karma.conf.js`中将`test.js`作为入口

```js
module.exports = function(config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],

        files: [
            "test.js"
        ],

        preprocessors: {
            "test.js": ["webpack"], // 使用webpack进行编译
        },
        browsers: ["Chrome"]，
        webpack:{
            module：{}
            resolve：{}
            // 所有可用的webpack配置项
        }
    });
};
```

将多个依赖合并到一个入口，因此通过这种方式生成单个的打包文件。
