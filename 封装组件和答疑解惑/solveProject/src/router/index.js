import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import select from '@/components/select'
import message from '@/components/message/message'
import activity from '@/components/activity/activity'
import user from '@/components/user/user'
import index from '@/components/index/index'
import goodsDetail from '@/components/goods/goodsDetail/index'
import feedback from '@/components/feedback/index'
import system from '@/components/system/index'
import address from '@/components/address/index'
import addAddress from '@/components/address/addAddress'
import video from '@/components/video/index'
import forms from '@/components/form/index'
import newnew from '@/components/new/new'

Vue.use(Router)
// 添加动画
Router.prototype.animate = 0
/* slide:页面切换动画
    login:是否需要登陆
*/

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       component: index
//     },
//     {
//       path: '/index',
//       name: 'index',
//       component: index
//     },
//     {
//       path: '/activity',
//       name: 'activity',
//       component: activity,
//       meta: {
//         slide: 1
//       }
//     },
//     {
//       path: '/message',
//       name: 'message',
//       component: message
//     },
//     {
//       path: '/user',
//       name: 'user',
//       component: user
//     },
//     // 商品详情
//     {
//       // 通过$route.params.id获取传递的id
//       path:'/goods/detail/:id',
//       name:'商品详情',
//       meta: { slide: 1 },
//       component:goodsDetail
//     }
//     // {
//     //   path: '/select',
//     //   name: 'select',
//     //   component: select
//     // }
//   ]
// })

// 更新路由的写法
export const constantRouterMap = [
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
    // 如果写成params，那么就不能出现path,path和params同时出现，
    // 那么params会被忽略
    // '/goods/detail/:id'也可以写成`/goods/detail/${id}`
    path:'/goods/detail/:id',
    name:'商品详情',
    meta: { slide: 1 },
    component:goodsDetail
  },
  // 用户反馈
  {
    path: '/feedback',
    name:'用户反馈',
    meta: {
      slide:1,
      login:true
    },
    component:feedback,
    children: [
      {
        path: 'system',
        component:system
      }
    ]
  },
  // 显示地址
  {
    path: '/address',
    name: '地址',
    component: address,
  },
  // 添加地址
 {
   path: '/addAddress',
   name: '添加地址',
   component: addAddress
 },
//  视频显示
{
  path: '/video',
  name: 'video',
  component: video
},
// form表单
{
  path: '/form',
  name: 'form',
  component: forms
},
// 新添加的
{
  path: '/new',
  name: 'new',
  component: newnew
}
];
export const asyncRouteMap = []
export const router = new Router({
  // mode:'history',
  linkActiveClass:'active',
  routes:constantRouterMap
})

