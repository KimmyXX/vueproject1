<template>
  <div class="out">
    <div class="historyBox" v-for="item in history" :key="item.id">
      <el-image
        :src="$store.state.rotatePath + item.imgname"
        style="width:100px;height:80%;"
        fit="fill"
      ></el-image>
      <div class="rightBox">
        <h2>{{ item.moviename }}</h2>
        <div class="middleBox">
          <div
            class="currentTime"
          >观看至：{{ parseInt(item.currentTime/3600) + ":" + parseInt(item.currentTime%3600/60) + ":" + parseInt(item.currentTime%60) + " / " + parseInt(item.duration/3600) + ":" + parseInt(item.duration%3600/60) + ":" + parseInt(item.duration%60) }}</div>
          <div>
            <i class="el-icon-delete" @click="deleteHistory(item.id)"></i>
          </div>
        </div>
        <el-button type="success" style="align-self:flex-start;" @click="continuePlay(item.movieid)">继续播放</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: []
    };
  },
  methods: {
    getHistory() {
      this.$http
        .post("getHistory", { username: this.$store.state.userInfo.username })
        .then(({ data }) => {
          if (data.success) {
            this.history = data.data;
          } else {
            this.$message.error("获取历史数据失败");
          }
        })
        .catch(err => {
          this.$message.error("连接服务器失败");
        });
    },
    deleteHistory(id) {
      this.$confirm("确认删除该条记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("deleteHistory", { id: id })
            .then(({data}) => {
              if(data.success) {
                this.$message({
                  type: "success",
                  message: "删除该条历史记录成功"
                })
                this.getHistory();
              }
              else {
                this.$message.error("删除历史记录失败");
              }
            })
            .catch(err => {
              this.$message.error("连接服务器失败");
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    continuePlay(movieid) {
      this.$router.push({ path: `/mainPage/movieDetailPage/${movieid}` });
    }
  },
  created() {
    this.getHistory();
  }
};
</script>

<style lang="scss" scoped>
.out {
  margin: 0 auto;
  min-height: 200px;
  width: 60%;
  background-color: #a4b0be;
  border-radius: 10px;
  border: 2px solid #57606f;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .historyBox {
    width: 80%;
    height: 180px;
    border: 2px solid #57606f;
    display: flex;
    padding: 10px;
    align-items: center;
    // margin-right: 10%;
    .rightBox {
      height: 80%;
      margin-left: 10px;
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .middleBox {
        display: flex;
        justify-content: space-between;
        .currentTime {
          font-weight: bold;
          color: #2f3542;
        }
        .el-icon-delete {
          font-size: 1.5rem;
          &:hover {
            color: #1e90ff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>