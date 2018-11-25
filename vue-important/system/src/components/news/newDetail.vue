<template>
  <div>
    <nav-bar title="aa"></nav-bar>
    <div class="content">
        <div>查看详情id{{icon}}</div>
        <div v-html="detail.description"></div>
        <img :src="detail.img" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      aa: '',
      // 在标签中使用到的数据都要先在data中声明，就比如detail
      detail: '',
      icon: ''
    }
  },
  created () {
    var id = parseInt(this.$route.query.id)
    // 通过this，而不是var定义的相当于当前组件的全局变量
    this.icon = id
    console.log(id)
    // 拼接参数的方法，显示对应id的详情
    this.$axios.get('news/detail?id=' + id)
      .then(res => {
        console.log(this.$route.params)
        this.detail = res.data.detail
        console.log(res)
      })
      .catch(err => {
        console.log(err, '新闻详情内容')
      })
  }
}
</script>
<style>
  img{
    width:100%;
  }
</style>
