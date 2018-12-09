<template>
  <swiper :options="swiperOption" id="swiper-box" ref="mySwiper">
    <swiper-slide v-for='(item,index) in indexColumn' :key='index'>
      <pull-container :type='item.classpath'></pull-container>
      <!-- <div style="height:200px;">{{item.classname}}栏目</div> -->
    </swiper-slide>
  </swiper>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import pullContainer from './pullContainer'
export default {
  components: { pullContainer },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        // swiper中回调函数
        on: {
          slideChange: this.slideChangeCallBack,
          sliderMove: this.slideMoveCallBack,
          touchEnd: this.touchEndCallBack
        }
      }
    };
  },
  computed: {
    ...mapState("index", ["indexActive", "indexColumn"]),
    ...mapGetters("index", ["activeMeta"])
  },
  watch: {
    indexActive(val) {
      this.slideToo(300);
    }
  },
  methods: {
    ...mapMutations("index", ["set_indexActive", "set_indexSwiper"]),
    // 明白了为什么点击头部栏目，swiper内容会跟着切换了，因为watch监听
    // 一旦点击就会改变indexActive的值，然后在watch中的调用slideToo方法，调用后会执行swiper的slidto方法，从而实现滚动
    slideToo(second) {
      // 使用swiper中slideTo方法,swiper切换到指定slide，index是指定将要切换到的slide索引,第二个参数是速度
      // 用手指滑过屏幕切换时触发
      // 调用swiper的slideTo方法
      // 使用ref获取dom元素
      this.$refs.mySwiper.swiper.slideTo(this.activeMeta.indexs, second, true); // 让swiper滚动到index位置
    },
    slideChangeCallBack() {
      let swiper = this.$refs.mySwiper.swiper
      let index = swiper.activeIndex;
      this.set_indexActive(this.indexColumn[index].classpath); // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
      console.log("slideChangeCallBack");
    },
    // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
    slideMoveCallBack() {
      this.set_indexSwiper(true);
      console.log("slideMoveCallBack");
    },
    // 移动结束设为false，这是为了移动结束时，可以下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
    touchEndCallBack() {
      this.set_indexSwiper(false);
      console.log("touchEndCallBack");
    }
  },
  mounted() {
    this.slideToo(0);
    // dom渲染完毕后这个就会执行
    console.log("mounted");
  }
};
</script>
<style lang='less'>
#swiper-box {
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #fff;
  padding-top: 80px;
}
</style>
