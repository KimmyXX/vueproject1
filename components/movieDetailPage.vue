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
    <div class="comment">comment</div>
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
      }
    };
  },
  created() {
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

.comment {
  width: 90%;
  min-height: 300px;
  background-color: #57606f;
  margin: 0 auto;
  margin-top: 20px;
}
</style>