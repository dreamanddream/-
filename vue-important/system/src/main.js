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
// 引入preview
import VuePreview from 'vue-preview'

// 配置公共url
Axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/118048'
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

// 这个?
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
