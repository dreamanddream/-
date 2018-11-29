<template>
  <div>
    <my-swiper :url="urls"></my-swiper>
    <p class="title">{{titles}}</p>
  </div>
</template>
<script>
export default {
  name: 'GoodDetail',
  data () {
    return {
        id: 1,
        urls:this.urls,
        titles:''
    }
  },
  created() {
    this.id=this.$route.query.id || 1
    this.urls="goods/detail/imgs?id="+this.id
    this.$axios.get("/goods/detail?id=" + this.id)
      .then(res => {
        this.goods=res.data.message
        this.title=this.goods.title
        console.log(this.goods.title)
      })
      .catch(err => {
        console.log("详情数据获取失败",err)
      })
  },
}
</script>
<style scoped>
  .title{
    font-size:16px;
  }
</style>

