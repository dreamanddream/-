<template>
  <div class="select">
    <div class="top">
      <input type="text" class="text-input" v-model="inputValue" :readonly="isWrite?'':'readonly'">
      <span :class="triangle?'triangleActive':'triangle'" @click="changeActive"></span>
    </div>
    <div class="select-list" v-if="triangle">
      <ul>
        <li v-for="item in selectList" :key="item.id" @click="chooseList(item.name)" :ref="'list'+item.name">{{item.name}}</li>
      </ul>
      <slot name="newStyleList"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:['selectList','isWrite'],
  data() {
    return {
      triangle: false,
      inputValue:''
    };
  },
  methods: {
    changeActive() {
      this.triangle = !this.triangle;
    },
    chooseList (nameType) {
      // 这里犯了一个错误，this.$refs['list'+nameTyep]是一个数组，数组怎么会有innerHTML？
      // let value = this.$refs['list'+nameType][0].$el;
      let value = this.$refs['list'+nameType][0].innerHTML;
      console.log(value);
      // debugger;
      // let value = this.$refs['list'+nameType][0].innerHTML
      this.triangle = !this.triangle;
      this.inputValue = nameType;
    },
    cancelSelectList () {
      let _this = this;
      document.addEventListener("click",function () {
        debugger;
        console.log("点击监听",_this.triangle);
        if(_this.triangle){
           _this.triangle = !_this.triangle;
        }
      },false)
    }
  },
  mounted() {
    // this.cancelSelectList();
    console.log(this.selectList)
    console.log(this.isWrite)
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
