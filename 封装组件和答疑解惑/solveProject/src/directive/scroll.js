import Vue from 'vue'


Vue.directive('scroll', {
  inserted: function (el, binding, vnode, oldVnode) {
    console.log("scroll指令");
      let w = el.offsetHeight,
          isLoading = false,
          cb_name = binding.expression,
          cb = vnode.context[cb_name]
          // binding.value如果是一个函数，那么binding.value就是整个函数
          // console.log("binding.value",binding.value)
          // 而expression就是=后面的内容，也就是字符串中的内容
          // console.log("binding.expression",binding.expression);
          // 打印vnode，vnode有context属性，可以获取到绑定的回调函数
          // 或者就是=后面的表达式
          // console.log("vnode.context[cb_name]",vnode.context[cb_name])
          // console.log("vnode",vnode);
      el.addEventListener('scroll', async () => {
        // console.log("el.offsetHeight",w);
        // console.log("el.scrollTop",el.scrollTop);
        // console.log("el.firstChild.clientHeight",el.firstChild.clientHeight)
        // console.log("如果滚动了，是否大于",w + el.scrollTop + 10 >= el.firstChild.clientHeight)
        if (w + el.scrollTop + 20 >= el.firstChild.clientHeight && !isLoading) {
              console.log("if判断是否执行","isLoading",isLoading)
              isLoading = true
              try {
                // 如果有回调函数，那么就调用
                  cb && await cb()
              }catch(e) {
                  console.error(e)
              }
              isLoading = false
          }
      })
  }
})
