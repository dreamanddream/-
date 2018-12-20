<template>
  <div class="index">
      <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
import footers from '@/components/common/footer'
import {request,ajaxURL} from '@/assets/util/axios'
export default{
  components:{footers},
  mounted() {
    console.log(this.$route.path)
    let json =request('post', ajaxURL.itemList)
    console.log("json",this.json)
  },
}
</script>
