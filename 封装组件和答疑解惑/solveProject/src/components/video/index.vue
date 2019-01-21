<template>
  <div class="wrap-video">
    <div class="video">
      <div class="switch-video">
        <video class="item-video" ref="video" src="http://dongzi-1255683506.cosbj.myqcloud.com/prod/common/media/audio/mov_bbb.mp4"></video>
        <div class="can">
          <canvas @click="pause"></canvas>
        </div>
        <div class="play" @click="play">
          <span class="icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // isChange() {
    //   let video = this.$refs.video;
    //   if (video.paused) {
    //     video.play();
    //   } else {
    //     video.pause();
    //   }
    //   // console.log(video);
    //   // console.log(video.paused);
    // },
    play(){
      this.dragVideo();
    },
    pause(){
      let video = this.$refs.video;
      console.log("暂停");
      video.pause()
    },
    // canvas绘画
    dragVideo() {
      let index = 0;
      let video = document.querySelectorAll("video")[index],
        ctx = document.querySelectorAll("canvas")[index].getContext("2d");
      video.play();
      let fps = 1000 / 30,
        w = document.querySelectorAll(".video")[index].clientWidth,
        h = document.querySelectorAll(".video")[index].clientHeight;

      video.addEventListener("play", () => {
        setInterval(() => {
          ctx.drawImage(video, 0, 0, 320, 176);
        }, fps);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.video {
  .switch-video {
    height:6rem;
    width:100%;
    position: relative;
    .item-video {
      width: 100%;
      height: 100%;
      display: none;
    }
    .can{
      width: 100%;
      height:100%;
      position: absolute;
      left:0;
      top:0;
      border:1px solid yellow;
      canvas{
        width:100%;
        height:100%;
      }
    }
    .play {
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      width:30px;
      height:30px;
      background: red;
      border-radius: 5px;
    }
  }
}
</style>

