<template>
  <div id="index">
    <!-- 头部 -->
    <index-header/>
    <!-- 内容区域 -->
    <swiper-container/>
    <!-- 子页面频道视图 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import indexHeader from './components/index_header'
import swiperContainer from './components/swiperContainer'
import { mapActions } from 'vuex';
export default {
  components:{
    indexHeader,
    swiperContainer
  },
  methods: {
    ...mapActions('index', [
      'get_indexColumn_data'
    ])
    // ...mapActions(['get_indexC'])
  },
  created() {
    // 刚进入页面时会使用mapActions，this.get_indexColumn_data()相当于dispatch调用
    this.get_indexColumn_data()
    //  console.log("首页",this.get_indexColumn_data())
  },
  mounted() {
    
  },
}
</script>
<style lang="less">
#index{
  width:100%;
}
</style>

