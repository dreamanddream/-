<template>
  <div class="cart-wrap">
    <!-- <mt-radio
  :options="['optionA']" @change="checkRadio" v-model="value">
</mt-radio> -->
    <div class="title clearfix">
      <div class="left-title float-left">
        <p>购物车</p>
        <p>共30件宝贝</p>
      </div>
      <div class="setting float-right" @click="isShowSwitch" v-if="showSwitch">管理</div>
      <div class="setting float-right" @click="isShowSwitch" v-else>完成</div>
    </div>
    <div class="cart-item-wrap">
      <div class="cart-item" v-for="(item, index) in cartList" :key="index">
        <span class="isCheck" @click="item.select=!item.select">
          <i class="icon iconfont" :class="item.select?'icon-xuanzhong':'icon-yuanhuan'"></i>
        </span>
        <div class="img">
          <img src="../../assets/logo.png" alt="">
        </div>
        <div class="detail">
          <p class="detail-title">{{item.pro_name}}</p>
          <div class="price-num">
            <p class="price">￥{{item.pro_price.toFixed(2)}}</p>
            <div class="change-num">
              <span class="decrease" @click="deChange(item)">
                <!-- <i class="icon iconfont icon-jianhao"></i> -->
                -
              </span>
              <input type="text" v-model="item.pro_num">
              <span class="add" @click="addChange(item)">
                +
                <!-- <i class="icon iconfont icon-plus"></i> -->
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 总计 -->
      <div class="total-detail flex-between">
        <span class="float-left" @click="selectProduct(isSelectAll)">
          <i class="icon iconfont" :class="isSelectAll?'icon-xuanzhong':'icon-yuanhuan'"></i>全选
        </span>
        <div class="total-price float-right">共{{getTotal.totalNum}}件商品，总额{{getTotal.totalPrice}}</div>
        <div class="calculateTotal" v-if="showSwitch">结算</div>
        <div class="deleteTotal" v-else @click="deleteProduct">删除</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "2",
      showSwitch: true,
      isAllSelect: true,
      cartList: [
        {
          pro_name: "【斯文】甘油 | 丙三醇1", //产品名称
          pro_brand: "skc", //品牌名称
          pro_place: "韩国", //产地
          pro_purity: "99.7%", //规格
          pro_min: "215千克", //最小起订量
          pro_depot: "上海仓海仓储", //所在仓库
          pro_num: 3, //数量
          pro_img: "../../images/ucenter/testimg.jpg", //图片链接
          pro_price: 800.9, //单价
          pro_kucun: 5
        },
        {
          pro_name: "【斯文】甘油 | 丙三醇2", //产品名称
          pro_brand: "skc", //品牌名称
          pro_place: "韩国", //产地
          pro_purity: "99.7%", //规格
          pro_min: "215千克", //最小起订量
          pro_depot: "上海仓海仓储", //所在仓库
          pro_num: 3, //数量
          pro_img: "../../images/ucenter/testimg.jpg", //图片链接
          pro_price: 800.9, //单价
          pro_kucun: 6
        }
      ]
    };
  },
  computed: {
    // 是否全选
    isSelectAll() {
      // every用法挺好，只有所有的都是true才返回true，对每个元素进行筛选，最终返回值是true或者false
      return this.cartList.every(function(val) {
        return val.select;
      });
       console.log(this.cartList);
    },
    // 计算总数量和总价
    getTotal() {
      // filter对每个元素进行筛选，符合的添加到数组中，返回值为一个新的数组
      var _proList = this.cartList.filter(function(val) {
        return val.select;
      });
      var totalPrice = 0;
      for (var i = 0; i < _proList.length; i++) {
        // 计算总价
        totalPrice += _proList[i].pro_num * _proList[i].pro_price;
        // totalPrice.toFixed(2);
      }
      //选择产品的件数就是_proList.length，总价就是totalPrice
      return { totalNum: _proList.length, totalPrice: totalPrice };
    }
  },
  mounted() {
    // 自己添加是否选中状态
    var _this = this;
    // 再次打印cartList就可以看到，每个数组对象中添加了select为true的内容
    this.cartList.map(function(item) {
      _this.$set(item, "select", false);
    });
    //要像上面这样写双向绑定才能起效，下面的写法是有问题的，双向绑定不起效的！
    //this.productList.map(function (item) {item.select=true})
    console.log("循环后的数据", this.cartList);
  },
  methods: {
    checkRadio() {
      // console.log(this.value);
    },
    // 取消全选
    selectProduct(_isSelect) {
      //  遍历数组全部取反
      for (var i = 0; i < this.cartList.length; i++) {
        this.cartList[i].select = !_isSelect;
      }
      //  还可以将计算属性作为参数传递
      console.log("取消全选");
    },
    // 管理和完成的切换
    isShowSwitch() {
      this.showSwitch = !this.showSwitch;
    },
    // 删除单个
    //删除单条产品
    deleteOneProduct: function(index) {
      //根据索引删除productList的记录
      this.productList.splice(index, 1);
    },
    // 删除选中的商品
    deleteProduct: function() {
      // 符合条件的为true的筛选出来，放到新数组中

      this.cartList = this.cartList.filter(function(item) {
        console.log("选中的",!item.select);
        return !item.select;
      });
      console.log(this.cartList);
    },
    deChange(item) {
      if (item.pro_num < 1) {
        this.$toast({
          message: "该宝贝不能再减少了哦",
          position: "bottom",
          duration: 1000
        });
        return;
      }
      item.pro_num--;
    },
    addChange(item) {
      console.log(item);
      if (item.pro_num == item.pro_kucun) {
        this.$toast({
          message: "该宝贝不能再增加了哦",
          position: "bottom",
          duration: 1000
        });
        return;
      }
      item.pro_num++;
    }
  }
};
</script>
<style lang="less" scoped>
.flex-around {
  display: flex;
  justify-content: space-around;
}
@color: #e5e5e5;
.cart-wrap {
  // width:50px;
  // height:50px;
  // border:1px solid red;
  // border-radius: 100%;
  font-size: 16px;
  .title {
    font-size: 16px;
  }
  .cart-item-wrap {
    width: 92%;
    margin-left: 4%;
    .cart-item {
      .flex-around;
      .detail {
        position: relative;
        width: 5rem;
        height: 3rem;
        .detail-title {
          font-size: 14px;
          text-align: left;
        }
        .price-num {
          font-size: 26px;
          .price {
            position: absolute;
            left: 0;
            bottom: 0;
            color: #f44336;
          }
          .change-num {
            position: absolute;
            right: 0;
            bottom: 0;
            border: 1px solid @color;
            height: 32px;
            line-height: 32px;
            span {
              display: inline-block;
            }
            .icon-plus {
              border-left: 1px solid @color;
            }
            .icon-jianhao {
              border-right: 1px solid @color;
            }
            i {
              font-size: 26px;
            }
            input {
              width: 25px;
            }
          }
        }
      }
      .img {
        width: 3rem;
        height: 3rem;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
  .total-detail {
    width: 90%;
    position: fixed;
    bottom: 65px;
    left: 5%;
    .calculateTotal {
      width: 100px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 20px;
      border-radius: 8px;
      text-align: center;
      background: indianred;
    }
    .deleteTotal {
      width: 80px;
      height: 50px;
      line-height: 50px;
      background: rgb(0, 162, 255);
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>

