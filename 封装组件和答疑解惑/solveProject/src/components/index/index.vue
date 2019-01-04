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
    <no-data v-if="goodsList.length==0"></no-data>
    <div class="goods" v-scroll="loadMore" v-else>
      <goods-list :goodsList="goodsList"></goods-list>
      <page-loading :loadingMore="loadingMore" :end="end"></page-loading>
    </div>
    <!-- 返回顶部 -->
    <go-top></go-top>
    <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
import footers from "@/components/common/footer";
import axios from "@/assets/util/axios";

// import noData from '@/components/common/noData';
// import pageLoading from '@/components/common/pageLoading';
export default {
  components: { footers},
  data() {
    return {
      itemList: [],
      bannerList: [],
      goodsList: [],
      loading: "loading",
      loadingMore: false,
      end: false,
      pageIndex: 1,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        autoplay: true,
        loop: true
      }
    };
  },
  methods: {
    // 滚动到底部加载
    loadMore() {
      return new Promise(async (resolve, reject) => {
        this.pageIndex++;
        if(this.end) return;
        await axios
          .get("headline/list", { pageIndex: this.pageIndex })
          .then(res => {
            // console.log("滚动到底部");
            // console.log("成功的res", res.data.data.list);
            this.loadingMore = true;
            this.end = false;
            this.goodsList = this.goodsList.concat(res.data.data.list);
            // console.log(this.goodsList)
            if (res.data.data.list.length < 6) {
              this.loadingMore = false;
              this.end = true;
              // 这个resolve是什么？
              resolve(res.data.data.list);
            }
          })
          .catch(err => {
            reject(err);
            console.log("失败的", err);
          });
      });
    },
    initLoadMore() {
      return new Promise(async (resolve, reject) => {
        await axios
          .get("headline/list", { pageIndex: this.pageIndex })
          .then(res => {
            /* console.log("初始化");
            console.log("成功的res", res.data.data.list); */
            this.loadingMore = true;
             this.end = false;
            this.goodsList = res.data.data.list;
            if (res.data.data.list.length < 6) {
              this.loadingMore = false;
              this.end = true;
              // 这个resolve是什么？
              resolve(res.data.data.list);
            }
          })
          .catch(err => {
            reject(err);
            // console.log("失败的", err);
          });
      });
    }
  },
  mounted() {
    // vuex--直接就能获取到
    // console.log("index未改变之前",this.$store.state.changableNum)
    // this.$store.commit("changableNum",5)
    // this.$store.dispatch("changableNum",5)
    // console.log("index改变之后",this.$store.state.changableNum)
    // 初始化加载商品列表
    // 初始化加载商品列表
    this.initLoadMore();

    // 新人有礼、实体店、视频集锦、产品介绍、我是代理、推广、加盟分公司、店主专享
    // 收益榜
    // console.log(config.index.banner);
    // banner图
    this.$http
      .get("/index/baner")
      .then(res => {
        if (res.status == "200") {
          this.bannerList = res.data.message;
          // this.loading = false
        }
        // console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
    // 导航
    this.$http
      .get("/nav/icon")
      .then(res => {
        if (res.status == "200") {
          this.itemList = res.data.message;
          this.loading = false;
          // console.log("itemList",this.itemList);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 这部分内容是为了测试二次封装的axios的
    this.newsList = [
      { title: "推荐", id: 1 },
      { title: "视频", id: 2 },
      { title: "热点", id: 3 },
      { title: "社会", id: 4 },
      { title: "娱乐", id: 5 },
      { title: "军事", id: 6 },
      { title: "科技", id: 7 },
      { title: "汽车", id: 8 },
      { title: "体育", id: 9 },
      { title: "财经", id: 10 },
      { title: "国际", id: 11 },
      { title: "时尚", id: 12 },
      { title: "游戏", id: 13 },
      { title: "旅游", id: 14 },
      { title: "历史", id: 15 },
      { title: "探索", id: 16 },
      { title: "美食", id: 17 },
      { title: "育儿", id: 18 },
      { title: "养生", id: 19 },
      { title: "故事", id: 20 },
      { title: "美文", id: 21 }
    ];
    let json = axios
      .get("home/list", this.newsList[4])
      .then(res => {
        // console.log("成功的res", res);
      })
      .catch(err => {
        console.log("失败的", res);
      });
    /*之前测试时使用的
    console.log(this.$route.path)
    let json =request('post', ajaxURL.itemList)
    console.log("json",this.json)
    let re= request('post',ajaxURL.apparticle.php) */
  }
};
</script>
<style lang="less">
.index {
  #swiper-box {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .goods {
    height: 300px;
    overflow-y: scroll;
    padding-bottom: 60px;
  }
}
</style>

