<template>
  <div id="indexHeader">
    <!-- 首页头部 -->
    <header>
      <div class="top_bar">
        <div class="abs_l"></div>
        <div class="abs_m">
          <a href="" class="title"></a>
        </div>
        <div class="abs_r">
          <a href="" class="search_btn"></a>
        </div>
      </div>
    </header>
    <!-- 可以滑动的栏目 -->
    <nav>
      <div class="nav_ul">
        <a href="javascript:void(0);" v-for="(item,index) in navList"
        :key="item.classid">{{item.classname}}</a>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navList: ''
    }
  },
  mounted() {
    this.$axios.get('/appclassid.php')
      .then(res => {
        this.navList=res.data
        console.log(res.data);
      })
  }
}
</script>
<style lang="less">
#indexHeader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  overflow: hidden;
  header {
    display: block;
    position: relative;
    overflow: hidden;
    background-color: #00939c;
    color: #fff;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    .title {
      background-size: 145px;
    }
    .search_btn {
      background-size: 24px;
    }
    .top_bar {
      position: relative;
      height: 44px;
      line-height: 44px;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      .abs_l,
      .abs_m,
      .abs_r {
        position: absolute;
        top: 0;
        width: 44px;
        height: 100%;
        font-size: inherit;
        color: inherit;
        text-align: center;
      }
      .abs_l {
        left: 0;
        z-index: 1000;
      }
      .abs_m {
        width: 100%;
        font-weight: 700;
        z-index: 999;
      }
      .abs_r {
        right: 0;
        z-index: 1000;
      }
    }
  }
}
#indexHeader .title {
    background: url('~@/assets/img/news_logo.png') no-repeat center center;
    background-size: contain;
}
#indexHeader .search_btn {
    background: url('~@/assets/img/search.png')no-repeat center center;
}
#indexHeader .shadow {
    background: url('~@/assets/img/shadow.png') no-repeat 100%;
}
#indexHeader .more_btn {
    background: url('~@/assets/img/menu_more.png') no-repeat 50%;
}
</style>

