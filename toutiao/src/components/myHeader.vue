<template>
  <header class="myHeader">
    <div class="top_bar">
      <div class="abs_l">
        <!-- 留坑，坑的名字是left -->
        <slot name="left"></slot>
      </div>
      <div class="abs_m">
        {{title}}
        <slot name="mid"></slot>
      </div>
      <div class="abs_r">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props:['title']
};
</script>
<style lang="less" scoped>
@header_height: 1.333rem;
.myHeader {
  display: block;
  position: relative;
  overflow: hidden;
  background-color: #00939c;
  color: #fff;
  font-size: 16px;
  &.fixed {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 666;
  }
  .top_bar {
    position: relative;
    height: @header_height;
    user-select: none; // 这个css的作用是？
    display: flex;
    align-items: center;
    a {
      display: table-cell;
      width: @header_height;
      height: @header_height;
      vertical-align: middle;
    }
    .abs_l,
    .abs_r {
      width: @header_height;
      height: @header_height;
      text-align: center;
    }
    .abs_m {
      flex: 1;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>


