/**
 * Created by wuwg on 2016/11/9 0009.
 */



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
    var   data=JSON.parse(event.data);
        if(data.message=='ajax'){
            $.ajax({
                method:'get',  //type   jQuery 1.9.0 之前的版本
                url:'php/json.php',
                data:'',
                dataType:'json',
                beforeSend: function () {
                    console.log('iframe同源：请求前')
                },
                success: function (data,status,xhr) {
                    console.log('iframe同源：请求成功')
                    console.log(data)
                var  _data=JSON.stringify(data);
                    window.top.postMessage(_data,'*')
                },
                error: function (data,status,xhr) {
                    console.log('iframe同源：请求失败')
                    console.log('error')
                    console.log(data)
                },
                complete: function () {
                    console.log('iframe同源：请求完成')
                }
            });

        }
});