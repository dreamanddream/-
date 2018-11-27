<template>
  <div class="comment">
    <div class="comment-title">
      <p>提交评论</p>
      <p>返回</p>
    </div>
    <input type="text">
    <mt-button type="primary" @click="commit(des)">提交评论</mt-button>
    <div class="con">
      <p>评论列表</p>
      <p><span>20</span>条评论</p>
      <div class="comment-list">
        <ul>
          <li>
            <p>匿名评论</p>
            <p>我是评论的内容模块，我是评论的内容模块</p>
            <p>时间1分钟以前</p>
          </li>
        </ul>
        <!-- 应该有个点击事件，只不过都被我注释了@click="loadMore" -->
        <mt-button type="danger">加载更多</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'comment',
  data: function () {
    return {
        des: "自己写的；评论内容",
        page: 1,
        // 用于拼接渲染message数组数据
        message: []
    }
  },
  props: ['cid'], // 评论id
  created () {
   
    // 使用该组件时是否有页码，处理加载更多时候的分页
    let page=this.$route.query.page || 1
    this.$axios.get("getComment?page="+page)
      .then(res => {

      })
      .catch(res => {

      })
      // this.firstLoad(page)
  },
  methods: {
    commit (des) {
      this.$axios.post('post/comment?des='+des)
        .then(res => {
          if(res.status==200){
            console.log("评论提成功!")
          }
        })
    },
    // firstLoad () {
    //   // 发送请求获取数据同时使page页码++
    //   this.$axios.get(`getComment/${this.cid}?pageindex=${page}`)
    //     .then(res => {
    //       this.message=res.data.message
    //       this.page++
    //     })
    //     .catch(err => {
    //       console.log("数据获取失败", err)
    //     })
    // },
    // loadMore () {
    //   // 发送请求获取数据同时使page页码++
    //   this.$axios.get(`getComment/${this.cid}?pageindex=${page}`)
    //     .then(res => {
      // 使用concat拼接数据
            // if(res.data.message.length==0){
//                this.$toast("没有数据了！")
            // }
            // if(page){
            //   this.message=this.message.concat(res.data.message)
            // }else{
            //   this.messagr = res.data.message;
            // }
    //       
    //       this.page++
    //     })
    //     .catch(err => {
    //       console.log("数据获取失败", err)
    //     })
    // }
  }
}
</script>
<style lang="">
  
</style>