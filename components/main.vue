<template>
  <el-container>
    <el-header>
      <router-view name="nav"></router-view>
    </el-header>
    <el-main>
      <router-view name="rotateList"></router-view>
      <movieList v-for="item in typeMovieList" :movielist="item" :key="item.type"></movieList>
    </el-main>
  </el-container>
</template>

<script>
import movieList from "./movieList.vue";
export default {
  data() {
    return {
      typeMovieList: []
    }
  },
  components: {
    movieList
  },
  created() {
    this.$http
      .get("getTypeList")
      .then(({ data }) => {
        if(data.success) {
          this.typeMovieList = data.typeMovieList;
        }
        else {
          this.$message.error('获取电影列表失败');
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
</script>


<style lang="scss" scoped>
// 占满全屏
.el-container {
  position: absolute;
  width: 100%;
  min-height: 100%;
  // background-color: rgb(48, 47, 47);
  background-color: #2f3542;

}
</style>