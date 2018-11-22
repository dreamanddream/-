import Vue from './vue.js';
// 这里的app没有加{App}说明是默认导出的方式；
import App from './app.js';

new Vue({
    el:"#app",
    components:{
      app:App
    },
    template:'<app/>'
})