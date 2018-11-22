<template>
  <!-- 底部菜菜单栏 -->
  <!-- 动态绑定selected -->
  <!-- 这里的div需要写上id为app吗？ -->
  <div>
    <!-- 显示不同底部导航对应的内容 -->
    <router-view></router-view>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home" >
        <img slot="icon" @click="changeHash" src="./assets/icon/index-gray.png"> 首页
      </mt-tab-item>
      <mt-tab-item id="member" >
        <img slot="icon" @click="changeHash" src="./assets/icon/person-gray.png"> 会员
      </mt-tab-item>
      <mt-tab-item id="shopcart" >
        <img slot="icon" @click="changeHash" src="./assets/icon/write-gray.png"> 购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" @click="changeHash" src="./assets/icon/address-gray.png"> 搜索
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      selected: ''
    }
  },
  // watch只能监听发生改变的内容，如果从首页点击新闻列表，再从新闻列表点击首页就不会执行路由跳转，因为前后两次点击值都一样
  // 所以要想实现路由跳转，就可以使用点击方法
  methods: {
    // 由于该调用早于子组件赋值给父组件的selected，也就是渲染任务还未完成，所以使用$nextTick();
    changeHash () {
      // 在vue完成渲染任务以后的行为
      // 这里也要注意点击事件要加在图片上，不然不能生效
      this.$nextTick(function () {
        this.$router.push({
          name: this.selected
        })
      })
    }
  }
  // watch: {
  //   selected: function (newValue, oldValue) {
  //     // 每点击底部菜单栏中任意一项，newValue的值显示就是对应绑定的index或member或shopcart或search
  //     // 动态添加router-view，进行路由匹配
  //     // 想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
  //     // 当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。
  //     // 声明式：<router-link :to="...">
  //     // 编程式：router.push(...)
  //     console.log(newValue)
  //     this.$router.push({
  //       name: newValue
  //     })
  //   }
  // }
}
</script>

<style>
/*初始化*/
* {
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  color:#333;
}
ul li{
  list-style: none;
}
/* 公共头部设置 */
.mint-swipe-items-wrap {
  height: 140px;
}
.mint-swipe-items-wrap .mint-swipe-item img {
  width: 100%;
}
/* 四个模块头部 */
.content{
  margin-top: 40px;
  padding-bottom:55px;
}
/* 九宫格 */
.grid{
  margin-top: 10px;
}
.grid ul li{
  float:left;
  width:33.3%;
  text-align:center;
  margin-bottom:10px;
}
</style>
