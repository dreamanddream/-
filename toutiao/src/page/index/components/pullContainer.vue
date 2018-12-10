<template>
  <!-- 加载更多 -->
  <!-- 使用vue的滚动插件 -->
  <div class="container" :class="type" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
    <!-- 请求提示 -->
    <my-loading :visible="loading" :reload="init" />

    <!-- 顶部提示 -->
    <div class="globalTip">
      <transition name="fade">
        <div class="dataCount" v-show="dataCountShow">已为你推荐{{dataCount}}条新内容</div>
      </transition>
      <transition name="fade">
        <div class="noNewData" v-show="noNewDataShow">没有最新的内容了</div>
      </transition>
      <transition name="fade">
        <div class="requestFail" v-show="requestFailShow">网络请求失败,请检查网络</div>
      </transition>
    </div>

    <!-- 下拉加载 -->
    <!-- 使用mint-ui的下拉加载，handleTopChange处理下拉的状态 -->
    <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false' :distance='indexSwiper'>
      <!-- 下拉提示 -->
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus == 'pull'"><img class='pullLoading' src="~@/assets/img/loading.png"> 下拉刷新↓</span>
        <span v-show="topStatus == 'drop'"><img class='pullLoading' src="~@/assets/img/loading.png"> 释放更新↑</span>
        <span v-show="topStatus == 'loading'"><img class='pullLoading' src="~@/assets/img/loading.gif"> 加载中...</span>
      </div>
      <!-- banner组件 -->
      <my-banner :json="bannerJson" v-if='bannerJson.length > 0' />
      <!-- 置顶组件 -->
      <list-item :itemJson="stickJson" v-if='stickJson.length > 0' />
      <!-- listItem -->
      <list-item :itemJson="contentJson" v-if='contentJson.length > 0' />
      <!-- 底部提示 -->
      <div class="bottomLoad" v-if="contentJson.length > 0">
        <div class="loading" v-show='bottomLoading'>加载中...</div>
        <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: ["type"],
  data() {
    return {
      classPage: 1, // 当前栏目的翻页页数
      stickJson: [], // 置顶数据
      bannerJson: [], // banner数据
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: "", // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: true, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false,
      dataCountShow: false, // 更多条目数据是否显示
      noNewDataShow: false,
      requestFailShow: false
    };
  },
  computed: {
    ...mapState("index", [
      "indexActive",
      "indexPage",
      "indexLocation",
      "indexSwiper"
    ]),
    ...mapGetters("index", ["activeMeta"])
  },
  watch: {
    // 一旦点击顶部栏目就重新请求
    indexActive(val) {
      this.init();
    },
    // 监听页码的改变
    classPage(val) {
      // this.indexPage又是state中的
      this.indexPage[this.indexActive] = val;
      // 调用更新action中的set_indexPage
      this.set_indexPage(this.indexPage);
    },
    //
    contentJson(val) {
      this.set_currentContent(val);
    }
  },
  methods: {
    ...mapMutations("index", [
      "set_currentContent",
      "set_indexPage",
      "set_indexLocation"
    ]),
    ...mapActions("index", [
      "get_listItem_cache",
      "get_listItem_data",
      "get_stick_data",
      "get_banner_data"
    ]),
    init() {
      // active栏目第一次请求数据，这里有个问题，每次点击栏目时this.contentJson会变成空数组？是空数组，怎么实现的？
    //   console.log("this.contentJson", this.contentJson)
      if (this.indexActive === this.type && this.contentJson.length === 0) {
          console.log("也就是如果有缓存，这里根本不执行，第一次请求时才执行")
        this.loading = "loading";
        this.classPage = this.activeMeta.page;
        // 获取banner数据
        this.get_banner_data().then(res => {
          if (res) {
            this.bannerJson = res;
          }
        });
        // 获取置顶数据
        this.get_stick_data().then(res => {
          if (res) {
            this.stickJson = res;
          }
        });
        // 栏目的缓存？缓存 : 发送请求
        // 当不断的点击各个栏目考虑到缓存，不然就会不断地请求
        // 这里的res是什么？为什么可以表示缓存的数据
        console.log("查看数据",this.get_listItem_cache(this.indexActive))
        this.get_listItem_cache(this.indexActive).then(res => {
          if (res) {
            this.contentJson = res;
            console.log("这是缓存的res吗",res)
            this.handleLocaltion("get");
            this.loading = false;
            // console.log("渲染首页数据if",res,this.contentJson.length)
          } else {
            //   如果没有缓存那就重新请求
            this.loadTopAjax();
            // console.log("渲染首页数据")
          }
        });
      }
    },
    // 顶部下拉请求
    loadTopAjax() {
      this.get_listItem_data(this.classPage)
        .then(res => {
          this.loading = false;
          if (res) {
            // 将重新获取到的内容解构然后出入数组头部
            this.contentJson.unshift(...res);
            this.dataCount = res.length;
            // 文章数量页码增加
            this.classPage++;
            // 文章数量提示
            // $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
            console.log("查看传递过来的this.type", this.type);
            this.dataCountShow = !this.dataCountShow;
            let timer = setTimeout(() => {
              this.dataCountShow = false;
              clearTimeout(timer);
            }, 1000);
            // console.log(this.dataCountShow)
            // 加载历史记录方法
            this.newLookHere();
          } else {
            // 没有文章数据提示
            // $(`.container.${this.type} .noNewData`).slideDown(200).delay(1000).slideUp(200)
            this.noNewDataShow = !this.noNewDataShow;
            let timer = setTimeout(() => {
              this.noNewDataShow = false;
              clearTimeout(timer);
            }, 1000)
          }
          this.$refs.loadmore.onTopLoaded(); // mint-ui 下拉组件的方法
          this.loading = false;
          // $(`.container.${this.type} .requestFail`).hide()
        })
        // 下拉刷新网络出现错误
        .catch(err => {
          console.log("loadTop发生错误", err);
          if (this.contentJson.length > 0) {
            // $(`.container.${this.type} .requestFail`).show()
            this.requestFailShow = !this.requestFailShow;
            let timer = setTimeout(() => {
              this.requestFailShow = false;
              clearTimeout(timer);
            }, 1000)
            this.loading = false;
          } else {
            this.loading = "error";
          }
        });
    },
    // 底部上滑请求
    loadBottomAjax() {
      this.bottomLock = true; // 上滑开关
      console.log("底部上拉")
      // 发送请求,同时传递参数
      this.get_listItem_data(this.classPage).then(res => {
        if (res) {
          // 上滑将新数组解构使用push添加
          this.contentJson.push(...res);
          // 页码++
          this.classPage++;
          console.log("页码", this.classPage);
        } else {
          console.log("执行的什么",this.classPage)
          // 将加载中隐藏
          this.bottomLoading = false;
          // 到底啦显示为true；
          this.bottomNoData = true;
        }
        // 请求完成关闭上滑开关
        this.bottomLock = false;
      });
    },
    // 创建historyLook元素，记录上次看到哪
    newLookHere() {
      if (this.dataCount >= 10) {
        let lookIndex = this.contentJson.findIndex(n => n.type === "lookHere");
        this.contentJson.splice(lookIndex, 1); // 删除数据里面的look数据
        this.contentJson.splice(10, 0, { type: "lookHere" }); // 始终在第11个位置里添加look数据
      }
      this.$nextTick(() => {
        // $(`.${this.indexActive} #lookHere`).prev().css('border', 'none')    // 去除look元素的上一个元素的border边框
      });
    },
    // 点击look元素，发送请求
    lookHereClick() {
      let yuan=document.querySelector(`.container.${this.type}`)
      let lookHere=this.$refs.lookHere
      console.log("yuan", lookHere)
      yuan.addEventListener("click",function () {
        console.log("addlistener")
      },false)
      // lookHere.addEventListener('click',  () => {
      //     // $(`.container.${this.indexActive}`).animate({scrollTop: 0}, () => {
      //     //     this.loadTopAjax()
      //     // })
      //      this.loadTopAjax()
      //      document.querySelector(`.container.${this.type}`).scrollTop=0
      // },false)
    },
    // mint-ui 下拉组件的状态
    handleTopChange(status) {
      this.topStatus = status;
      console.log("下拉组件的状态",this.topStatus)
    },
    // 处理滚动条位置的方法
    handleLocaltion(type) {
      if (this.indexActive === this.type) {
        if (type === "get") {
          this.$nextTick(() => {
            // $(`.container.${this.type}`).scrollTop(this.activeMeta.location)
            document.querySelector(`.container.${this.type}`).scrollTop=this.activeMeta.location
          });
        } else if (type === "set") {
          // let scrollTop = $(`.container.${this.type}`).scrollTop();
          let scrollTop = document.querySelector(`.container.${this.type}`).scrollTop
          if (scrollTop >= 0) {
            this.indexLocation[this.indexActive] = scrollTop;
            this.set_indexLocation(this.indexLocation);
          }
        }
      }
    },
    saveScroll() {
      this.handleLocaltion("set");
    }
  },
  mounted() {
    this.init();
    this.lookHereClick();
  },
  // 考虑周全
  activated() {
    this.handleLocaltion("get");
    window.addEventListener("beforeunload", this.saveScroll); // 为了刷新之后保持当前滚动条位置，监听方法不能带参数
  },
  deactivated() {
    this.handleLocaltion("set");
    window.removeEventListener("beforeunload", this.saveScroll); // 为了刷新之后保持当前滚动条位置，监听方法不能带参数
  }
};
</script>
<style lang='less'>
// 顶部更新动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.container {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .globalTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    div {
      height: 32px;
      line-height: 34px;
      font-size: 14px;
      color: #2a90d7;
      background: rgba(213, 233, 247, 0.9);
      text-align: center;
      // display: none;
      &.requestFail {
        color: #f56767;
        background: #fbe9ef;
      }
    }
  }
  .mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .pullLoading {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 3px;
  }
}
</style>
