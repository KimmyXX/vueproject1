<template>
  <div>
    <movieList v-for="item in typeMovieList" :movielist="item" :key="item.type"></movieList>
  </div>
</template>

<script>
import movieList from "./movieList.vue";
export default {
  data() {
    return {
      typeMovieList: []
    };
  },
  components: {
    movieList
  },
  created() {
    this.$http
      .get("getTypeList")
      .then(({ data }) => {
        if (data.success) {
          this.typeMovieList = data.typeMovieList;
        } else {
          this.$message.error("获取电影列表失败");
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
</script>

<style>
</style>