<template>
  <div>
    <nav-bar title="aa"></nav-bar>
    <div class="content">
        <div v-html=""></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      aa: ''
    }
  },
  created () {
    var id = parseInt(this.$route.query.id)
    console.log(id)
    this.$axios.get('news/detail' + id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err, '新闻详情内容')
      })
  }
}
</script>
<style>
</style>
