---
title: Enzyme官方API一览
date: 2017-12-27
tags:
  - Enzyme
categories:
  - 单元测试
---

## Enzyme 官方文档简记

Enzyme(酶)是一个 Javascript 测试库，提供了类似 Jquery 的简洁灵活的 API 来操作和遍历 DOM。Enzyme 本身不提供测试框架或者断言库功能，只提供了渲染、操作、遍历的功能，可以简单的接入到任意的测试框架以及使用任意的断言库。

### Enzyme 2.x 和 3.x 的重要变动

#### Adapter

原本使用 2.X 不需要安装额外的库，enzyme 升级到 3.x 后多了一个“Adapter”系统，因此需要额外安装“Adapter”来告诉 enzyme 当前运行的 React 版本，官方提供了 React 0.13.x, 0.14.x, 15.x, and 16.x 的“Adapter”。
目前在项目中使用的是 React 0.14 版本，因此在 enzyme 3.x 下使用 enzyme 需要

1. 命令行中安装 enzyme 和 react 0.14 的 adapter

```bash
yarn add -D enzyme enzyme-adapter-react-14
```

2. setup
   在使用 enzyme 之前使用顶层 API `configure`配置适配器，这里也可以设置其他特性，例如禁用 lifecycle

#### 不再保留元素引用

官方 demo：

```react
import React from "react";
import Icon from "./path/to/Icon";

const ICONS = {
  success: <Icon name="check-mark" />,
  failure: <Icon name="exclamation-mark" />,
};

const StatusLabel = ({ id, label }) => (
  <div>
    {ICONS[id]}
    {label}
    {ICONS[id]}
  </div>
);
```

```react
import { shallow } from "enzyme";
import StatusLabel from "./path/to/StatusLabel";
import Icon from "./path/to/Icon";

const wrapper = shallow(<StatusLabel id="success" label="Success" />);

const iconCount = wrapper.find(Icon).length;
```

在 v2.x 中 iconCount 为 1，在 v3.x 中为 2。原因是 v2.x 中找到所有匹配 selector 的元素后将重复的移除了，因此在 v2.x 中返回了一个元素。在 v3.x 中元素会被转换为底层的 react elements，因此具有不同的引用，所以就有 2 个元素返回。

#### `children()`方法的变动

官方 demo：

```react
class Box extends React.Component {
  render() {
    return <div className="box">{this.props.children}</div>;
  }
}
class Foo extends React.Component {
  render() {
    return (
      <Box bam>
        <div className="div" />
      </Box>
    );
  }
}
```

在使用`mount()`的时候

```
const wrapper = mount(<Foo />);
```

`wrapper.find(Box).children()`在 v2.x 和 v3.x 下的区别：

- v2.x 下

```
wrapper.find(Box).children().debug();
// => <div className="div" />
```

- v3.x 下：

```
wrapper.find(Box).children().debug();
// =>
// <div className="box">
//   <div className="div" />
// </div>
```

两者的主要区别是：v2.x 只会返回 Props.children 的结果，类似于浅渲染，v3.x 会如期望那样返回真实渲染的结果。

#### 通过组件实例直接调用组件内部方法改变 State 需要`update()`

官方 demo：

```react
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    return (
      <div>
        <div className="count">Count: {this.state.count}</div>
        <button className="inc" onClick={this.increment}>Increment</button>
        <button className="dec" onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}
```

```js
const wrapper = shallow(<Counter />);
// 通过事件模拟下v2.x和v3.x表现一致都会自动更新状态
wrapper.find('.count').text(); // => "Count: 0"
wrapper.find('.inc').simulate('click');
wrapper.find('.count').text(); // => "Count: 1"
wrapper.find('.inc').simulate('click');
wrapper.find('.count').text(); // => "Count: 2"
wrapper.find('.dec').simulate('click');
wrapper.find('.count').text(); // => "Count: 1"

// 调用实例上的方法 v3.x不会自动更新
wrapper.find('.count').text(); // => "Count: 0"
wrapper.instance().increment();
wrapper.find('.count').text(); // => "Count: 0" (would have been "Count: 1" in v2)
wrapper.instance().increment();
wrapper.find('.count').text(); // => "Count: 0" (would have been "Count: 2" in v2)
wrapper.instance().decrement();
wrapper.find('.count').text(); // => "Count: 0" (would have been "Count: 1" in v2)


// 在v3.x下需要手动更新
wrapper.find('.count').text(); // => "Count: 0"
wrapper.instance().increment();
wrapper.update();
wrapper.find('.count').text(); // => "Count: 1"
wrapper.instance().increment();
wrapper.update();
wrapper.find('.count').text(); // => "Count: 2"
wrapper.instance().decrement();
wrapper.update();
wrapper.find('.count').text(); // => "Count: 1"
```

