$('.bottom-nav')
    .find('li[name="' + location.pathname + '"]')
    .addClass('am-active')
$('.search-page').height($(window).height() - 45);


$(function() {
    $('.lazyload').each(function(i, item) {
        setTimeout(function() {
            var src = $(item).attr('data-src')
            if (src) {
                $(item).attr('src', src)
            }
        }, i * 200)
    })
})