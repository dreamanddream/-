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
        <a href='javascript:;' v-for="(item,index) in indexColumn" :class='{active: indexActive == item.classpath}' @click.stop="navClick(item.classpath)" :key="index">{{item.classname}}</a>
      </div>
    </nav>
  </div>
</template>
<script>
// 使用vuex管理状态
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  data() {
    return {
      navList: ""
    };
  },
   computed: {
    ...mapState('index',['indexActive','indexColumn']),
    ...mapGetters('index',['activeMeta'])
  },
  watch: {
    indexActive() {
      this.slideTo(this.activeMeta.index)
    }
  },
  methods: {
    ...mapMutations('index',['set_indexActive']),
    // 自己实现导航滚动
    slideTo(index) {
      this.$nextTick(() => {
        let _container=document.querySelector(".nav_ul") //获取滚动元素
      })
    }
  }
  // mounted() {
  //   this.$axios.get("/appclassid.php").then(res => {
  //     this.navList = res.data;
  //     console.log(res.data);
  //   });
  // }
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
  nav {
    position: relative;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #f4f5f6;
    border-bottom: 1px solid #ddd;
    .nav_ul {
      overflow-x: auto;
      // 在移动端可能overflow-x为scroll的滚动效果并不是很明显，
      // -webkit-overflow-scrolling设置touch那么就是可以有滚动回弹，
      // 如果设置为auto那么就还是普通滚动
      // 但是使用这个在safari上会出现卡住不动的情况，所以bug还是比较多的
      // 一般涉及到滚动还是可以使用better-scroll插件的
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
      font-size: 0;
      // 单引号伪类和双引号伪类的区别？
      // css3的新属性可以自定义webkit内核的浏览器的滚动条的样式
      // :一个冒号是伪类，用于给元素添加特殊的效果，两个冒号是伪元素
      // :fitst-child是伪类--ie7已经支持了
      // ::first-line是伪元素
      // :before和:after是伪元素，在元素前后添加内容，由于在css2中伪元素和伪类都是用单冒号，
      // 但是在css3中伪元素使用双冒号:::before,:::after
      // 又明白了一个问题：p:nth-child(2)不考虑元素类型，如果是a p.fist这样排列，
      // 那么p.first就属于第二个元素
      // p:nth-of-type(2)是匹配类型,(a,p.first,p.two),p.two就是第二个元素
      // 问题记录：使用伪类清除浮动的原理是什么？background-size的具体使用
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      a {
        display: inline-block;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 5px;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 16px;
        color: #505050;
        white-space: nowrap;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
        text-decoration: none;
        &:last-child {
          margin-right: 5px;
        }
        &.active {
          color: #00939c;
          border-bottom: 2px solid #00939c;
        }
      }
    }
    .nav_menu {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      .shadow {
        position: absolute;
        width: 10px;
        height: 100%;
        left: -10px;
        background-size: contain;
        background-color: rgba(244, 245, 246, 0.3);
      }
      .more_btn {
        display: block;
        width: 40px;
        height: 100%;
        background-size: 20px;
        background-color: #f4f5f6;
      }
    }
  }
}
#indexHeader .title {
  background: url("~@/assets/img/news_logo.png") no-repeat center center;
  background-size: contain;
}
#indexHeader .search_btn {
  background: url("~@/assets/img/search.png") no-repeat center center;
}
#indexHeader .shadow {
  background: url("~@/assets/img/shadow.png") no-repeat 100%;
}
#indexHeader .more_btn {
  background: url("~@/assets/img/menu_more.png") no-repeat 50%;
}
</style>

