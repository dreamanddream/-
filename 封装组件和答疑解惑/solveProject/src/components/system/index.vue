<template>
  <div class="base_system">
    <div>我们的</div>
    
    <mt-switch v-model="value" @change="getValue"></mt-switch>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    getValue (){
      console.log(this.value)
    }
  },
}
</script>
<style lang="less" scoped>

</style>

