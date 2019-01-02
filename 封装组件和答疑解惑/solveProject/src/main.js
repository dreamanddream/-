// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 封装后的axios
// import axios from '@/assets/util/axios'
import http from 'axios'

// css类
// import '@/assets/css/common.less'
// 工具类
// 引入字体图css
import '@/assets/css/iconfont/iconfont.css'

// 接口
// import http from './assets/util/axios';
import config from './assets/util/url'
// 一般而言都是添加到原型上，这个又是什么用法
global.config=config
http.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/118048'
Vue.prototype.$http = http;

// 第三方库
import MintUI, { MessageBox, Toast, Indicator } from 'mint-ui'     // 饿了么移动端UI组件
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 这里的.css不能省略，否则会报找不到
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 注册全局组件
import customComponents from './custom-components.js'
Vue.use(customComponents)

// 指令
import '@/directive'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
