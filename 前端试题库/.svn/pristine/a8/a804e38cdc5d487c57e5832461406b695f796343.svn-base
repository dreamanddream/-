/**
 * Created by wuwg on 2016/11/9 0009.
 */
require(['jquery'], function () {
    function addEvent(ele,type,callback){
        if(window.addEventListener){
            ele.addEventListener(type, function (event) {
                callback(event)
            },false);
        }else if (window.attachEvent) {
            ele.attachEvent('on'+type, function (event) {
                callback(event)
            });
        }else {
            ele['on'+type]= function (event) {
                callback(event)
            }
        }
    }

    addEvent(window,'message', function (event) {
        var   _data=JSON.parse(event.data);
            console.log('通过iframe跨域，然后采用同源策略，请求数据成功')
            console.log(_data)
    });


    $('#iframe')[0].contentWindow.postMessage('{"message":"ajax"}','*')
});