---
title: 一个真实的Vue CLI项目迁移到vite
date: 2021-09-22
featured: true
coverImage: 一个真实的vue-cli项目迁移到vite.webp
excerpt: "需要迁移到Vite的理由，并以真实项目为例，详细介绍从vue-cli迁移到Vite的可能会遇到的问题，以及如何解决这些问题"
tags:
  - Vue
  - Vite
---

## TOC

## 是谁？叫什么？来自哪里？要去往那里？

先来回答灵魂拷问。我们原有的项目是一个使用 Vue CLI 生成的 vue2 项目，项目整体上是没有什么大问题的，但是随着模块的不断增多，Vue CLI 基于 Webpack 构建速度越来越慢，开发体验上比较差，为了减少抓狂时间，我们将目光转向了号称很快的 Vite。

废话不多说，先来看原本的项目结构：

```
├── .browserslistrc
├── .editorconfig
├── .env.development // 环境变量，以下几个文件同
├── .env.development.local
├── .env.pre
├── .env.production
├── .env.si
├── .env.test
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .npmrc
├── .nvmrc
├── .prettierignore
├── .prettierrc.js
├── .stylelintignore
├── .stylelintrc.js
├── README.md
├── babel.config.js
├── build/
├── config/ 一些项目配置文件，如代理配置等
├── dist/ 构建产物
├── doc/ 开发文档
├── jsconfig.json
├── mock/
├── package.json
├── postcss.config.js
├── public/
├── src/ 业务相关
├── tests/
├── vue.config.js // Vue CLI配置
└── yarn.lock
```

## 好好的为什么要迁移？

迁移的目的主要是构建速度上的差别，除此之外 Vite 也有一些其他的优势。

- 构建速度

  Vite 相比 Vue CLI 最显著的优势应该就是构建速度了，Vite 基于 esbuild 预构建依赖，因此会快很多，开发体验会更好。

  > Vite 的开发环境和生产环境构建目前有所区别，开发环境因为直接使用原生 ESM 不需要打包，而生产环境打包采用了 Rollup

- 隐藏技术细节

  呃，这一点，其实 vite 和 Vue CLI 没有太大区别。。。

- 折腾，尝试新的工具

  毕竟是新的工具，尝试一下，并且 Vue 社区目前也是在推动的。

## 千里之行始于足下

万事开头难，既然迁移的 Flag 已经立了，只能硬着头皮上了。让我们先简单看一遍 Vite 的官方文档，文档延续了 Vue 官方文档简洁清晰的优点，基本上简单看一遍就对 Vite 比较了解了，具体细节不比过分深究。看完文档很容易发现和 Vue CLI 的一些约定上的区别，对于这部分是必须修改代码的，下面开始迁移

### 首先丢掉历史包袱，移除 Vue CLI 轻装上阵

首先，我们先移除所有和 Vue CLI 相关的依赖以及配置

- 在 `package.json` 的依赖中搜索 `vue-cli` 关键词，然后移除相关依赖。

- 将 script 中的启动脚本改为 Vite 对应的启动脚本

  将原本的启动脚本

  ```json
  {
    "scripts": {
      "dev": "vue-cli-service serve --open",
      "build": "vue-cli-service build --mode development"
    }
  }
  ```

  改为

  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "serve": "vite preview"
    }
  }
  ```

### 然后剔个牙，做些“小改动”

我们上面说到 Vite 和 Vue CLI 在部分约定上的不同，需要对代码做一些小改动

#### 入口不同

Vue CLI 默认入口为`src/main.js`，而 Vite 的默认入口则是 index.html

直接引用官方文档：

> Vite 将 `index.html` 视为源码和模块图的一部分。Vite 解析 `<script type="module" src="...">` ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 `<script type="module">` 和引用 CSS 的 `<link href>` 也能利用 Vite 特有的功能被解析。另外，`index.html` 中的 URL 将被自动转换，因此不再需要 `%PUBLIC_URL%` 占位符了。

因此我们首先需要修改原有的入口

将 `public/index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <meta name="description" content="" />
    <meta name="Keywords" content="" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= webpackConfig.name %></title>
  </head>
  <body>
    <noscript>
      <strong>本页面需要浏览器支持（启用）JavaScript！！！</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

