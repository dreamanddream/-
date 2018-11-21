import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 引入四个底部分别对应的组件
import Home from '@/components/Home'
import Member from '@/components/Member'
import Shopcart from '@/components/Shopcart'
import Search from '@/components/Search'
// 引入路由
import newsList from '@/components/news/newsList'
Vue.use(Router)

export default new Router({
  routes: [
    // 进入home重定向
    {
      path: '/',
      redirect: '/home'
    },
    // 配置对应的路由
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 配置新闻,newsList路由规则
    {
      path: '/news/newsList',
      name: 'news.list',
      component: newsList
    }
  ]
})
