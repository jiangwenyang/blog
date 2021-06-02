---
layout: blog-post

title: 深入XMLHttpRequest
date: 2017-12-20 23:18:57
tags:
  - XMLHttpRequest
  - Ajax
categories:
  - XMLHttpRequest
---

## Ajax 和 XMLHttpRequset

Ajax 是一种以现有的 JavaScript/HTML/CSS 等技术为基础的技术方案，浏览器提供的 XMLHttpRequert 对象使得发送 Ajax 请求成为可能。

## XMLHttpRequest Simple Example

```javascript
function Ajax() {
  let xhr = new XMLHtttpRequest(); //实例化一个XMLHttpRequest对象
  xhr.timeout = 3000; //设置超时
  xhr.responseType = "json"; //设置响应返回格式
  xhr.open("POST", "/url", true); //创建异步POST请求
  xhr.onload = function() {
    if (this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhr.ontimeout = function() {}; //处理超时
  xhr.onerror = function() {}; //处理错误（网络层错误，404、500不触发onerror）
  xhr.upload.onprogress = function() {}; //处理上传进度
  xhr.setRequestHeader(); //设置响应头，必须在open()之后send()之前
  xhr.send(); //真正开始发送请求
}
```

## setRequsetHeader()设置请求头

- 大小写不敏感
- 在 open()之后 send()之前
- 设置同名不同值 header 不会覆盖而是追加，同名同值 Header 会覆盖

## getAllResponseHeaders()和 getResponseHeader()获取响应头

`getAllResponseHeaders()`获取所有的响应头
`getResponseHeader()`获取传入参数指定的响应头
**注意：**浏览器对响应头的获取做了限制，类似 Set-Cookie 这种字段是拿不到的，只能拿到"_simple response header_"()

## responseType 设置响应数据类型

xhr.resopnseType="json"

## response 响应结果

可以通过 xhr.resopnse , xhr.responseText , xhr.responseXML 三个属性获取返回数据。

- xhr.resopnse
- xhr.responseText
- xhr.responseXML
  当设置了 responseType 之后，需要使用对应的属性。

## XMLHttpRequest 请求状态

ajax 请求发起后有 5 中状态（值从 0-4）,可以通过 xhr.readyState 获得，并且状态变化会触发 xhr.onreadystatechange()。
当 readyState==4 的时候请求完成

## 请求超时时间 timeout

使用 xhr.timeout=毫秒数来设置请求超时时间，默认是 0，send()方法一调用就是请求开始
**注意：**当请求为同步请求时，timeout 必须为 0，否则会报错（open 的第三个参数为 true 的时候为异步，为 false 的时候为同步，默认为 true）

> 当请求为同步请求时，有以下限制
>
> - xhr.timeout 必须为 0
> - xhr.withCredentials 必须为 false
> - xhr.responseType 必须为“”

## 上传、下载进度

- 上传触发 xhr.upload 对象的 onprogress 事件
- 下载触发 xhrd 对象的 onprogress 事件
  然后通过 even 的 loaded 和 total 获取已上传和总文件大小

## 发送数据类型

- ArrayBuffer
- Bolb
- Document
- DOMString
- FormData
- null
  发送的数据类型会影响的 content-type 的默认值，如果通过 xhr.setRequestHeader()手动设置了 content-type 则会覆盖默认值。
  > 断网环境下调用 xhr.send()会报错，应该在 try-catch 中执行 send()

## xhr.withCredentials 与跨域请求

> 发送同源请求的时候，cookie 会自动加载 request header 中，发送跨域请求则不会发送
> 因为标准规定默认情况下发送跨域请求不能发送 cookie 等认证信息，如果要发送必须在客户端手动设置`xhr.withCredentials=true`服务端也要在 response header 中包含`Access-Control-Allow-Credentials:true`，并且服务端的`Access-Control-Allow-Origin`应该设置为客户端的域名

本文为读[ruoyiqing](https://segmentfault.com/u/ruoyiqing)的[你真的会使用 XMLHttpRequest 吗？](https://segmentfault.com/a/1190000004322487)后的笔记
