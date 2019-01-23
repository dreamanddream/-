<template>
  <div class="form-wrap">
    <div class="form-item">
      <span class="title">姓名</span>
      <input type="text" :class="{red:errors.has('phone')}" name="phone" v-validate="'required|phone'">
    </div>
    <div class="form-item">
      <span class="title">邮箱</span>
      <input type="text" :class="{red:errors.has('email')}" name="email" v-validate="'required|email'">
    </div>
    <div class="form-item">
      <span class="title">单选性别</span>
      <span class="type-special">
        <input type="radio" name="sex"><input type="radio" name="sex">
      </span>
    </div>
    <div class="tijiao" @click.stop="check">提交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      email: ""
    };
  },
  methods: {
    check() {
      console.log("aaa");
      // 验证表单中所有内容
      // this.$validator.validateAll().then(msg => {
      //   console.log("msg", msg);
      //   if (msg) {
      //     console.log("提交信息");
      //     // 提交数据
      //     // post请求
      //   } else {
      //     console.log("请填写正确的注册信息");
      //   }
      // });
      // 验证单个属性
      // this.$validator.validate("phone").then(msg => {
      //   // 使用mint-ui中的提示框
      //   if (msg) {
      //   } else {
      //     this.$toast({
      //       message: "请填写正确的手机号"
      //     });
      //     return;
      //   }
      //   console.log(msg);
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.red {
  color: red;
}
.error-message {
  color: red;
}
.form-wrap {
  font-size: 16px;
  // background: yellowgreen;
  .form-item {
    // background: yellow;
    text-align: left;
    height: 45px;
    line-height: 45px;
    color: #666;
    border-bottom: 1px solid rgb(112, 107, 107);
    .title {
      padding-left: 20px;
      display: inline-block;
      width: 100px;
    }
    .type-special {
      float: left;
      input {
        float: left;
        width:50px;
        height:25px;
        margin-top: 11px;
      }
    }
  }
}
input {
  width: 200px;
  height: 42px;
  line-height: 42px;
  outline: none;
  font-size: 20px;
  margin-left: 20px;
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

