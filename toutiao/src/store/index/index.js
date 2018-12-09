import cache from '@/utils/cache'
import { request } from '@/utils/request'
export default {
  namespaced: true,
  state: {
    indexActive:'news_recommend',      // active的栏目
    indexActive: 'news_recommend',      // active的栏目
    indexPage: { news_recommend: 1 },      // 各个栏目page的对象
    indexLocation: { news_recommend: 0 },  // 各个栏目location的对象
    // 栏目数据
    indexColumn: [{
      classname: '推荐',
      classid: 0,
      calsspath: 'news_recommend'
      // classpath: '0'
    }],
    currentContent: '', //当前栏目的缓存数据，为了刷新时不在此请求(，那么不就是假数据？？？？)
    indexSwiper: false
  },
  getters: {
    activeMeta: state => {
      // 获取对应的indexs，自己写的方法，之前的findIndex不执行
      function getIndex () {
        let indexs=0;
        state.indexColumn.forEach(function(item,index){
          if(item.classpath==state.indexActive){
            console.log("当前index",index)
            indexs=index
          }
        })
        return indexs
      }
      let indexs = getIndex()
      console.log("state.indexColumn", state.indexColumn)
      console.log("我是getters中index", indexs)
      let classid = state.indexColumn[indexs].classid
      let page = state.indexPage[state.indexActive]
      let location = state.indexLocation[state.indexActive]
      return { indexs, classid, page, location }
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
    // 当前项index设置true或者false是什么，要控制什么？
    set_indexSwiper(state, val) {
      state.indexSwiper = val
    }
  },
  actions: {
    // 获取active栏目缓存
    get_indexActive_cache({ commit, dispatch }) {
      const data = cache.getSession('index_Active')
      if (data) {
        commit('set_indexActive', data)
      } else {
        commit('set_indexActive', '0')
      }
    },

    // 获取page缓存
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

    // 获取location缓存
    get_indexLocation_cache({ commit }, indexColumn) {
      const data = JSON.parse(cache.getSession('index_Location'))
      if (data) {
        commit('set_indexLocation', data)
      } else {
        if (indexColumn) {
          let locationObj = {}
          indexColumn.forEach(item => {
            locationObj[item.classpath] = 0
          })
          commit('set_indexLocation', locationObj)
        }
      }
    },

    // 获取列表数据缓存
    get_listItem_cache({ commit, state }, activeType) {
      let data = JSON.parse(cache.getSession(`${state.indexActive}_json`))
      return data
    },

    // 获取栏目数据
    async get_indexColumn_data({ commit, state, dispatch }) {
      let res
      // const data = JSON.parse(cache.getSession('index_Column'))
      // 首先获取缓存的data
      const data = null
      console.log("存储的data",data)
      if (data) {
        res = data
      } else {
        let json = await request('post', 'classID')
        console.log("动态获取的",json)
        // 由于json是个对象，动态获取的数据中json.message才是数组,这个是请求自己的rap接口时才有message
        // res = [...state.indexColumn, ...json.message]
        res = [...state.indexColumn, ...json]
        console.log("res",res)
      }
        console.log("indexColumn",...state.indexColumn)
        console.log("res",res)
      commit('set_indexColumn', res) // 更新mutation中set_indexColunm中的state.indexColumn值
      // 栏目数据是动态获取的，生成对应的page、location对象
      dispatch('get_indexPage_cache', res)
      dispatch('get_indexLocation_cache', res)
      dispatch('get_indexActive_cache')
      return res
    },

    // 获取文章列表数据
    async get_listItem_data({ getters }, page) {
      let params = {
        'classid': getters.activeMeta.classid,
        'page': page
      }
      let res = await request('post', 'Class', params)
      return res
    },

    // 获取置顶数据
    async get_stick_data({ commit, getters }) {
      let params = {
        'classid': getters.activeMeta.classid,
        'type': 'stick'
      }
      let res = await request('post', 'Stick', params)
      return res
    },

    // 获取banner数据
    async get_banner_data({ commit, getters }) {
      let params = {
        'classid': getters.activeMeta.classid,
        'type': 'banner'
      }
      let res = await request('post', 'Stick', params)
      return res
    },

    // 获取频道数据
    async get_channel_data({ state }) {
      let res = await request('post', 'classID', { 'channel': 'channel' })
      return res
    }
  }
  // actions: {
  //   // 获取栏目数据
  //   async get_indexColumn_data({ commit, state, dispatch }) {
  //     let res
  //     const data = JSON.parse(cache.getSession('index_Column'))
  //     if (data) {
  //       res = data
  //     } else {
  //       let json = await request('get', 'classID')
  //       console.log("json",json);
  //       res = [...state.indexColumn, ...json]
  //     }
  //     // 显示提交commit修改
  //     commit('set_indexColumn', res)
  //     // 栏目数据是动态获取的，生成对应的page、location对象
  //     // dispatch('get_indexPage_cache', res)
  //     // dispatch('get_indexLocation_cache', res)
  //     // dispatch('get_indexActive_cache')
  //     return res
  //   }
  // }
}
