---
layout: post
title: '折腾 MySQL 5.7 免安装版'
date: 2020-02-25 13:41
categories: '环境配置'
permalink: /post/insatll-mysql
nocomments: false
showExcerpt: true
excerpt: "最近有需要使用到 MySQL 数据库，折腾了一番后，终于在 Windows 10 上配置好了64位的 MySQL 5.7 免安装版数据库"
---

最近有需要使用到 MySQL 数据库，折腾了一番后，终于在 Windows 10 上配置好了64位的 MySQL 5.7 免安装版数据库

## 在官网下载 MySQL

- 选择合适的 MySQL Community Server 版本: <a href='https://downloads.mysql.com/archives/community/' target='_blank'>传送门<i class='icon-link1'></i></a>
- mysql-5.7.28-winx64.zip: <a href='https://cdn.mysql.com/archives/mysql-5.7/mysql-5.7.28-winx64.zip' target='_blank'>download <i class='icon-download2'></i></a>
- mysql-5.7.28-win32.zip: <a href='https://cdn.mysql.com/archives/mysql-5.7/mysql-5.7.28-win32.zip' target='_blank'>download <i class='icon-download2'></i></a>

## 解压文件

- 解压文件后我们得到了 5 个文件夹和 2 个普通文件

~~~sh
$ tree -L 1
.
├── LICENSE
├── README
├── bin
├── docs
├── include
├── lib
└── share

5 directories, 2 files
~~~

## 添加配置文件 my.ini

- 此时我们在该目录下创建一个 my.ini 配置文件，文件内容如下。将字段 **basedir** 和 **datadir** 修改成为你自己的 MySQL 安装目录。**注意 此处不用自己创建 data 目录，否则之后可能会出错。**

~~~
[mysqld]
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M

# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin

# These are commonly set, remove the # and set as required.
  basedir = D:\Installations\mysql-5.7.28-winx64
  datadir = D:\Installations\mysql-5.7.28-winx64\data
  character-set-server = utf8
  port = 3306
~~~

## MySQL 初始化

**方法一： 自动生成无密码的root用户** 以**管理员的身份**打开命令提示符，进入 **bin** 目录，键入命令 `mysqld --initialize-insecure` 即可。

**方法二： 自动生成带随机密码的root用户** 同样以**管理员的身份**打开命令提示符，进入 **bin** 目录，键入命令 `mysqld --initialize` 即可。

## 在 Windows 系统中注册服务

- 以**管理员的身份**打开命令提示符，进入 **bin** 目录，键入命令 `mysqld -install mysql` 即可。如果要卸载服务可以使用命令 `mysqld remove mysql`。
- 启动 MySQL 服务：`net start mysql`
- 关闭 MySQL 服务：`net stop mysql`

## 配置环境变量

可以通过配置环境变量的方式实现在任意目录下使用 `mysql` 命令。

- 在桌面上右击 **此电脑 <i class="icofont-arrow-right"></i> 属性 <i class="icofont-arrow-right"></i> 高级系统设置 <i class="icofont-arrow-right"></i> 环境变量 <i class="icofont-arrow-right"></i> 系统环境变量 <i class="icofont-arrow-right"></i> Path <i class="icofont-arrow-right"></i> 新建** 输入 D:\Installations\mysql-5.7.28-winx64\bin\ 保存退出。

## 命令行下使用 MySQL

- 如果使用**方法一**进行初始化，则打开命令行输入 `mysql -u root` 即可进入熟悉的命令行操作界面。
- 如果使用**方法二**进行初始化则需要找到 MySQL 生成的随机密码
  1. 进入生成的 data 目录
  2. 找到文件后缀为 `.err` 的文件，使用记事本打开
  3. 寻找生成的日志信息，其中有一项信息为 `[Note] A temporary password is generated for root@localhost: xxxxxxxx` 复制这个密码，在命令行中输入命令 `mysql -u root -p` 填入密码即可。
- 在这一步骤中如果碰到错误：**ERROR 2003 (HY000): Can't connect to MySQL server on 'localhost' (10061)** 首先确保 mysql 服务正确启动了，其次如果你修改了 **my.ini** 文件中的端口字段，则在命令后应该加上 `-P [port]` 选项指出端口号。

## 修改默认密码

- 在 mysql 中输入下面两条语句即可。

~~~sh
ALTER USER 'root' @'localhost' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;
~~~

