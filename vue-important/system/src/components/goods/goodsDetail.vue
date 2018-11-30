<template>
  <div>
    <my-swiper :url="urls"></my-swiper>
    <p class="title">{{goods.title}}</p>
    <p class="number-li"><span @click="substract">-</span>{{pickNum}}<span @click="add">+</span></p>
    <mt-button @click="insertBall" type="danger">加入购物车</mt-button>
    <mt-button @click="showPhotoInfo" type="primary">图文介绍</mt-button>
    <transition name="ball" @after-enter="afterEnter">
      <div class="ball" v-if="isExit"></div>
    </transition>
  </div>
</template>
<script>
import EventBus from '@/eventBus'
import GoodsTodo from '@/GoodsTodo'
export default {
  name: 'GoodDetail',
  data () {
    return {
        id: 1,
        urls:'',
        goods:{},
        isExit:false,
        pickNum:1,
        max: 20
    }
  },
  methods:{
    insertBall () {
      this.isExit=true

    },
    afterEnter () {
      this.isExit=false // 移除元素
      // 通知app组件增加小球的数量
      EventBus.$emit('addShopcart',this.pickNum)
      GoodsTodo.add({
        id:this.id,
        num:this.pickNum
      })
      // 可以打印出来，存储的类型是{1:2}
      console.log(GoodsTodo.getGoodsList())
    },
    substract () {
      if(this.pickNum==1){
        this.pickNum=1;
        return false
      }
      this.pickNum--
    },
    add () {
       if(this.pickNum==20){
        this.pickNum=20;
        return false
      }
      this.pickNum++
    },
    // showPhotoInfo
    showPhotoInfo () {
      this.$router.push({
        name: "goods.info",
        query: {
          id:this.$route.query.id
        }
      })
    }
  },
  created () {
    this.id=this.$route.query.id || 1
    this.urls="goods/detail/imgs?id="+this.id;
    let _this =this;
    this.$axios.get("/goods/detail?id=" + this.id)
      .then(res => {
        this.goods=res.data.message
        _this.title=this.goods.title
        // console.log(this.goods.title)
      })
      .catch(err => {
        console.log("详情数据获取失败",err)
      })
  }
}
</script>
<style scoped>
  .ball{
    width:20px;
    height:20px;
    background: red;
    border-radius: 100%;
  }
  .title{
    font-size:16px;
  }
  .ball-enter-active{
    animation: bounce-in 1s;
  }
  .ball-leave{
    opacity: 0;
  }
  .number-li span{
    display: inline-block;
    width:50px;
    height:50px;
    font-size:22px;
  }
@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0)
  }
  50% {
    transform: translate3d(140px, -50px, 0)
  }
  75% {
    transform: translate3d(160px, 0px, 0)
  }
 100% {
    transform: translate3d(200px, 300px, 0)
  }
}
</style>

