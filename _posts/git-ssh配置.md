---
title: git ssh配置
date: 2016-05-30 18:58:33
featured: true
excerpt: 介绍windows下如何快速配置git-ssh,一般而言 Mac 或 linux基本上也适用
tags:
  - Git
---

> windows 下使用 git bash 每次执行`git push -u origin master`时都需要输入账户密码，这对于追求高效率的程序员来说是不能容忍的

## 解决方案

> 通过配置 SSH 以及在添加远程主机的时候使用 ssh 地址`git remote add <主机名> <网址>`

### 一、检查是否已有 ssh

打开 git bash 输入`ls -al ~/.ssh`检查是否已有 ssh 存在
如果存在会显示下列文件的一个或者多个

> id_dsa.pub
> id_ecdsa.pub
> id_ed25519.pub
> id_rsa.pub

或者在系统盘下的 user/用户名/.ssh 文件夹下进行查看
[参考官方帮助](https://help.github.com/articles/checking-for-existing-ssh-keys/)

### 二、如果不存在，生成 ssh

打开 git bash 输入`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
例如我的用户名是 jiangwenyang，所以输入：`ssh-keygen -t rsa -b 4096 -C "jiangwenyang"`
[参考官方帮助](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

### 三、将 ssh 私钥添加到 ssh-agent

- 打开 git bash
- `eval "$(ssh-agent -s)"`打开 ssh-agent
- `ssh-add ~/.ssh/id_rsa`添加 ssh key 到 ssh-agent

[参考官方帮助](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

### 四、添加 ssh 公钥到 github 账户

- 复制公钥
  打开`/user/用户名/.ssh`文件夹下面以`.pub`为后缀的文件，复制其中的内容
- 添加到 github 设置中
  - 网页打开 github，点击** settings **，进入个人设置页面
  - 点击**SSH and GPG keys**在右边的页面点击** New SSH Key **
  - 其中**title**字段为用户自定义字段，对 ssh-key 进行描述方便分辨，**key**字段为我们复制的公钥内容，粘贴即可

[参考官方帮助](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

### 五、大功告成，重新打开 git bash 进行 push 便不需要输入用户名密码了
