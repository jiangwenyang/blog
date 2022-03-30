---
title: Git Hooks
date: 2018-03-12
excerpt: 介绍Git Hooks是什么，以及如何使用
tags:
  - Git
---

## 什么是 Git Hooks

Git Hooks（Git 钩子）是 Git 提供的当特定动作如提交、推送等 Git 行为发生时执行的自定义脚本。主要分为客户端脚本和服务器端脚本。

### Git Hooks 的安装

其实当初始化一个 Git 项目的时候，hooks 就已经被安装到项目中，只是默认未启用。当执行`git init`的时候，Git 会初始化示例脚本到`.git/hooks`目录中。

如果想启用这些 hooks 非常简单，只需要去掉`.sample`后缀即可启用。示例代码是使用 shell 编写的,但是 git 并没没有显示编写 hooks 使用的语言,任何可执行脚本都可以使用。

> `.git`目录无法加入到版本控制中，因为每次 clone 一个新的仓库的时候都会新生成`.git`目录。
>
> 由于这个特性，因此只能将 hooks 存储到其他目录，通过软链接或者手动拷贝的方式拷贝到`.git/hooks`目录下，但是这样的问题是当更新或新增 hooks 脚本的时候需要重新建立与`.git/hooks`的关系。

### 客户端钩子

客户端钩子主要有提交工作流钩子、电子邮件工作流钩子和其它钩子。

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

参考：

- 可中止：钩子以非 0 结束码退出则中止 Git 操作，以 0 结束码退出则正常执行 Git 操作，后面的服务器端钩子同理。

* filepath：提交信息存储文件路径`.git/COMMIT_EDITMSG`。
* commitType：提交类型，使用`git commit`提交时为空，使用`git commit -m`提交时为`message`，使用`git commit -c`提交时为`commit`，可以通过`git commit -h`查看对应的提交类型。
* SHA-1：关联的提交的哈希字符串，例如使用 git commit --amend 提交时为上一次提交的哈希。
* mergeFilename：请求合并信息的临时文件的名字。
* commandName：触发的命令名。
* originBranchName ： 远程分支名。
* HEAD：本地分支最新提交的引用。

> 提交工作流钩子是一般我们常用到的，电子邮件工作流只会在通过电子邮件推送代码的工作流中会用到。

### 服务器端钩子

服务器端钩子主要在推送到达到服务器之前和之后触发。

| 钩子类型     | 钩子名称     | 触发时机                                                                                            | 钩子参数                       | 可终止 |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------- | ------------------------------ | ------ |
| 服务器端钩子 | pre-receive  | 客户端推送到达前，非 0 值退出则拒绝                                                                 | pushRef                        | 是     |
| 服务器端钩子 | update       | 和 pre-receive，区别时如果提交包含多个分支，则会在每个分支都运行一次，而 pre-receive 只会运行一次。 | branchName lastSHA-1 thisSHA-1 | 是     |
| 服务器端钩子 | post-receive | 推送完成后。常用于邮件通知，持续集成。                                                              | pushRef                        | 否     |

参数解释：

- pushRef：推送的引用。
- branchName：引用的名字（分支）。
- lastSHA-1：推送前的引用指向的内容的 SHA-1 值
- thisSHA-1：用户本次推送的内容的 SHA-1 值

### 使用 husky

[husky](https://github.com/typicode/husky)是一个 npm 包，让你可以更加简单的管理 hooks。

#### husky 安装

\> v0.14: `yarn add -D husky@next`

<=0.14: `yarn add -D husky`

#### husky 使用

husky 使用比较简单，支持所有的客户端 hooks。

> husky 默认情况下 husky 要求`package.json`和`.git`在同级目录，但是可以通过配置支持子路径。

\> v0.14:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "prepare-commit-msg": "node prepare-commit-msg.js ${GIT_PARAMS}"
    }
  }
}
```

<=0.14:

```json
{
  "scripts": {
    "pre-commit": "npm test",
    "prepare-commit-msg": "node prepare-commit-msg.js ${GIT_PARAMS}"
  }
}
```

> 环境变量`GIT_PARAMS`，是当前钩子接收到的参数使用空格连接而成的字符串。
>
> node.js 中可通过 progress.env.GIT_PARAMS 取得。

#### husky 原理

> 以> 0.14 版本代码为例,老版本同理

husky 安装的时候会自动在`.git/hooks`,下生成所有的客户端钩子。每一个钩子的代码完全一样，代码：

```shell
#!/bin/sh -e
# husky
# v0.15.0-rc.8 win32

