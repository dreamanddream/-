<template>
  <div class="index">
    <my-loading :visible="loading"></my-loading>
    <!-- swiper轮播 -->
    <swiper :options="swiperOption" id="swiper-box" ref="swiperOption">
      <swiper-slide v-for="(item, index) in bannerList" :key="index">
        <img :src="item.Img" alt="">
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <item :itemList="itemList">
      <!-- <div slot="img">
        <img :src="item.img" alt="">
      </div>
      <div slot="title">
        <p>{{item.title}}</p>
      </div> -->
    </item>
    <!-- 推荐商品 -->
    
    <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
import footers from "@/components/common/footer";
import axios from '@/assets/util/axios';
import item from '@/components/common/item'
export default {
  components: { footers,item},
  data() {
    return {
      itemList:[],
      bannerList:[],
      loading: 'loading',
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: true,
        loop: true
      }
    };
  },
  mounted() {
    // 新人有礼、实体店、视频集锦、产品介绍、我是代理、推广、加盟分公司、店主专享
    // 收益榜
    // console.log(config.index.banner);
    // banner图
    this.$http.get('/index/baner')
      .then(res => {
        if(res.status=='200'){
          this.bannerList=res.data.message;
          // this.loading = false
        }
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    // 导航
    this.$http.get('/nav/icon')
      .then(res => {
        if(res.status == '200'){
          this.itemList=res.data.message
          this.loading = false
          // console.log("itemList",this.itemList);
        }
      })
      .catch(err => {
        console.log(err)
      })
    /* // 这部分内容是为了测试二次封装的axios的
    this.newsList = [
    {title: '推荐', id: 1},
    {title: '视频', id: 2},
    {title: '热点', id: 3},
    {title: '社会', id: 4},
    {title: '娱乐', id: 5},
    {title: '军事', id: 6},
    {title: '科技', id: 7},
    {title: '汽车', id: 8},
    {title: '体育', id: 9},
    {title: '财经', id: 10},
    {title: '国际', id: 11},
    {title: '时尚', id: 12},
    {title: '游戏', id: 13},
    {title: '旅游', id: 14},
    {title: '历史', id: 15},
    {title: '探索', id: 16},
    {title: '美食', id: 17},
    {title: '育儿', id: 18},
    {title: '养生', id: 19},
    {title: '故事', id: 20},
    {title: '美文', id: 21}
]
    let json = this.$http.get('home/list',this.newsList[4]).then(res => {
      console.log("成功的res",res)
    }).catch( err => {
      console.log("失败的",res)
    }) */
    /*之前测试时使用的
    console.log(this.$route.path)
    let json =request('post', ajaxURL.itemList)
    console.log("json",this.json)
    let re= request('post',ajaxURL.apparticle.php) */
  }
};
</script>
<style lang="less">
#swiper-box {
  width: 100%;
  img{
    width:100%;
  }
}
</style>

