<template>
  <div class="record-wrapper">
    <!-- <HeaderBar title="用户反馈"></HeaderBar> -->
    <headers>
      <div class="title" slot="title">系统设置</div>
    </headers>
    <div class="content">
      <div class="li border-half-top">
        <div>账号设置</div>
        <i class="icon iconfont icon-collection"></i>
      </div>
      <div class="li border-half-top">
        <div>清除缓存</div>
        <i class="icon iconfont icon-collection"></i>
      </div>
      <div class="li border-half-top">
        <div>字体大小</div>
        <i class="icon iconfont icon-collection"></i>
      </div>
      <div class="li border-half-top">
        <div>推送通知</div>
        <mt-switch v-model="value" @change="getValue"></mt-switch>
      </div>
      <div class="li border-half-top">
        <div>非wifi网络播放提醒</div>
        <span>提醒一次</span>
      </div>
      <div class="logout">退出登录</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    getValue() {
      console.log("获取值", this.value);
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  background: #f4f4f4;
  font-size: 16px;
  .logout{
    color:rgb(150, 48, 48);
    padding: 0.5rem 0;
  }
}
</style>
