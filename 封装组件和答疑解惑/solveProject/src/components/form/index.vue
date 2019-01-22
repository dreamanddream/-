<template>
  <div class="form-wrap">
    <div class="form-item">
      <mt-field name="phone" :class="{red:errors.has('phone')}" v-validate="'required|phone'" label="用户名" placeholder="Input username" v-model="username"></mt-field>
      <div><span class="error-message">{{ errors.first('phone') }}</span></div>
    </div>
    <div class="form-item">
      <mt-field name="email" :class="{red:errors.has('email')}" label="邮箱" placeholder="Input email" v-validate="'required|email'" type="email" v-model="email"></mt-field>
      <div><span class="error-message">{{ errors.first('email') }}</span></div>
    </div>
    <!-- <div>
      同时提示多个错误：
      <input type="text" name="fieldName" v-validate.continues="'required|alpha|min:5'">
      <ul>
        <li v-for="error in errors.collect('fieldName')">{{ error }}</li>
      </ul>
    </div> -->
    <!-- name为哪个的，对应的规则有什么错误 -->
    <!-- <div>
      <input v-validate="{ required: true, min: 6 }" type="password" name="password">
      <span>{{errors.first('password')}}</span>
    </div> -->
    <!-- 将所有的错误循环打印出来 -->
    <!-- <div>
      将所有错误循环打印出来：像列表形式一样罗列出来
      <input type="text" name="first" v-validate.continues="'required|alpha|min:5'">
      <input type="text" name="second" v-validate.continues="'required|alpha|min:5'">
      <ul>
        <li v-for="error in errors.all()">{{ error }}</li>
      </ul>
    </div> -->
    <div class="tijiao" @click="check">提交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username:'',
      email:''
    };
  },
  methods: {
    check() {
      console.log("aaa");
      // 验证表单中所有内容
      this.$validator.validateAll().then(msg => {
        console.log("msg", msg);
        if (msg) {
           console.log("提交信息");
          // 提交数据
          // post请求
        }else{
         console.log("请填写正确的注册信息");
        }
      });
      // 验证单个属性
    }
  }
};
</script>
<style lang="less" scoped>
.red{
  color:red;
}
.error-message{
  color:red;
}
.form-wrap {
  font-size: 16px;
}
input {
  width: 200px;
  height: 30px;
  border: 1px solid red;
  margin-bottom: 20px;
}
.tijiao {
  width: 80px;
  color: #fff;
  font-size: 20px;
  line-height: 50px;
  background: rgb(255, 166, 0);
  height: 50px;
  text-align: center;
  margin: 0 auto;
}
</style>

