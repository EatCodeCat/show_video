$(".bottom-nav")
    .find('li[name="' + location.pathname + '"]')
    .addClass('am-active');

$('[t_href]').click(function() {
    location.href = $(this).attr('t_href');
});
(function($) {
    'use strict';


    $(".bottom-nav li").click(function() {
        $(".bottom-nav li").removeClass('am-active')
        $(this).addClass("am-active");
    });

    $('.lazyload').each(function() {
        var src = $(this).attr('data-src');
        if (src) {
            $(this).attr('src', src);
        }
    })
    var page = 2
    new Scrollload({
        container: $('.am-list-news-bd')[0],
        content: $('.am-list')[0],
        loadMore: function(sl) {

            $.ajax({
                type: 'GET',
                url: '/api/content/list/' + (page++),
                dataType: 'json',
                success: function(data) {
                    // contentDom其实就是你的scrollload-content类的dom
                    //$(sl.contentDom).append(data)
                    // 处理完业务逻辑后必须要调用unlock
                    var markup = '';
                    for (var i = 0; i < data.length; i++) {
                        var content = data[i];
                        markup += `<li class="am-g am-list-item-desced"><div t_href="/detail/${content._id }" class="am-list-item-thumb-right am-list-item-thumbed">
        <div class=" am-u-sm-8 am-list-main">
            <h3 class="am-list-item-hd">
                <a href="###" class="">
                    ${content.title}
                </a>
            </h3>
        </div>
        <div class="am-u-sm-4 am-list-thumb">
            <a href="###" class="">
            <img src="${content.thumbnail[0]}" alt="${content.title}" />
        </a>
        </div>
    </div></li>`

                    };
                    $(sl.contentDom).append(markup)
                    sl.unLock()
                },
                error: function(xhr, type) {
                    // 加载出错，需要执行该方法。这样底部DOM会出现出现异常的样式。
                    sl.throwException()
                }
            })
        },
        // 你也可以关闭下拉刷新
        enablePullRefresh: true,
        pullRefresh: function(sl) {
            $.ajax({
                type: 'GET',
                url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=1`,
                dataType: 'json',
                success: function(data) {
                    $(sl.contentDom).html(data)

                    // 处理完业务逻辑后必须要调用refreshComplete
                    sl.refreshComplete()
                }
            })
        }
    })



})($);