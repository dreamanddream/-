<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- 这个exclude中的detail怎么理解 -->
      <keep-alive exclude="detail">
          <router-view/>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log("app中的路由",this.$router.isBack)
        let isBack = this.$router.isBack
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
        next()
    }
}
</script>

<style lang="less">
@import '../static/less/base.less';
@import '../static/less/reset.less';
@import './assets/css/icon.css';
@import './assets/css/transition.css';
#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