#### `ref()`返回真实的 ref 而不是 wrapper

在 v2.x 下 ref 返回的是 wrapper 实例，在 v3.x 下和真实的 react 一致，当 ref 定义在 dom 元素上时返回的是 Dom Element，在 React 组件上时返回的是组件的实例。
在 v2.x 下：

```jsx
const wrapper = mount(<Box />);
// this is what would happen with enzyme v2
expect(wrapper.ref('abc')).toBeInstanceOf(wrapper.constructor);
```

在 v3.x 下:

- 直接定义在 dom 元素上的 ref

```jsx
const wrapper = mount(<Box />);
// this is what happens with enzyme v3
expect(wrapper.ref('abc')).toBeInstanceOf(Element);
```

- 定义在 React 元素上的 ref

```react
class Bar extends React.Component {
  render() {
    return <Box ref="abc" />;
  }
}
```

```react
const wrapper = mount(<Bar />);
expect(wrapper.ref('abc')).toBeInstanceOf(Box);
```

#### 在`mount`下，`.instance()`可以级联在任何返回的 wrapper 对象上调用

在 v3.x 下可以在任何返回 wrapper 对象的方法后调用`instance()`，将会返回组件的实例，因此可以在实例后再调用`.setState()`，更加灵活。

#### 在`mount`下，`.getNode()`被废弃，使用`.instance()`代替

#### 在`shallow`下，`.getNode()`被废弃，使用`getElement()`代替

#### 移除了私有属性和方法

- `.node`
- `.nodes`
- `.renderer`
- `.unrendered`
- `.root`
- `.options`

#### 支持真实的 CSS 选择器

v2.x 中的 CSS 选择器使用的是 enzyme 自己的不完整的 CSS 解析，在 v3.x 中支持了真实的 CSS 选择器。

#### 节点 Equality 时忽略 undefined 值

即在 v3.x 中下面两个节点被认为是 equal，在 v2.x 中被认为是不等的两个节点

```react
<div />
<div className={undefined} id={undefined} />
```

#### 默认开启生命周期方法

在 v2.x 中生命周期方法默认是禁用的，需要手动开启。在 v3.x 中生命周期方法默认开启。
在 v3.x 中可以通过一下两种方式关闭：

1. 通过顶层 API`configure()`配置默认关闭：

```react
import Enzyme from 'enzyme';
Enzyme.configure({ disableLifecycleMethods: true });
```

2. 在渲染的时候通过 flag 关闭

```react
import { shallow } from 'enzyme';
// ...
const wrapper = shallow(<Component />, { disableLifecycleMethods: true });
```

### 安装

对应版本具体安装参考
官方指南：http://airbnb.io/enzyme/docs/installation/
目前我们的项目使用 react@0.14.8 react-dom@0.14.8
首先安装 test utilities addon

```bash
yarn add -D react-addons-test-utils@0.14
```

然后安装相应 react 版本的 adapter

```bash
yarn add -D enzyme enzyme-adapter-react-14
```

### API 参考：

> 具体参数和 Example 参考官方文档：http://airbnb.io/enzyme/docs/api/

#### 浅渲染 Shallow Rendering

shallow 方法只会渲染出组件的第一层 DOM 结构，其嵌套的子组件不会被渲染出来，因此渲染效率高，适合用来做单元测试。

##### `.at(index) => ShallowWrapper`

返回当前 wrapper 中索引为 index(以 0 开始)的 warpper

##### `.childAt(index) => ShallowWrapper`

返回当前 wrapper 下索引为 index 的子节点 wrapper

##### `.children([selector]) => ShallowWrapper`

返回当前 wrapper 下所有的子节点的 wrapper

##### `.closest(selector) => ShallowWrapper`

通过遍历当前节点的祖先元素获取第一个匹配 selector 的节点 wrapper

#### `.contains(nodeOrNodes) => Boolean`

如果当前渲染中包含所给节点或节点数组（判断节点时会判断 props），返回 true，否则返回 false。

> 传入的必须是 ReactElement 或者 JSX 表达式

##### `.containsAllMatchingElements(nodes) => Boolean`

如果当前节点下**相似性**包含全部提供的`nodes`的子节点（如果给了 props 则判断，没有则忽略），则返回 true，否则返回 false。

