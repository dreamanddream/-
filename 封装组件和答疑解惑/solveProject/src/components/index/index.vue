<template>
  <div class="index">
      <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
import footers from '@/components/common/footer'
// import axios from '@/assets/util/axios'
export default{
  components:{footers},
  data () {
    return {
      newsList: []
    }
  },
  mounted() {
    console.log(config.index.banner);
    // this.$http.get('/index/baner')
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    /* // 这部分内容是为了测试二次封装的axios的
    this.newsList = [
    {title: '推荐', id: 1},
    {title: '视频', id: 2},
    {title: '热点', id: 3},
    {title: '社会', id: 4},
    {title: '娱乐', id: 5},
    {title: '军事', id: 6},
    {title: '科技', id: 7},
    {title: '汽车', id: 8},
    {title: '体育', id: 9},
    {title: '财经', id: 10},
    {title: '国际', id: 11},
    {title: '时尚', id: 12},
    {title: '游戏', id: 13},
    {title: '旅游', id: 14},
    {title: '历史', id: 15},
    {title: '探索', id: 16},
    {title: '美食', id: 17},
    {title: '育儿', id: 18},
    {title: '养生', id: 19},
    {title: '故事', id: 20},
    {title: '美文', id: 21}
]
    let json = this.$http.get('home/list',this.newsList[4]).then(res => {
      console.log("成功的res",res)
    }).catch( err => {
      console.log("失败的",res)
    }) */
    /*之前测试时使用的
    console.log(this.$route.path)
    let json =request('post', ajaxURL.itemList)
    console.log("json",this.json)
    let re= request('post',ajaxURL.apparticle.php) */
  }
}
</script>
