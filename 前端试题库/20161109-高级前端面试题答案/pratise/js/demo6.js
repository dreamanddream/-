/**
 * Created by wuwg on 2016/11/9 0009.
 */
require(['jqueryCookie'], function () {


    //  cookie 记录
    var  _count=Number($.cookie('count'));
    var  _ele=$('#jsCount');
    if(_count){
        _count+=1;
        $.cookie('count',_count);
        _ele.text(_count)

    }else {
        _count=1;
        $.cookie('count',_count);
        _ele.text(_count)
    }



    //  localStorage 记录
    var  _count2=Number(localStorage.getItem('count'));
    var  _ele2=$('#jsCount2');
    if(_count2){
        _count2+=1;
        localStorage.setItem('count',_count2)
        _ele2.text(_count2)

    }else {
        _count2=1;
        localStorage.setItem('count',_count2)
        _ele2.text(_count2)
    }
});