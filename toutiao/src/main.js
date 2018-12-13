// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false

// 注册全局axios
// Vue.prototype.$axios=axios;
// axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/'

// 第三方库
import VueAwesomeSwiper from 'vue-awesome-swiper' //swiper滑动组件
import 'swiper/dist/css/swiper.css'
import MintUI, {MessageBox, Toast, Indicator} from 'mint-ui'
import 'mint-ui/lib/style.css'

// vue滚动
// import infiniteScroll from 'vue-infinite-scroll'
// Vue.use(infiniteScroll)

// 自定义组件
import myLoading from '@/components/loading'
import myBanner from '@/components/banner'
import listItem from '@/components/listItem'
import listInfo from '@/components/info'
import myHeader from '@/components/myHeader'

// 使用第三方组件
Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$megBox = MessageBox
Vue.prototype.$indicator = Indicator

// 注册全局自定义组件
Vue.component('my-loading', myLoading)
Vue.component('my-banner', myBanner)
Vue.component('list-item', listItem)
Vue.component('list-info', listInfo)
Vue.component('my-header', myHeader)

import '@/directives'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
