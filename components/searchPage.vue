<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <!-- 注意触发原生事件使用native!!!! -->
      <el-input
        placeholder="请输入搜索内容"
        type="text"
        v-model="input"
        @keyup.enter.native="searchMovie()"
      >
        <template slot="append">
          <el-button @click="searchMovie()">
            <svg aria-hidden="true" class="icon">
              <use xlink:href="#icon-sousuo" />
            </svg>
          </el-button>
        </template>
      </el-input>
    </div>
    <!-- 搜索条件 -->
    <div class="searchCondition">
      <div class="rowBox" v-for="(item,index) in searchCondition" :key="'row' + index">
        <div class="type">{{ item.type }}</div>
        <div class="list">
          <div
            v-for="(item2,index2) in item.arr"
            :key="item2"
            :ref="item.type"
            @click="selectType(item.type,index2,item2)"
          >{{ item2 }}</div>
        </div>
      </div>
    </div>
    <!-- 电影列表 -->
    <div class="movieList">
      <el-row style="width: 100%; margin: 10px auto;" :gutter="20">
        <div class="noMovie" v-if="displayMovie.length == 0">暂无该类型视频</div>
        <el-col :span="4" v-for="item in displayMovie" :key="item.moviename">
          <div class="movieBox" @click="linkToMovieDetail(item)">
            <el-image
              style="width: 100%;height: 90%;"
              :src="$store.state.rotatePath + item.imgname"
              fit="fill"
            ></el-image>
            <div style="text-align:center;">{{ item.moviename }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      input: "",
      whichtype: this.type,
      time: "全部",
      searchCondition: [],
      displayMovie: []
    };
  },
  methods: {
    getSearchCondition() {
      this.$http
        .get("searchCondition")
        .then(({ data }) => {
          if (data.success) {
            data.data.forEach(item => {
              item.arr.unshift("全部");
            });
            this.searchCondition = data.data;
          } else {
            this.$message.error("获取搜索条件失败");
          }
        })
        .catch(err => {
          this.$message.error("获取搜索条件失败");
        });
    },
    selectType(whichType, index, selection) {
      // 修改对应搜索信息
      if (whichType == "类型") {
        this.whichtype = selection;
      } else {
        this.time = selection;
      }

      this.$refs[whichType][index].parentNode.childNodes.forEach(item => {
        item.style.backgroundColor = "#ced6e0";
      });

      this.$refs[whichType][index].style.backgroundColor = "gray";

      this.searchMovie();
    },
    searchMovie() {
      this.$http
        .get("searchMovie", {
          params: { type: this.whichtype, time: this.time, input: this.input }
        })
        .then(({ data }) => {
          if (data.success) {
            this.displayMovie = data.data;
          } else {
            this.$message.error("获取电影数据失败");
          }
        })
        .catch(err => {
          this.$message.error("获取电影数据失败");
        });
    },
    linkToMovieDetail(movie) {
      this.$router.push({ path: `/mainPage/movieDetailPage/${movie.id}` });
    }
  },
  created() {
    this.getSearchCondition();
    this.searchMovie();
  }
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  .el-input {
    width: 50%;
    .el-button {
      .icon {
        font-size: 1.3rem;
      }
      &:hover {
        color: black;
      }
    }
  }
}
.searchCondition {
  width: 60%;
  background-color: #ced6e0;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid gray;
  white-space: pre-wrap;
  word-wrap: break-word;
  .rowBox {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    .type {
      margin: 0 10px 10px 10px;
      font-weight: bolder;
    }
    .list {
      flex-grow: 1;
      div {
        float: left;
        border-radius: 5px;
        height: 30px;
        min-width: 50px;
        border: 1px solid gray;
        text-align: center;
        line-height: 30px;
        margin: 0 10px;
        margin-bottom: 5px;
        background-color: #ced6e0;
        &:hover {
          background-color: #747d8c;
          cursor: pointer;
        }
      }
    }
  }
}
.movieList {
  min-height: 200px;
  background: #dfe4ea;
  border-radius: 10px;
  border: 3px solid gray;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  .noMovie {
    text-align: center;
    line-height: 200px;
    height: 200px;
    color: gray;
  }
  .movieBox {
    height: 230px;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    overflow: hidden;
  }
}
</style>