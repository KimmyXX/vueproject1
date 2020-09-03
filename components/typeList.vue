<template>
  <div id="outBox">
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created() {
    this.$http
      .get("getTypeList")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
</script>

<style lang="scss" scoped>
#outBox {
  width: 90%;
  margin: 0 auto;
}
.el-row {
  border-radius: 10px;
  margin: 0 auto;
  background-color: rgb(138, 139, 139);
}
.el-col {
  border-radius: 4px;
  margin: 10px 0;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>