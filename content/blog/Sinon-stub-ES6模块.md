---
layout: blog-post

title: Sinon stub ES6模块
date: 2017-12-20 22:31:18
tags:
  - sinon
categories:
  - 单元测试
---

## 场景一：stub 外部模块依赖

模块测试中经常遇到的场景是引入外部模块依赖，在写单元测试时我们应该尽量减少模块依赖，只关心模块自身的执行路径，对于子模块的细节应该在子模块的测试中进行覆盖。
_foo.ts_

```javascript
export foo(){
// do someting like fetch XHR等
}
```

_bar.ts_

```javascript
import {foo} from './foo'
export bar(state){
    if(state){
        foo(state)
    }else{
        // do someting
    }
}
```

我们需要测试*bar.ts*的`bar`模块,但是在`bar`模块内部调用了`foo`模块，在这里我们只关心`foo`模块是否以正确的参数被调用，而不关心`foo`模块真正做了什么，因此我们需要**stub**`foo`这个**外部模块依赖**。
_bar.test.ts_

```javascript
import { expect } from "chai";
import * as sinon from "sinon";

import * as fooModule from "../foo/foo"; // 必须以import * as 导出到对象上
import { bar } from "./bar";

describe("测试bar", () => {
  it("bar正确调用", () => {
    const stub = sinon.stub(fooModule, "foo"); // stub foo模块
    bar("aaa");
    expect(stub.calledWith("aaa")).to.be.true;
  });
});
```

## 场景二：stub 模块内部依赖

场景一中模块依赖来自于外部，但是模块内部依赖是更加常见的场景，例如下面这样，一个模块引用了另一个内部子模块。
_bar1.ts_

```javascript

function foo{

}
export bar(state){
    if(state){
        foo(state)
    }else{
        // do someting
    }
}
```

_bar2.ts_

```javascript

export function foo{

}
export bar(state){
    if(state){
        foo(state)
    }else{
        // do someting
    }
}
```

- 在*bar1*中`foo`作为完全封闭的内部函数，只能在`bar`中进行覆盖测试，没有办法 stub。
- 在*bar2*中`foo`作为外部模块导出，可以进行单独的测试覆盖，在`bar`模块中就可以将`foo`看作一个**黑盒**，不必关心`foo`内部实现，其内部实现已经在针对`foo`的测试用例中进行了覆盖，因此考虑**stub**内部依赖`foo`。

尝试使用场景一中的方法进行 stub，但是并不能实现，因为 ES6 模块被编译为 commonJS 模块时

```javascript
export function foo() {}
```

被编译成：

```javascript
"use strict";
exports.__esModule = true;
function foo() {}
exports.foo = foo;
```

我们使用 sinon.stub(fooModule,'foo')时只是 stub 了`exports.foo`，但是在模块内部`bar`调用的时候调用的是`foo`，两者其实不是同一个方法了。

查了很多资料，都没有办法优雅的解决这个问题，比较多的解决方式是使用[`babel-plugin-rewire-exports`](https://github.com/asapach/babel-plugin-rewire-exports)和[`babel-plugin-rewire`](https://github.com/speedskater/babel-plugin-rewire)两个插件，通过类似于 angular 的注入，可以在外部调用注入的方法更改模块内部，达到 stub 的目的，但是这种方式破坏性太大。
这种方式的使用可以参考[在 es6 中 sinon 的正确打开方式](https://github.com/pigcan/blog/issues/8)
目前 stub ES6 内部模块暂时没有比较好的办法。

**参考**

- [Improve ability to stub/mock exports of ES2015 modules transpiled by Babel (T6748)](https://github.com/babel/babel/issues/3811)
- [在 es6 中 sinon 的正确打开方式](https://github.com/pigcan/blog/issues/8)
- [Mocking ES6 module import with and without Dependency Injection](https://railsware.com/blog/2017/01/10/mocking-es6-module-import-without-dependency-injection/)
- [Stub private functions in an ES6 module](http://www.developerknowhow.com/2372/stub-private-functions-in-an-es6-module)
