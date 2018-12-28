<template>
  <div class="item-wrap flex-center">
    <div class="item" v-for="item in itemList">
      <div class="img">
        <!-- <slot name="img"></slot> -->
        <img :src="item.img" alt="">
      </div>
      <div class="title">
        <!-- <slot name="title"></slot> -->
        <p>{{item.title | chooseFont}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    itemList:{
      type:Array,
      default:[]
    },
    paths:{
      type:String,
      default:''
    }
  },
  filters:{
    chooseFont (value) {
      if(value.length>4){
        return value.substring(0,4)
      }
    }
  },
  mounted() {
    /* 就是父级请求的数据传递过来，第一次不能打印出父级传递过来的数据，但是可以实现页面数据的渲染 */
    console.log("接收的",this.itemList)
  },
}
</script>
<style lang="less" scoped>
.item-wrap{
  width:100%;
  flex-wrap: wrap;
  font-size:14px;
  .item{
    width:25%;
    text-align: center;
    img{
      width:60px;
      border-radius: 100%;
    }
  }
}
</style>

