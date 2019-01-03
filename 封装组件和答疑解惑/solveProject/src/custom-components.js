// 当前文件和components文件夹在同一路径下
import loading from '@/components/common/loading'
import noneData from '@/components/common/noData'
import pageLoading from '@/components/common/pageLoading'
import item from "@/components/common/item";
import goTop from "@/components/common/goTop";
import goodsList from "@/components/common/goodsList";
import header from "@/components/common/header"

const install = Vue => {
  Vue.component('my-loading', loading);
  Vue.component('no-data', noneData);
  Vue.component('goods-list', goodsList);
  Vue.component('page-loading', pageLoading);
  Vue.component('item', item);
  Vue.component('go-top', goTop);
  Vue.component('headers', header);
  // 还可以在原型上添加弹框之类的
  // Vue.prototype.$alert = Alert
}

export default install
