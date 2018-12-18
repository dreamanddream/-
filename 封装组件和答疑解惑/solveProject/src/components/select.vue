<template>
  <div class="select">
      <div class="top">
        <input type="text" class="text-input">
        <span class="triangle"></span>
      </div>
  </div>
</template>
<script>

</script>
<style lang="less">
.top{
  position: relative;
  width:5rem;
  margin:0 auto;
  .text-input{
  border:1px solid #333333;
  width:5rem;
  height:30px;
  display: block;
  }
  .triangle{
    display: block;
    width:0;
    height:0;
    border-width:15px;
    border-style: solid;
    border-color: red transparent transparent transparent;
    position:absolute;
    top:8px;
    right:3px;
  }
}

</style>
