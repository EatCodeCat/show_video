(function($) {
  'use strict';

  $(function() {
   
   $(".bottom-nav li").click(function(){
     $(".bottom-nav li").removeClass('am-active')
      $(this).addClass("am-active");
   });
  });
})(jQuery);
