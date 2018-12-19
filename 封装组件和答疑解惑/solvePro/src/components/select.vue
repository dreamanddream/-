<template>
  <div class="select">
    <div class="top">
      <input type="text" class="text-input" v-model="inputValue">
      <span :class="triangle?'triangleActive':'triangle'" @click="changeActive"></span>
    </div>
    <div class="select-list" v-if="triangle">
      <ul>
        <li v-for="item in selectList" :key="item.id" @click="chooseList(item.id)" :ref="'list'+item.id">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      triangle: false,
      selectList: [],
      inputValue:''
    };
  },
  methods: {
    changeActive() {
      this.triangle = !this.triangle;
      console.log(this.triangle);
    },
    chooseList (nameType) {
      // console.log(nameType)
      let value = this.$refs['list'+nameType].innerHTML;
      debugger;
      console.log(value)
      this.inputValue = this.$refs['list'+nameType].innerHTML
    }
  },
  mounted() {
    console.log(this.triangle);
    this.selectList = [
      {name:"上海",id:"1"},
      {name:"北京",id:"2"},
      {name:"天津",id:"3"},
      {name:"合肥",id:"4"},
      {name:"郑州",id:"5"},
      {name:"济南",id:"6"}
    ]
  }
};
</script>
<style lang="less">
@width:5rem;
@height:30px;
@size:16px;
.select {
  position: relative;
  .top {
    background: rgb(31, 92, 44);
    width: 5rem;
    margin: 0 auto;
    position: relative;
    .text-input {
      width: @width;
      height: @height;
      display: block;
    }
    .triangle {
      position: absolute;
      top: 8px;
      right: 5px;
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 15px;
      border-color: red transparent transparent transparent;
    }
    .triangleActive {
      position: absolute;
      top: -6px;
      right: 5px;
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 15px;
      border-color: transparent transparent red transparent;
    }
  }
  .select-list{
    width:@width;
    left:50%;
    margin-left:-@width/2;
    position: absolute;
    top:@height;
    height: 5rem;
    overflow: auto;
    background: yellow;
    font-size:@size;
    line-height: @height;
  }
}
</style>


