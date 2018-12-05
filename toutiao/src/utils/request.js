import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/'
// 各个接口地址
const ajaxURL = {
  // 主页
  classID: 'appclassid.php', //导航栏目
  Class: 'appclass.php',     //每个栏目下对应的数据
  Stick: 'appistop.php',     //栏目置顶
  // 详情页
  Article: 'apparticle.php',  //文章详情
  Recommend: 'apptuijian.php',// 文章推荐
  // 搜索页
  Search: 'search.php'        //搜索
}
// 封装请求
// type = POST是一个“=”？
export var request = async (type = 'POST', url = '', data = {}) => {
  let result
  tyep=type.toUpperCase()
  // 传递url
  url = ajaxURL[url]
  if (type === 'GET') {
    await $axios.get(url ,{params:data})
    .then(res => {
      result = res.data
    })
  } else if (type === 'POST') {
    await $axios.post(url, qs.stringify(data))
    .then(res => {
      result = res.result
    })
  }
  return result
}


