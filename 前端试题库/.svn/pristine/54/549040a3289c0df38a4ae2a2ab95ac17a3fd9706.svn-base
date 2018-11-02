/**
 * Created by wuwg on 2016/11/9 0009.
 */



require.config({
    baseUrl:'js/',
    paths:{
        jquery:'lib/jquery/jQuery.v1.11.1.min',
        jqueryCookie:'lib/jquery/jquery.cookie'
    },
    shim:{
        jqueryCookie:{
            deps:['jquery']
          //  expots:['jquery'],

        }
    }
});




//  jsonp  请求方式
require(['jquery'],function(){

    if($('#demo6').size()>0){
        require(['js/demo6.js'],function(){});

    }else {
        // demo3
        //  jsonp  请求方式
        require(['js/demo3.js'],function(){});

        //  iframe 同源  请求方式
        //require(['js/demo3-iframe.js'],function(){});
    }
});


