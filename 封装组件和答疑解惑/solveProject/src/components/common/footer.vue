<template>
  <footer class="flex flex-align-center">
    <div class="footer-item">
      <router-link to="/index">
        <i class="icon iconfont" :class="(urlRouter == '/index'||urlRouter == '/')?'icon-homepage_fill':'icon-homepage'"></i>
        <p class="footer-title">首页</p>
      </router-link>
    </div>
    <div class="footer-item">
      <router-link to="/activity">
        <i class="icon iconfont" :class="urlRouter == '/activity'?'icon-collection_fill':'icon-collection'"></i>
        <p class="footer-title">活动</p>
      </router-link>
    </div>
    <div class="footer-item">
      <router-link to="/message">
        <i class="icon iconfont" :class="urlRouter == '/message'?'icon-message_fill':'icon-message'"></i>
        <p class="footer-title">消息</p>
      </router-link>
    </div>
    <div class="footer-item">
      <router-link to="/user">
        <i class="icon iconfont " :class="urlRouter == '/user'?'icon-people_fill':'icon-people'"></i>
        <p class="footer-title">我的</p>
      </router-link>
    </div>
  </footer>
</template>
<script>
export default {
  // 这里要注意组件名不能和html标签名重复,所以要加个s
  name: "footers",
  props:['urlRouter'],
  mounted() {
    console.log('urlRouter',this.urlRouter);
  },
};
</script>
<style lang="less" scoped>
@height: 60px;
@foot_size: 16px;
@zIndex: 100;
.iconfont {
  font-size: 32px;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: @height;
  z-index: @zIndex;
  font-size: @foot_size;
  .footer-item {
    width: 25%;
    text-align: center;
    position: relative;
  }
  // .cart-num{

  // }
}
</style>

