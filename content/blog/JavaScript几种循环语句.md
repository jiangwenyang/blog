---
layout: blog-post

title: JavaScript几种循环语句
date: 2017-09-12 22:22:13
tags:
  - JavaScript
categories:
  - JavaScript
---

## 一、for()

写法不够简洁，但是是最基础的循环结构

## 二、forEach

**优点**：写法简洁
**缺点**：无法在循环内部使用 break 中断循环，也不能使用 return 返回到外层函数。

## 三、for-in

**优点**：没有发现
**缺点**：

- 在数组中使用 for-in 时 index 得到的不是 number 而是 string，也就是说得到的是’0‘ '1' '2'，而不是期望的 0 1 2 下标。
- 如果数组中有可枚举的属性，会被进一步进行遍历
- 遍历的顺序可能是随机的

## 四、for-of

**优点**：简洁直接的数组遍历语法，并且可以正确响应 break 和 return
**最佳实践**：使用 for-in 遍历对象，使用 for-of 遍历数组或者类数组对象。
**TIPS**：for-of 不支持普通对象，迭代对象的属性可以使用 for-in 或者 for-of 结合 Object.keys()

```javascript
for (let key of Object.keys(someObject)) {
  console.log(key + ":" + someObject[key]);
}
```
