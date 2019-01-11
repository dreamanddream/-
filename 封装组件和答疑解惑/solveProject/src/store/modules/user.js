import vue from 'vue'
import { Cookie } from '@/assets/util/local'
import axioss from '@/assets/util/axios'

const user = {
  state: {
    isLogin: false,
    user: {
      name: Cookie.get('username') || '',
      avatar: Cookie.get('avatar') || ''
    },
    footerBarList: [
      { title: '首页' },
      { title: '西瓜视频' },
      { title: '微头条' },
      { title: `${Cookie.get('username')}?'我的':'未登录'` }
    ]
  },
  actions: {
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        console.log("看看登录是否执行");
        console.log(params);
        axioss.post('login', params)
        .then(res => {
            console.log("看看登录是否执行");
            commit('LOGIN', res.data);
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
      })
    },
    // 执行调用的esc
    esc({ commit }) {
      commit('ESC')
    }
  },
  mutations: {
    LOGIN(state, data) {
      state.user = {
        name: data.username,
        // 引入图片
        avatar: require('@/assets/images/avatar.png')
      }
      Cookie.set({
        username: data.username,
        avatar: require('@/assets/images/avatar.png')
      })
    },
    ESC(state) {
      state.user = {
        name: '',
        avatar: ''
      }
      Cookie.remove(['username', 'avatar'])
    }
  }
}
export default user;
