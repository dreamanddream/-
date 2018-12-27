<template>
  <div id="app" class="app">
    <!-- <img src="./assets/logo.png"> -->

    <router-view/>
  </div>
</template>

<script>
// import {map} from 'vuex'

export default {
  name: 'App',
}
</script>
<style lang="less">
@import './assets/css/common.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
