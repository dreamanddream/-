<template>
  <div>
    <my-swiper :url="urls"></my-swiper>
    <p class="title">{{title}}</p>
    <button @click="aa">dianji</button>
  </div>
</template>
<script>
export default {
  name: 'GoodDetail',
  props:{
    url:{
      type:Object,
    }
  },
  data () {
    return {
        id: 1,
        urls:this.url,
        a:1,
       // title:"".
        titles:{
          a:{
            b:{
              name:"sss"
            }
          }
        }
    }
  },
  methods:{
    aa(){
      this.a =this.a+1;
       this.titles.a.b.name = this.a+1
      
    }
  },
  computed:{
    title:function(){
      return this.a
    }
  },
  watch:{
    title:function( newValue,oldValue){
      if(newValue !=oldValue){
          // alert(newValue)
      }
    },
    titles:{
      deep:true,
      handler:function( newValue , oldValue){
        console.log(oldValue.a.b.name)
        console.log(newValue.a.b.name)
        if(newValue.a.b.name != oldValue.a.b.name){
            alert(newValue.a.b.name)
        }
          
      }
    }
  },
  created() {
    this.id=this.$route.query.id || 1
    this.urls="goods/detail/imgs?id="+this.id;
    let _this =this;
    this.$axios.get("/goods/detail?id=" + this.id)
      .then(res => {
        this.goods=res.data.message
        // _this.title=this.goods.title
       // console.log(this.goods.title)
      })
      .catch(err => {
        console.log("详情数据获取失败",err)
      })
  },
}
</script>
<style scoped>
  .title{
    font-size:16px;
  }
</style>

