<template>
  <div>
    <!-- 电影播放器模块 -->
    <player v-if="playerShow" :movieid="movie.id" :historyCurrentTime="currentTime" :moviesource="movie.moviesource"></player>

    
    <!-- 电影信息模块 -->
    <div class="movie" v-else>
      <el-image :src="imgurl" style="width: 20%;height: 100%;" fit="fill"></el-image>
      <div class="rigntBox">
        <div class="nameIntro">
          <div>{{ movie.moviename }}</div>
          <div>介绍：{{ movie.introduction }}</div>
        </div>
        <div class="playRate">
          <el-button type="success" style="width:200px;height: 100%;" @click="playerShow ? playerShow = false : playerShow = true">开始播放</el-button>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
      </div>
    </div>
    <!-- 评论模块 -->
    <div class="commentModule" v-if="showComment">
      <!-- 写评论 -->
      <div class="wirteComment">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3}"
          resize="none"
          placeholder="请输入评论内容"
          v-model="commentInput"
        ></el-input>
        <div style="margin-top: 10px;text-align:right;">
          <el-button type="primary" @click="publishComment">发表评论</el-button>
        </div>
      </div>
      <!-- 评论列表 -->
      <div class="comment" v-for="(item,index) in comments" :key="item.commentid">
        <!-- 评论人信息 -->
        <div class="commentUserInfo">
          <el-image
            :src="$store.state.sourcePath + item.photo"
            style="width: 50px;height: 50px;vertical-align:middle;border-radius:50%;"
            fit="fill"
          ></el-image>
          <span>{{ item.nickname }}</span>
        </div>
        <!-- 评论内容 -->
        <div class="commentConetnt">{{ item.content }}</div>
        <div style="text-align:right;font-size: 16px;">
          <!-- 点赞图标，根据有无点赞设定颜色 -->
          <svg
            @click="dianzhan(index,item.havedianzhan,item)"
            :class="['icon',item.havedianzhan ? 'orangeColor' : '']"
            ref="svgArr"
            aria-hidden="true"
          >
            <use xlink:href="#icon-dianzan" />
          </svg>
          <span>{{ item.good }}</span>
        </div>
      </div>
      <!-- 分页 -->
      <div class="pagination" v-if="commentLength > 0">
        <el-pagination background layout="prev,pager,next" :page-size="10" :current-page.sync="whichPage" @current-change="getCommentInfo" :total="commentLength"></el-pagination>
      </div>
      <!-- 没评论时显示 -->
      <div class="nocomment" v-if="commentLength == 0">
        暂无评论，快来发表吧(*^▽^*)
      </div>
    </div>
  </div>
</template>

