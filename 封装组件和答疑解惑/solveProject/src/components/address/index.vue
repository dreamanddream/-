<template>
  <div class="base-address">
    <div class="address-wrap">
      <no-data v-if="setAddress.length==0"></no-data>
      <!-- 如果还有地址，可以写在这中间 -->
      <div v-else v-for="item in setAddress">{{item}}</div>
      <div class="addAddress" @click="adds">+新增地址</div>
    </div>

  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
export default {
  data() {
    return {
      setAddress:[],
      add: true
    };
  },
  computed: {
    ...mapGetters(['address']),
    // ...mapState(['defaultAddress'])
  },
  mounted() {
    this.setAddress = this.$store.state.address.defaultAddress;
    if(this.setAddress&&this.setAddress.length>0){
      this.add=true;
    }
    console.log(this.$store.state.address.defaultAddress);
  },
  methods: {
    adds() {
      this.$router.push("/addAddress");
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

