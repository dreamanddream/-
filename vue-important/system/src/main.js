// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入axios
import Axios from 'axios'
// 引入mint-ui
import MintUI from 'mint-ui'
// 引入对应的css
import 'mint-ui/lib/style.css'
// 引入ul和li组件
import MyUl from '@/components/common/MyUl'
import MyLi from '@/components/common/MyLi'
// 引入公共返回navbar
import NavBar from '@/components/common/NavBar'
// 引入公共comment
import comment from '@/components/common/comment'
// 引入公共my-swiper
import MySwiper from '@/components/common/mySwiper'
// 引入preview
import VuePreview from 'vue-preview'

// 配置公共url
Axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/118048'
// 配置请求拦截器---显示loading图标，就是还没加载出来内容时显示加载中
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '玩命加载中'
  })
  return config
})
// 配置响应拦截器--关闭loading图标
Axios.interceptors.response.use(function (response) {
  MintUI.Indicator.close()
  return response
})
// vue原型上注册全局axios
Vue.prototype.$axios = Axios
// 注册全局mint-ui组件
Vue.use(MintUI)
// 注册全局preview组件
Vue.use(VuePreview)
// 注册全局组件
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)
Vue.component(comment.name, comment)
Vue.component(MySwiper.name, MySwiper)
// 处理文本过多过滤器
Vue.filter('convertStr', function (str, count) {
  return str.substring(0, count) + '...'
})
// 这个?
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
