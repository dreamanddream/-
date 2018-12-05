import cache from '@/utils/cache'
import { request } from '@/utils/request'
export default {
  namespaced: true,
  state: {
    indexActive: 'news_recommend',      // active的栏目
    indexPage: { news_recommend: 1 },      // 各个栏目page的对象
    indexLocation: { news_recommend: 0 },  // 各个栏目location的对象
    // 栏目数据
    indexColumn: [{
      classname: '推荐',
      classid: 0,
      calsspath: 'news_recommend'
    }],
    currentContent: '', //当前栏目的缓存数据，为了刷新时不在此请求(，那么不就是假数据？？？？)
    indexSwiper: false
  },
  getters: {
    activeMeta: state => {
      // 当前active的栏目的index，classid，page，location
      let index = state.indexColumn.findIndex(obj => obj.classpath === state.indexActive)
      let classid = state.indexColumn[index].classid
      let page = state.indexPage[state.indexActive]
      let location = state.indexLocation[state.indexActive]
      return { index, classid, page, location }
    }
  },
  mutations: {
    set_indexActive(state, val) {
      state.indexActive = val
      cache.setSession('index_Active', val)
    },
    set_indexPage(state, obj) {
      state.indexPage = obj
      cache.setSession('index_Page', obj)
    },
    set_indexLocation(state, obj) {
      state.indexLocation = obj
      cache.setSession('index_Location', obj)
    },
    set_indexColumn(state, arr) {
      state.indexColumn = arr
      cache.setSession('index_Column', arr)
    },
    set_currentContent(state, val) {
      state.currentContent = val
      // _json是什么写法？？？？
      cache.setSession(`${state.indexActive}_json`, val)
    },
    set_indexSwiper(state, val) {
      state.indexSwiper = val
    }
  },
  actions: {
    // 获取栏目数据
    async get_indexColumn_data({ commit, state, dispatch }) {
      let res
      const data = JSON.parse(cache.getSession('index_Column'))
      if (data) {
        res = data
      } else {
        let json = await request('post', 'classID')
        res = [...state.indexColumn, ...json]
      }
      commit('set_indexColumn', res)
      // 栏目数据是动态获取的，生成对应的page、location对象
      dispatch('get_indexPage_cache', res)
      dispatch('get_indexLocation_cache', res)
      dispatch('get_indexActive_cache')
      return res
    }
  }
}
