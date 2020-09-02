<template>
  <div>
    <span>{{ $store.state.userInfo.nickname }}</span>
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: this.$store.state.sourcePath + this.$store.state.userInfo.photo
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: flex-end;
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
</style>