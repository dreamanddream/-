<template>
    <div>
        <div class="title">
            <ul>
              <!-- 点击标题获取不同数据 -->
              <li v-for="title in photoTitle" :key="title.id">
                <!-- 这样实现了根据不同id请求不同数据，但是有个问题地址栏中的路由并没有更新，所以要使用beforeRouteUpdate -->
                  <a href="javascript:;" @click="loadImgsByCategoryId(title.id)">{{title.title}}</a>
              </li>
            </ul>
        </div>
        <div class="list">
          <ul>
            <li v-for="photo in photoList" :key="photo.photoId">
              <!-- 使用图片懒加载mint-ui -->
              <router-link :to="{name:'photo.detail',query:{photoId:photo.photoId}}">
                <img :src="photo.img" alt="" v-lazy="photo.img">
              <p>{{photo.description}}</p>
              </router-link>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      photoTitle: [],
      photoList: []
    };
  },
  // beforeRouteUpdate (to, from, next) {
  //   // 用于更新地址栏中的路由
  //   console.log('toto')
  //   this.loadImgsByCategoryId(to.params.categoryId)
  //   next()
  // },
  created() {
    this.$axios
      .get("photo/title")
      .then(res => {
        this.photoTitle = res.data.photo;
      })
      .catch(err => {
        console.log(err, "图文加载失败");
      });
    // 1.获取categoryID
    var categoryId = this.$route.params.categoryId;
    this.loadImgsByCategoryId(categoryId);
  },
  methods: {
    // 动态添加路由
    loadImgsByCategoryId(categoryId) {
      this.$router.push({
        name: "photo.list",
        params: {
          categoryId: categoryId
        }
      });
      console.log(categoryId);
      // 同时请求数据
      this.loadImgById(categoryId);
    },
    loadImgById(id) {
      this.$axios
        .get("photo/list?categoryId/" + id)
        // 获取数据做渲染
        .then(res => {
          console.log(res.data);
          this.photoList = res.data.photo;
          if (this.photoList == 0) {
            Toast({
              message: "没有相关数据！",
              position: "bottom",
              duration: 5000
            });
          }
        });
    }
  }
};
</script>
<style lang="" scoped>
.title ul {
  width: 100%;
  overflow: hidden;
  display: flex;
  display: -webkit-flex;
  padding: 10px;
  justify-content: flex-start;
}
.title ul li {
  margin-right: 10px;
  flex: 1;
  flex-wrap: nowrap;
}
/* .list{
  width:100%;
} */
/* .list ul li{
  width:100%;
} */
.list ul li img {
  width: 100%;
}
img[lazy="loading"] {
  width: 100%;
  height: 100px;
  margin: auto;
}
</style>