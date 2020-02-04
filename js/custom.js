// $(document).ready(function () {    // 页内跳转平滑
//     var $root = $('html, body');  //选择器缓存起来。这样每次点击时就不需要再重新查找了
//     $("[href^='#']").click(function () {
//       if ($(this).attr('href') == '#0')
//         return false;
//       var href = $(this).attr("href");
//       $root.animate({
//         scrollTop: $(href).offset().top
//       }, 400, function () {
//         // window.location.hash = href;
//       });
//       return false;
//     });
//   });
