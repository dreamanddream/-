<template>
  <div class="wrap-goods-list flex-center">
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥222</p>
        <p class="cart">购</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // props:{
  //   goodsList:{
  //     type:Array,
  //     default:[]
  //   }
  // }
};
</script>
<style lang="less" scoped>
@font-size: 16px;
.wrap-goods-list {
  font-size: @font-size;
  width: 100%;
  flex-wrap: wrap;
  .item {
    width: 45%;
    &:nth-child(2n) {
      margin-right: 0;
      margin-left: 2%;
    }
    &:nth-child(2n + 1) {
      margin-right: 2%;
      margin-left: 0;
    }
    img {
      width: 100%;
    }
    .good-tag {
      .price {
        padding-left: 5px;
      }
      .cart {
        padding-right: 5px;
      }
    }
  }
}
</style>

