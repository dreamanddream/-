<template>
  <div id="search">
    <!-- 搜索 -->
    <div class="search_top">
      <my-header class='header'>
        <a class="back-black" slot='left' @click.stop='$router.go(-1)'></a>
        <!-- 没有传递title过去，所以就不会渲染title -->
        <!-- form的submit，键盘按enter时提交-->
        <form class='form' slot='mid' @submit.prevent="get_search">
          <i class="form_icon icon-search"></i>
          <!-- 使用v-model同时加上trim修饰符 -->
          <input class='form_input' type="search" placeholder="搜头条，知健康" v-model.trim='key'>
        </form>
        <!-- key是input中的value值，就是输入的关键字，一旦有内容给搜索添加上on类名，如果没有搜索就是灰的 -->
        <a class='search_btn' slot='right' @click.stop="get_search" :class="key? 'on' : '' ">搜索</a>
      </my-header>
    </div>
    <!-- 同时支持右滑，返回上一页，使用了自定义指令 -->
    <div class="content" v-swiper:swiperRight='true'>
      <!-- 搜索推荐 -->
      <template v-if="search_state === 'recommend'">
        <div class="search_recommend">
          <!-- 关键字 -->
          <div class="keyword" v-if='keyWords'>
            <div class="keyword_wrap">
              <span @click.stop="$router.replace(`/search?key=${item}`)" v-for='(item,index) in keyWords' :key='index'>{{item}}</span>
            </div>
            <div class="gray_line"></div>
          </div>
          <!-- 文章 -->
          <div class="article">
            <h3>
              <i class="hot_icon"></i>
              <span>今日热点</span>
            </h3>
            <ul v-if='hotJson.length > 0'>
              <li v-for='(item, index) in hotJson' :key='index'>
                <!-- linkto中加上跳转链接，并加上参数,这是query传参的方法-->
                <router-link :to="`/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`">
                  <!-- 标签前面的序号，同时前3个是热门 -->
                  <span :class="index+1 > 0 &&index+1 < 4? 'hot': ''">{{index + 1}}.</span>
                  {{item.title}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- 搜索内容 -->
      <!-- 渲染搜索到的内容，这里同时也要有加载更多和没有更多内容的处理 -->
      <template v-if="search_state === 'search'">
        <div ref="container" class="container" v-infinite-scroll="get_search_more" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <list-item :itemJson="searchJson" v-if="searchJson.length > 0" ref="listItem"></list-item>
          <div class="bottomLoad">
            <div class="loading" v-show="bottomStatus === 'loading'">加载中...</div>
            <div class="noData" v-if="bottomStatus === 'noData'">没有更多的内容了</div>
          </div>
        </div>
      </template>

      <!-- 没有搜索结果 -->
      <template v-if="search_state == 'empty' && searchJson.length === 0">
        <div class="search_result-empty">
          <p>这个宇宙中搜寻不到</p>
          <p>换个词试试</p>
        </div>
      </template>
    </div>

    <!-- 请求提示 -->
    <my-loading :visible='loading' :reload='get_search' />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      key: "", // 搜索内容
      page: 1, // 加载更多页数
      search_state: "recommend", // 搜索状态
      searchJson: [], // 搜索数据
      hotJson: [], // 热点数据
      keyWords: null, // 推荐搜索的关键字
      history: {}, // 搜索历史
      bottomLock: false, // 上滑开关
      bottomStatus: "loading", // 上滑底部状态
      bottomTip: false, // bottom提示
      loading: false
    };
  },
  watch: {
    $route(to, from) {
      // 从首页进来，显示热点推荐
      console.log("打印to和from", to, from);
      if (from.path.includes("index")) {
        this.key = "";
        this.search_state = "recommend";
      }
    },
    key(val) {
      // 搜索值为空，显示热点推荐
      if (!val) {
        this.search_state = "recommend";
      }
    }
  },
  methods: {
    ...mapActions("search", ["get_hot_data", "get_search_data"]),
    // 获取热点数据
    get_hot() {
      this.loading = "loading";
      this.get_hot_data()
        .then(res => {
          if (res.data) {
            this.hotJson = res.data;
          }
          if (res.keyword) {
            this.keyWords = res.keyword;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = "error";
        });
    },
    // 获取搜索数据
    get_search() {
      console.log("输入search")
      if (this.key) {
        this.loading = "loading";
        this.search_state = "search";
        // $("#search .container").scrollTop(0);
        //$router.replace类似于$router.push导航到不同的页面，但是$router.replace不会有历史记录
        this.$router.replace(`/search?key=${this.key}`);
        // 传递参数，获取对应key值的数据
        this.get_search_data({ key: this.key, page: 1 })
          .then(res => {
            if (res.data) {
              this.searchJson = res.data;
              this.page = 2;
              this.handleLocaltion("get");
            } else {
              this.searchJson = [];
              this.search_state = "empty";
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.search_state = "empty";
            this.loading = "error";
          });
      }
    },
    // 获取更多搜索数据
    get_search_more() {
      console.log("上拉加载更多");
      console.log("this.history",this.key,this.history[this.key])
      this.bottomTip = true;
      this.bottomStatus = "loading";
      if (this.bottomStatus !== "noData") {
        this.bottomLock = true;
        this.get_search_data({ key: this.key, page: this.page }).then(res => {
          if (res.data) {
            this.searchJson.push(...res.data);
            this.page++;
          } else {
            this.bottomStatus = "noData";
          }
          this.bottomLock = false;
        });
      }
    },
    bottomVisible() {
      this.$nextTick(() => {
        // let list_height
        console.log(
          "this.$refs.listItem.offsetHeight",
          this.$refs.listItem.$el.offsetHeight
        );
        console.log(
          "this.$refs.container.offsetHeight",
          this.$refs.container.offsetHeight
        );
        if (
          // $("#search .listItem").height() >= $("#search .container").height()
          this.$refs.listItem.offsetHeight >= this.$refs.container.offsetHeight
        ) {
          this.bottomTip = true;
        }
      });
    },
    // 记录滚动条位置
    handleLocaltion(type) {
      console.log("我是handleLocation")
      if (type === "get") {
        this.$nextTick(() => {
          this.bottomVisible(); // 数据渲染后，判断底部提示是否显示
          if (this.history && this.history[this.key]) {
            // 如果是第二次，也就是再次搜索同样内容，就直接让其滚动到上次记录的位置
            // $("#search .container").scrollTop(this.history[this.key].location);
          }
        });
      } else if (type === "set") {
        if (this.key) {
          // key是查询的关键字，如果是第一次查询，就记录当前高度，同时存储
          // this.history[this.key] = {
          //   location: $("#search .container").scrollTop(),
          //   data: this.searchJson
          // };
        }
      }
    },
    getScrollTop () {
      console.log("aa");
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollTop)
    }
  },
  mounted() {
    // 首先获取热门数据然后进行渲染
    this.get_hot();
    window.addEventListener('scroll', this.getScrollTop)
  },
  activated() {
    console.log("查看activated")
    if (this.$route.query.key) {
      // 获取传递的关键字
      this.key = this.$route.query.key;
      // 是否有搜索历史 ? 取缓存 ： 发送请求
      // 这个应该不行，因为没有存储
      if (this.history[this.key] && this.history[this.key].data) {
        this.searchJson = this.history[this.key].data;
        this.search_state = "search";
        this.handleLocaltion("get");
      } else {
        this.get_search();
      }
    }
  },
  deactivated() {
    console.log("查看deactivated")
    this.handleLocaltion("set");
  }
};
</script>
<style lang="less">
#search {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  a {
    text-decoration: none;
  }
  .search_top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    header {
      background: #fff;
      padding-right: 0.27rem;
      border-bottom: 1px solid #eee;
      background: #f4f5f6;
      .form {
        position: relative;
        display: flex;
        align-items: center;
        color: #aaa;
        font-size: 14px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 50px;
        padding: 0.13rem 0.267rem;
        margin: 0 0.267rem;
        .form_icon {
        }
        .form_input {
          width: 100%;
          color: #666;
          padding-left: 0.13rem;
          margin: 0;
          outline: none;
          -webkit-appearance: none;
          &::-webkit-input-placeholder {
            color: #c8c8c9;
            font-size: 12px;
          }
          &::-moz-placeholder {
            color: #c8c8c9;
            font-size: 12px;
          }
          &:-ms-placeholder {
            color: #c8c8c9;
            font-size: 12px;
          }
        }
      }
      .search_btn {
        color: #aaa;
        font-size: 14px;
        &.on {
          color: #00939c;
          font-weight: bold;
        }
      }
    }
  }
  .content {
    background: #fff;
    .container {
      // height:calc('~100%-44px');
      // height:100%-44px;
      height: 93%;
      .search_recommend {
        position: relative;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .keyword {
          padding-top: 0.27rem;
          .keyword_wrap {
            padding: 0 0.4rem;
            span {
              display: inline-block;
              font-size: 13px;
              padding: 0.13rem 0.26rem;
              margin: 0 0.26rem 0.26rem 0;
              color: #403d3c;
              background: #f4f5f6;
              border-radius: 4px;
            }
          }
          .gray_line {
            height: 0.13rem;
            background: #f4f5f6;
          }
        }
        .article {
          padding: 0.27rem 0.4rem 0;
          h3 {
            font-size: 15px;
            color: #403d3c;
            margin-bottom: 5px;
            .hot_icon {
              display: inline-block;
              vertical-align: middle;
              width: 24px;
              height: 24px;
              background: url(../../assets/img/hot.png) no-repeat center center;
              background-size: 24px;
              margin-right: 0.13rem;
            }
            span {
              display: inline-block;
              vertical-align: middle;
              margin-top: 2px;
            }
          }
          ul {
            position: relative;
            height: 100%;
            li {
              font-size: 14px;
              color: #717071;
              border-bottom: 1px solid #eee;
              a {
                display: block;
                width: 100%;
                padding: 0.27rem 0;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                text-align: justify;
              }
              span {
                margin-right: 0.24rem;
                &.hot {
                  color: #00939c;
                }
              }
            }
          }
        }
      }
      .search_result-empty {
        position: absolute;
        width: 100%;
        height: 150px;
        top: 40%;
        margin-top: -75px;
        padding: 70px 0 0;
        background: url(http://s3.pstatp.com/image/toutiao_mobile/noresuiticon_seach.png)
          no-repeat center top;
        background-size: 68px;
        text-align: center;
        color: #cacaca;
        font-size: 16px;
      }
    }
  }
}
</style>

