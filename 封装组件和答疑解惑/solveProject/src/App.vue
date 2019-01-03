<template>
  <div id="app" class="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition :name='animate'>
      <keep-alive>
        <!-- 会给加载的路由加上id为view -->
        <router-view id="view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
// import {map} from 'vuex'

export default {
  name: "App",
  data() {
    return {
      animate: ""
    };
  },
  watch: {
    $route(to, from) {
      /*
      0:不做动画
      1：左切换
      2：右切换
      3：上切换
      4：下切换
       */
      let animate = this.$router.animate || to.meta.slide;
      console.log("animate", animate);
      if (!animate) {
        this.animate = "";
      } else {
        this.animate =
          animate === 1
            ? "slide-left"
            : animate === 2
              ? "slide-right"
              : animate === 3
                ? "slide-top"
                : animate === 4 ? "slide-bottom" : "";
      }
      this.$router.animate = 0;
    }
  }
};
</script>
<style lang="less">
@import "./assets/css/common.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}
.slide-top-enter,
.slide-bottom-leave-active {
  opacity: 0;
  transform: translate(0, 100%);
}

.slide-top-leave-active,
.slide-bottom-enter {
  opacity: 0;
  transform: translate(0, -100%);
}
</style>
