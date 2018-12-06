import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/'
axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/120205'
// 各个接口地址
const ajaxURL = {
  // 主页
  classID: 'news/title', //导航栏目
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
  type=type.toUpperCase()
  // 传递url
  url = ajaxURL[url]
  if (type === 'GET') {
    // 这里为什么不能使用$axios呢？？？？
    await axios.get(url ,{params:data})
    .then(res => {
      result = res.data
    })
  } else if (type === 'POST') {
    await axios.post(url, qs.stringify(data))
    .then(res => {
      result = res.result
    })
  }
  return result
}


