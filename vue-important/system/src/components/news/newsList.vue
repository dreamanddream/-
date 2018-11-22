<template>
  <div class="content">
    <nav-bar title="新闻列表"></nav-bar>
    <ul class="news-list">
      <li v-for="list in newsList" :key="list.id">
        <!-- 跳转到详情,同时传递参数通过query查询字符串将id传递过去-->
        <router-link :to="{name:'news.detail',query:{id:list.id}}">
          <img :src="list.img" alt="">
          <div>
            <span>{{list.title}}</span>
            <div class="news-desc">
              <p>点击数：{{list.num}}</p>
              <p>发表时间：{{list.date}}</p>
            </div>
          </div>
        </router-link>
        <!-- <a href="">
          <img :src="list.img" alt="">
          <div>
            <span>{{list.title}}</span>
            <div class="news-desc">
              <p>点击数：{{list.num}}</p>
              <p>发表时间：{{list.date}}</p>
            </div>
          </div>
        </a> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'newsList',
  data: function () {
    return {
      newsList: [],
      title: '新闻列表'
    }
  },
  created () {
    this.$axios.get('news/list')
      .then(res => {
        this.newsList = res.data.list
      })
      .catch(res => {
        console.log('新闻列表获取异常')
      })
  }
}
</script>
<style scoped>
  .news-list img{
    width:60px;
    height:60px;
  }
</style>
