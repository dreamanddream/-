import Vue from 'vue'
// 引入同一路径下的swiper.js
import swiper from './swiper'
// 引入返回顶部
import goTop from './goTop'
// 自定义vue指令
// 滑动返回上一页
Vue.directive('swiper',{
  inserted: function (el,binding,vnode) {
    // console.log("自定义指令",el,binding.value,vnode.context)
    // binging.arg就是自定义指令传递的参数，也就是swiperRight，binding.value
    if(binding.value){
      swiper(el, binding.arg,binding.value,vnode.context)
    } else {
        return ''
    }
  }
})
// 点击头部返回页面顶部
Vue.directive('goTop', {
  inserted: function(el, binding, vnode) {
    if (binding.value) {
      goTop(el, binding.arg, vnode.context)
  } else {
      return ''
  }
  }
})
