# Stroybook
### 什么是Storybook?
Stroybook是一个可视化的UI开发环境，通过Stroybook你能快速的渲染展示UI组件，将UI组件与项目隔离，并且通过提供的丰富的插件来提升开发体验。
### 使用Strorybook
Stroybook不仅仅可以应用于React项目，同时也支持Vue和Angular，由于目前项目使用React，并且Storybook对React的支持度更好，因此在此只介绍Stroybook for React。
#### 1. 安装
安装配置Storybook官方提供了两种方式，一种是使用提供的cli工具进行快速生成，一种是手动安装配置。推荐自己手动配置安装以熟悉Storybook。
##### 1.1 快速生成
Stroybook官方提供了快速生成Stroybook项目骨架的命令行工具，这个工具可以在已有项目下使用。
在项目根目录下执行一下命令：

```bash
$ npm i -g @storybook/cli
$ getstorybook
```
上面的命令将会为你快速生成对应你的项目的storybook。将会安装对应的依赖，在根目录下创建`.storybook`配置目录并生成对应的配置文件，创建`stories`目录并创建默认的`stories`的demo
##### 1.2 自定义配置
如果不想全局安装命令行工具，并且希望自定义Stroybook，推荐自定义安装配置Stroybook。
1. 安装`@storybook/react`

```bash
$ yarn add -D @storybook/react
```

2. 安装react，react-dom，babel-core

``` bash
yarn add react react-dom
yarn add -D babel-core
```

> Storybook官方没有给出兼容性列表，但实测无法使用React 0.14 

3. 添加NPM script
编辑`package.json`，添加启动Storybook的script字段

```json
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c .storybook"
  }
}
```

> `-c` 参数后跟配置文件所处目录，不使用`-c`时将默认使用`.storybook`目录下的配置文件`config.js`
#### 2. 配置
> 如果使用快速生成则下面这些配置文件已经帮你生成好了无需再自己配置。

在根目录下创建`.storybook`文件夹，然后在该目录下创建`config.js`文件。
最简单的配置：

```
import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
```