移动到根目录下`index.html` ，并做修改

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <meta name="description" content="" />
    <meta name="Keywords" content="" />
    <link rel="icon" href="./favicon.ico" />
    <title>XXX</title>
  </head>
  <body>
    <noscript>
      <strong>本页面需要浏览器支持（启用）JavaScript！！！</strong>
    </noscript>
    <div id="app"></div>
    <!-- Vite将自动解析下面的js文件 -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

#### 环境变量不同

Vue CLI 的环境变量和 Vite 的环境变量加载都是通过 [dotenv](https://github.com/motdotla/dotenv) 来实现的，因此在文件命名约定上是一致的。但具有以下两点不同：

- 暴露方式

  - Vue CLI 中约定只有 `NODE_ENV`、`BASE_URL` 和以`VUE_APP_` 开头的变量被暴露出来。

  - Vite 中则约定可以访问 `MODE` （应用运行的模式 development|production） 、`BASE_URL` 、`PROD` （是否运行在生产环境）、`DEV` （是否运行在开发环境）以及以 `VITE_` 开头的环境变量。

- 访问方式

  - Vue CLI 通过`process.env` 来访问

  - Vite 通过 `import.meta.env` 来访问

由于以上的两点不同，迁移时我们就需要：

- 将原本以 `VUE_APP_` 开头的环境变量统一替换为以 `VITE_` 开头；或者可通过修改配置文件 `vite.config.js` 的 [envPrefix](https://cn.vitejs.dev/config/index.html#envprefix) 进行配置，直接配置为 `VUE_APP_` 则不需要对原有环境变量名称进行修改。(配置文件的创建下面将会提到)
- 将 `process.env` 统一替换为 `import.meta.env`。

#### 不能忽略自定义导入类型扩展名（如`.vue`）

在 Vue CLI 中，默认我们可以不写`.vue`扩展名进行导入

```js
import App from "./App";
```

但是在 Vite 中，**不建议**（实测还是可以配置的）忽略自定义扩展名，因为会影响 IDE 和类型支持。因此需要完整书写

```js
import App from "./App.vue";
```

> 非自定义类型的扩展名可以通过配置项 ` resolve.extensions` 来进行配置，默认为 `['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']`

### 出来吧你，Vite

到目前为止，基本的修改以及完成，我们开始引入 Vite。

Vite 的安装比较简单，唯一需要注意的就是对于不同的 Vue 版本，需要用到不同的插件。

安装 Vite

```bash
$ yarn add -D
```

安装对应版本的 Vue 插件

> Vite 为 Vue 提供第一优先级支持：
>
> - Vue 3 单文件组件支持：[@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)
> - Vue 3 JSX 支持：[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)
> - Vue 2 支持：[underfin/vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)

由于我们使用 Vue2，因此安装 `vite-plugin-vue2`

```bash
$ yarn add -D vite-plugin-vue2
```

在根目录创建配置文件 `vite.config.js`

```json
import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    clearScreen: false,
    plugins: [createVuePlugin()],
    build: {
      target: 'es2015',
    },
  }
})
```

**完结撒花！！！**

如果你的项目没有其他特殊的需求的话，到目前为止，你基本上应该可以跑起来了。不过，我们的项目就没这么幸运了，旅途才刚刚开始。。。

## 填坑之旅

### 启用 JSX

Vite 默认是不启用 JSX 的，如果要开启 JSX 支持还是比较麻烦的，需要：

1. 实例化 Vue2 插件的时候传入`{jsx: true}` 开启 JSX 支持。

   ```js
   export default defineConfig(() => {
     return {
       plugins: [createVuePlugin({ jsx: true })], // 引入Vue2插件并开启JSX支持
     };
   });
   ```

2. 在用到的组件上加上 `jsx` 标识

   ```js
   <script lang="jsx">
       export default {
           render(){
               return <div>JSX Render</div>
           }
       }
   </script>
   ```

3. 如果是 js 文件，用到了 `jsx` 语法，则需要将后缀名改完 `.jsx` 。

### alias

在原项目中我们在 `vue.config.js` 中 定义了使用了 Webpack 的 `resolve.alias` 特性：

```js
{
	"configureWebpack":{
		resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@components': resolve('src/components'),
        '@containers': resolve('src/containers'),
        '@services': resolve('src/services'),
        '@styles': resolve('src/styles'),
        '@utils': resolve('src/utils'),

        '@@containers': resolve(
          'node_modules/web-lib/packages/web-lib-containers/lib'
        ),
        '@@components': resolve(
          'node_modules/web-lib/packages/web-lib-components/lib'
        ),
        '@@services': resolve(
          'node_modules/web-lib/packages/web-lib-services/lib'
        ),
        '@@utils': resolve('node_modules/web-lib/packages/web-lib-utils/lib'),
        '@@styles': resolve('node_modules/web-lib/packages/web-lib-styles/lib'),
      },
    },
	}
}
```

查看 Vite 的配置文档，发现内置支持了 alias，虽然是通过 `@rollup/plugin-alias` 来实现的，但是幸运的是配置方式基本是一致的。

因此在`vite.config.js` 中返回的配置对象中添加对应配置 `resolve.alias` , 直接复制原有配置对象即可。

```js
resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@components': resolve('src/components'),
        '@containers': resolve('src/containers'),
        '@services': resolve('src/services'),
        '@styles': resolve('src/styles'),
        '@utils': resolve('src/utils'),

        '@@containers': resolve(
          'node_modules/web-lib/packages/web-lib-containers/lib'
        ),
        '@@components': resolve(
          'node_modules/web-lib/packages/web-lib-components/lib'
        ),
        '@@services': resolve(
          'node_modules/web-lib/packages/web-lib-services/lib'
        ),
        '@@utils': resolve('node_modules/web-lib/packages/web-lib-utils/lib'),
        '@@styles': resolve('node_modules/web-lib/packages/web-lib-styles/lib'),
      },
}
```

### 客户端代码中不能使用 node 内部模块

Vite 中不对模块兼容做处理，因此一些 Node 的内置模块在客户端代码中将无法找到。如果确实需要用到，则需要替换为对应的浏览器兼容实现。

如 `path` 模块可以换成对应的浏览器兼容实现 `path-browserify` 。

原有代码使用 `path.join` 来拼接路径：

```js
import path from "path";

export function genPath(...paths) {
  return path.join(...paths);
}
```

在 Vite 中则需要修改为对应浏览器兼容实现 `path-browserify`

首先安装 `path-browserify`

```bash
$ yarn add path-browserify
```

然后直接替换引用即可

```js
import path from "path-browserify";

export function genPath(...paths) {
  return path.join(...paths);
}
```

### 全局 CSS 变量

在我们原项目中在`vue.config.js` 中配置引入了 [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) 来实现。

```js
chainWebpack(config) {
	// 引入全局的sass资源
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './node_modules/web-lib/packages/web-lib-styles/src/variables/index.scss',
            './src/styles/variables.scss',
          ],
        })
        .end()
    })
}
```

在 Vite 中我们可以通过 ` css.preprocessorOptions` 进行配置。

```js
css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import './node_modules/web-lib/packages/web-lib-styles/src/variables/index.scss';`,
        },
      },
}
```

如果你细心的话可能会发现，我们的原代码中引入了两个 CSS 文件。而迁移后的我们只引入了一个 CSS 文件。原因是在 `./src/styles/variables.scss` 中我们使用了下面的语法导出了 js 变量

```scss
// 导出，供js模块调用
:export {
  bg: $bg;
  text_color: $text_color;
  header_height: $header_height;
  sidebar_width: $sidebar_width;
  header_bg: $header_bg;
  logo_bg: $logo_bg;
  menu_bg: $menu_bg;
  menu_text_color: $menu_text_color;
  menu_active_text_color: $menu_active_text_color;
  menu_hover: $menu_hover;
}
```

在 Vite 中会出现，如果配置了 `additionalData`，将会报错：

```bash
Error: This file is already being loaded.
    ╷
  2 │           @import './src/styles/variables.scss';
    │                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ╵
    src/styles/variables.scss 2:19  root stylesheet
