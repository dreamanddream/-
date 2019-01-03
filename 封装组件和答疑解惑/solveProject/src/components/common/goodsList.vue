<template>
  <div class="wrap-goods-list flex-center">
    <div class="item" v-for="item in goodsList" :class="'item'+item.id" @click="skip($router, item.id)">
      <img src="../../assets/logo.png" alt="">
      <div class="good-tag flex-between">
        <p class="price">￥{{item.id}}</p>
        <p class="cart"><i class="icon iconfont icon-qicheqianlian-1-copy"></i></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    goodsList:{
      type:Array,
      default:[]
    }
  }
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
        .icon{
          font-size: 26px;
        }
      }
    }
  }
}
</style>

