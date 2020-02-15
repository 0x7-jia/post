---
layout: post
title:  "bundle install 命令执行后无响应"
date:   2020-02-04 14:13
categories: 疑难杂症
permalink: /post/bundle-install
---

从网上下载jekyll主题后，执行`bundle install`安装依赖的时候，有时候等待很久命令行都没有反应，可以尝试换成国内的源。

## 解决方法
可以在命令行中执行下面的命令替换成国内的源：

~~~sh
$ bundle config mirror.https://rubygems.org https://gems.ruby-china.com
~~~

更多详细信息请前往 <a href="https://gems.ruby-china.com/" target="_blank">ruby-china <i class="icon-link1"></i></a>