<template>
  <div class="goodList">
    <mt-loadmore :auto-fill="false" @top-status-change="topChange" :bottom-all-loaded="allUseLoad" :top-method="loadTop" :top-status.sync="topStatus" :bottom-method="loadBottom" :bottomPullText="up" ref="loadmore" class="load" :style="{ height: (wrapperHeight-50) + 'px' }">
      <ul>
        <li v-for="item in list" :key="item.goodId">
          <router-link :to="{name:'goods.detail',query:{id:item.goodId}}">
          <img :src="item.img" alt="">
          <p>{{item.title | convertStr(10)}}</p>
          <p>价格:￥{{item.price}}</p>
          </router-link>
        </li>
      </ul>
      <!-- <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div> -->
    </mt-loadmore>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      list: [],
      up: "加载更多",
      allUseLoad: false,
      wrapperHeight: 0,
      courrentPage: 0,
      start: 1,
      topStatus: ''
    };
  },
  created() {
    this.start = this.$route.query.id || 1
    this.loadFirst()
  },
  // mounted() {
  //   // 父控件要加上高度，否则会出现上拉不动的情况
  //   this.wrapperHeight =
  //     document.documentElement.clientHeight -
  //     this.$refs.loadermore.offsetTop
  // },
  methods: {
    loadTop() {
      console.log("下拉刷新");
      this.loadFirst()
      this.$refs.loadmore.onTopLoaded();
      // 加载更多数据
      // this.$broadcast("onTopLoaded");
    },
    loadBottom: function() {
      // 上拉
      this.loadMore()
    },
    topChange() {
      this.topStatus = status;
      console.log(status);
    },
    loadFirst() {
      this.$axios.get("goods/list?start=" + this.start + "&size=5")
        .then(res => {
          this.list = res.data.message;
        })
        .catch(res => {
          console.log("商品列表获取异常");
        })
    },
    loadMore () {
      this.$axios.get("goods/list?start=" + this.start + "&size=5")
        .then(res => {
          this.list = this.list.concat(res.data.message);
          if(start>2){
            this.allUseLoad = true
          }
          this.start++
          this.$refs.loadmore.onBottomLoaded()
        })
        .catch(res => {
          console.log("商品列表获取异常");
        })
    }
  }
};
</script>
<style scoped>
.load {
  overflow: scroll;
  margin-bottom: 50px;
}
.goodList img {
  width: 100%;
}
</style>

