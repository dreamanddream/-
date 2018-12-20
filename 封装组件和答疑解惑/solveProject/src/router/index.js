import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
<<<<<<< HEAD
import select from '@/components/select'
=======
// import select from '@/components/select'
import message from '@/components/message/message'
import activity from '@/components/activity/activity'
import user from '@/components/user/user'
import index from '@/components/index/index'
>>>>>>> 5011f7b4a6223600e252bc7c441caa4a82dc1b70

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
<<<<<<< HEAD
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/select',
      name: 'select',
      component: select
=======
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
>>>>>>> 5011f7b4a6223600e252bc7c441caa4a82dc1b70
    }
    // {
    //   path: '/select',
    //   name: 'select',
    //   component: select
    // }
  ]
})
