<template>
  <div class="childAddress">
    <div class="topAddress">
      <input type="text" placeholder="选择地区">
    </div>
    <div class="address">
      <div class="title">
        <p class="font-choose">请选择</p>
        <p class="font-close">×</p>
      </div>
      <div class="address-list">
        <div class="addressBox common-flex">
          <ul>
            <li v-for="( provinceItem, provinceIndex ) in provice" :key="provinceIndex" :class="{active: provinceIndex === activeProvince}" @click="onProvinceSelect(provinceIndex)">{{provinceItem}}</li>
          </ul>
        </div>
        <div class="cityBox common-flex">
          <ul>
            <li v-for="(cityItem, cityIndex) in city" :key="cityIndex" @click="cityClick(cityIndex)">{{cityItem}}</li>
          </ul>
        </div>
        <div class="areaBox common-flex">
          <ul>
            <li v-for="(countryItem, countryIndex) in country" :class="{active: countryIndex == activeCountry}" :key="countryIndex">{{countryItem}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import init_city_picker from "../../assets/util/data.city.js";
export default {
  data() {
    return {
      addressList: [],
      addressText: "",
      activeProvince: 0,
      activeCity: 0,
      activeCountry: 0,
      provice: [],
      city: [],
      country: [],
      newIndex: 0
    };
  },
  mounted() {
    this.addressList = init_city_picker;
    // console.log(this.addressList[2].children[0].text);
    // console.log(this.addressList[2].children[0].children)
    for (var key in this.addressList) {
      this.provice.push(this.addressList[key]["text"]);
    }
    // 初始值
    // this.city = this.addressList[0].children
    for (let key1 in this.addressList[0].children) {
      this.city.push(this.addressList[0].children[key1]["text"]);
    }
    for (let key2 in this.addressList[0].children[0].children) {
      this.country.push(this.addressList[0].children[0].children[key2]["text"]);
    }
  },
  methods: {
    // 选择省份
    onProvinceSelect(itemIndex) {
      this.city = [];
      for (let key1 in this.addressList[itemIndex].children) {
        this.city.push(this.addressList[itemIndex].children[key1]["text"]);
      }
      this.newIndex = itemIndex;
    },
    cityClick(itemIndex) {
      console.log(12122);
      this.country = [];
      for (let key2 in this.addressList[this.newIndex].children[itemIndex]
        .children) {
        this.country.push(
          this.addressList[this.newIndex].children[itemIndex].children[key2][
            "text"
          ]
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
@base_textColor: #999;
@base_color: rgb(255, 196, 0);
.childAddress {
  font-size: 16px;
  height: 5rem;
  position: fixed;
  bottom: 0;
  left: 0;
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
  .address-list .common-flex{
    flex:1;
  }
  // .address-choose {
  //   position: relative;
  //   ul {
  //     width: 33.3%;
  //     height: 5rem;
  //     overflow-y: scroll;
  //     li {
  //       font-size: 20px;
  //       height: 1.5rem;
  //       line-height: 1.5rem;
  //       text-align: left;
  //       .cityBox {
  //         position: absolute;
  //         top: 0;
  //         left: 33%;
  //         width: 100%;
  //         height: 5rem;
  //         overflow-y: scroll;
  //         z-index: 19;
  //         -webkit-overflow-scrolling: touch;
  //         overflow-x: auto;
  //         ul {
  //           width: 100%;
  //           li {
  //             height: 1.5rem;
  //             line-height: 1.5rem;
  //             display: block;
  //             .areaBox {
  //               position: absolute;
  //               top: 0;
  //               left: 33%;
  //               width: 33%;
  //               height: 5rem;
  //               overflow-y: scroll;
  //               z-index: 9999;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>

