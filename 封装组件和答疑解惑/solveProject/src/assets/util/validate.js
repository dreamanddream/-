// form表单校验
import Vue from 'vue'
//
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';//引入中文文件
import VueI18n from 'vue-i18n';//处理中文，本地化
// 配置中文
// addLocale在文件中会报错，显示方法function找不到
// Validator.addLocale(zh);
// const config = {
//   locale: 'zh_CN'
// }
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
})

// 如果你想自定义表单验证的提示语，不配置有默认。
// const dictionary = {
//   zh_CN: {
//     message: {
//       email: () => '请输入正确的邮箱格式',
//       required: (field) => "请输入" + field,
//     },
//     attributes: {
//       email: '邮箱',
//       password: '密码',
//       name: '账号',
//       phone: '手机'
//     }
//   }
// }

// Validator.updateDictionary(dictionary);

const dict = {
  messages: {
    required: (field) => field+'是必填项',
    phone: () => '请输入正确的手机号'
  }
}

const validator = new Validator({});
validator.localize('zh_CN', dict);


/* message ： 提示语。
attributes： 就是 filed。
*/
// 扩展自定义的验证,自定义验证规则，比如这边自定义了电话的表单验证。
// 之前的写法
// Validator.extend('phone', {
//   messages: {
//     zh_CN:field => field + '必须是11位手机号码',
//   },
//   validate: value => {
//     return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
//   }
// });

// 新写法
// 用户名
Validator.extend('username', {
  getMessage: field => '以字母或者下划线开头，可包含字母数字下划线',
  validate: value => {
    return  /^[a-zA-Z0-9_-]{4,10}$/.test(value)
  }
});
// 验证密码
Validator.extend('password', {
  getMessage: field => field + '最少6位，包括至少1字母、特殊字符、数字',
  validate: value => {
    return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*? ]).*$/.test(value)
  }
});
// 验证手机号
Validator.extend('phone', {
  getMessage: field => field + '必须是11位手机号码',
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
// 验证身份证


