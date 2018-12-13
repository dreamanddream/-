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
import channel from '@/page/index/children/channel'
import detail from '@/page/detail/detail'
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
      component: index,
    },
    {
      path: '/index',
      component: index,
      children:[
        {
          // 这里的path不用加/，直接会显示index/channel,如果加上/，就是直接根路径下的了
          path:'channel',
          name:'channel',
          component: channel
        }
      ]
    },
    {
      name: 'search',
      path: '/search',
      component: search
    },
    {
      name: 'detail',
      path: '/detail',
      component: detail
    }
  ]
})
