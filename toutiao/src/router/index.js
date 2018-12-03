import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import myHeader from "@/components/myHeader";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'myHeader',
      component: myHeader
    }
  ]
})
