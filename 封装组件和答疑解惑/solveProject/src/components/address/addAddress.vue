<template>
  <div class="childAddress">
    <div class="topAddress">
      <div class="common-aItem">
        <div class="aItem">
          <span class="text">姓名</span><input type="text" placeholder="收货人姓名">
        </div>
        <div class="aItem">
          <span class="text">联系电话</span><input type="text" placeholder="收货人电话">
        </div>
        <div class="aItem">
          <span class="text">所在地区</span><input type="text" placeholder="请选择" readonly @click="showAddress=true" :value="addressText">
        </div>
        <div class="aItem">
          <span class="text">街道</span><input type="text" readonly>
        </div>
      </div>
      <div class="textarea">
        <textarea name="" id="area" placeholder="请填写详细地址，具体到门牌号"></textarea>
      </div>
      <div class="default"><span class="fr">设置默认</span><mt-switch v-model="value" class="fr" @change="getDefault"></mt-switch></div>
      <div class="save" @click="onSave">保存</div>
    </div>
    <div class="address" v-if="showAddress">
      <div class="title">
        <p class="font-choose">请选择</p>
        <p class="font-close" @click="showAddress=false">×</p>
      </div>
      <div class="address-list">
        <div class="addressBox common-flex">
          <ul>
            <li v-for="( provinceItem, provinceIndex ) in provice" :key="provinceIndex" :class="{active: provinceIndex === activeProvince}" @click="onProvinceSelect(provinceItem,provinceIndex)">{{provinceItem}}</li>
          </ul>
        </div>
        <div class="cityBox common-flex">
          <ul>
            <li v-for="(cityItem, cityIndex) in city" :key="cityIndex" @click="cityClick(cityItem, cityIndex)" :class="{active: cityIndex === activeCity}">{{cityItem}}</li>
          </ul>
        </div>
        <div class="areaBox common-flex">
          <ul>
            <li v-for="(countryItem, countryIndex) in country" @click="countryClick(countryItem, countryIndex)" :class="{active: countryIndex == activeCountry}" :key="countryIndex">{{countryItem}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapMutations, mapState} from 'vuex'
import init_city_picker from "../../assets/util/data.city.js";
export default {
  data() {
    return {
      value: false,
      showAddress: false,
      addressList: [],
      addressText: "",
      activeProvince: 0,
      activeCity: 0,
      activeCountry: 0,
      provice: [],
      city: [],
      country: [],
      newIndex: 0,
      provinceText: "",
      cityText: "",
      countryText: "",
      // form表单的相关内容
      formname:'',
    };
  },
  computed: {
    ...mapGetters(['address'])
    // ...mapState
  },
  mounted() {
    // 默认地址是否选中
    console.log("查看是否选中默认地址", this.value);
    this.addressList = init_city_picker;
    for (var key in this.addressList) {
      this.provice.push(this.addressList[key]["text"]);
    }
    for (let key1 in this.addressList[0].children) {
      this.city.push(this.addressList[0].children[key1]["text"]);
    }
    for (let key2 in this.addressList[0].children[0].children) {
      this.country.push(this.addressList[0].children[0].children[key2]["text"]);
    }
  },
  methods: {
    ...mapMutations(['setdefaultAddress']),
    // 置换是否选择默认地址
    getDefault () {
      console.log(this.value);
    },
    // 选择省份
    onProvinceSelect(provinceItem, itemIndex) {
      this.city = [];
      this.country = [];
      for (let key1 in this.addressList[itemIndex].children) {
        this.city.push(this.addressList[itemIndex].children[key1]["text"]);
      }
      let countryChild = this.addressList[itemIndex].children[0].children;
      for (let key2 in countryChild) {
        this.country.push(countryChild[key2].text);
      }
      this.newIndex = itemIndex;
      this.activeProvince = itemIndex;
      this.activeCity = 0;
      this.activeCountry = 0;
      this.provinceText = provinceItem;
      this.cityText = this.city[0];
      this.countryText = this.country[0];
      this.addressText = this.provinceText + this.cityText + this.countryText;
    },
    // 选择城市
    cityClick(itemCity, itemIndex) {
      this.country = [];
      for (let key2 in this.addressList[this.newIndex].children[itemIndex]
        .children) {
        this.country.push(
          this.addressList[this.newIndex].children[itemIndex].children[key2][
            "text"
          ]
        );
      }
      this.activeCity = itemIndex;
      this.activeCountry = 0;
      this.cityText = itemCity;
      this.countryText = this.country[0];
      this.addressText = this.provinceText + " " + itemCity + this.countryText;
    },
    // 选择县
    countryClick(countryItem, itemIndex) {
      this.activeCountry = itemIndex;
      this.addressText =
      this.provinceText + " " + this.cityText + " " + countryItem;
      this.showAddress = fasle;
    },
    checkForm () {

    },
    onSave(){
      this.$store.commit("setdefaultAddress",this.addressText)
      console.log(this.$store.state.address.defaultAddress);
      this.$router.push("/address");

    }
  }
};
</script>
<style lang="less" scoped>
@base_textColor: #999;
@base_color: rgb(255, 196, 0);
.childAddress {
  font-size: 16px;
  .topAddress {
    width: 100%;
    text-align: left;
    .aItem {
      border-bottom: 1px solid #eee;
      height: 1rem;
      line-height: 1rem;
      &:last-child {
        border-bottom: none;
      }
      .text {
        width: 90px;
        display: inline-block;
        padding-left: 5%;
      }
      input {
        background: none;
        color: #666;
      }
    }
    .textarea {
      #area {
        width: 90%;
        margin-left: 5%;
        height: 100px;
        border: 1px solid #eee;
        border-radius: 5px;
        outline: none;
      }
    }
    .save {
      width: 90%;
      background: tomato;
      font-size: 20px;
      height: 1rem;
      line-height: 1rem;
      color: #fff;
      text-align: center;
      margin-left: 5%;
      border-radius: 5px;
      margin-top: 30px;
    }
  }
  .address {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 5rem;
    width: 100%;
  }
  width: 100%;
  .title {
    background: rgb(255, 136, 0);
    position: relative;
    height: 1rem;
    line-height: 1rem;
    p:first-child {
      text-align: center;
    }
    p:last-child {
      position: absolute;
      right: 10px;
      top: 0px;
      font-size: 24px;
    }
  }
  .default{
    width:90%;
    margin-left:5%;
    margin-top:5px;
    line-height: 32px;
    height:32px;
    .fr{
      float:right;
    }
  }
  .addressBox {
    position: relative;
  }
  .common-flex ul {
    height: 5rem;
    background: @base_color;
    overflow-y: scroll;
    overflow-x: auto;
  }
  .common-flex li {
    font-size: 0.26rem;
    height: 1rem;
    line-height: 1rem;
    color: @base_textColor;
    text-align: left;
    padding-left: 0.5rem;
  }
  .address-list {
    display: flex;
  }
  .address-list .common-flex {
    flex: 1;
  }
  .address-list .active {
    background: rgb(83, 157, 192);
    color: #fff;
  }
}
</style>

