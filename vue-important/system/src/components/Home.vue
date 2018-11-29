<template>
<div>
  <mt-header fixed title="你的头条"></mt-header>
   <div class="content">
    <!-- 轮播图 -->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img, index) in imgs" :key="index">
        <img :src="img.Img" alt="">
      </mt-swipe-item>
    </mt-swipe> -->
    <my-swiper url="/index/baner"></my-swiper>
    <!-- 新闻九宫格 -->
    <div class="grid">
      <my-ul>
        <my-li v-for="(grid, index) in grids" :key="index">
          <!-- 动态绑定路由 -->
          <!-- , params: grid.router.params.categoryId -->
          <router-link :to="grid.router">
             <span :class="grid.className"></span>
            <span>{{grid.title}}</span>
          </router-link>
          <!-- <router-link :to="{name:grid.router.name}" class="">
            <span :class="grid.className"></span>
            <span>{{grid.title}}</span>
          </router-link> -->
          <!-- <a href="" class="">
            <span :class="grid.className"></span>
            <span>{{grid.title}}</span>
          </a> -->
          <!-- 将a标签换为router-link -->
        </my-li>
      </my-ul>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      imgs: [],
      grids: [
        // router中传递路由
        {className: 'cms-news', title: '新闻资讯', router: {name: 'news.list'}},
        // 有个问题，有的传参有的不传参，路由for循环时要怎么处理,路由循环时直接渲染grid.router就行，不需要提交具体参数
        {className: 'cms-photo', title: '图文分享', router: {name: 'photo.list', params: {categoryId: 0}}},
        {className: 'cms-news', title: '商品列表', router: {name: 'goods.list'}},
        {className: 'cms-photo', title: '留言反馈', router: {name: 'news.list'}},
        {className: 'cms-news', title: '新闻资讯', router: {name: 'news.list'}},
        {className: 'cms-photo', title: '新闻资讯', router: {name: 'news.list'}}
      ]
    }
  },
  // 创建组件的生命周期函数，处理数据
  created () {
    this.$axios.get('/index/baner')
      .then(res => {
        console.log(res.data)
        this.imgs = res.data.message
      })
      .catch(err => {
        console.log('轮播图获取异常', err)
      })
  }
}
</script>
<style>
</style>
