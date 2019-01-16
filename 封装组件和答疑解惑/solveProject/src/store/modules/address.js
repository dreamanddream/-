// import vue from 'vue'
import { Cookie } from '@/assets/util/local'

const addressStatus = {
  state: {
    defaultAddress: ''
  },
  mutations: {
    userAddress (state,val) {
      state.defaultAddress = val;
      // 这里可以设置cookie存储
    }
  }
}
export default addressStatus;
