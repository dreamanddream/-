<template>
    <div id="detail">
        <my-header fixed :title='title' v-goTop:click='true'>
            <a slot="left" class="back-black" @click.stop='$router.go(-1)'></a>
            <a slot="right" class="menu" @click.stop='$refs.share.toggle()'></a>
        </my-header>

        <div class="content">
            <div class="container" v-swiper:swiperRight='true'>
                <!-- 正文 -->
                <my-article v-if="articleJson" :json='articleJson'/>
                <!-- 标签 -->
                <!-- <my-tags v-if="articleJson.infotags" :json='articleJson.infotags'/> -->
                <!-- 热点评论 -->
                <!-- <template v-if='articleJson.comment'>
                    <div class="bg_line" ></div>
                    <div class="comment-hot">
                        <div class="comment_title">
                            <div class="Line">
                                <div class="title">用户热评</div>
                            </div>
                        </div>
                        <comment-item v-for='(item,index) in articleJson.comment' :itemJson='item' :key='index'></comment-item>
                        <a href='http://m.toutiaojk.com/guide.html' class="comment_more" v-if="articleJson.plnum > 0 ">下载健康头条阅读全部{{articleJson.plnum}}条评论<i class="icon-detail"></i></a>
                    </div>
                </template> -->
                <!-- 分割线 -->
                <div class="bg_line"></div>
                <!--  推荐 -->
                <!-- <my-recommend :json='articleJson.recommend'/> -->
                <!-- 下载 -->
                <a class="downLoad" href='http://m.toutiaojk.com/guide.html'>都翻到这儿了，下载个头条呗~</a>
            </div>
        </div>
        <!-- 分享组件 -->
        <my-share ref="share"/>
        <!-- 请求提示 -->
        <my-loading :visible='loading' :reload='init'/>
    </div>
</template>
<script>
import myArticle from './components/article'
// import myTags from './components/tags'
// import myRecommend from './components/recommend'
import myShare from './components/share'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'detail',
    // components: { myArticle, myTags, myRecommend, myShare },
    components: { myArticle, myShare},
    data() {
        return {
            title: '健康头条',   // header的title
            id: '',             // 文章id
            classid: '',        // 文章classid（分类）
            datafrom: '',       // 数据来源
            articleJson: {},    // 文章数据
            loading: 'loading',
            error: false
        }
    },
    computed: {
        ...mapState('index', [
            'indexColumn'
        ]),
        ...mapState('detail', [
            'location'
        ])
    },
    watch: {
        $route(val) {
            if (val.query.id) {
                this.init() // 自己调用自己，重新初始化
            }
        }
    },
    methods: {
      // 同一个文件引入不同项目的
        ...mapMutations('detail', [
            'set_location'
        ]),
        ...mapActions('index', [
            'get_indexColumn_data'
        ]),
        ...mapActions('detail', [
            'get_Article_data'
        ]),
        async init() {
            this.classid = this.$route.query.classid
            this.id = this.$route.query.id
            // 获取传递的dataform参数
            this.datafrom = this.$route.query.datafrom
            // $('#detail .container').scrollTop(0)    // 初始化返回顶部
            await this.handleTitle()
            this.get_Article()
            // this.visitCollect()
        },
        // 获取title分类
        async handleTitle() {
            if (!(this.indexColumn.length > 1)) {
                await this.get_indexColumn_data()
            }
            let index = this.indexColumn.findIndex(n => n.classid === this.classid)
            if (index > -1) {
                this.title = `健康头条 · ${this.indexColumn[index].classname}`
            }
        },
        // 获取文章数据
        get_Article() {
            this.loading = 'loading'
            let params = {
                'id': this.id,
                'datafrom': this.datafrom
            }
            this.get_Article_data(params)
            .then(res => {
                if (res) {
                    this.articleJson = res
                    this.handleLocaltion('get')
                }
                this.loading = false
            })
            .catch(err => {
                console.log(err)
                this.loading = 'error'
            })
        },
        // 数据统计
        // visitCollect() {
        //     $.ajax({
        //         url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.classid}&id=${this.id}&addclick=1`,
        //         type: 'GET'
        //     })
        // },
        handleLocaltion(type) {
            if (type === 'get') {
                this.$nextTick(() => {
                    if (this.location && this.location[this.id]) {
                        // $('#detail .container').scrollTop(this.location[this.id])
                    }
                })
            } else if (type === 'set') {
                // this.location[this.id] = $('#detail .container').scrollTop()
                this.set_location(this.location)
            }
        }
    },
    mounted() {
        this.init()
    },
    // 离开路由钩子
    beforeRouteLeave(to, from, next) {
        this.handleLocaltion('set')
        next() // 一定要调用next() 不然路由不会跳转
    },
    // 重复调用组件的钩子
    beforeRouteUpdate(to, from, next) {
        this.handleLocaltion('set')
        next()
    }
}
</script>
<style lang="less">

</style>


