---
title: Nginx升级步骤
date: 2022-11-02
excerpt: Nginx升级步骤
tags:
  - Nginx
---

## Nginx 升级步骤

1. 查看现有 nginx 版本，以及配置

   ```bash
   $ cd /usr/local/nginx
   $ ./sbin/nginx -V
   ```

   ![image-20221102132935465](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102132935465.png)

2. 备份原有 nginx 二进制文件

   ```bash
   $ mv ./sbin/nginx ./sbin/nginx.old
   ```

   ![image-20221102135237084](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102135237084.png)

3. 下载新版本 nginx 源码并解压

   nginx 下载地址：http://nginx.org/en/download.html

   使用 curl 或者 wget 下载

   ```bash
   # curl下载
   $ curl -O http://nginx.org/download/nginx-1.22.1.tar.gz
   # wget下载
   $ wget http://nginx.org/download/nginx-1.22.1.tar.gz
   ```

   ![image-20221102133900437](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102133900437.png)

   解压

   ```bash
   $ tar -xzvf
   ```

   ![image-20221102133957701](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102133957701.png)

4. 配置

   **编译时只进行到 make，不能 make install，否则会将原来的配置文件覆盖。**

   执行`./configure`进行配置，编译时如果步骤 1 执行 nginx -V 输出`configure arguments:` 后有编译参数，则需要在`./configure` 后追加。

   如本例中我们将追加 `--with-http_ssl_module` 保留 https 模块。

   > 支持的配置参数及解释可以参考https://tengine.taobao.org/nginx_docs/cn/docs/install.html

   ```bash
   $ cd nginx-1.22.1
   $ ./configure --prefix=/usr/local/nginx --with-http_ssl_module
   ```

   ![image-20221102134602137](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102134602137.png)

5. 编译
   执行`make`进行编译

```bash
$ make
```

编译完成后，当前目录的 objs 为生成的编译产物。

6. 复制新版本替换旧版本的 nginx 二进制文件

   ```bash
   $ cp objs/nginx /usr/local/nginx/sbin/
   ```

   ![image-20221102135356064](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102135356064.png)

7. 检查新版本

   ```bash
   $ ./nginx -t
   $ ./nginx -V
   ```

   ![image-20221102135439574](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102135439574.png)

8. 关闭旧的 nginx

   ```bash
   $ ./nginx.old -s stop
   $ ps -ef | grep nginx
   ```

   ![image-20221102135730633](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102135730633.png)

9. 启动新的 nginx

   ```bash
   $ ./nginx
   $ ps -ef | grep nginx
   ```

   ![image-20221102135827462](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/uPic/image-20221102135827462.png)

10. 检查是否启动

    查看服务是否正常，完成升级。