```

可参考以下 ISSUE:

- https://github.com/vitejs/vite/issues/3283
- https://github.com/nuxt/vite/issues/117

目前我们的解决方式就是不引入，然后在用到的地方手动进行引入规避这个问题，暂时没有特别好的解决方案。

### 动态导入 png 等图片资源

在 Vue CLI 项目中，我们往往需要通过运行时变量来动态确定一些静态资源来进行导入

```js
const iconSrc = require(`./images/${iconName}.png`);
```

上面的代码使用 webpack 的 url-loader 或 url-loader，将被自动处理

Vite 处理图片资源的动态引入会比较麻烦，有以下几种方式：

1. 使用 `import.meta.globEager` glob 引入

   > 这种方式将会全量的引入匹配的图片

   ```js
   const images = import.meta.globEager("./images/*.png"); // 将会直接导入所有匹配的图片
   const iconSrc = iamges[`./images/${iconName}.png`].default;

   if (iamges[`./images/${iconName}.png`]) {
     // TODO
   } else {
     // TODO
   }
   ```

2. 使用 `new URL(url, import.meta.url)` 引入

   > 这种方式如果图片不存在在代码层面无法判断

   ```js
   const iconSrc = new URL(`./images/${iconName}.png`, import.meta.url); // 将返回一个URL实例
   ```

### svg 雪碧图

在原项目中我们使用了 webpack 的 [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader) 插件来实现 svg 雪碧图。

```js
chainWebpack(config) {
  // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
}
```

感谢社区，在 Vite 中我们可以使用插件**[ vite-plugin-svg-icons ](https://github.com/anncwb/vite-plugin-svg-icons)** 来进行替换以实现相同的功能。使用方式基本一样，具体使用可以查看相应文档。

> 注意: svg-sprite-loader 需要手动引入 svg 文件，而 vite-plugin-svg-icons 会自动引入。

在 Vite 配置的 `plugins` 选项中引入插件

```js
import viteSvgIcons from 'vite-plugin-svg-icons'

