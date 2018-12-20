import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import select from '@/components/select'
import message from '@/components/message/message'
import activity from '@/components/activity/activity'
import user from '@/components/user/user'
import index from '@/components/index/index'

Vue.use(Router)

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
      component: activity
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
    }
    // {
    //   path: '/select',
    //   name: 'select',
    //   component: select
    // }
  ]
})
