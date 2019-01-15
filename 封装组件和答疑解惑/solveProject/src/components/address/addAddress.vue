<template>
  <div class="childAddress">
    <div class="address">
      <div class="title">
        <p class="font-choose">请选择</p>
        <p class="font-close">×</p>
      </div>
    </div>
    <div class="addressBox">
      <ul>
        <li>
          <span>河南省</span>
          <div class="cityBox">
            <ul>
              <li>
                <span>上蔡县qqqqqqq</span>
                <div class="areaBox">
                  <ul>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                  </ul>
                </div>
              </li>
              <li>
                <span>上蔡县qqqqqqq</span>
                <div class="areaBox">
                  <ul>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                  </ul>
                </div>
              </li>
              <li>
                <span>上蔡县qqqqqqq</span>
                <div class="areaBox">
                  <ul>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                  </ul>
                </div>
              </li>
               <li>
                <span>上蔡县qqqqqqq</span>
                <div class="areaBox">
                  <ul>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                  </ul>
                </div>
              </li>
              <li>
                <span>上蔡县qqqqqqq</span>
                <div class="areaBox">
                  <ul>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                  </ul>
                </div>
              </li>
              <li>
                <span>上蔡县qqqqqqq</span>
                <div class="areaBox">
                  <ul>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                    <li>某某乡</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import init_city_picker from '../../assets/util/data.city.js';
export default {
  data () {
    return {
      addressList: []
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
  .addressBox ul {
    width: 33%;
    height: 5rem;
    background: @base_color;
    overflow-y: scroll;
    overflow-x: auto;
  }
  .addressBox li {
    font-size: 0.26rem;
    height: 1rem;
    line-height: 1rem;
    color: @base_textColor;
    text-align: left;
    padding-left: 0.5rem;
  }

  .cityBox {
    position: absolute;
    top: 0;
    left: 33%;
    width: 100%;
    height: 5rem;
    overflow-y: scroll;
    z-index: 19;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
  }

  .cityBox ul {
    width: 100%;
    height: 5rem;
  }

  .cityBox li {
    padding-left: 0.17rem;
    text-align: left;
    border-bottom: 0.01rem solid #e6e6e6;
  }

  .areaBox {
    position: absolute;
    top: 0;
    left: 33%;
    width: 33%;
    height: 5rem;
    overflow-y: scroll;
    z-index: 9999;
    -webkit-overflow-scrolling: touch;
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

