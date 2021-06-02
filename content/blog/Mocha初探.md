---
layout: blog-post

title: Mocha初探
date: 2017-12-20 23:11:10
tags:
  - Mocha
categories:
  - 单元测试
---

## Mocha 初探

### 一、安装 Mocha

### 二、测试相关术语

测试脚本通常与所要测试的代码同名，但是以`.test.js`为后缀，或者以`.test`开头。
例如`index.js`的测试脚本可以命名为`index.test.js`或者`test.index.js`。
**测试套件：**表示一组相关用例，在 Mocha 中以`describe`声明
**测试用例：**测试的最小单位，用 Mocha 中用`it`声明

> 一个测试脚本可以包含多个`describe`块，然后一个`describe`块能包含多个`it`块

### 三、断言库

**断言：**判断代码执行结果是否与预期结果一致，不一致则抛出错误。
Mocha 本身不带断言库，因此使用 Mocha 必须先引入断言库，可以使用 Node 原生的`assert`或者第三方的`chai`、`should.js`、`expect.js`等断言库。
推荐使用`chai`的`expect`断言风格进行断言。
写法：
expect(1+2).to.be.equal(3);

### 四、简单的 Mocha 单元测试

测试对象:`add.js`

```javascript
function add(num1, num2) {
  return num1 + num2;
}
module.export = add;
```

测试脚本：`add.test.js`

```javascript
const add = require("./add.js"); //引入测试对象
const expect = require("chai").expect; //引入chai断言库并使用expect（BDD）风格的断言
describe("加法函数测试", function() {
  it("1+1应该等于2", function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

#### 五、执行 Mocha

在当前目录执行
`$ mocha add.test.js`
如果有多个测试文件可以
`$ mocha test1.js test2.js test3.js`
Mocha 会默认运行 test 目录里的测试脚本
`$ mocha`
如果 test 目录里面还有子目录，需要添加`--recursive`参数让 Mocha 遍历到下级目录

#### 六、命令行参数

`-h`参数会提示 Mocha 的可用参数
**报告格式：** `--reporters`会列出可用的报告格式，使用`--reporter [name]`指定报告格式，可以结合`mochawesome模块`输出可视化的 HTML 格式报告。

#### 七、结合 ES6、Typescript

在 Mocha 中使用 ES6 或者 Typescript 时需要先进行转译，可以使用 babel 和 ts-node
`$ mocha --compilers js:babel-core/register`
`$ mocha --compilers ts:ts-node/register`
