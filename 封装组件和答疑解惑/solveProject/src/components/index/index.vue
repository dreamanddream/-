<template>
  <div class="index">
      <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
import footers from '@/components/common/footer'
import axios from '@/assets/util/axios'
export default{
  components:{footers},
  mounted() {
    let json = axios.get('get',"1").then(res => {
      console.log("成功的res",res)
    }).catch( err => {
      console.log("失败的",res)
    })
    /*之前测试时使用的
    console.log(this.$route.path)
    let json =request('post', ajaxURL.itemList)
    console.log("json",this.json)
    let re= request('post',ajaxURL.apparticle.php) */
  },
}
</script>
