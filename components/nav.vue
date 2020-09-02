<template>
  <div class="out">
    <el-menu
      mode="horizontal"
      background-color="black"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="1"
    >
      <el-menu-item index="1">首页</el-menu-item>
    </el-menu>
    <div class="userBox">
      <span>{{ $store.state.userInfo.nickname }}</span>
      <img :src="imgSrc" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: this.$store.state.sourcePath + this.$store.state.userInfo.photo
    };
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.out {
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 20px;
}
span {
  color: white;
}
.userBox {
  display: flex;
  align-items: center;
}
</style>