<script>
import player from './player.vue';
export default {
  props: ["id"],
  data() {
    return {
      movie: {
        id: "",
        movieimg: "",
        moviename: "",
        type: "",
        introduction: "",
        rate: 0,
        moviesource: ''
      },
      currentTime: 0,
      comments: [],
      commentInput: "",
      activeClass: ["icon"],
      commentLength: 0,
      whichPage: 1,
      playerShow: false,
      showComment: true
    };
  },
  computed: {
    imgurl() {
      if (this.movie.movieimg != "") {
        return this.$store.state.rotatePath + this.movie.imgname;
      } else {
        return "";
      }
    },
    value: {
      get() {
        return Number(this.movie.rate);
      },
      set(newVal) {
        this.movie.rate = newVal;
      }
    }
  },
  methods: {
    // 点赞
    dianzhan(index, havedianzhan, item) {
      let ref = this.$refs.svgArr[index];
      let comment = this.comments[index];
      let vm = this;
      // 节流，防止点击多次，clickflag为1为已经点了，不可再点
      if (ref.getAttribute("clickflag") == 1) {
        return;
      } else {
        // 设置为1表示上次点击操作正在进行中不可以再点
        ref.setAttribute("clickflag", 1);
        if (!havedianzhan) {

          this.$http
            .post("dianzhanComment", {
              action: "dianzhan",
              username: this.$store.state.userInfo.username,
              commentid: item.commentid
            })
            .then(({ data }) => {
              if(data.success) {
                ref.setAttribute("class", "icon animateClass orangeColor");

                let good = comment.good + 1;
                this.$set(comment, "good", good);

                setTimeout(function() {
                  vm.$set(comment, "havedianzhan", true);
                  // 操作完成设置回0可以再点
                  ref.setAttribute("clickflag", 0);
                },1000);
              }
              else {
                this.$message.error("点赞失败");
                ref.setAttribute("clickflag", 0);
              }

            })
            .catch(err => {
              this.$message.error("点赞失败");
              ref.setAttribute("clickflag", 0);
            });
        } else {

          this.$http
            .post("dianzhanComment", {
              action: "quxiaodianzhan",
              username: this.$store.state.userInfo.username,
              commentid: item.commentid
            })
            .then(({ data }) => {
              if(data.success) {
                ref.setAttribute("class", "icon quxiaodianzhananimateClass");

                let good = comment.good - 1;
                this.$set(comment, "good", good);

                setTimeout(function() {
                  vm.$set(comment, "havedianzhan", false);
                  // 操作完成设置回0可以再点
                  ref.setAttribute("clickflag", 0);
                },1000);
              }
              else {
                this.$message.error("取消点赞失败");
                ref.setAttribute("clickflag", 0);
              }
            })
            .catch(err => {
              this.$message.error("取消点赞失败");
              ref.setAttribute("clickflag", 0);
            });
        }
      }
    },
    // 发表评论
    publishComment() {
      if (this.commentInput == "") {
        this.$message({
          type: "warning",
          message: "请输入评论内容"
        });
      } else {
        this.$http
          .post("publishComment", {
            comment: this.commentInput,
            username: this.$store.state.userInfo.username,
            movieid: this.movie.id
          })
          .then(({ data }) => {
            if (data.success) {
              this.$message({
                type: "success",
                message: "发表评论成功"
              });
              this.commentInput = "";

              // 获取后点赞会有问题
              this.comments = [];
              this.getCommentInfo();

            } else {
              this.$message.error("发表评论失败");
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    },
    // 获取电影信息
    getMovieInfo() {
      this.$http
        .get("getMovieById", { params: { id: this.id } })
        .then(({ data }) => {
          if (data.success) {
            this.movie = data.movie;
            this.currentTime = data.history.currentTime;
          } else {
            this.$message.error("获取电影数据失败");
          }
        })
        .catch(err => {
          this.$message.error("获取电影数据失败");
        });
    },
    // 获取评论信息
    getCommentInfo() {
      this.$http
        .post("getCommentsByMovieId", {
          id: this.id,
          username: this.$store.state.userInfo.username,
          whichPage: this.whichPage
        })
        .then(({ data }) => {
          if (data.success) {
            this.comments = data.data;
            this.commentLength = data.commentLength;
          } else {
            this.$message.error("获取评论失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getMovieInfo();
    this.getCommentInfo();
  },
  components: {
    player
  }
};
</script>

<style lang="scss" scoped>
.movie {
  width: 80%;
  height: 250px;
  background-color: #57606f;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  .rigntBox {
    background-color: #747d8c;
    border-radius: 10px;
    width: 100%;
    height: 90%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    .nameIntro {
      overflow: hidden;
      text-overflow: ellipsis;
      height: 65%;
      div:first-child {
        color: white;
        font-size: 1.5rem;
        font-weight: bolder;
      }
      div:nth-child(2) {
        font-size: bold;
        color: white;
        margin-top: 10px;
        background-color: #a4b0be;
        padding: 10px;
        border-radius: 5px;
      }
    }
    .playRate {
      display: flex;
      justify-content: space-between;
    }
  }
}

.commentModule {
  width: 90%;
  min-height: 180px;
  background-color: #57606f;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
  padding: 20px 0;
  .wirteComment,
  .nocomment {
    width: 90%;
    min-height: 80px;
    background-color: #a4b0be;
    margin: 0 auto;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;
  }
  .comment {
    width: 90%;
    min-height: 80px;
    background-color: #a4b0be;
    margin: 0 auto;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .commentUserInfo span {
      color: white;
      font-size: 20px;
      margin-left: 10px;
    }
    .commentConetnt {
      white-space: pre-wrap;
      margin-left: 65px;
    }
  }
  .pagination {
    text-align: center;
  }
  .nocomment {
    color: white;
    font-weight: bolder;
    text-align: center;
    line-height: 80px;
  }
}
// 字体图标大小
// .icon {
//   color: orange;
//   font-size: 30px;
// }

// 点赞动画
.icon:hover {
  cursor: pointer;
}

@keyframes dianzan {
  0% {
  }
  50% {
    transform: rotate(-45deg);
    font-size: 30px;
  }
  100% {
  }
}

.orangeColor {
  color: orange;
}

.animateClass {
  animation: dianzan 1s;
}

// 取消点赞动画
@keyframes quxiaodianzan {
  0% {
  }
  50% {
    transform: translate(0,20px);
  }
  100% {
  }
}
.quxiaodianzhananimateClass {
  animation: quxiaodianzan 1s;
}


</style>