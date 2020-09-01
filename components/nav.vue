<template>
  <div>
    <span>{{ $store.state.userInfo.nickname }}xx</span>
    <img :src="$store.state.sourcePath + this.$store.state.userInfo.photo" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  created() {
    console.log(this.$store.state.userInfo);
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  background-color: black;
}
span {
  color: white;
}
img {
  width: 60px;
  height: 60px;
}
</style>