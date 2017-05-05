$(".bottom-nav")
    .find('li[name="' + location.pathname + '"]')
    .addClass('am-active');

$('[t_href]').click(function () {
    location.href = $(this).attr('t_href');
});
(function ($) {
    'use strict';
    

    $(".bottom-nav li").click(function () {
        $(".bottom-nav li").removeClass('am-active')
        $(this).addClass("am-active");
    });

     $('.lazyload').each(function(){
        var src = $(this).attr('data-src');
        if(src){
            $(this).attr('src', src);
        }
    })
    
})($);