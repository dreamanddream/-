import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'

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
    index: index_module
  }
})
