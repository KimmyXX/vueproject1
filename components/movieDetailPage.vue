<template>
  <div>
    <div class="movie">
      <el-image :src="imgurl" style="width: 20%;height: 100%;" fit="fill"></el-image>
      <div class="rigntBox">
        <div class="nameIntro">
          <div>{{ movie.moviename }}</div>
          <div>介绍：{{ movie.introduction }}</div>
        </div>
        <div class="playRate">
          <el-button type="success" style="width:200px;height: 100%;">开始播放</el-button>
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
    <div class="commentModule">
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
      <div class="comment" v-for="(item,index) in comments" :key="item.id">
        <div class="commentUserInfo">
          <el-image
            :src="$store.state.sourcePath + item.photo"
            style="width: 50px;height: 50px;vertical-align:middle;border-radius:50%;"
            fit="fill"
          ></el-image>
          <span>{{ item.nickname }}</span>
        </div>
        <div class="commentConetnt">{{ item.content }}</div>
        <div style="text-align:right;font-size: 16px;">
          <svg @click="addClass(index)" class="icon" ref="svgArr" aria-hidden="true">
            <use xlink:href="#icon-dianzan" />
          </svg>
          <span>{{ item.good }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        rate: 0
      },
      comments: [],
      commentInput: "",
      activeClass: ['icon'],
      activeColor: {
        // color: "orange"
      }
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
    // 点赞动画
    addClass(index) {
      // console.log(this.$refs);
      // console.log(this.$refs.svgArr[index].getAttribute('class'));
      this.$refs.svgArr[index].setAttribute('class','icon animateClass');
      this.$refs.svgArr[index].style.color = "orange";
    },
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
    getMovieInfo() {
      this.$http
        .get("getMovieById", { params: { id: this.id } })
        .then(({ data }) => {
          if (data.success) {
            this.movie = data.movie;
          } else {
            this.$message.error("获取电影数据失败");
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    getCommentInfo() {
      this.$http
        .post("getCommentsByMovieId", { id: this.id })
        .then(({ data }) => {
          if (data.success) {
            this.comments = data.data;
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
  .wirteComment {
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

.animateClass {
  animation: dianzan 1s;
}
</style>