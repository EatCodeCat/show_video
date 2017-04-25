
$(".bottom-nav").find('li[name="'+ location.pathname+'"]').addClass('am-active');
(function($) {
  'use strict';

  $(function() {
  
   
   $(".bottom-nav li").click(function(){
     $(".bottom-nav li").removeClass('am-active')
      $(this).addClass("am-active");
   });
  });
})(jQuery);
