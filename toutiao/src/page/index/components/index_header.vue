<template>
  <div id="indexHeader">
    <!-- 首页头部 -->
    <header>
      <div class="top_bar">
        <div class="abs_l"></div>
        <div class="abs_m">
          <a href="javascript:void(0)" class="title" @click.stop="goTop"></a>
        </div>
        <div class="abs_r">
          <a href="javascript:void(0)" class="search_btn" @click.stop="$router.push('/search')"></a>
        </div>
      </div>
    </header>
    <!-- 可以滑动的栏目 -->
    <nav>
      <div class="nav_ul">
        <a href='javascript:;'  v-for="(item,index) in indexColumn" :class='[{active: indexActive == item.classpath},item.classid]' @click.stop="navClick(item.classpath)" :key="index">{{item.classname}}</a>
      </div>
      <div class="add" @click="chooseItem">+</div>
    </nav>
  </div>
</template>
<script>
// 使用vuex管理状态
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  // 使用...拓展运算符可以将state中indexActive对应映射为indexActive，这样就可以通过
  // this.indexActive访问到，不需要使用this.$store.state.indexActive
  computed: {
    ...mapState("index", ["indexActive", "indexColumn"]),
    ...mapGetters("index", ["activeMeta"])
  },
  watch: {
    // 实现监听，如果indexActive值有变化，那么就执行slideto
    indexActive( news, old) {
      // 执行slideto方法，同时也会自动更新getter中activeMeta元素
      this.slideTo(this.activeMeta.indexs);
      // console.log(news,old)
      //
      // console.log("我是watch", this.activeMeta.indexs);
    }
  },
  methods: {
    // ...mapMutation把本组件的mutations映射到set_indexActive方法里(set_indexActive在mutations里)
    // 之前写法是this.$store.commit('set_indexActive',city)
    ...mapMutations("index", ["set_indexActive"]),
    navClick(type) {
      // console.log(this.indexActive)
      // console.log(this.indexColumn)
      // this.slideTo(this.activeMeta.indexs)
      this.set_indexActive(type); // 点击栏目更新vuex中idnexActive值，也就是state中idnexActive会更新，同时getters中index以及涉及到classid都会更新
    },
    // 点击加号选择栏目
    chooseItem () {
      this.$router.push({
        name:"channel"
      })
    },
    // 自己实现导航滚动
    slideTo(index) {
      // console.log("动态index", index);
      this.$nextTick(() => {
        let _container = document.querySelector(".nav_ul");
        // querySelectorAll得到的是一个数组
        let _columnAll = document.querySelectorAll(".nav_ul a"); //获取滚动元素
        // 获取数组中对应active类的元素
        let _column = _columnAll[index];
        // 原生js的滚动与获取各种宽和高
        if (_column) {
          let move;
          let _containr_width = _container.offsetWidth; // 容器宽度
          // console.log(_containr_width);
          let _container_left = _container.scrollLeft; // 容器滚动条的值
          // console.log(_container_left);
          let _column_width = _column.offsetWidth; // 元素的宽度
          let _column_left = _column.offsetLeft; // 当前选中元素距离屏幕左边的宽度
          let midWidth = (_containr_width - _column_width) / 2; // 屏幕中心线的宽度
          // 判断是否滚动
          if (_container_left == 0 && _column_left <= midWidth) {
            move = 0;
          } else {
            // 动态计算，让每次
            move = _container_left + (_column_left - midWidth);
            // console.log(_container_left,_column_left,midWidth)
          }
          // 自执行滚动动画向左
          (getLeft => {
            // let timer = setInterval(function () {
            // let ispeed = Math.floor(-move/5)
            // if (Math.abs(_container.scrollLeft) == 0) {
            //   clearInterval(timer)
            // }
            // _container.scrollLeft = _container.scrollLeft + ispeed
            // console.log(" _container.scrollLeft",_container.scrollLeft)
            // }, 20)
            _container.scrollTo({
              left: move,
              behavior: "smooth"
            })
            // console.log("move", move);
          })();

          sessionStorage.setItem("navScrollLeft", move);
        }
      });
    },
    // 滚动恢复
    scrollRecover() {
      let move = sessionStorage.getItem("navScrollLeft");
      if (move) {
        this.$nextTick(() => {
          let _container = document.querySelector(".nav_ul");
          _container.scrollLeft = move;
        });
      }
    },
    // 滚动到顶部
    goTop() {
      //设置一个定时器
      let timer = setInterval(function() {
        //获取滚动条的滚动高度
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop
        //用于设置速度差，产生缓动的效果
        var speed = Math.floor(-osTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + speed;
        // isTop = true; //用于阻止滚动事件清除定时器
        if (osTop == 0) {
          clearInterval(timer);
        }
      }, 30)
    },
    // vue中activated周期，activated钩子是要在keep-alive下才能使用
    activated() {
        this.scrollRecover()
    }
  }
};
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
    height: 50px;
    line-height: 50px;
    background-color: #f4f5f6;
    border-bottom: 1px solid #ddd;
    padding-right: 50px;
    .add{
      width:50px;
      height:50px;
      background: yellow;
      position: absolute;
      top:0;
      right:0;
      z-index: 20;
    }
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

