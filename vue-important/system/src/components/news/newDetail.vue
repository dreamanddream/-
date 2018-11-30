<template>
  <div>
    <nav-bar :title="title"></nav-bar>
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
      icon: '',
      title:''
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
        // console.log(this.$route.params)
        this.detail = res.data.detail
        // console.log(res)
      })
      .catch(err => {
        // console.log(err, '新闻详情内容')
      })
      this.test()
  },
  // 路由守卫,路由确认前，组件渲染前的守卫函数
  beforeRouteEnter (to, from, next) {
    // ...
    console.log("to",to)
    console.log("from",from)
    // 如果from是空，说明是从地址栏中粘贴，然后继续判断根据to来判断title
    // 如果from是newslist，说明是到新闻详情
    // 如果from是goodslist说明是图文详情
    let title=''
    if(to.name==null){
        if(to.name==="news.detail"){
          title="新闻详情"
        }else if(to.name===photo.info){
          title='商品图文介绍'
        }
    }else if(from.name=="news.list"){
        title="新闻详情"
    }else if(from.name=="goods.detail"){
        title="商品图文介绍"
    }
    // 最终都放行，由于beforeRouteEnter没有this，但是通过next的实例中就有了this
    next(vm => {
      vm.title=title
      console.log(vm.title)
    })
  },
  methods:{
    test () {
      var id = parseInt(this.$route.query.id)
      console.log("看一下在methods是否可以获取到id",id)
    }
  }
}
</script>
<style>
  img{
    width:100%;
  }
</style>
