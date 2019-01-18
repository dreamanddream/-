// import vue from 'vue'
import { Cookie } from '@/assets/util/local'

const address = {
  state: {
    defaultAddress: []
  },
  mutations: {
    setdefaultAddress (state,val) {
      state.defaultAddress.push(val);
      // 这里可以设置cookie存储
    }
  }
}
export default address;
