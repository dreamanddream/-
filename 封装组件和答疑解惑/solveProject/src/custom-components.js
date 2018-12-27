// 当前文件和components文件夹在同一路径下
import loading from '@/components/common/loading'
import noneData from '@/components/common/noData'
import pageLoading from '@/components/common/pageLoading'

const install = Vue => {
  Vue.component('my-loading', loading);
  Vue.component('none-data', noneData);
  Vue.component('pageLoading', pageLoading);
  // 还可以在原型上添加弹框之类的
  // Vue.prototype.$alert = Alert
}

export default install
