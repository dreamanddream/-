<template>
  <div>
    <ul class="detail">
      <li v-for="(item, index) in message" :key="index" class="clearfix">
        <p>发起日期：2018-10-09</p>
        <p>浏览量：20</p>
        <p></p>
        <div class="photoGallery">
          <!-- <img :src="im.imgs" alt="" v-for="(im, ind) in item.img" :key="ind"> -->
          <!-- 对图片使用缩略图 -->
          <vue-preview :slides="imgs" @click="handleClose"></vue-preview>
        </div>
        <p>{{item.description}}</p>
      </li>
      <!-- 使用评论组件 -->
      <comment></comment>
    </ul>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      message: [],
      imgs: []
    }
  },
  created () {
    this.$axios.get('photo/detail')
      .then(res => {
        this.message=res.data.message
        this.imgs=this.message[0].img
        console.log(this.imgs)
        this.imgs.forEach(img => {
          img.msrc=img.src
        });
        console.log(res.data.message)
      })
      .catch(err =>{
      })
  },
  methods: {
    handleClose () {
        console.log('close event')
      }
  }
}
</script>
<style lang="">
.detail{
  width:100%;
}
.clearfix:after{
  content:"";
  clear: both;
  height: 0;
  visibility: hidden;

}
  .detail li div{
   float:left;
  }
  .photoGallery{
    width:100%;
  }
  .photoGallery figure{
    float: left;
  }
  .photoGallery img{
    width:90px;
    height:90px;
  }
</style>