export default defineConfig(({ mode }) => {
 return {
   viteSvgIcons({
        iconDirs: [resolve('src/icons/svg')],
        symbolId: 'icon-[name]',
    }),
 	}
}
```

在 `main.js` 中引入

```js
import "virtual:svg-icons-register";
```

### Glob 导入

在老项目中我们如果使用了 webpack 的 `require.context` 语法，在 Vite 中会报错。对应的，Vite 提供了`import.meta.glob` 和 `import.meta.globEager` 来代替

例如原本的`src/store/index.js` 中动态引入 modules

```js
// 获取模块文件
const getModuleFiles = () => require.context("./modules", true, /\.js$/);
// 获取模块对象表
const getModules = () => {
  const storeFiles = getModuleFiles();

  const modules = storeFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = storeFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  }, {});
  return modules;
};

const modules = getModules();
```

在 Vite 中改为

```js
const files = import.meta.globEager("./modules/*.js");

const modules = Object.keys(files).reduce((pre, path) => {
  pre[path.replace(/(\.\/modules\/|\.js)/g, "")] = files[path].default;
  return pre;
}, {});
```

### 热更新

在原本的`src/store/index.js` 中我们通过以下方式开启了 store 的热更新

```js
// 启用模块热更新
if (module.hot) {
  const modulePaths = getModuleFiles().keys();
  module.hot.accept(["./getters", ...[modulePaths]], () => {
    // 获取更新后的模块
    const getters = require("./getters").default;
    const modules = getModules();
    // 加载新模块
    store.hotUpdate({
      getters,
      modules,
    });
  });
}
```

在 Vite 中直接移除即可，不需要额外配置。

### 在 Vite 配置文件中使用环境变量

如果想在 Vite 配置中使用环境变量，是不能使用 `import.meta.env` 来获取的，因为 Vite 是先解析配置文件再解析环境变量的。因此只能通过 [dotenv](https://github.com/motdotla/dotenv) 来手动解析访问。

```js
export default defineConfig(({ mode }) => {
  // 访问通用环境变量
  const { PORT } = require("dotenv").config({ path: `./.env` }).parsed || {};

  // 访问基于运行环境的环境变量
  const {
    VITE_APP_URI_BUSINESS_SERVICE_BASE,
    VITE_APP_URI_FILE_SERVICE_BASE,
    VITE_APP_USER_SOCTET_BASE,
  } = require("dotenv").config({ path: `./.env.${mode}` }).parsed || {};
  return {
    server: {
      port: PORT,
    },
  };
});
```

## 小甜品，来点工程化优化

### husky+lint-staged 实现提交 lint

husky 可以让我们定义各种 git-hooks，以实现在 git 生命周期中注入各种钩子来定义我们的工作流，比如做代码校验或者邮件通知等。lint-staged 则让我们可以只对待提交的代码进行处理。结合两者便能实现在期望的 git 生命周期中触发对新提交代码进行一系列操作。最常见的便是在 git 的 commit 之前（`pre-commit`），对代码进行校验和格式化。

#### 安装及使用

1. 安装 `husky`

   ```bash
   $ yarn add -D husky
   ```

2. 开启 Git hooks

   ```bash
   yarn husky install
   ```

3. 添加安装项目依赖后自动开启 Git hooks

   `package.json`

   ```bash
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

