<template>
  <div class="base-address">
    <div class="address-wrap" v-if="add">
      <no-data v-if="address.length==0"></no-data>
      <!-- 如果还有地址，可以写在这中间 -->
      <div class="addAddress" @click="adds">+新增地址</div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: [],
      add: true
    };
  },
  methods: {
    adds() {
      this.$router.push("/address/addAddress");
      this.add = false;
    }
  }
};
</script>
<style lang="less" scoped>
.addAddress {
  text-align: center;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  font-size: 20px;
  color: #fff;
  padding: 0.5rem;
  background: #8b3412;
}
</style>

