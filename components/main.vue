<template>
  <el-container>
    <el-header>
      <transition name="myAnimation" mode="out-in">
        <router-view name="head"></router-view>
      </transition>
    </el-header>
    <el-main>
      <transition name="myAnimation" mode="out-in">
        <router-view name="main1"></router-view>
      </transition>
      <transition name="myAnimation" mode="out-in">
        <router-view name="main2"></router-view>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {};
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