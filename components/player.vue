<template>
  <div class="out" id="videobox" ref="out" @mousemove="controlShow">
    <transition name="toolTransition">
      <div class="tool" v-show="showTool" ref="tool" @click="play()">
        <!-- .stop防止冒泡触发上层的播放按钮效果 -->
        <i class="el-icon-video-play playButton button" @click.stop="play()" v-if="ispaused"></i>
        <i class="el-icon-video-pause playButton button" @click.stop="play()" v-else></i>
        <i class="el-icon-rank enlargeButton button" @click.stop="enlarge()"></i>
        <div class="currentTime" ref="currentTime" v-if="video">{{ currentTime }}</div>
        <div class="progress" ref="progress" @click.stop="" @mouseup="stopChangeProgress">
          <div class="transparentProgess" ref="transparentProgess"></div>
          <div class="whiteProgess" ref="whiteProgess"></div>
          <div class="dragCircle" ref="dragCircle" @mousedown="changeProgress"></div>
        </div>
        <div class="duration" ref="duration" v-if="video">{{ isNaN(video.duration) ? "00:00:00" : parseInt(video.duration / 3600) + " : " +  parseInt(video.duration / 60) + " : " + video.duration % 60  }}</div>
      </div>
    </transition>
    <video class="video" ref="video">
      <source :src="this.$store.state.moviePath + 'testMovie.mp4'" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  props: ["moviesource"],
  data() {
    return {
      video: null,
      ispaused: true,
      showTool: false,
      out: null,
      isFull: false,
      flag: null,
      playChangeFlag: null,
      currentTime: "00:00:00"
    };
  },
  methods: {
    // 控制是否显示工具
    controlShow() {
      let vm = this;
      if (this.flag) {
        clearTimeout(this.flag);
        this.flag = setTimeout(function() {
          vm.showTool = false;
          vm.flag = null;
        }, 3000);
      } else {
        this.showTool = true;
        this.flag = setTimeout(function() {
          vm.showTool = false;
          vm.flag = null;
        }, 3000);
      }
    },
    // 播放停止
    play() {
      if (this.video.paused) {
        this.ispaused = false;
        this.video.play();

        // 圆点跟随播放改变位置`````````````````````````````````````````````````````````````
        this.playChangePosition();
      } else {
        this.ispaused = true;
        this.video.pause();

        // 圆点暂停跟随播放改变位置`````````````````````````````````````````````````````````````
        clearInterval(this.playChangeFlag);
      }
    },
    // 放大缩小
    enlarge() {
      // 调整时间高度
      let duration = this.$refs.duration;
      let currentTime = this.$refs.currentTime;
      if (this.isFull) {
        this.exitFullscreen();
        this.isFull = false;
        duration.style.bottom = "4%";
        currentTime.style.bottom = "4%";
      } else {
        this.launchFullscreen(this.out);
        this.isFull = true;
        duration.style.bottom = "7%";
        currentTime.style.bottom = "7%";
      }
      this.playChangePosition();
    },
    // 注意不只作用于video标签，所有标签都行
    // 進入全屏
    launchFullscreen(element) {
      //此方法不可以在異步任務中執行，否則火狐無法全屏
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById("videobox");
        var cssText = "width:100%;height:100%;overflow:hidden;";
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText + ";" + "margin:0px;padding:0px;";
        document.IsFullScreen = true;
      }
    },
    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.oRequestFullscreen) {
        document.oCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById("videobox");
        docHtml.style.cssText = "";
        docBody.style.cssText = "";
        videobox.style.cssText = "";
        document.IsFullScreen = false;
      }
    },
    // 拖动进度条
    changeProgress() {
      // 进度条暂停跟随````````````````````````````````````````````````````````````````
      clearInterval(this.playChangeFlag);

      this.out.addEventListener("mousemove", this.progressPosition);
    },
    // 停止修改进度条，并开始播放
    stopChangeProgress() {
      let x = this.out.offsetLeft + this.out.clientWidth * 0.15;
      let progressWidth = this.$refs.transparentProgess.offsetWidth;
      this.out.removeEventListener("mousemove", this.progressPosition);
      this.video.currentTime = parseInt(
        (this.video.duration * (event.screenX - x)) / progressWidth
      );
      this.ispaused = false;
      this.video.play();

      // 进度条继续跟随``````````````````````````````````````````````````````````````````````
      this.playChangePosition();
    },
    // 修改原点位置和白条位置
    progressPosition() {
      let x = this.out.offsetLeft + this.out.clientWidth * 0.15;
      let progressWidth = this.$refs.transparentProgess.offsetWidth;
      if (event.screenX - x > 0 && event.screenX - x < progressWidth) {
        this.$refs.dragCircle.style.left = `calc(${((event.screenX - x) /
          progressWidth) *
          100}% - 0.5rem)`;
        this.$refs.whiteProgess.style.width = event.screenX - x + "px";
      }
    },
    // 跟随播放修改圆点和白条位置
    playChangePosition() {
      // 清理上一次，防抖··········································································
      clearTimeout(this.playChangeFlag);

      let vm = this;
      // 进度条左部距离窗口位置；
      let x = this.out.offsetLeft + this.out.clientWidth * 0.15;
      // 进度条长
      let progressWidth = this.$refs.transparentProgess.offsetWidth;
      // 圆点位置
      this.$refs.dragCircle.style.left = `calc(${(this.video.currentTime /
        this.video.duration) *
        100}% - 0.5rem)`;
      // 进度条长度
      this.$refs.whiteProgess.style.width =
        (progressWidth * this.video.currentTime) / this.video.duration + "px";

      // 修改当前时间
      this.currentTime = isNaN(this.video.currentTime) ? "00:00:00" : parseInt(this.video.currentTime / 3600) + " : " +  parseInt(this.video.currentTime / 60) + " : " + parseInt(this.video.currentTime % 60);

      // 每一秒修改一次位置`````````````````````````````````````````````````````````````````````
      this.playChangeFlag = setTimeout(vm.playChangePosition, 250);
    }
  },
  mounted() {
    this.video = this.$refs.video;
    this.out = this.$refs.out;

    // let tool = this.$refs.tool;

    this.$refs.dragCircle.style.left = "calc(0% - 0.5rem)";
    this.$refs.whiteProgess.style.width = "0";
  }
};
</script> 

