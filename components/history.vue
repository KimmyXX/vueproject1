<template>
  <div class="out">
    <div class="historyBox" v-for="item in history" :key="item.movieid">
      <el-image
        :src="$store.state.rotatePath + item.imgname"
        style="width:100px;height:80%;"
        fit="fill"
      ></el-image>
      <div class="rightBox"></div>
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
            console.log(this.history);
          } else {
            this.$message.error("获取历史数据失败");
          }
        })
        .catch(err => {
          this.$message.error("连接服务器失败");
        });
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
  width: 80%;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #57606f;
  padding: 10px;
  .historyBox {
    margin: 0 auto;
    width: 80%;
    height: 180px;
    border: 2px solid #57606f;
    display: flex;
    padding: 10px;
    align-items: center;
    .rightBox {
      height: 80%;
      margin-left: 10px;
      flex-grow: 1;
      border: 1px solid black;
    }
  }
}
</style>