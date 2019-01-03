<template>
  <div class="header flex-between">
    <p class="back" @click="back($router)">返回</p>
    <slot name="title"></slot>
    <p class="more">更多</p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.header{
  width:100%;
  height:60px;
  background: #2196f3;
  font-size: 16px;
  line-height: 60px;
  .back{
    padding-left:15px;
  }
  .more{
    padding-right: 15px;
  }
}
</style>

