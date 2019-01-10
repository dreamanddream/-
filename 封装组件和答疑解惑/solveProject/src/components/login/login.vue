<template>
  <div class="login-wrapper">
    <!-- <Icon name="close" class="close" @click.native="$emit('close')"></Icon> -->
    <!-- <i class="icon iconfont icon-collection_fill close" @click.native="$emit('close')"></i> -->
    <i class="icon iconfont icon-collection_fill close" @click.native="$emit('close')"></i>
    <h2>登陆你的头条，精彩永不消失</h2>
    <div class="input username">
      <input type="text" placeholder="用户名随便填" v-model="username">
      <span :class="{'animate': username_msg}">{{username_msg}}</span>
    </div>
    <div class="input password">
      <input type="password" placeholder="密码: 123456" v-model="password">
      <span :class="{'animate': password_msg}">{{password_msg}}</span>
    </div>
    <button class="login" @click="login">进入头条</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      username: "",
      username_msg: "",
      password: "",
      password_msg: ""
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    console.log("直接看看能否这样打印出来",this.user.isLogin);
  },
  methods: {
    async login() {
      if (!this.username) {
        this.username_msg = "请输入用户名";
      } else {
        this.username_msg = "";
      }
      if (this.username_msg) return;

      if (!this.password) {
        this.password_msg = "请输入用户名";
      } else if (this.password && this.password != "123456") {
        this.password_msg = "请输入密码：123456";
      } else {
        this.password_msg = "";
      }
      if (this.password_msg) return;

      // this.$showLoading();
      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
      } catch (e) {}
      // this.$hideLoading();
      // this.$set(this.$store.state.user.footerBarList, 3, {title: '我的', icon: 'account1', path: '/account'})
      this.$emit("close");
      // let avatar = require('assets/images/avatar.png')
      // this.Cookie.set('username', this.username)
      // this.Cookie.set('avatar', avatar)
      // this.$store.state.app.user.name = this.username
      // this.$store.state.app.user.avatar = avatar
      // this.$emit('close')
    }
  }
};
</script>
<style lang="less" scoped>
@theme-red: red;
@theme-bg-red: rgb(136, 28, 118);
.login-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  // top: 100%;
  top:0;
  z-index: 1000;
  opacity:1;
  background-color: #fff;
  border-top-right-radius: 0.05rem;
  border-top-left-radius: 0.05rem;
  text-align: center;
  // transition: top 0.2s ease-out;
  animation:top 1s linear;
  @keyframes top {
    20% {
      top: -70%
    }
    50% {
      top: -50%;
    }
    100%{
      top:0%;
    }
  }
  .close {
    position: absolute;
    right: 0rem;
    top: 0rem;
    font-size:16px;
    width: 0.4rem;
    height: 0.4rem;
    padding: 0.1rem;
    color: #555;
  }
  h2 {
    margin: 0.3rem 0;
    color: #333;
    font-size: 0.2rem;
    text-align: center;
  }
  .input {
    width: 80%;
    height: 1rem;
    margin: 0 auto;
    margin-bottom: 1rem;
    position: relative;
    span {
      position: absolute;
      left: 0.15rem;
      top: 0.45rem;
      font-size: 0.1rem;
      color: @theme-red;
      opacity: 0;
    }
    .animate {
      opacity: 1;
      animation: swing 0.5s linear;
    }
    @keyframes swing {
      10% {
        transform: translateX(-0.6rem);
      }
      // 20% {transform: translateX(0.1rem);}
      30% {
        transform: translateX(0.6rem);
      }
      // 40% {transform: translateX(0.08rem);}
      50% {
        transform: translateX(-0.6rem);
      }
      // 60% {transform: translateX(0.06rem);}
      70% {
        transform: translateX(0.6rem);
      }
      80% {
        transform: translateX(-0.4rem);
      }
      90% {
        transform: translateX(0.4rem);
      }
      // 95% {transform: translateX(0.02rem);}
      100% {
        transform: translateX(0rem);
      }
    }
  }
  input {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    text-indent:10px;;
    outline: none;
    font-size: 16px;;
    color: #333;
  }
  .login {
    margin-top: 1rem;
    width: 80%;
    height:1rem;
    border-radius: 10px;
    line-height: 1rem;
    color: #f4f4f4;
    border: none;
    background-color: @theme-bg-red;
  }
}
</style>
