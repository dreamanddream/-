/**
 * Created by wuwg on 2016/11/8 0008.
 */

//   jsonp  进行跨域
require(['jquery'], function () {
    //  不要忘记前面的 http
    var   url='http://172.16.176.96/rap/pratise/php/jsonp.php';
    $.ajax({
        method:'get',  //type   jQuery 1.9.0 之前的版本
        url:url,
        data:'',
        /*jsonp 方式*/
        dataType:'jsonp',
        jsonp:'callback',
        jsonpCallback:'jsonpCallback',


        beforeSend: function () {
            console.log('请求前')
        },
        success: function (data,status,xhr) {
            console.log('请求成功')
            console.log(data)
        },
        error: function (data,status,xhr) {
            console.log('请求失败')
            console.log('error')
        },
        complete: function () {
            console.log('请求完成')
        }
    });
});

//   iframe  进行跨域


