<template>
    <div class="home">
        <Header message="首页"></Header>
        <div class="content">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
                <!--banner开始-->
                <div class="home-banner">
                    <mt-swipe :auto="0">
                        <mt-swipe-item><img src="./banner1.png" alt=""></mt-swipe-item>
                        <mt-swipe-item><img src="./banner2.png" alt=""></mt-swipe-item>
                        <mt-swipe-item><img src="./banner3.png" alt=""></mt-swipe-item>
                    </mt-swipe>
                </div>
                <!--banner结束-->

                <!--分类开始-->
                <div class="home-wrap">
                    <ul class="home-list clearfix">
                        <li class="home-item">
                            <img src="./Newcomer.png" alt="kinds"><span class="home-name">新人有礼</span>
                        </li>
                        <router-link to="/BranchShop" tag="li" class="home-item">
                            <img src="./Store.png" alt="kinds"><span class="home-name">实体店</span>
                        </router-link>
                        <router-link to="/Home/VideoCollection" tag="div" class="home-item">
                            <img src="./Video.png" alt="kinds"><span class="home-name">视频集锦</span>
                        </router-link>
                        <router-link to="/Home/ProductIntro" tag="li" class="home-item">
                            <img src="./Product.png" alt="kinds"><span class="home-name">产品介绍</span>
                        </router-link>
                        <router-link to="/Agency" tag="li" class="home-item">
                            <img src="./Agent.png" alt="kinds"><span class="home-name">我是代理</span>
                        </router-link>
                        <router-link to="/share" tag="li" class="home-item">
                            <img src="./Extension.png" alt="kinds"><span class="home-name">推广</span>
                        </router-link>
                        <router-link to="/Join" tag="li" class="home-item">
                            <img src="./Join.png" alt="kinds"><span class="home-name">加盟分公司</span>
                        </router-link>
                        <router-link to="/ShopKeeper" tag="li" class="home-item" v-if="userType==='2'">
                            <img src="./Shopkeeper.png" alt="kinds"><span class="home-name">店主专享</span>
                        </router-link>
                        <li class="home-item" @click.prevent="getShopKeeper" v-else>
                            <img src="./Shopkeeper.png" alt="kinds"><span class="home-name">店主专享</span>
                        </li>
                    </ul>
                </div>
                <!--分类结束-->

                <!--收益排行开始-->
                <router-link to="/Home/ProfitList" class="home-profit">
                    <div class="profit">
                        <ul v-if="profitTop.length>0">
                            <li class="profit-item" v-for="(item,index) in profitTop.slice(0,3)" :key="index">
                                <i></i>
                                <img :src="item.headerImg" alt="">
                            </li>
                        </ul>
                        <ul v-else>
                            <li class="profit-item">
                                <i></i>
                                <img src="./header_default.png" alt="">
                            </li>
                            <li class="profit-item">
                                <i></i>
                                <img src="./header_default.png" alt="">
                            </li>
                            <li class="profit-item">
                                <i></i>
                                <img src="./header_default.png" alt="">
                            </li>
                        </ul>
                    </div>
                    <div class="profit-more">
                        <p class="profit-pic"></p>
                        <p class="profit-other"></p>
                    </div>
                </router-link>
                <!--收益排行结束-->

                <!--钱币开始-->
                <div class="home-coin" v-show="coinIsShow">
                    <div class="coin-gold">
                        <img src="./gold.png" alt="">
                    </div>
                    <div class="coin-two">
                        <img src="./Silver.png" alt="">
                        <img src="./integral.png" alt="">
                    </div>
                </div>
                <!--钱币结束-->

                <!--首页商品-->
                <div class="home-goods">
                    <div class="goods-title">
                        — 精选商品 —
                        <span>更多 <i></i></span>
                    </div>
                    <ul class="goods-all clearfix" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
                        <li class="goods-item" v-for="(item,index) in homeGoods" :key="index" @click.stop.prevent="GoodsDetail(item.id)" v-if="homeGoods.length > 0">
                            <div class="goods-pic">
                                <img class="goods-images" v-lazy="item.goodIcon">
                            </div>
                            <div class="goods-msg">
                                <p class="goods-name">
                                   {{item.goodsName}}
                                </p>
                                <p class="goods-price">
                                    <span><i>￥</i>{{item.goodPrice}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>

                    <div class="more_loading" v-show="!queryLoading">
                        <vue-loading type="spiningDubbles" v-show="moreLoading&&!allLoaded" color="#d9544e" :size="{ width: '30px', height: '30px' }"></vue-loading>
                        <p class="load-more" v-show="allLoaded">暂无更多宝贝</p>
                    </div>
                </div>
                <!--首页商品结束-->
            </mt-loadmore>
            <!--右下悬浮-->
            <div class="SuspensionModule">
                <router-link to="/Home/ShoppingCart" tag="div" class="ShoppingCart">
                    <!--<span>
                        <i>99</i>
                    </span>-->
                    <img src="./shopingCart.png" alt="">
                </router-link>
                <div class="ReturnTop" @click="getReturnTop" v-if="isShowReturnTop">
                    <img src="./retunTop.png" alt="">
                </div>
            </div>

        </div>
        <!--空白块开始-->
        <BlankBlock/>
        <!--空白块结束-->
        <Footer></Footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import Header from '../../components/header';
    import BlankBlock from '../../components/BlankBlock';
    import Footer from '../../components/footer';
    import vueLoading from 'vue-loading-template'
    import { Toast,Swipe, SwipeItem } from 'mint-ui';
    import Qs from 'qs';

    export default {
        components: {
            Header,BlankBlock,vueLoading,Footer,Swipe,SwipeItem
        },
        created(){

        },
        data(){
            return{
                profitTop:[],
                homeGoods:[],
                pageNum:1,
                goodsId:'',
                queryLoading: false,
                moreLoading: false,
                allLoaded: false,
                isShowReturnTop:false,
                userCoinFlag:'',
                coinIsShow:false,
                userType:'',
            }
        },
        mounted(){
            this.getUserInfo();
            this.getHomeGoods();
            this.getUserTop();
            window.addEventListener('scroll',this.handleScroll);
        },
        methods:{
            /*调取个人信息，判断金币是否显示*/
            getUserInfo(){
                const self = this;
                this.$http.get("app/user/userInfo").then((response) => {
                    if(response.data.code === 200){
                        self.userCoinFlag = response.data.dataMap.coinFlag;
                        self.userType = response.data.dataMap.userType;
                        if(self.userCoinFlag===0){
                            self.coinIsShow = false;
                        }else if(self.userCoinFlag===1){
                            self.coinIsShow = true;
                        }
                    }else{
                        Toast({
                            message: response.data.message,
                            duration: 2000
                        })
                    }
                })
            },
            /*活动*/
            goToNowActivities(type){
                if(type===1){
                    this.$router.push({name:'Activities'})
                }
                if(type===2){
                    this.$router.push({name:'ThirtyPercent'})
                }
            },
            /*轮播图活动页*/
            getActivities(){
                console.log(12345);
                this.$router.push({name: 'Activities'});
            },
            /*店主专享*/
            getShopKeeper(){
                Toast({
                    message: "您还不是店主,请先升级~",
                    duration: 2000,
                    position:'bottom'
                });
            },
            /*返回顶部*/
            getReturnTop(){
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            },

            /*获取排行*/
            getUserTop(){
                let self = this;
                this.$http.post('app/user/mainTop', Qs.stringify({
                    topType:'1'
                })).then(function (response) {
                    if(response.data.code === 200){
                        self.profitTop = response.data.dataMap;
                    }else{
                        Toast({
                            message: response.data.message,
                            duration: 2000
                        });
                    }
                })
            },

            /*下拉加载*/
            loadTop() {
                this.getHomeGoods();
                this.$refs.loadmore.onTopLoaded();
            },
            /*加载更多*/
            loadMore() {
                // 防止多次加载
                if(this.allLoaded){
                    this.moreLoading = true;
                    return;
                }
                if(this.queryLoading){
                    return;
                }
                this.moreLoading = !this.queryLoading;
                this.pageNum++;
                let self = this;
                this.$http.post('app/adGoods/list', Qs.stringify({
                    page: this.pageNum,
                })).then(function (response) {
                    if(response.data.code === 200){
                        if(response.data.dataMap.length !== 0){
                            self.homeGoods = self.homeGoods.concat(response.data.dataMap);
                        }else{
                            self.allLoaded = true;
                        }
                        self.moreLoading = self.allLoaded;
                    }else{
                        Toast({
                            message: response.data.message,
                            duration: 2000
                        });
                        self.moreLoading = false;
                    }
                });
            },
            /*获取商品*/
            getHomeGoods(){
                let self = this;
                self.$loading.show();
                this.$http.post('app/adGoods/list', Qs.stringify({
                    page:this.pageNum,
                })).then(function (response) {
                    if(response.data.code === 200){
                        self.$loading.hide();
                        self.homeGoods = response.data.dataMap;
                    }else{
                        self.$loading.hide();
                        Toast({
                            message: response.data.message,
                            duration: 2000
                        });
                    }
                })
            },
            /*商品详情*/
            GoodsDetail(goodsId){
                this.goodsId = goodsId;
                this.$router.push({name: 'GoodsDetail', params: { id: this.goodsId,activityId:' '}});
            },
            /*滚动*/
            handleScroll(){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop > 100){
                    this.isShowReturnTop = true;
                }else{
                    this.isShowReturnTop = false;
                }
            }
        },
        destroyed:function() {
            this.$loading.hide();
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
    .home
        .content
            .home-banner
                position relative
                width 100%
                height 146px
                overflow hidden
                img
                    width 100%
                    height 100%
                    display block
                    object-fit cover
                .banner-mask
                    position absolute
                    width 100%
                    height 100%
                    z-index 88888
            .home-wrap
                width 100%
                background-color #fff
                padding 10px 0
                box-sizing border-box
                .home-list
                    box-sizing border-box
                    width 100%
                .home-item
                    float left
                    width 25%
                    padding 7px 0 15px 0
                    text-align center
                    img
                        width 29px
                        height auto
                    .home-name
                        text-align center
                        font-size 12px
                        display block
                        margin-top 7px
                        color #8B8F9A
            .home-profit
                height 75px
                background #ffffff
                margin-top 10px
                display flex
                align-items center
                justify-content space-between
                padding 0 17px
                .profit
                    flex 2
                    ul
                        display flex
                        align-items center
                        .profit-item
                            position relative
                            width 40px
                            height 40px
                            background #fce5ca
                            border-radius 50%
                            margin-left 10%
                            i
                                width 22px
                                height 22px
                                position absolute
                                right -10px
                                top -10px
                            img
                                width 100%
                                height 100%
                                display block
                                border-radius 50%
                                border none
                                object-fit cover
                            &:nth-child(1)
                                border 2px solid #FFC425
                                margin-left 2%
                                i
                                    background url("./first.png") no-repeat
                                    background-size contain
                            &:nth-child(2)
                                border 2px solid #E2E9EC
                                i
                                    background url("./second.png") no-repeat
                                    background-size contain
                            &:nth-child(3)
                                border 2px solid #FFC4B4
                                i
                                    background url("./third.png") no-repeat
                                    background-size contain
                .profit-more
                    flex 1
                    width auto
                    display flex
                    align-items center
                    justify-content space-between
                    .profit-pic
                        width 75px
                        height 30px
                        background url("./profit.png") no-repeat
                        background-size contain
                    .profit-other
                        width 10px
                        height 16px
                        background url("./img_right.png") no-repeat
                        background-size contain
            .home-coin
                margin 0 6px
                display flex
                align-items center
                justify-content space-between
                margin-top 10px
                img
                    width 100%
                    height auto
                    display block
                .coin-gold
                    width 49%
                .coin-two
                    width 49%
                    height 100%
                    display flex
                    flex-direction column
                    justify-content space-between
                    align-items center
                    img
                        &:first-child
                            margin-bottom 7px
            .home-goods
                height auto
                margin 24px 0 5px 0
                .goods-title
                    width 100%
                    color #8B8F9A
                    font-size 14px
                    margin-bottom 12px
                    position relative
                    span
                       position absolute
                       right 12px
                       font-size 13px
                       color #6D6D6D
                       i
                           width 7px
                           height 10px
                           background url("./img_right.png") no-repeat
                           background-size contain
                           display inline-block

                .goods-all
                    width 97.3%
                    margin auto
                    .goods-item
                        width 48.7%
                        height auto
                        margin-bottom 9px
                        background #ffffff
                        border-radius 3px
                        overflow hidden
                        &:nth-child(2n+1)
                            float left
                        &:nth-child(2n)
                            float right
                        .goods-pic
                            width 100%
                            height 179px
                            overflow hidden
                            display flex
                            align-items center
                            position relative
                            img
                                width 100%
                                height 100%
                                display block
                                margin auto
                                object-fit cover
                            .goods-images[lazy=loading]
                                display block
                                width 40%
                                height auto
                                margin auto
                                background url("./load.gif") no-repeat
                                background-size cover
                        .goods-msg
                            .goods-name
                                width auto
                                height 38px
                                line-height 19px
                                margin 4px 6px
                                text-align left
                                font-size 14px
                                color #000000
                                overflow hidden
                                text-overflow ellipsis
                                display -webkit-box
                                -webkit-box-orient vertical
                                -webkit-line-clamp 2
                            .goods-price
                                display flex
                                justify-content space-between
                                align-items baseline
                                font-size 17px
                                margin 15px 11px
                                color #FB323C
                                i
                                    font-size 12px
            .SuspensionModule
                position fixed
                right 0
                bottom 10%
                .ShoppingCart
                    position relative
                    span
                        position absolute
                        right 10px
                        top 6px
                        display flex
                        align-items center
                        justify-content center
                        background #ff4e00
                        width 15px
                        height 15px
                        border-radius 50%
                        i
                            color #ffffff
                            font-size 10px
                            line-height 15px
                    img
                        width 60px
                .ReturnTop
                    img
                        width 60px
        .load-more
            text-align center
            height 32px
            line-height 32px
            font-size 14px
            color #cfcfcf
</style>
