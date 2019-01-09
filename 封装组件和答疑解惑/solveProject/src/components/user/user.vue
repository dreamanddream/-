<template>
  <div class="base-user">
    <!-- 头部 -->
    <div class="setting-wrap">
      <!-- <input type="text" maxlength="2" v-model="value" onkeyup="value=value.replace(/[^\d]/g,'')"> -->
      <div class="hd-top">
        <div class="hd-t">
          <div class="info">
            <span class="img"><img src="../../assets/logo.png" alt=""></span>
            <!-- 直接可以使用...mapGetters？？？ -->
            <span class="name" v-if="user.name">{{user.name}}</span>
            <span class="login" @click="login" v-else>点击登录</span>
          </div>
        </div>
        <div class="hd-m flex-center">
          <div class="md-m-item">
            <span>0</span>
            <div class="hd-m-t">动态</div>
          </div>
          <div class="md-m-item">
            <span>0</span>
            <div class="hd-m-t">动态</div>
          </div>
          <div class="md-m-item">
            <span>0</span>
            <div class="hd-m-t">动态</div>
          </div>
        </div>
        <div class="hd-b flex-center border-half-bottom">
          <div class="hd-b-item">
            <i class="icon iconfont icon-collection"></i>
            <div class="hd-b-t">收藏</div>
          </div>
          <div class="hd-b-item">
            <i class="icon iconfont icon-collection"></i>
            <div class="hd-b-t">收藏</div>
          </div>
          <div class="hd-b-item">
            <i class="icon iconfont icon-collection"></i>
            <div class="hd-b-t">收藏</div>
          </div>
        </div>
      </div>
      <div class="hd-body">
        <div class="li border-half">
          <div>消息通知</div>
          <i class="icon iconfont icon-collection"></i>
        </div>
        <div class="li border-half-top">
          <div>头条商城</div>
          <div class="tag-font">
            <span>邀请好友得200元现金</span>
            <i class="icon iconfont icon-collection"></i>
          </div>
        </div>
        <div class="li border-half">
          <div>京东特供</div>
          <div class="tag-font">
            <span>邀请好友得200元现金</span>
            <i class="icon iconfont icon-collection"></i>
          </div>
        </div>
        <div class="li border-half-top">
          <div>用户反馈</div>
          <i class="icon iconfont icon-collection"></i>
        </div>
        <div class="li border-half-top">
          <div>系统设置</div>
          <i class="icon iconfont icon-collection"></i>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <!-- <transition :name="slide-top"> </transition> -->
    <login v-if="user.isLogin"></login>

    <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
import footers from "@/components/common/footer";
import login from "@/components/login/login";
// 引入local存储
import { Local } from "@/assets/util/local";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // user: {
      //   name: "",

      // },
      value: ""
    }
  },
  components: { footers, login },
  mounted() {
    // console.log(this.$store.state.user.name)
    console.log(this.$store.state.user.isLogin);
  },
  methods: {
    login() {
      this.$store.state.user.isLogin = true;
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
<style lang="less" scoped>
.base-font {
  font-size: 16px;
}
.border-half-bottom {
  position: relative;
}
.border-half-bottom:before {
  content: "";
  position: absolute;
  transform-origin: 0 0;
  transform: scale(0.5);
  width: 200%;
  height: 2px;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid rgba(221, 221, 221, 0.753);
}
@font-gray: #aaa;
.base-user {
  .base-font;
  width: 100%;
  background: #e5e5e578;
}
.hd-t {
  background: #777;
  text-align: left;
  padding: 0.2rem;
  .info {
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .img {
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      img {
        width: 100%;
      }
    }
  }
}
.hd-m {
  background: #777;
  font-size: 14px;
  padding: 0.5rem 0;
  color: @font-gray;
  text-align: center;
  .md-m-item {
    width: 33.3%;
    height: 1rem;
    flex-direction: column;
  }
}
.hd-b {
  background: #fff;
  padding: 0.2rem 0;
  .hd-b-item {
    width: 33.3%;
    height: 1rem;
    flex-direction: column;
  }
}
// 消息通知
.hd-body {
  .li {
    text-align: left;
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    background: #fff;
    padding: 0.2rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    &:first-child {
      margin: 0.2rem 0;
    }
    &:first-child:before {
      border-left: none;
      border-right: none;
    }
    &:nth-child(3) {
      margin-bottom: 0.2rem;
    }
    .tag-font {
      font-size: 12px;
    }
  }
  .border-half {
    position: relative;
  }
  .border-half:before {
    content: "";
    position: absolute;
    transform-origin: 0 0;
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    top: 0;
    left: 0;
    // border: 1px solid #ddd;
    border: 1px solid #ddd;
  }
  .border-half-top {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      transform-origin: 0 0;
      transform: scale(0.5);
      width: 200%;
      height: 2px;
      top: 0;
      left: 0;
      border-top: 1px solid #ddd;
    }
  }
}
</style>

