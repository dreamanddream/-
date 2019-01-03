<template>
  <div class="page-loading">
    <div class="more" v-if="loadingMore">加载中</div>
    <div class="no-more" v-if="end">没有更多数据了</div>
  </div>
</template>
<script>
export default {
  props:['loadingMore','end']
}
</script>
<style lang="less" scoped>
.page-loading{
  text-align: center;
  font-size: 16px;
}
</style>

