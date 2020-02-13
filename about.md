---
layout: default
title: About
permalink: /about/
---

# 统计信息

- 文章数目 <span class="color_ff0b5">{{ site.posts.size }}</span> 篇
- 运行天数 <span id="htmer_time" class="color_ff0b5">0</span> 天
- 最后活动 <span id="activity_time" data-year="{{ site.posts[0].date| slice: 0,4 }}" data-month="{{ site.posts[0].date| slice: 5,2 }}" data-day="{{ site.posts[0].date| slice: 8,2 }}" class="color_ff0b5">0</span> 天前
- 总访问量 <span id="busuanzi_value_site_pv" class="color_ff0b5">0</span> 次

# 关于我

- 我目前就读于西安邮电大学，本博客用于记录自己在学习过程中遇到的问题以及相应的解决办法。
- 欢迎添加我的联系方式，您可以在 <a href="https://www.weibo.com/u/6087295124" target="_blank">新浪微博<i class="icon-link1"></i></a>、<a href="https://github.com/myhusky" target="_blank">Github<i class="icon-link1"></i></a> 找到我，您还可以发送 [电子邮件](mailto:MyHasky@hotmail.com) 与我取得联系。
- 喜欢搓炉石，如果有喜欢炉石的小伙伴，也欢迎添加 `我想养条哈士奇#5537` 为好友。

# 特别感谢

- 这个站点使用了<a href="http://laobubu.net" target="_blank"> laobubu<i class="icon-link1"></i> </a>创作的主题<a href="https://github.com/laobubu/jekyll-theme-EasyBook" target="_blank"> EasyBook<i class="icon-link1"></i> </a>非常感谢他的付出。

# 版权说明

- 除非在文章尾部单独说明，否则默认采用 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">署名 4.0 国际 (CC BY 4.0) </a>进行许可。
 
- 2020年2月4日 于2020年2月13日最后更新

<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<script type="text/javascript">
    window.onload=function(){
        // setTime()
        setATime(2020, 2-1, 1, "htmer_time")

        var activity_date_item = document.getElementById("activity_time")
        var year = activity_date_item.getAttribute("data-year")
        var month = activity_date_item.getAttribute("data-month")
        var day = activity_date_item.getAttribute("data-day")
        
        setATime(year, month-1, day, "activity_time")
    }
</script>