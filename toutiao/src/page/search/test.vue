<template>
  <div>
    <input type="text" placeholder="我是文本框" ref="input">
    <!-- 如果不留坑，父组件使用时不能添加内容 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  methods:{
    focuss () {
      this.$refs.input.focus()
    }
  }
}
</script>
