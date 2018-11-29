import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 引入四个底部分别对应的组件
import Home from '@/components/Home'
import Member from '@/components/Member'
import Shopcart from '@/components/Shopcart'
import Search from '@/components/Search'
// 引入路由新闻列表
import newsList from '@/components/news/newsList'
// 新闻详情
import newsDetail from '@/components/news/newDetail'
// 引入图文
import photoList from '@/components/photo/photoList'
// 图文详情
import photoDetail from '@/components/photo/photoDetail'
// 商品列表
import goodsList from '@/components/goods/goodsList'
// 商品详情
import goodDetail from '@/components/goods/goodsDetail'
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
    // 配置新闻,newsList路由规则--在路由中使用的是query传递参数
    {
      path: '/news/newsList',
      name: 'news.list',
      component: newsList
    },
    // 新闻详情 news.detail
    {
      path: '/news/detail',
      name: 'news.detail',
      component: newsDetail
    },
    // 图文列表---路径配置方式和新闻不同，使用params传递参数
    {
      path: '/photo/photoList/:categoryId',
      name: 'photo.list',
      component: photoList
    },
    // 使用query传递的餐数
    {
      path: '/photo/photoDetail',
      name: 'photo.detail',
      component: photoDetail
    },
    // 商品列表
    {
      path: '/goods/goodList',
      name: 'goods.list',
      component: goodsList
    },
    // 商品详情
    {
      path: '/goods/detail',
      name: 'goods.detail',
      component: goodDetail
    }
  ]
})
