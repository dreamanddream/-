/**
 * Created by wuwg on 2016/11/9 0009.
 */

+function ($,window) {
    $.fn.alter= function () {
      return  this.each(function () {
            $(this).on('click', function () {
                alert($(this).text())
            });
      });
    };
}(jQuery,window);


$('button').alter();
$('a').alter();
$('p').alter();