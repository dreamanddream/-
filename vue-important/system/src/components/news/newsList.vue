<template>
  <div class="content">
    <nav-bar>新闻列表</nav-bar>
    <ul class="news-list">
      <li v-for="list in newsList" :key="list.id">
        <a href="">
          <img :src="list.img" alt="">
          <div>
            <span>{{list.title}}</span>
            <div class="news-desc">
              <p>点击数：{{list.num}}</p>
              <p>发表时间：{{list.date}}</p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'newsList',
  data: function () {
    return {
      newsList: []
    }
  },
  created () {
    this.$axios.get('news/list')
      .then(res => {
        this.newsList = res.data.list
      })
      .catch(res => {
        console.log("新闻列表获取异常")
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
