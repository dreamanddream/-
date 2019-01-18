import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// import state from './state'
// import mutations from './mutations'
// import createLogger from 'vuex/dist/logger'
import getters from './getters'
import cart from './modules/cart'
import user from './modules/user'
import address from './modules/address'
const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
const store = new Vuex.Store({
 modules: {
  cart,
  user,
  address
 },
  getters,
})

export default store
// const state = {
//   showFooter:true,
//   changableNum:0
// }
// 监听state中对象状态的改变
// 如果没有getters监听，那么通过mutations改变后，打印出来的还是初始值
// const getters = {
//   showFooter (state) {
//     return state.showFooter
//   },
//   changableNum (state) {
//     return state.changableNum
//   }
// }
// 改变state中的对象的初始值
// const mutations = {
//   // 自定义改变state中值改变的方法
//   showFooter (state) {
//     state.showFooter = true;
//   },
//   changableNum (state, num) {
//     state.changableNum += num
//     // console.log(state.changableNum);
//   }
// }
 /* 异步改变state中值，也就是异步触发mutations中的方法,外部组件执
    行actions中的方法需要使用dispatch
 */
/* const actions = {
  //  context具有和state同样的属性和方法
  changableNum (context, num) {
    context.commit("changableNum",num)
    // console.log("actions",context.changableNum);
  },
  //  也可以用也可以不使用context，使用{commit}
  changableNum ({commit}, num) {
    commit("changableNum",num)
    // console.log("actions",context.changableNum);
  },
  // 也可以不使用context，使用{commit}
  get_indexPage_cache({ commit }, indexColumn) {
    const data = JSON.parse(cache.getSession('index_Page'))
    if (data) {
      commit('set_indexPage', data)
    } else {
      if (indexColumn) {
        let pageObj = {}
        indexColumn.forEach(item => {
          pageObj[item.classpath] = 1
        })
        commit('set_indexPage', pageObj)
      }
    }
  },
} */

// export default new Vuex.Store({
// 	actions,
// 	getters,
// 	state,
// 	mutations,
// 	strice: debug,
// 	plugins: debug ? [createLogger()] : []
// })
