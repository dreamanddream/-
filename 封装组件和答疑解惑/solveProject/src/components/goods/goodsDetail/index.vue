<template>
  <div class="goods-detail-wrap">
    <headers>
      <div class="title" slot="title">商品详情</div>
    </headers>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.params.id)
  }
}
</script>
<style lang="less" scoped>

</style>