4. 安装 lint-staged

   ```bash
   $ yarn add -D lint-staged
   ```

5. 配置 lint-staged

   `package.json`

   ```json
   {
     "lint-staged": {
       "**/*.{vue,js}": ["prettier --write", "eslint --fix", "git add"],
       "**/*.{html,vue,css,scss}": [
         "prettier --write",
         "stylelint --allow-empty-input --fix",
         "git add"
       ],
       "**/*.{md,json}": ["prettier --write", "git add"]
     }
   }
   ```

6. 配置 hook 在提交时触发 lint-staged

   ```bash
   $ npx husky add .husky/pre-commit "npx lint-staged"
   ```

7. 将 hook 添加到 git 中

   ```bash
   $ git add .husky/pre-commit
   ```

#### git 支持的钩子及简单介绍

| 钩子类型           | 钩子名称           | 触发时机                                                                                           | 钩子参数                  | 可中止 |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------- | ------ |
| 提交工作流钩子     | pre-commit         | 键入提交信息前，即生成本次 commit 对象前。是代码检查、测试运行的好时机。                           | \                         | 是     |
| 提交工作流钩子     | prepare-commit-msg | 启动提交信息编辑器之前，默认信息被创建之后运行。可以在这里修改默认提交信息。                       | filepath commitType SHA-1 | 是     |
| 提交工作流钩子     | commit-msg         | 输入提交信息后，执行提交前发生。可以在这里检查提交信息是否规范，也可以修改提交信息。               | filepath                  | 是     |
| 提交工作流钩子     | post-commit        | 整个提交完成后。一般用于发生通知，例如邮件通知提交等（但是建议在服务器端 post-receive 钩子中做）。 | \                         | 否     |
| 电子邮件工作流钩子 | applypatch-msg     | 生成补丁提交信息后，应用补丁前。可用来检查补丁提交信息是否规范。                                   | mergeFilename             | 是     |
| 电子邮件工作流钩子 | pre-applypatch     | 运行于应用补丁后，产生提交对象之前。因此和 pre-commit 一样是代码检查、测试运行的好时机。           | \                         | 是     |
| 电子邮件工作流钩子 | post-applypatch    | 整个提交完成后。同 post-commit 一样是通知的好时机。                                                | \                         | 否     |
| 其它客户端钩子     | pre-rebase         | 运行于变基前。                                                                                     | \                         | 是     |
| 其它客户端钩子     | post-rewrite       | 被会替换提交记录的命令所触发。如`git commit --amend`                                               | commandName               | 否     |
| 其它客户端钩子     | post-checkout      | 在 git checkout 成功运行后。                                                                       | commandName               | 否     |
| 其它客户端钩子     | post-merge         | 在 git merge 成功运行后。                                                                          | commandName               | 否     |
| 其它客户端钩子     | pre-push           | 更新了远程引用但是未推送本地提交前。                                                               | originBranchName HEAD     | 是     |