##### `.containsAnyMatchingElements(nodes) => Boolean`

如果当前节点下**相似性**包含任意一个提供的`nodes`的子节点（如果给了 props 则判断，没有则忽略），则返回 true，否则返回 false。

##### `.containsMatchingElement(node) => Boolean`

表现和上面两种一致，区别是只能传单个节点

##### `.context([key]) => Any`

返回当前 wrapper 的节点的 context hash，如果提供了 key，则只返回值。

##### `.debug() => String`

为了调试的目的，返回当前 wrapper 的 HTML-like 的字符串表示。

##### `.dive([options]) => ShallowWrapper`

浅渲染当前 wrapper 下的一个非 DOM 子元素，并且返回被 wrapper 包裹的结果。

> 只能被单个 non-DOM（非 DOM）子元素调用

##### `.equals(node) => Boolean`

判断当前 wrapper 的根节点渲染树是否和传入的节点一致。

> props 为 undefined 会被忽略

##### `.every(selector) => Boolean`

判断 wrapper 中的所有节点是否都匹配`selector`。

##### `.everyWhere(fn) => Boolean`

判断 wrapper 中的所有节点是否都满足传入的断言函数`fn`。

##### `.exists() => Boolean`

判断当前节点是否存在

##### `.filter(selector) => ShallowWrapper`

返回匹配满足`selector`的节点的新的 wrapper

##### `.filterWhere(fn) => ShallowWrapper`

返回满足断言函数`fn`的节点的新的 wrapper

##### `.find(selector) => ShallowWrapper`

返回当前节点中匹配`selector`的所有节点的 wrapper

##### `.findWhere(fn) => ShallowWrapper`

返回当前节点中满足断言函数`fn`的所有节点的 wrapper

##### `.first() => ShallowWrapper`

返回一组节点集合中的第一个节点的 wrapper

##### `.forEach(fn) => Self`

迭代当前 wrapper 的每一个节点调用提供的`fn`，fn 的第一个参数是 wrapper 包裹的相应节点，第二个参数是索引 index。和数组的 forEach 方法类似，但是返回值为当前 wrapepr 自身。

##### `.get(index) => ReactElement`

返回当前 wrapper 的指定索引为 index 的 ReactElement 节点，而不是 wrapper。

##### `.hasClass(className) => Boolean`

判断当前节点是否有指定的`className`。

##### `.html() => String`

返回当前渲染树的 HTML 标记字符串。

> 只能被单节点调用

##### `.instance() => ReactComponent`

返回传入`shallow()`方法作为根节点渲染的组件实例。

> 只能被根节点的 wrapper 实例调用

##### `.is(selector) => Boolean`

判断当前节点是否匹配`selector`

##### `.isEmpty() => Boolean`

判断当前节点是否为空。

> 已弃用，使用`.exists()`代替

##### `.key() => String`

返回当前 wrapper 节点的 key 值。

##### `.last() => ShallowWrapper`

与`first()`方法对应，返回当前 wrapper 节点中的最后一个。

##### `.map(fn) => Array<Any>`

与`forEach()`类似，迭代每一个 wrapper，但是返回值是每一个`fn`的返回值。

##### `.matchesElement(node) => Boolean`

判断当前 wrapper 节点是否与所给节点**相似**（wrapper 节点上包含传入节点的所有 props 并且值相等，即使元素类型一样也会返回 true）

##### `.name() => String|null`

返回渲染节点的 name

- 如果是组件：设置了 displayName 则返回 displayName，否则返回组件 name。
- 如果是 DOM 节点：返回 tag name
- null：返回 null

##### `.not(selector) => ShallowWrapper`

筛选出不匹配`selector`的节点的 wrapper

##### `.parent() => ShallowWrapper`

返回当前 wrapper 节点的直接父元素的 wrapper

##### `.parents([selector]) => ShallowWrapper`

返回当前 wrapper 节点的所有父元素/祖先元素的 wrapper，可以提供`selector`作为筛选。

##### `.prop(key) => Any`

返回 wrapper 的根节点的`prop`上属性为`key`的值。在`shallow wrapper`上调用时返回的是渲染的组件的根节点的 props，而不是组件自身的 props，如果要返回组件自身的 props 需要调用`wrapper.instance().props()`

##### `.reduce(fn[, initialValue]) => Any`

类似于数组的 reduce

##### `.reduceRight(fn[, initialValue]) => Any`

reduce 顺序变为从右到左

##### `.render() => CheerioWrapper`

