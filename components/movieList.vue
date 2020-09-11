<template>
  <div id="outBox">
    <el-row :gutter="10">
      <el-col :span="4" class="head" :style="activeStyle" ref="head">{{ type }}</el-col>
      <el-col :span="4" v-for="(movie,index) in displayMovies" :key="index" class="movie">
        <div class="moviebox" @click="linkToMovieDetail(movie)">
          <el-image
            style="width: 95%;height:90%;"
            :src="$store.state.rotatePath + movie.imgname"
            fit="fill"
          ></el-image>
          <div class="moviename">{{ movie.moviename }}</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="last" style="width: 100%;height: 100%;" @click="toSearchPage()">
          <i class="el-icon-video-camera"></i>
          <div>more {{ movies.length + '+' }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["movielist"],
  data() {
    let vm = this;
    return {
      type: this.movielist.type,
      movies: this.movielist.movies,
      color: "red"
    };
  },
  methods: {
    linkToMovieDetail(movie) {
      this.$router.push({ path: `/mainPage/movieDetailPage/${movie.id}` });
    },
    toSearchPage() {
      this.$router.push({ path: `/mainPage/searchPage/${this.type }` });
      // console.log("xx");
    }
  },
  computed: {
    displayMovies() {
      if (this.movielist.movies.length >= 4) {
        return this.movielist.movies.slice(0, 4);
      } else {
        return this.movielist.movies.slice();
      }
    },
    // 列表头部背景
    activeStyle() {
      // return {
      //   background:
      //     "url(" +
      //     this.$store.state.rotatePath +
      //     this.movies[0].imgname +
      //     ") no-repeat",
      //   backgroundSize: "100% 100%"
      // };
      return {};
    }
  }
};
</script>

<style lang="scss" scoped>
// $color: red;
#outBox {
  width: 90%;
  margin: 20px auto;
}
.el-row {
  border-radius: 10px;
  margin: 0 auto;
  background-color: rgb(99, 100, 100);
  padding: 0 5px;
  // background-color: $color;
}
.el-col {
  cursor: pointer;
  border-radius: 4px;
  margin: 10px 0;
  height: 250px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #d3dce6;
}

.head,
.last {
  background-color: #a4b0be;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bolder;
}
.head {
  cursor: default;
  background-color: #747d8c;
}

.last {
  flex-direction: column;
  border-radius: 5px;
}

.el-icon-video-camera {
  font-size: 4rem;
}

.last:hover {
  color: #eccc68;
  background-color: #747d8c;
  .el-icon-video-camera {
    animation: x 0.8s;
  }
}
.movie:hover {
  .moviename {
    color: #eccc68;
  }
}
@keyframes x {
  0% {
  }
  50% {
    transform: translate(0, -30px);
  }
  100% {
  }
}
.moviename {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  color: white;
  font-weight: bolder;
}

.moviebox {
  width: 100%;
  height: 100%;
  padding-top: 5px;
  background-color: #a4b0be;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
}
.moviebox:hover {
  background-color: #747d8c;
}
</style>