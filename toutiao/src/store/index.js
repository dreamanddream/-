import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'
import search_module from './search/index'
import detail_module from './detail/index'

Vue.use(Vuex)
// 本项目使用vuex中的modules,每个模块都有自己的getter，mutations，actions
const state = {
}
const getters = {
}
const mutations = {
}
const actions = {
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // index作为模块名字，在使用...展开时使用名字引入对应的状态
    index: index_module,
    // search
    search: search_module,
    // detail
    detail: detail_module
  }
})
