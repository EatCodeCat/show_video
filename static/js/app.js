function enterSearch(e) {
    if (e.keyCode == 13 && e.target.value != '') {
        var historyKeys = {};
        if (localStorage['historyKeys']) {
            historyKeys = JSON.parse(localStorage['historyKeys']);
            historyKeys[key] = (new Date()).getTime();
            localStorage['historyKeys'] = JSON.stringify(this.historyKeys);
        } else {
            historyKeys[key] = (new Date()).getTime();
            localStorage['historyKeys'] = JSON.stringify(this.historyKeys);
        }
    }
}
(function($) {
    'use strict'

    $('.bottom-nav li').click(function() {
        $('.bottom-nav li').removeClass('am-active')
        $(this).addClass('am-active')
    })

    $('.sv-search-box input').focus(function() {
        $('.search-page').show();
        $('.search-page').addClass('am-animation-fad');
        $("header .am-icon-chevron-left").show();
        $('.sv-search-box').removeClass('w100');
        $("html, body").height($(window).height());
        $("html, body").css("overflow", "hidden");

        $.get()


    });
    $("header .am-icon-chevron-left").click(function() {
        $('.search-page').hide().removeClass('w100');
        $('.search-page').addClass('am-animation-fad');
        $("header .am-icon-chevron-left").hide();
        $('.sv-search-box').addClass('w100');
        $("html, body").css("overflow", "auto");
        $("html, body").height('auto');
    });


    var page = 2

    function fillData(data) {
        var markup = ''
        for (var i = 0; i < data.length; i++) {
            var content = data[i]
            markup += '<li class="am-g am-list-item-desced"><div  class="am-list-item-thumb-right am-list-item-thumbed"><div class=" am-u-sm-8 am-list-main">   ' +
                '<h3 class="am-list-item-hd"><a href="/detail/' + content._id + '" class="">' + content.title + '</a></h3></div>' +
                '<div class="am-u-sm-4 am-list-thumb"><a href="/detail/' + content._id + '" class="">    <img src="' + content.thumbnail[0] + '" alt="' + content.title + '" /></a></div></div></li>'
        }
        return markup
    }

    var isloading = false
    new Scrollload({
        container: $('.am-list-news-bd')[0],
        content: $('.am-list')[0],
        loadMore: function(sl) {
            if (!isloading) {
                isloading = true
                $.ajax({
                    type: 'GET',
                    url: '/api/content/list/' + (page++),
                    dataType: 'json',
                    success: function(data) {
                        $(sl.contentDom).append(fillData(data))
                            // sl.unLock()
                        isloading = false
                    },
                    error: function(xhr, type) {
                        isloading = false
                    }
                })
            }
        },
        // 你也可以关闭下拉刷新
        enablePullRefresh: true,
        pullRefresh: function(sl) {
            $.ajax({
                type: 'GET',
                url: '/api/content/list/0',
                dataType: 'json',
                success: function(data) {
                    $(sl.contentDom).html(fillData(data))
                        // 处理完业务逻辑后必须要调用refreshComplete
                    sl.refreshComplete()
                },
                error: function() {
                    sl.refreshComplete()
                }
            })
        }
    })
    $('#searchbox').bind('input propertychange', function() {});

})($)