export GIT_PARAMS="$*"
node ./node_modules/husky/lib/runner/bin `basename "$0"`
```

上面的代码是一段 shell 脚本，第 5 行将 shell 脚本接收到的所有参数（`$*`）导出为环境变量`GIT_PARAMS`。

然后通过 node 执行了`./node_modules/husky/lib/runner/bin`脚本文件，代码：

```typescript
import index from "./";

const status = index(process.argv);
process.exit(status);
```

`bin.js`使用当前进程的所有命令行参数构成的数组（process.argv）作为参数，调用了 index.js 的默认导出函数，并将函数返回值作为进程结束码*（当钩子允许中止时，结束码为非 0 时将中止当前 Git 操作，为 0 正常退出）*。

_index.js 代码如下：_

```typescript
import * as cosmiconfig from "cosmiconfig"; // 这一行代码貌似是多余的，后面没用到
import * as execa from "execa"; // 第三方包，node.js的child_process的promise封装
import * as readPkg from "read-pkg"; // 第三方包，读取package.json并返回配置对象
import getConf from "../getConf"; // 第三方包，通过调用第三方包cosmiconfig读取并返回配置对象

export default function (
  [, , hookName = ""]: string[],
  { cwd = process.cwd() } = {}
): number {
  const pkg = readPkg.sync(cwd);

  const config = getConf(cwd);

  const command: string | undefined =
    config && config.hooks && config.hooks[hookName];

  const oldCommand: string | undefined =
    pkg && pkg.scripts && pkg.scripts[hookName.replace("-", "")];

  try {
    if (command) {
      console.log(`husky > ${hookName} (node ${process.version})`);
      execa.shellSync(command, { cwd, stdio: "inherit" });
      return 0;
    }

    if (oldCommand) {
      console.log();
      console.log(
        `Warning: Setting ${hookName} script in package.json > scripts will be deprecated in v1.0`
      );
      console.log(
        `Please move it to husky.hooks in package.json, a .huskyrc file, or a husky.config.js file`
      );
      console.log(
        `Or run ./node_modules/.bin/husky-upgrade for automatic update`
      );
      console.log();
      console.log(`See https://github.com/typicode/husky/tree/dev for usage`);
      console.log();
      console.log(`husky > ${hookName} (node ${process.version})`);
      execa.shellSync(oldCommand, { cwd, stdio: "inherit" });
      return 0;
    }

    return 0;
  } catch (e) {
    const noVerifyMessage =
      hookName === "prepare-commit-msg"
        ? "(cannot be bypassed with --no-verify due to Git specs)"
        : "(add --no-verify to bypass)";

    console.log(`husky > ${hookName} hook failed ${noVerifyMessage}`);
    return 1;
  }
}
```

代码比较清晰，即通过参数解构获取到当前的`hookName`，通过 `getConf`_(调用 cosmiconfig 包)_ 和 `read-pkg`包从 package.json 中获取 hookName 对应的 hooks 命令，然后通过 execa.shellSync 同步执行获取到的 hook 命令，执行成功返回 0，执行错误返回 1（作为上层`bin.js`的错误码来结束进程）。

> 为什么通过这两个不同的包来获取 package.json 文件中的配置？
>
> 从这两个包的区别来看应该是为了在新版本中支持除 package.json 外其他的配置文件中配置 hooks，因为 cosmiconfig 支持除 package.json 文件外其他的配置文件，read-pkg 只支持 package.json。
