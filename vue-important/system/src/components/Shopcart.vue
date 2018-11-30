<template>
  <div class="content">
    <!-- 这里要添加$event -->
    <ul>
      <li v-for="item in list" :key="item.id">
        {{item.price}}
        <!-- <mt-checklist title="checkbox list" v-model="value" :options="[]"> -->
      </li>
    </ul>
    </mt-checklist>
  </div>
</template>
<script>
import GoodsTodo from "@/GoodsTodo";
export default {
  name: "Shopcart",
  data() {
    return {
      options: [],
      value: [],
      list: [{ price: 10, id: 1 }, { price: 11, id: 2 }, { price: 12, id: 3 }]
    };
  },
  beforeRouteLeave (to, from, next) {
    // ...
    if(confirm("亲，你真的要离开吗")){

    }else{
      next(false)
    }
  },
  // computed:{
  //   options:function () {

  //   }
  // }
  created() {
    let goodsList = GoodsTodo.getGoodsList();
    // 获取key值，用，拼接起来
    let ids = Object.keys(goodsList).join(",");
    console.log("ids", ids);
  },
  methods: {
    getSelected(value) {
      console.log(value);
    }
  }
}
</script>
<style>
/* div{
    margin-top: 0;
  } */
</style>
