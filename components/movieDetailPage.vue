<template>
  <div>
    <el-container>
      <el-aside style="width: 20%;overflow:hidden;padding: 10px;">
        <el-image
          :src="imgurl"
          style="width: 100%;height: 100%;"
          fit="fill"
        ></el-image>
      </el-aside>
      <el-container>
        <el-header>
          电影名
        </el-header>
        <el-main>
          介绍
          播放
        </el-main>
      </el-container>
    </el-container>
    <div class="comment">comment</div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      movie: null
    };
  },
  created() {
    this.$http
      .get("getMovieById", { params: { id: this.id } })
      .then(({ data }) => {
        if(data.success) {
          this.movie = data.movie;
        }
        else {
          this.$message.error('获取电影数据失败');
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  computed: {
    imgurl() {
      if(this.movie) {
        return this.$store.state.rotatePath + this.movie.imgname
      }
      else {
        return ''
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 80%;
  min-height: 250px;
  background-color: #57606f;
  margin: 0 auto;
  border-radius: 10px;
}

.comment {
  width: 90%;
  min-height: 300px;
  background-color: #57606f;
  margin: 0 auto;
  margin-top: 20px;
}
</style>