上面的配置文件将会使用`stories/index.js`中的stories，如果你有多个stories，每次写stories的时候需要对应的进行require，比较繁琐。如果使用Webpack，可以使用Webpack的[require.context](https://webpack.js.org/guides/dependency-management/)语法：

```
import { configure } from '@storybook/react';

function loadStories() {
  const storiesContext = require.context("../src", true, /\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
  // 将会加载src所有子目录下的以.stories.tsx结尾的模块
  // You can require as many stories as you need.
}

configure(loadStories, module);
```

#### 3. 写stories
在组件目录下新建对应stories文件，例如在Button组件目录下新建`stories/Button.stories.tsx`

```
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../ui.desktop.tsx';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));  
```
然后执行`npm run storybook`或者`yarn storybook`打开[localhost:9001](localhost:9001)将看到类似下面这样的界面
![](http://ow67vzejn.bkt.clouddn.com/18-1-31/1015387.jpg)
#### 4. 使用addon
Storybook通过插件的方式使用额外的功能，主要有两种插件：
**Decorators 类装饰器插件**
Decorators插件又分为两种:
1. Wrapper Components
就是普通的react容器组件，简单的将你需要story的组件包裹在其中。

```
const styles = {
  textAlign: 'center',
};
const Center = ({ children }) => (
  <div style={styles}>
    { children }
  </div>
);
```
2. Storybook Decorators
扩展一个函数作为storybook decorator。

```
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './button';

const styles = {
  textAlign: 'center',
};
const CenterDecorator = (storyFn) => (
  <div style={styles}>
    { storyFn() }
  </div>
);

storiesOf('Button', module)
  .addDecorator(CenterDecorator)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emojies', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
  	
```

> 使用`.addDecorator(Decorator)`语法代码更加简洁,如果要使用全局的Decorator可以在`config.js`中配置全局的`Decorator`，将会应用到所有的stories

例如需要居中显示所有的stories：
```
import * as React from 'react'
import { configure,addDecorator,setAddon } from '@storybook/react';
addDecorator(stories=>(
		<div style={{textAlign: 'center'}}>
		    {stories()}
		</div>
	)
)
```

**Native Addons 原生插件**
原生插件能在包裹stories之前提供基于Storybook平台的额外特性，例如storybook-actions插件。

使用这两种插件前，我们都需要先在`.storybook`目录下新建`addons.js`来注册对应的插件
```typescript
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-notes/register';
```
插件的具体使用配置需要查看插件自己的文档。
#### 5. 自定义Webpack配置
当使用storybook时，Storybook将会使用自己默认的webpack配置,使用的是create-react-app的webpack配置，一般而言适用于绝大多数项目。如果想自定义webpack有下面几种方式：
**Extend Mode (扩展模式)**
在`.storybook`目录下新建文件`webpack.config.js`，导出一个**object**
```
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}
```
扩展模式下可以更改除：
- entry
- output
- js loader with babel

这几项外所有的webpack配置项，Storybook将会将你的自定义配置项作为默认配置的扩展来启动webpack。

**Full Control Mode  (完全控制模式)**
通过导出一个函数，函数接受两个参数storybookBaseConfig和configType，一个是Storybook的基础配置对象，一个是当前的环境（'DEVELOPMENT' or 'PRODUCTION'），然后通过修改storybookBaseConfig后返回自定义的配置对象达到完全控制的目的。
官方的DMEO：

```
const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, '../')
  });

  // Return the altered config
  return storybookBaseConfig;
};
```

尽量不要去更改下面这几项：
- entry 
- output
- first loader in the module.loaders (Babel loader for JS)
- all existing plugins

**Full control mode + default （完全控制+默认配置 模式）**
和完全配置模式几乎一样，唯一的区别是导出的函数多了一个参数defaultConfig，当导出的函数有三个参数时将会使用这种模式。

```
const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, '../src'),
    loader: require.resolve('ts-loader')
  });
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  return defaultConfig;
};
```

> 建议使用扩展模式，配置比较简单。如果需要根据不同的环境进行不同的编译配置，使用全控制模式配置。
> Storybook的基础配置中只包含了babel-loader和md解析用的loader，默认配置中配置了例如css、json、字体文件、媒体文件相关的loader，可以在node_modules\@storybook\react\src\server\config下看到对应的webpack配置文件。

#### 6. 注入script或css
如果你的UI库依赖全局的script或者css，可以通过Storybook提供的注入的方式。
1. 组件预览iframe注入
在`./stroybook`目录下新建`preview-head.html`,里面的srcipt或css标签将注入到预览区域的iframe中，在stries加载前被注入。
例如希望每个UI组件使用reset.css
在`preview-head.html`中添加

```
<style>
*{
	margin: 0;
	padding: 0;
}
</style>
```
2. Stroybook平台注入
在`./stroybook`目录下新建`manager-head.html`,里面的script或css标签将注入到Stroybook平台下，将在Stroybook React UI加载前被注入。
### 配置参考
目录结构：
![](http://ow67vzejn.bkt.clouddn.com/18-2-1/63393048.jpg)

ShareWebUI/.storybpook/config.js --- Storybook配置文件

```
import * as React from 'react'
import { configure,addDecorator,setAddon } from '@storybook/react';

/* 导入storybook插件 */
import { setOptions } from '@storybook/addon-options';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withDocs } from 'storybook-readme';

/* 通用storybook底部md */
import * as Doc_Footer from './Doc_Footer.md';

/* 设置Storybook UI */
setOptions({
  name: 'AnyShare',
  url: 'https://anyshare.eisoo.com',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
});

/* 设置使用JSXAddon，在侧边栏显示渲染区域组件对应的JSX */
setAddon(JSXAddon);

withDocs.addFooterDocs(Doc_Footer); // 当使用withDocs时，使用通用底部md

/* 全局story装饰器 */
addDecorator(withKnobs) // 使用addon-knobs装饰器，允许自定义组件参数，具体参数需要在story中定义


/* 加载story */
function loadStories() {
  const storiesContext = require.context("../src", true, /\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}
configure(loadStories, module);
```

ShareWebUI/.sotrybook/addon.js  --- Storybook注册插件配置文件

```
import '@storybook/addon-options/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';

import '@storybook/addon-knobs/register';
import 'storybook-addon-jsx/register';
import 'storybook-readme/register';
```

ShareWebUI/.storybook/webpack.config.js   --- 自定义webpack配置

```
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[path][name]---[local]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, '../../postcss.config.js')
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.png$|\.gif$/,
                loader: 'url-loader'
            },
            {
                test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'base64-font-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.swf$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
                }
            },
            /* 使用storybook的默认md配置 */
            // {
            //     test: /\.md$/,
            //     use: [{
            //             loader: 'html-loader',
            //         },
            //         {
            //             loader: 'markdown-loader',
            //         },
            //     ],
            // },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    }
};
```

ShareWebUI/src/Button/stories/Button.stroies.tsx --- stories文件

```
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, number, text, boolean, select } from '@storybook/addon-knobs/react';
import { withReadme, withDocs } from 'storybook-readme';
import * as ReadmeDoc from '../document/Button.md'

import Button from '../ui.desktop';

const typeOptions = {
  button: 'button',
  submit: 'submit',
  reset: 'reset'
}

const theme = {
  regular: 'regular',
  dark: 'dark'
}

storiesOf('Button@desktop', module)
  .addDecorator(withDocs(ReadmeDoc))
  .addDecorator(withReadme(ReadmeDoc))
  .addWithJSX('Button', () =>
    <Button
      type={select('type', typeOptions, 'button')}
      theme={select('theme', theme, 'regular')}
      disabled={boolean('disabled', false)}
      onClick={action('button-click')}
      code={text('icon', '\uf077')}
      minWidth={number('minWidth')}
      width={number('width')}
      className={text('className')}
      onMouseDown={action('onMouseDown')}
      onMount={action('onMount')}
      fallback={object('fallback')}
    >
      {text('text', 'button')}
    </Button>
  );
```

ShareWebUI/src/Button/ui.desktop.tsx --- 对应的Button组件

```
import * as React from 'react';
import { noop } from 'lodash';
import * as classnames from 'classnames';
import UIIcon from '../UIIcon/ui.desktop';
import * as styles from './styles.desktop.css';

const Button: React.StatelessComponent<UI.Button.Props> = function Button({
    type = 'button',
    disabled = false,
    theme = 'regular',
    icon,
    minWidth,
    width,
    className,
    onClick = noop,
    onMouseDown = noop,
    onMount = noop,
    children,
    fallback,
    ...otherProps
}) {
    return (
        <button
            type={type}
            style={{ minWidth, width }}
            disabled={disabled}
            className={
                classnames(
                    styles['button'],
                    styles[theme],
                    className,
                    {
                        [styles['disabled']]: disabled
                    }
                )
            }
            onClick={event => !disabled && onClick(event)}
            onMouseDown={onMouseDown}
            ref={onMount}
            {...otherProps}
        >
            {
                icon ?
                    <span className={styles['icon']} >
                        <UIIcon
                            size={16}
                            code={icon}
                            fallback={fallback}
                            color={theme === 'dark' ? '#fff' : '#757575'}
                        />
                    </span > :
                    null
            }
            <span>
                {
                    children
                }
            </span>
        </button >
    )
}

export default Button
```

参考文档：
- [Storybook官方配置文档](https://storybook.js.org/basics/introduction/)
- [插件Action配置文档](https://github.com/storybooks/storybook/tree/master/addons/actions)
- [插件Knobs配置文档](https://github.com/storybooks/storybook/tree/master/addons/knobs)
- [插件Options配置文档](https://github.com/storybooks/storybook/tree/master/addons/options)
- [插件Readme配置文档](https://github.com/tuchk4/storybook-readme)
- [插件JSX preview配置文档](https://github.com/storybooks/addon-jsx)