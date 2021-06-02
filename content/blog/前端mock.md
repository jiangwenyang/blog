---
layout: blog-post

title: 前端mock
date: 2017-09-12 21:56:01
tags:
  - Webpack
  - Json-server
categories:
  - 前端工具
---

## 痛点

项目中前端和后端开发同步进行，前端不能及时拿到可用的接口，只能通过约定的接口定义来模拟数据，即前端 Mock。我们常用的有以下几种 mock 方式：

1. 直接在代码里写死数据
2. 将数据写在 json 文件里，然后将请求地址写为文件地址
3. 使用 fiddler 等工具拦截请求并返回静态文件
4. 使用 Express 等服务器框架起一个服务，对对应的请求进行响应
5. 结合方式 4，配合 webpack 的 Proxy 可以实现在代码中不添加 mock 代码，将请求代理到 mock 服务器上。
6. 使用 Webpack+json-server 可以提供简单并且支持 REST 的 Mock 服务
   **对比：**

- 方式 1，2 是最简单的实现方式，但是无法模拟真实的接口情况，并且需要修改代码。
- 方式 3：不方便维护，没有特别明显的缺点，也能返回特定的响应。
- 方式 4：比较麻烦，但是灵活
- 方式 5，6 两种方式其实差不多，都是另起一个服务，然后使用 webpack 进行代理。json-server 的特点是支持 REST API,可以对 JSON 文件进行 DELETE、PUT 等请求，并能对应响应。

## Webpack+json-server 实现前端 mock

### json-server:[Github 地址](https://github.com/typicode/json-server)

能提供完全模拟的 REST API 并且简单易用，并且提供简单的可视化界面。
**安装**

```bash
$ npm install -g json-server
```

**使用：**

- 创建模拟数据的`example.json`文件

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

1. 创建路由`routes.json`文件(可选，可以不创建，但是能提供更大的灵活性)

```json
{
  "/api//?method=:method": "/:method"
}
```

2. 开启 mock 服务器
   使用命令：`json-server --watch example.json`

   > 默认打开 3000 端口，如果想改为其他端口可以添加`--port [portnumber]`参数
   > 如果使用路由功能，添加参数`--routes [routesfilename.json]`

3. Enjoy it
   开启提示：
   ![](http://ow67vzejn.bkt.clouddn.com/1505218490905.png)
   访问 localhost:3000,能查看当前所有的接口和路由，并且可以快速点击使用
   ![](http://ow67vzejn.bkt.clouddn.com/1505218567867.png)

## 通过 proxy 整合 Webpack-dev-server

修改`webpack.config.js`中的 devServer 字段，增加 proxy 属性将请求代理到 Mock-server 下。也可以通过这种方式直接将本地请求代理到真实的服务器上。

```json
proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
```

然后启动 webpack-dev-server 后发起的/api 路径下的所有请求都会被代理到`localhost：3000/api`,如果/api 后面还有子路径可以使用 routes 进行匹配，详细查看 json-server 的文档。

## faker.js:[Github 地址](https://github.com/marak/Faker.js/)

能生成随机数据，配合 json-server 使用基本上能模拟真实的数据
**安装：**
`npm install faker`
新建`example.js`文件：

```javascript
module.exports = function() {
  var faker = require("faker");
  return {
    people: {
      id: n,
      name: faker.name.findName(),
      avatar: faker.internet.avatar()
    }
  };
};
```
