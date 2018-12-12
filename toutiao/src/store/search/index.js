import { request } from '@/utils/request'
export default {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        // 获取热点数据
        async get_hot_data() {
          // 使用封装好的request提交方式
            let res = await request('post', 'Search')
            return res
        },

        // 获取搜索数据
        async get_search_data({ commit, state }, { key, page }) {
            let res = await request('post', 'Search', { 'key': key, 'page': page })
            return res
        }
    }
}
