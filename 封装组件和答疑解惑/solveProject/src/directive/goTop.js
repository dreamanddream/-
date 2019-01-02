import Vue from 'vue'

Vue.directive('scroll-show',{
  inserted: function (el, binding) {
    let scope = binding.arg || 200
   /*  window.addEventListener("scroll",function(e){
      // console.log("scrollTop",this.scrollTop)
      if(this.scrollY>Number(binding.arg)){
        // binding.value.value=true;
      }else{
        // binding.value.value=false
      }
    }) */
  }
})
Vue.directive('back-top', {
  inserted: function (el, binding) {
    let e= binding.arg || 'click'
    el.addEventListener(e, function(){
      console.log("我是指令点击返回顶部",document.body.scrollTop)
      document.documentElement.scrollTop = document.body.scrollTop=0;
    })
  }
})
