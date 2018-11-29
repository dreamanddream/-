<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img, index) in imgs" :key="index">
        <img :src="img.Img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  name: 'mySwiper',
  data: function () {
    return {
      imgs: []
    }
  },
  props: ['url'],
  created() {
    this.$axios.get(this.url)
      .then(res => {
        this.imgs=res.data.message
      })
      .catch(err => {
        console.log("获取轮播图失败",err)
      })
  },
}
</script>
<style>

</style>

