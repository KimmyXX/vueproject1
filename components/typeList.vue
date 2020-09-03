<template>
  <div id="outBox">
    <el-row :gutter="10">
      <el-col :span="4" class="head">
        {{ type }}
      </el-col>
      <el-col :span="4" v-for="(movie,index) in displayMovies" :key="index">
        <el-image style="width:100%;height:100%;" :src="$store.state.rotatePath + movie.imgname" fit="fill"></el-image>
      </el-col>
      <el-col :span="4" class="last">
        <i class="el-icon-video-camera"></i>
        <div>more {{ movies.length + '+' }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["movielist"],
  data() {
    return {
      type: this.movielist.type,
      movies: this.movielist.movies
    };
  },
  computed: {
    displayMovies() {
      if(this.movielist.movies.length >= 4) {
        return this.movielist.movies.slice(0,4);
      }
      else {
        return this.movielist.movies.slice();
      }
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
  background-color: #747d8c;
}

.last {
  flex-direction: column;
}
.el-icon-video-camera {
  font-size: 4rem;
}

.el-col:hover {
  cursor: pointer;
  color: #eccc68;
  background-color: #747d8c;
  .el-icon-video-camera {
  animation: x 0.8s;
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
</style>