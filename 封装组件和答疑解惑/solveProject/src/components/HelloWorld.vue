<template>
  <div class="hello">
    <i class="icon iconfont icon-select_fill"></i>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <select-list :selectList="selectItem" :isWrite="false"></select-list>
    <router-link to="/select">点击跳转</router-link>
  </div>
</template>

<script>
import selectList from './select'
export default {
  name: 'HelloWorld',
  components: {selectList},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selectItem: [],
      write:false
    }
  },
  mounted() {
     this.selectItem = [
      {name:"上海",id:"1"},
      {name:"北京",id:"2"},
      {name:"天津",id:"3"},
      {name:"合肥",id:"4"},
      {name:"郑州",id:"5"},
      {name:"济南",id:"6"}
    ]
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--添加上scoped可以避免和子组件的样式冲突，父组件的样式就不会作用在子组件上-->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
