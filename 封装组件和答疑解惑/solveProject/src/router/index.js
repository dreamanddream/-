import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import select from '@/components/select'
import message from '@/components/message/message'
import activity from '@/components/activity/activity'
import user from '@/components/user/user'
import index from '@/components/index/index'
import goodsDetail from '@/components/goods/goodsDetail/index'

Vue.use(Router)
// 添加动画
Router.prototype.animate = 0
/* slide:页面切换动画
    login:是否需要登陆
*/

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity,
      meta: {
        slide: 1
      }
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    // 商品详情
    {
      // 通过$route.params.id获取传递的id
      path:'/goods/detail/:id',
      name:'商品详情',
      meta: { slide: 1 },
      component:goodsDetail
    }
    // {
    //   path: '/select',
    //   name: 'select',
    //   component: select
    // }
  ]
})
