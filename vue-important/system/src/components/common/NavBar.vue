<template>
  <div class="cms-nav">
    <h1 @click="goback">&lt;</h1>
    <h1 class="page-title">{{title}}</h1>
  </div>
</template>
<script>
export default {
  // 这里的name用于注册组件时使用
  name:'nav-bar',
  props: ['title'],
  methods: {
    goback () {
      // 返回上一级
      this.$router.go(-1);
    }
  }
}
</script>
<style>
.cms-nav{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:40px;
  background: #26a2ff
}
</style>

