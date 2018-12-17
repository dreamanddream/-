<template>
  <div class="setting">
    <p>点我返回顶部</p>
    <div ref="contentJson" class="new">
       <list-item :itemJson="contentJson"   />
    </div>
    
    <!-- <input type="text" placeholder="我是文本框" ref="input"> -->
    <!-- 如果不留坑，父组件使用时不能添加内容 -->
    <!-- <slot></slot> -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data () {
    return {
       contentJson: [], // 整个列表数据
    }
  },
  computed: {
     ...mapState("index", [
      "indexActive",
      "indexPage"
    ]),
    ...mapGetters("index", ["activeMeta"])
  },
  watch: {
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
  mounted () {
    this.init();
    // let item_wrap = this.$refs.contentJson.$el;
    let item_wrap = this.$refs.contentJson;
    debugger;
    console.log("高度",item_wrap.offsetHeight)
    // debugger;
    console.log("item_wrap", item_wrap)
    item_wrap.addEventListener("scroll",function () {
      // let _height=item_wrap.scrollTop;
      let _height = document.documentElement.scrollTop || document.body.scrollTop;
      console.log("动态监听滚动", _height);
    })
  },
  methods:{
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
    init () {
      this.get_listItem_cache(this.indexActive).then(res => {
          if (res) {
            this.contentJson = res;
            console.log("这是缓存的res吗", res);
            // qign
            this.loading = false;
            // console.log("渲染首页数据if",res,this.contentJson.length)
          } else {
            //   如果没有缓存那就重新请求
            // this.loadTopAjax();
            console.log("渲染首页数据");
          }
        });
    },
    focuss () {
      this.$refs.input.focus()
    }
  }
}
</script>
<style lang="less">
.setting{
  height:100%;
}
.new{
  height:100%;
  overflow: auto;
}

</style>