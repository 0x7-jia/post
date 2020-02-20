---
layout: default
title: About
permalink: /about/
---

{% assign count = 0 %}
{% for post in site.posts %}
    {% assign single_count = post.content | strip_html | strip_newlines | remove: " " | size %}
    {% assign count = count | plus: single_count %}
{% endfor %}

## 统计信息

- 文章数目 <span class="color_ff0b5">{{ site.posts.size }}</span> 篇
- 运行天数 <span id="htmer_time" class="color_ff0b5">0</span> 天
- 最后活动 <span id="activity_time" data-year="{{ site.posts[0].date| slice: 0,4 }}" data-month="{{ site.posts[0].date| slice: 5,2 }}" data-day="{{ site.posts[0].date| slice: 8,2 }}" class="color_ff0b5">0</span> 天前
- 总访问量 <span id="busuanzi_value_site_pv" class="color_ff0b5">0</span> 次
- 字数统计 {% if count > 10000 %}{{ count | divided_by: 10000 }} 万 {{ count | modulo: 10000 }}{% else %}<span class="color_ff0b5" id="words">0</span> 字{% endif %} 

## 关于我

- 本博客用于记录自己在学习过程中遇到的问题以及相应的解决办法。
- 您可以在 <a href="https://www.weibo.com/u/6087295124" target="_blank">新浪微博<i class="icon-link1"></i></a>、<a href="https://github.com/myhusky" target="_blank">Github<i class="icon-link1"></i></a> 找到我，您还可以发送 [电子邮件<i class="icon-link1"></i>](mailto:MyHasky@hotmail.com) 与我取得联系。
- 喜欢搓炉石，如果有喜欢炉石的小伙伴，也欢迎添加 `我想养条哈士奇#5537` 为好友。

## 特别感谢

- 这个站点使用了<a href="http://laobubu.net" target="_blank"> laobubu<i class="icon-link1"></i> </a>创作的主题<a href="https://github.com/laobubu/jekyll-theme-EasyBook" target="_blank"> EasyBook<i class="icon-link1"></i> </a>非常感谢他的付出。

## 版权说明

- 除非在文章尾部单独说明，否则默认采用 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">署名 4.0 国际 (CC BY 4.0) </a>进行许可。
 
- 2020年2月4日 于2020年2月18日最后更新

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
        //数字自增到某一值动画参数（目标元素,自定义配置）
    function NumAutoPlusAnimation(targetEle, options) {

        /*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
        //不传配置就把它绑定在相应html元素的data-xxxx属性上吧
        options = options || {};

        var $this = document.getElementById(targetEle),
            time = options.time || $this.data('time'), //总时间--毫秒为单位
            finalNum = options.num || $this.data('value'), //要显示的真实数值
            regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度

            step = finalNum / (time / regulator),/*每30ms增加的数值--*/
            count = 0, //计数器
            initial = 0;

        var timer = setInterval(function() {

            count = count + step;

            if(count >= finalNum) {
                clearInterval(timer);
                count = finalNum;
            }
            //t未发生改变的话就直接返回
            //避免调用text函数，提高DOM性能
            var t = Math.floor(count);
            if(t == initial) return;

            initial = t;

            $this.innerHTML = initial;
        }, 30);
    }
    var count = {{ count }} - {{ count }}*0.12
    NumAutoPlusAnimation("words", {
        time: 1800,
        num: count,
        regulator: 50
    })
</script>