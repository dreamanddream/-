import Vue from 'vue'
import axios from 'axios'
// import mintUi from 'mint-ui'
// 引入对应的css
// import 'mint-ui/lib/style.css'
// 全局注册
// Vue.use(mintUi)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/'
// export const ajaxURL = {
//   // banner:'',
//   itemList: 'appclass.php',
//   // 详情页
//   article:'apparticle.php', // 文章
//   // 搜索页
//   search: 'search'
// }
// 封装请求的函数
/* 如果配置拦截器，axios.interceptors只针对baseURL这种统一设置的url有拦截效果
*  如果是自己创建的则要单独拦截
*  var inter = axios.create();
*  全局拦截请求还有个问题，就是每个请求都会loading，如果一个页面多个请求
*  给用户的感觉就会看到loading闪烁出现，所以最好有个变量可以统计每个页面的接口数量
*  所有的接口都请求响应完后loading才消失 */

// 添加请求拦截器,一般不会在拦截器中写加载
/* axios.interceptors.request.use(function (config) {
  // 发送请求前做某事
  mintUi.Indicator.open({
    text:'玩命加载中'
  })
  return config
},function(error){
  // 请求错误时做某事
  return Promise.reject(error)
}) */
// 添加响应拦截器
//添加响应拦截器
/* axios.interceptors.response.use(function(response){
  //对响应数据做些事
  // 把mintui单词写错，就会报错
  mintUi.Indicator.close()
   return response;
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});
export default axios; */
/* export var request = async(type = 'POST', url = '', data = {}) => {
  let result;
  type = type.toUpperCase();
  if(type === 'GET') {
    await axios.get(url, {param: data})
      .then(res => {
        result = res.data;
      })
      .catch(err => {
        console.log("请求错误"+err);
      })
  }else if (type === 'POST') {
    // 这里应该使用qs.stringfy,不过我没有安装，就用的JSON.stringfy
    // await axios.post(url, qs.stringify(data))
    await axios.post(url, JSON.stringify(data))
     .then(res => {
       result = res.data;
     })
     .catch(err => {
       console.log("请求错误"+err)
     })
  }
  return result;
} */

// ​ axios默认是请求的时候不会带上cookie的，需要通过设置withCredentials: true来解决。
axios.defaults.withCredentials = true
// 发送时
axios.interceptors.request.use(config => {
  // 开始
  return config
},err => {
  console.log("请求发送时的报错"+Promise.reject(err));
  return Promise.reject(err)
})
// 响应时
axios.interceptors.response.use(
  response => response,
  err => {
    console.log("请求响应时的报错"+Promise.reject(err))
    Promise.reject(err)
  }
)
// 检查状态码
function checkStatus (res) {
  if(res.status === 200 || res.status === 304) {
    return res.data
  }
  return {
    code: 0,
    msg: res.data.msg || res.statusText,
    data: res.statusText
  }
}
// 检查code值
function checkCode (res) {
  if (res.code === 0) {
    throw new Error(res.msg)
  }
  return res
}
const baseURL = 'https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/'
const testUrl="https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/";//测试环境
const devUrl="https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/";//线上环境
const isUrl=true//线上环境为true
const ajaxUrl=isUrl?testUrl:devUrl;
export default {
  // get和post的差异点，get使用params,也可以不加，直接写一个对象，而post要用data，data值是一个对象
  get(url, params) {
    if(!url) return;
    return axios ({
      method: 'get',
      url: ajaxUrl + url,
      params,
      // 传递timeout是什么
      timeout: 30000
    }).then(checkCode).then(checkCode)
  },
  post(url, data) {
    if (!url) {
      return axios({
        method: 'post',
        url:ajaxUrl+url,
        data:JSON.stringify(data),
        timeout: 30000
      }).then(checkStatus).then(checkCode)
    }
  },
  // 上传文件
  postFile(url, data) {
    if (!url) return
    return axios({
      method: 'post',
      url:ajaxUrl+url,
      data
    }).then(checkStatus).then(checkCode)
  }
}
