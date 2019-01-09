import store from '../store'
import Vue from 'vue'
import { router } from './index'

router.beforeEach((to, from, next) => {
  // 判断前往的页面是否需要登录
  if (to.meta.login) {
    // 是否已经登录
    if (store.state.user.user.name) {
      next();
    } else {
      // Toast({
      //   'message':'请先登录'
      // })
      // Vue.prototype.$alert('请先登录!')
      //   .then(() => {
      //     store.state.user.isLogin = true
      //   })
      console.log("请先登录");
      // .then是什么时候用？？？
    }
  }else{
    // if(to.meta.page){
    //   store.state.app.pageLoading = true;
    // }
    next();
  }
})
// 这个路由离开还有必要写吗
router.afterEach((to, from) => {
  // if (to.meta.page) store.state.app.pageLoading = false
  document.title = to.name
})

export default router
