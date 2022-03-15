---
layout: blog-post

title: React高价组件（HOC）
date: 2017-12-20 23:15:51
tags:
  - React
categories:
  - React
---

## React 高阶组件（HOC）

> 含义： 高阶组件就是一个 React 组件包裹着另外一个 React 组件
> 用处：通过函数向现有组件类添加逻辑或者改变现有组件的行为

通常有两种实现高阶组件的方式：

- Props Proxy（属性代理）：高阶组件对传给其中的组件的 props 进行管理
- Inheritance Inversion（反向继承）：高阶组件继承包裹其中的组件

### Props Proxy

高阶组件通常使用函数来实现，而实现一个 Props Proxy 方式的高阶组件类似于：

```javascript
function HOC(ChildComponent) {
  return class Pphoc extends React.Component {
    render() {
      return <ChildComponent {...this.props} />;
    }
  };
}
```

#### Props Proxy 的特点

- 可以操作 props（CRUD）
- 可以通过 Refs 访问到被代理的组件实例
- 可以提取 state
- 可以给被代理组件定义样式，通过使用其他元素包裹

##### 操作 props

```
function HOC(ChildComponent){
    return class Pphoc extends React.Component{
        const newProps={
            name:"tom"
        }
        render(){
            return <ChildComponent {...this.props} {...newProps} />
        }
    }
}
```

##### 通过 Refs 获取代理组件实例

```javascript
function HOC(ChildComponent){
    return class Pphoc extends React.Component{
        proxyComponet(proxyComponetInstance){
            proxyComponetInstance.method();
        }
        render(){
            return
            <ChildComponent
                {...this.props}
                ref=this.proxyComponet.bind(this)
            />
        }
    }
}
```

> ref callback
> 当给一个组件定义 ref 为一个 callback 时，callback 会在组件被挂载后立即执行，被引用的组件的实例会作为参数传递，然后就可以在回调中使用这个组件实例。

##### 提取 state

```javascript
function HOC(ChildComponent) {
  return class Pphoc extends React.Component {
    state = {
      name: ""
    };
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
    render() {
      const newProps = {
        value: this.state.name,
        onchange: this.onChangeName
      };
      return <ChildComponent {...this.props} {...newProps} />;
    }
  };
}

@HOC
class Example extends React.Component {
  render() {
    return <input name="name" {...this.props.name} />;
  }
}
```

##### 使用其他元素包裹

```javascript
function HOC(ChildComponent){
    return class Pphoc extends React.Component{
        render(){
            return (
                <div style={{background="red"}}>
                    <ChildComponent {...this.props} />
                </div>
            )
        }
    }
}
```

### Inheritance Inversion

反向继承通过返回一个继承自传入组件的新组件的方式实现：

```
function HOC(childComponent) {
  return class NewComponent extends childComponent{
    render() {
      return super.render();
    }
  }
}
```

#### Inheritance Inversion 的特点

- 操作 state
- 渲染劫持

##### 操作 state

因为返回的组件是继承自传入的组件，因此可以直接使用 this.props 和 this.state 读取传入组件的 props 和 state,并且可以修改 state

```javascript
function HOC(childComponent) {
  return class NewComponent extends childComponent {
    render() {
      return (
        <div>
          <p>{this.props.name}</p>
          <p>{this.state.name}</p>
          {super.render()}
        </div>
      );
    }
  };
}
```

##### 渲染劫持

可以保存传入组件的 render()结果，然后返回新的 render 结果。

```javascript
function HOC(childComponent) {
  return class NewComponent extends childComponent{
    render() {
      const tree=super.render()//保存render结果
      return (
           const newProps={
               name="tom"
           }
           const props={...this.props,...newProps};
           const newTree = React.cloneElement(tree, props, tree.props.children)
      )
    }
  }
}
```
