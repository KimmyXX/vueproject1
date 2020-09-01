<template>
    <el-container>
      <el-header>
        <router-view name="nav"></router-view>
      </el-header>
      <el-main>
        <router-view name="rotateList"></router-view>
        <router-view name="typeList"></router-view>
      </el-main>
    </el-container>
</template>

<script>
export default {

};
</script>


<style lang="scss" scoped>
// 占满全屏
.el-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(48, 47, 47);
}

</style>