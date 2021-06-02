---
layout: blog-post

title: Git工具型命令
date: 2017-09-12 22:17:24
tags:
  - Git
categories:
  - Git
---

## 修订版本选择

### 查看单个修订版本

#### 1.使用 SHA 方式

通过提供最短 4 个字符的 SHA-1 标识开头，可以通过`git log`找到提交的 commit 标识，假设是`1c23re`然后使用`git show 1c23re` 可以查看单个修订的详情。

> `git log --abbrev-commit`可以生成更加简短且唯一的 commitId

#### 2.分支引用

如果想查看 develop 分支当前最新的提交,可以直接指定 commitId 也可以使用分支引用：

```bash
$ git show ca82a6dff817ec66f44342007202690a93763949
$ git show develop
```

> 使用 git rev-parse 解析分支的最新 commitId：
> \$ git rev-parse develop
> ca82a6dff817ec66f44342007202690a9376394

#### 3.引用日志里的简称

使用`git reflog`查看引用日志,得到的输出长这样：

```bash
734713b HEAD@{0}: commit: fixed refs handling, added gc auto, updated
d921970 HEAD@{1}: merge phedders/rdocs: Merge made by recursive.
```

可以使用`HEAD@{n}`的形式来进行引用：
`git show HEAD@{2}`

> 引用日志是本地的，只会记录你本地的修改

#### 4.祖先引用

在引用后加`^`可以获取到父提交，即上一次提交,可以通过多次使用`^`得到祖先提交
`git show HEAD^`
`git show HEAD^^`

### 提交范围

#### 1.双点方式（Not）

例如想查看当前 develop 分支上没有提交到 master 分支的所有提交：
`git log master..develop`
也可以反向使用查看 master 上有 develop 上没有的提交：
`git log develop..master`

> 常见用途：查看推送到远程服务器的提交
> `git log origin/develop..HEAD`

#### 2.三点方式（OR）

查看 master 或者 develop 中存在的提交，注意是**或**，即两者中的任何一个
`git log master...develop`

#### 3.多点方式（AND）

例如你想查看 master 和 develop1 包含的，但是 develop2 不包含的提交
`git log master develop1 ^develop2`

> `^`代表不包含等同于`--not`

### 交互式暂存

使用`git add -i`命令打开交互式暂存，
![](http://ow67vzejn.bkt.clouddn.com/1505099981963.png)
然后输入编号选择功能

> status:查看工作区状态，和调用`git status`类似
> git updata:启动交互式的 git add,可以使用编号方式进行选择
> git revert:撤销暂存，使用编号的方式进行选择
> diff:类似于`git diff --cache`
> patch:暂存补丁，即可以选择暂存修改的一部分，和使用`git add -p`效果一样

### 储藏

`git stash`命令会将暂存区里面的内容存储起来，没有添加到暂存区的内容不会被 stash。
`git satash list`:查看所有的储藏
`git stash apply stash@{n}`:应用储藏
`git stash pop`：应用最新的储藏并且删除，等于使用`git stash apply`后使用`git stash drop`

### 修改提交

#### 修改最近一次提交

使用`git commit --amend`，可以修改最近一次提交，会获取暂存区并作为新的快照，同时你可以修改提交描述信息。

> 使用这项技术的时候你必须小心，因为修正会改变提交的 SHA-1 值。这个很像是一次非常小的 rebase——不要在你最近一次提交被推送后还去修正它。

#### 修改多个提交

可以使用`git rebase -i`来交互式的衍合提交，比如想修改最近三次的提交说明：`git rebase -i HEAD~3`

> 不推荐使用，容易造成混乱

### 使用 Git 调试

#### 文件标注

使用`git blame`标注文件,查看文件的每一行分别是谁在哪一天进行了修改。
`git blame -L 1,10 a.txt`这个命令查看了 a.txt 文件的 1-10 行的修改信息。