返回当前节点子树的 HTML 渲染字符串的 Cheerio 对象

##### `.setContext(context) => Self`

设置根节点的`context`，并且重新渲染

> 只能被根节点的 wrapper 实例调用

##### `.setProps(nextProps) => Self`

设置根节点的`props`，并且调用`componentWillReceiveProps`生命周期方法

> 只能被根节点的 wrapper 实例调用

##### `.setState(nextState[, callback]) => Self`

在根节点实例上调用`setState`,并且触发重新渲染。

##### `.shallow([options]) => ShallowWrapper`

返回浅渲染后的当前节点 wrapper

##### `.simulate(event[, ...args]) => Self`

模拟事件

> 在 shalow renderer 上不会事件冒泡，应该在真实的节点上模拟事件

##### `.slice([begin[, end]]) => ShallowWrapper`

类似数组的分片，返回分片后的 wrapper

##### `.some(selector) => Boolean`

判断 wrappers 中是否有至少一个匹配`selector`

##### `.someWhere(fn) => Boolean`

判断 wrappers 中是否有至少一个满足断言函数

##### `.state([key]) => Any`

返回 wrapper 的根节点的 state 的 hash，如果传入 key 则返回对应的值

##### `.tap(intercepter) => Self`

调用一个拦截器并返回自身

> 在调试链式调用的时候很有用

```react
const result = shallow((
  <ul>
    <li>xxx</li>
    <li>yyy</li>
    <li>zzz</li>
  </ul>
)).find('li')
  .tap(n => console.log(n.debug()))
  .map(n => n.text());
```

##### `.text() => String`

返回当前渲染树的渲染文本

> 表现很诡异

```react
const wrapper = shallow(<div><b>important</b></div>);
expect(wrapper.text()).to.equal('important');
```

```react
const wrapper = shallow(<div><Foo /><b>important</b></div>);
expect(wrapper.text()).to.equal('<Foo />important');
```

##### `.type() => String|Function|null`

返回 wrapper 包裹的当前节点的类型

- 如果是组件：返回组件的 constructor
- 如果是原生的 DOM 节点，返回标签名
- 如果是 null：返回 null

##### `.unmount() => Self`

卸载组件，用来模拟组件生命周期

##### `.update() => Self`

强制重新渲染，当外部调用改变组件的 State 时，使用`update()`进行 re-render

```react
class ImpureRender extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;
  }
  render() {
    this.count += 1;
    return <div>{this.count}</div>;
  }
}
```

```react
const wrapper = shallow(<ImpureRender />);
expect(wrapper.text()).to.equal('0');
wrapper.update();
expect(wrapper.text()).to.equal('1');
```

#### 全渲染 Full Rendering

将 React 组件渲染为真实的 DOM 节点，因此可以使用 DOM 事件。`mount()`需要环境提供完整的 DOM API,因此需要使用一个“Browser Like”的环境，例如 JSDOM 或者 Phantoms，或者直接在真实浏览器下运行。

```react
import { mount } from 'enzyme';
const wrapper = mount(<MyComponent />);
```

> 提供的 API 与 Shallow Rendering 几乎一致

#### 静态渲染 Static Rendering

将 React 组件渲染为静态的 HTML 字符串，然后返回一个 Cheerio 实例对象，使用 Cheerio 来分析 HTML 的结构。（Cheerio 常在爬虫的时候用来分析爬到的 HTML 结构）

> 返回 Cherrio 对象，因此可以使用 Cherrio 的 API

```react
import { render } from 'enzyme';
const wrapper = render(<MyComponent />);
```

#### Selectors

##### 1.任何合法的 CSS 选择器

##### 2.Prop 选择器

```react
const wrapper = mount((
  <div>
    <span foo={3} bar={false} title="baz" />
  </div>
));

wrapper.find('[foo=3]');
wrapper.find('[bar=false]');
wrapper.find('[title="baz"]');
```

> 不能使用 key 和 ref 作为选择器使用

##### 3.React Component Constructor

```react
function MyComponent() {
  return <div />;
}

// find instances of MyComponent
const myComponents = wrapper.find(MyComponent);
```

##### 4.React Component's displayName

##### 5.对象属性选择器

```react
const wrapper = mount((
  <div>
    <span foo={3} bar={false} title="baz" />
  </div>
));

wrapper.find({ foo: 3 });
wrapper.find({ bar: false });
wrapper.find({ title: 'baz' });
```

> 对象属性选择器中不能使用属性值为 undefined 的属性，会报错，可以使用`findWhere()`方法代替
