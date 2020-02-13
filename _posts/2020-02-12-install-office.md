---
layout: post
title:  "Microsoft Office 2016 自定义安装"
date:   2020-02-12 23:13
categories: 转载
permalink: /post/install-office
nocomments: true
---

作为宇宙第一 IDE Visual Studio 的兄弟，宇宙第一办公套件 Office 在 Windows 系统下更加常见。新安装的系统，即使刚开始不愿安装，等到要查看编辑 docx pptx 文档时，还是会乖乖就擒。只是没想到，Office 2016 这个 2.41GB 的安装镜像，居然是一个 Click-to-Run。

> FILE cn_office_professional_plus_2016_x86_x64_dvd_6969182.iso<br>
SHA1 277926A41B472EE38CA0B36ED8F2696356DCC98F<br>
SIZE 2.41GB

点一下，就全自动帮你把 Office 全家桶完整安装上了，不需要你做任何的下一步设置，也不给你做任何的安装设置。

![](https://myhusky.oss-cn-beijing.aliyuncs.com/Echo/images/install-office/20180324002-8578c6ed.jpg)

对于日常只使用 Word、Excel、Powerpoint，最多再加一个 Outlook 的人来讲，全家桶的 Access、Onedrive for Business、Publisher、Skype 等必然是多余的，装上了基本不会用到。如果你想干掉这些没用处的部分应用，又或者像我一样，此前已经知道过 Click-to-Run 的厉害，但新装系统后手抖直接点下了镜像的 setup.exe 的话，那就来与我一起“卸了又装”。

# 卸载已安装的 Office

在<a href="https://support.office.com/en-us/article/9dd49b83-264a-477a-8fcc-2fdf5dbf61d8" target="_blank">Office 官方文档库</a>里，选择第 2 种方法：

>Option 2 - Completely uninstall Office 2016 with the easy fix tool

下载 easy fix tool: `o15-ctrremove.diagcab`，双击执行一路到底后重启计算机。

![](https://myhusky.oss-cn-beijing.aliyuncs.com/Echo/images/install-office/20180324003-3c9cdc49.jpg)

# 重新自定义安装 Office

**第一步：** 解压安装镜像。因为待会要替换文件，直接挂载 iso 的话无法进行替换。

![](https://myhusky.oss-cn-beijing.aliyuncs.com/Echo/images/install-office/20180324004-d0e49d82.jpg)
<center>安装镜像解压后</center>

**第二步：** 下载 <a href="https://www.microsoft.com/en-us/download/details.aspx?id=49117" target="_blank">Office 2016 Deployment Tool</a>。执行后会解压出两个文件，一个是configuration.xml，另一个是 setup.exe。将两个文件覆盖到刚刚解压的镜像文件夹内（也可以改名备份原来的 setup.exe）。

![](https://myhusky.oss-cn-beijing.aliyuncs.com/Echo/images/install-office/20180324005-10a02c45.jpg)

**第三步：** 修改 Deployment Tool 配置。编辑 configuration.xml 文件，设定安装版本，更新频道，排除不想安装的应用。以下是我的配置文件，安装 64 位专业中文版（对应 cn_office_professional_plus），仅保留了 Word、 Excel、Powerpoint 以及 Outlook，其它全部排除。如果想把 Outlook 也排除的话，可以在此配置基础上再加上 <ExcludeApp ID="Outlook" /> 即可。具体配置说明可以看配置文件里面的注释。

~~~xml
<!-- Office 365 client configuration file sample. To be used for Office 365 ProPlus 2016 apps,
Office 365 Business 2016 apps, Project Pro for Office 365 and Visio Pro for Office 365.
For detailed information regarding configuration options visit: http://aka.ms/ODT.
To use the configuration file be sure to remove the comments
For Office 365 client apps (verion 2013) you will need to use the 2013 version of the
Office Deployment Tool which can be downloaded from http://aka.ms/ODT2013
The following sample allows you to download and install Office 365 ProPlus 2016 apps
and Visio Pro for Office 365 directly from the Office CDN using the Current Channel
settings -->
<Configuration>
<Add OfficeClientEdition="64" Channel="Current">
<Product ID="ProPlusRetail">
<Language ID="zh-cn" />
<ExcludeApp ID="Access" />
<ExcludeApp ID="Groove" />
<ExcludeApp ID="InfoPath" />
<ExcludeApp ID="Lync" />
<ExcludeApp ID="OneDrive" />
<ExcludeApp ID="OneNote" />
<ExcludeApp ID="Publisher" />
<ExcludeApp ID="Project" />
<ExcludeApp ID="SharePointDesigner" />
<ExcludeApp ID="Visio" />
</Product>
</Add>
<!-- <Updates Enabled="TRUE" Channel="Current" /> -->
<!-- <Display Level="None" AcceptEULA="TRUE" /> -->
<!-- <Property Name="AUTOACTIVATE" Value="1" /> -->
</Configuration>
~~~

**第四步：** 载入配置文件进行自定义安装。在镜像解压目录下，按住 Shift + 鼠标右键，在当前目录打开命令行。键入 `./setup.exe /configure configuration.xml` 并执行。

![](https://myhusky.oss-cn-beijing.aliyuncs.com/Echo/images/install-office/20180324006-7531e895.png)

UAC 弹窗确认后开始自动安装。不过这次可以很明显的看到不再是全家桶都给你安装上了。

![](https://myhusky.oss-cn-beijing.aliyuncs.com/Echo/images/install-office/20180324007-e620367a.png)

<ul class="post-copyright">
  <li class="post-copyright-author">
    <strong>原文作者： </strong><a href="https://www.h404bi.com/about" target="_blank">Chawye Hsu</a></li>
  <li class="post-copyright-author">
    <strong>图片来源： </strong><a href="https://www.h404bi.com/about" target="_blank">Chawye Hsu</a></li>
  <li class="post-copyright-link">
    <strong>原文链接：</strong>
    <a href="https://www.h404bi.com/blog/2018/03/office-2016-custom-installation-guide" title="{{ page.title }}" target="_blank">https://www.h404bi.com/blog/2018/03/office-2016-custom-installation-guide</a></li>
</ul>
