<template>
  <div id="index">
    <index-header/>
  </div>
</template>
<script>
import indexHeader from './components/index_header'
import { mapActions } from 'vuex';
export default {
  components:{
    indexHeader
  },
  methods: {
    ...mapActions('index', [
      'get_indexColumn_data'
    ])
  },
  created() {
    this.get_indexColumn_data()
    //  console.log("首页",this.get_indexColumn_data())
  }
}
</script>
<style lang="less">
#index{
  width:100%;
}
</style>

