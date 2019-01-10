import Vue from 'vue'
import AlertComponent from './index.vue'

const merge = ($data, option) => {

    for ( let prop in option) {
        if ($data.hasOwnProperty(prop)) {
          console.log("$data", $data, "option", option)
          // 这里用的很巧妙
          console.log('1111',option[prop],prop);
          $data[prop] = option[prop]
        }
    }
};

//extend 是构造一个组件的语法器.传入参数，返回一个组件
let AlertConstructor = Vue.extend(AlertComponent);

const Alert = (option={}) => {
    let initComponent = new AlertConstructor();
    if (document.querySelector('.alert-mask')) {
      console.log("mask")
        return;
    }
    initComponent.$mount();
    if (typeof option !== 'object') {
        initComponent.content = option;
        console.log("option", option);
    }else{
      // $data是定义index.vue组件中data () {}函数中定义的，
      // option就是调用时传递的参数
        merge(initComponent.$data, option)
    }
    return new Promise( (resolve, reject) => {
      // 这里的success是在组件中点击的那个success
        initComponent.success = () => {
          console.log("这是extend中success")
            initComponent.show = false;
            resolve()
        }
        // 将这个组件动态添加到body中
        document.querySelector(option.container || 'body').appendChild(initComponent.$el);
        // 这里的$el就代表dom元素，也就是整个弹框
        // console.log("$el", initComponent.$el);
    })


}

export default Alert
