import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import myHeader from "@/components/myHeader";
import App from '../App'

Vue.use(Router)
// 路由懒加载
// const index = () => import('@/page/index/index')
import index from '@/page/index/index'
import search from '@/page/search/search'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: App,
      children: [
        {
          name: 'index',
          path: '/index',
          component: index
        }
      ]
    },
    // {
    //   name: 'index',
    //   path: '/index',
    //   component: index
    // },
    // // search页面
    // {
    //   name: 'search',
    //   path: '/search',
    //   component: search
    // }
  ]
})
