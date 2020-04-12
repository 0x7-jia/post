---
layout: post
title:  "git 基础操作整理"
date:   2020-02-07 15:21
categories: 工具包
permalink: /post/toolkti-git
showExcerpt: true
excerpt: "梳理一些基本的 Git 本地操作，例如创建或者克隆一个仓库、做更改、暂存并提交这些更改、浏览你的仓库从创建到现在的所有更改的历史。"
---

梳理一些基本的 Git 本地操作，例如创建或者克隆一个仓库、做更改、暂存并提交这些更改、浏览你的仓库从创建到现在的所有更改的历史。

# 添加一些必要的配置信息

- `git config --global user.name '<user_name>'` 添加用户名
- `git config --global user.email '<user_email>'` 添加邮箱

> 以上两条命令中参数 *--global* 可以按照自己的需求替换<br>
*--loacl* : 使配置信息仅在某一个 git 仓库中生效，优先级比 global 高<br>
*--global* : 使配置信息作用在当前用户的所有仓库中<br>
*--system* : 对系统中所有登录的用户均生效


# 初始化 git 仓库，完成本地提交

- `git init` 使 git 管理当前目录
- `git add <files_list>` 将工作区里的文件添加到暂存区
- `git commit -m '<msg>'` 将暂存区里的文件加入到版本库中，需要填写 msg 进行说明

# 撤销提交操作

- `git commit --amend` 补充某些操作，然后合并成一个版本。例如下面这个例子最终只有一个提交。若自上次提交以来还未做任何修改，那么快照会保持不变。

~~~shell
$ git commit -m "first commit"
$ git add new_file
$ git commit --amend
[master 3fe3d53] first commit
 Date: Sat Feb 7 19:46:45 2020 +0800
 2 files changed, 2 insertions(+)
 create mode 100644 new_file
 create mode 100644 readme
~~~

- `git reset HEAD <file>` 将 **file** 从暂存区撤回到工作区，**file** 将会变成已修改未暂存状态
- `git checkout -- <file>` 较为危险的操作，对 **file** 文件做的任何修改都会消失

# 版本回退

- `git reset --hard HEAD^` 回退到上个版本
- `git reset --hard HEAD^^` 回退到上上个版本
- `git reset --hard HEAD~n` 回退到往上 **n** 个版本
- `git reset --hard id` 回退到 **id** 这个版本，可以结合`git reflog`找到历史命令对应的 **id**

# 本地仓库关联远程仓库

- `git remote add <origin_name> <addr>` **origin_name** 填写远程仓库的名字，github 中默认为 **origin**，**addr** 填写远程仓库的地址
- `git push -u <origin_name> <master>` 将本地仓库推送至远程 **origin_name** 仓库的 **master** 分支上，关于<a href="https://www.zhihu.com/question/20019419" target="_blank">`-u`参数</a>详情
- `git remote -v` 显示关联的远程仓库的信息
- `git remote rename <old_origin_name> <new_origin_name>` 重命名远程仓库
- `git remote rm <origin_name>` 移除关联的远程仓库 

# 添加别名操作

- `git config --global alias.st status` 之后在命令行中输入`git st`就相当于输入`git status`
- `git config --global --unset alias.st` 删除这个命令的别名
- 推荐下面的这个别名操作，输入 `git dog` 会更美观的打印日志输出

~~~shell
$ git config --global alias.dog "log --all --decorate --oneline --graph"
~~~

# 其他使用频率较高的命令

- `git clone <url>` 从 **url** 拷贝 git 仓库
- `git status` 查看当前的文件状态
- `git log` 查看日志信息，可以添加参数`--oneline`将输出简化、`-n<nums>`显示前 nums 条日志信息、`--graph`以 ASCII 图形显示分支与合并历史
- `git reflog` 查看命令历史
- `git rm <file>` 移除暂存区中的 **file** 文件，并且从磁盘中删除
- `git rm --cached <file>` 仅移除暂存区中的 **file** 文件，不从磁盘中删除
- `git mv <file_from> <file_to>` 重命名文件
