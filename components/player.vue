<template>
  <div class="out" id="videobox" ref="out" @mousemove="controlShow">
    <transition name="toolTransition">
      <div class="tool" v-show="showTool" ref="tool">
        <!-- .stop防止冒泡触发上层的播放按钮效果 -->
        <i class="el-icon-video-play playButton button" @click.stop="play()" v-if="ispaused"></i>
        <i class="el-icon-video-pause playButton button" @click.stop="play()" v-else></i>
        <i class="el-icon-rank enlargeButton button" @click.stop="enlarge()"></i>
        <!-- 音量条 -->

        <div
          class="volumn button"
          ref="volumnOut"
          @mouseleave="stopVolumePosition"
          @mouseup="stopVolumePosition"
          @click.stop
        >
          <transition name="volumn">
            <div
              class="volumnInner"
              v-show="showVolumn"
              @mouseenter="showVolumn = true"
              @mouseleave="showVolumn = false"
            >
              <div class="columnTransparent" ref="columnTransparent"></div>
              <div class="columnWhite" ref="columnWhite"></div>
              <div class="columnCircle" ref="columnCircle" @mousedown="changeColumnCircle"></div>
            </div>
          </transition>
        </div>

        <!-- 音量标志 -->
        <svg
          class="button icon laba"
          aria-hidden="true"
          @mouseenter="showVolumn = true"
          @mouseleave="showVolumn = false"
          @click.stop
        >
          <use xlink:href="#icon-laba" />
        </svg>

        <div class="currentTime" ref="currentTime" v-if="video">{{ currentTime }}</div>
        <div class="progress" ref="progress" @mouseup="stopChangeProgress" @click.stop>
          <div class="transparentProgess" ref="transparentProgess"></div>
          <div class="whiteProgess" ref="whiteProgess"></div>
          <div class="dragCircle" ref="dragCircle" @mousedown="changeProgress"></div>
        </div>
        <div
          class="duration"
          ref="duration"
          v-if="video"
        >{{ isNaN(video.duration) ? "00:00:00" : parseInt(video.duration / 3600) + " : " + parseInt(video.duration / 60) + " : " + video.duration % 60 }}</div>
      </div>
    </transition>
    <video class="video" ref="video">
      <source :src="this.$store.state.moviePath + moviesource" type="video/mp4" />
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
      currentTime: "00:00:00",
      showVolumn: false
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
        this.video.play();
        // 圆点跟随播放改变位置`````````````````````````````````````````````````````````````
        this.playChangePosition();
      } else {
        this.video.pause();
        // 圆点暂停跟随播放改变位置`````````````````````````````````````````````````````````````
        clearInterval(this.playChangeFlag);
      }
      this.ispaused = !this.ispaused;
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
      this.currentTime = isNaN(this.video.currentTime)
        ? "00:00:00"
        : parseInt(this.video.currentTime / 3600) +
          " : " +
          parseInt(this.video.currentTime / 60) +
          " : " +
          parseInt(this.video.currentTime % 60);

      // 每一秒修改一次位置`````````````````````````````````````````````````````````````````````
      this.playChangeFlag = setTimeout(vm.playChangePosition, 250);
    },

    // 音量控制
    changeColumnCircle() {
      document.addEventListener("mousemove", this.volumePosition);
    },
    volumePosition() {
      let columnCircle = this.$refs.columnCircle;
      let columnTransparent = this.$refs.columnTransparent;
      let columnWhite = this.$refs.columnWhite;
      // window.screen.height                  整个屏幕高度(顶部工具栏 + 可用部分高度 +)
      // window.screen.availHeight             包含顶部工具栏的高度（顶部工具栏 + 可用部分高度）
      // document.documentElement.clientHeight 可用部分高度
      // event.screenY                         事件触发距离屏幕顶部的高度
      // columnTransparent.getBoundingClientRect().top  元素距离可用部分顶部高度
      // columnTransparent.getBoundingClientRect().height  元素高度

      // 圆珠的bottom: columnTransparent.getBoundingClientRect().height - (event.screenY - (window.screen.availHeight - document.documentElement.clientHeight) - columnTransparent.getBoundingClientRect().top)

      let result =
        columnTransparent.getBoundingClientRect().height -
        (event.screenY -
          (window.screen.availHeight - document.documentElement.clientHeight) -
          columnTransparent.getBoundingClientRect().top);
      if (
        result > 0 &&
        result < columnTransparent.getBoundingClientRect().height - 8
      ) {
        columnCircle.style.bottom = result + "px";
        columnWhite.style.height = result + "px";
        let volume =
          parseInt(
            (result / (columnTransparent.getBoundingClientRect().height - 8)) *
              100
          ) * 0.01;
        if (volume < 0.05) {
          this.video.volume = 0;
        }
        else {
          this.video.volume = volume;
        }

      }
    },
    stopVolumePosition() {
      document.removeEventListener("mousemove", this.volumePosition);
    }
  },
  mounted() {
    this.video = this.$refs.video;
    this.out = this.$refs.out;

    // let tool = this.$refs.tool;

    this.$refs.dragCircle.style.left = "calc(0% - 0.5rem)";
    this.$refs.whiteProgess.style.width = "0";

    this.$refs.columnCircle.style.bottom = "20%";
    this.$refs.columnWhite.style.height = "calc(20% + 0.5rem)";
    this.video.volume = 0.2;

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
    right: 1%;
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
  .laba.icon {
    right: 5%;
    bottom: 5%;
    font-size: 1.5rem;
    background-color: rgb(138, 137, 137);
    padding: 0.2rem;
    border-radius: 50%;
    &:hover {
      color: white;
    }
  }

  .volumn {
    right: calc(5% + 0.48rem);
    bottom: calc(5% + 1.9rem);
    // bottom: 30%;
    height: 60px;
    width: 1rem;
    overflow: hidden;
    .volumnInner {
      border-radius: 10px;
      background-color: rgb(138, 137, 137);
      height: 100%;
      width: 1rem;
      position: relative;
      .columnTransparent,
      .columnWhite {
        height: 100%;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        width: 0.5rem;
        left: 50%;
        margin-left: -25%;
        position: absolute;
      }
      .columnWhite {
        bottom: 0%;
        background-color: white;
      }
      .columnCircle {
        position: absolute;
        left: 50%;
        margin-left: -25%;
        background-color: rgb(0, 0, 0);
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        // bottom: calc(100% - 0.5rem);
        // bottom: calc(20% - 0.5rem);
      }
    }
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

// 音量动画
.volumn-enter,
.volumn-leave-to {
  transform: translateY(100%);
}

.volumn-enter-active,
.volumn-leave-active {
  transition: all 1s;
}
</style>