<style lang="scss" scoped>
.out {
  position: relative;
  margin: 0 auto;
  width: 60%;
}
.video {
  width: 100%;
}

.tool {
  position: absolute;
  bottom: 3px;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  // 要放到最上面，否则会按不到
  z-index: 1;
  display: flex;
  .button {
    font-size: 2rem;
    position: absolute;
    color: white;
    &:hover {
      color: #1e90ff;
    }
  }
  .playButton {
    left: 5%;
    bottom: 5%;
  }
  .enlargeButton {
    transform: rotate(45deg);
    right: 5%;
    bottom: 5%;
  }
  .progress {
    position: absolute;
    width: 70%;
    height: 1rem;
    left: 50%;
    margin-left: -35%;
    bottom: 7%;
    display: flex;
    align-items: center;
    .transparentProgess {
      width: 100%;
      height: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 0.5rem;
      position: absolute;
    }
    .whiteProgess {
      height: 50%;
      background-color: #fff;
      border-radius: 0.5rem;
      position: absolute;
    }
    .dragCircle {
      background-color: rgb(180, 179, 179);
      border-radius: 0.5rem;
      height: 1rem;
      width: 1rem;
      position: absolute;
    }
  }
  .duration,
  .currentTime {
    position: absolute;
    color: white;
    right: 10%;
    bottom: 4%;
    font-size: 10px;
  }
  .currentTime {
    left: 10%;
    bottom: 4%;
  }
}

// 工具显示动画
.toolTransition-enter,
.toolTransition-leave-to {
  opacity: 0;
}

.toolTransition-enter-active,
.toolTransition-leave-active {
  transition: all 1s;
}
</style>