## 完整地图

下面是迁移完成的目录结构以及完整的 `vite.config.js` 文件

```
├── .browserslistrc
├── .editorconfig
├── .env
├── .env.development
├── .env.production
├── .eslintignore
├── .eslintrc.js
├── .git/
├── .gitignore
├── .husky/
├── .npmrc
├── .nvmrc
├── .prettierignore
├── .prettierrc.js
├── .stylelintignore
├── .stylelintrc.js
├── README.md
├── _templates/
├── dist/
├── dist.tar.gz
├── doc/
├── index.html
├── jsconfig.json
├── package.json
├── public/
├── src/
├── tests/
├── vite.config.js
└── yarn.lock
```

```js
import path from "path";
import { defineConfig } from "vite";
import viteSvgIcons from "vite-plugin-svg-icons";
const { createVuePlugin } = require("vite-plugin-vue2");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { PORT } = require("dotenv").config({ path: `./.env` }).parsed || {};

  const {
    VITE_URI_BUSINESS_SERVICE_BASE,
    VITE_URI_FILE_SERVICE_BASE,
    VITE_USER_SOCTET_BASE,
  } = require("dotenv").config({ path: `./.env.${mode}` }).parsed || {};

  return {
    base: "./",
    clearScreen: false,
    plugins: [
      createVuePlugin({ jsx: true }),
      viteSvgIcons({
        iconDirs: [resolve("src/icons/svg")],
        symbolId: "icon-[name]",
      }),
    ],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      alias: {
        "@": resolve("src"),
        "@api": resolve("src/api"),
        "@components": resolve("src/components"),
        "@containers": resolve("src/containers"),
        "@services": resolve("src/services"),
        "@styles": resolve("src/styles"),
        "@utils": resolve("src/utils"),

        "@@containers": resolve(
          "node_modules/web-lib/packages/web-lib-containers/lib"
        ),
        "@@components": resolve(
          "node_modules/web-lib/packages/web-lib-components/lib"
        ),
        "@@services": resolve(
          "node_modules/web-lib/packages/web-lib-services/lib"
        ),
        "@@utils": resolve("node_modules/web-lib/packages/web-lib-utils/lib"),
        "@@styles": resolve("node_modules/web-lib/packages/web-lib-styles/lib"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import './node_modules/web-lib/packages/web-lib-styles/src/variables/index.scss';`,
        },
      },
    },
    server: {
      port: PORT,
      open: true,
      proxy: {
        "/user": {
          target: VITE_URI_BUSINESS_SERVICE_BASE,
          secure: false,
          changeOrigin: true,
        },
        "/file": {
          target: VITE_URI_BUSINESS_SERVICE_BASE,
          secure: false,
          changeOrigin: true,
        },
        "^/group1": {
          target: VITE_URI_FILE_SERVICE_BASE,
          secure: false,
          changeOrigin: true,
        },
        // 用户中心长链接
        "^/wsUser": {
          target: VITE_USER_SOCTET_BASE,
          secure: false,
          changeOrigin: true,
          ws: true,
          // 实际地址没有这个wsmsg前缀
          pathRewrite: {
            "^/wsUser": "",
          },
          // 解决ws代理断开后会导致dev server down掉的问题
          onProxyReqWs(proxyReq, req, socket) {
            socket.on("error", (err) => {
              console.error(err);
              // console.error(options)
            });
          },
        },
      },
    },
    build: {
      target: "es2015",
    },
  };
});
```
