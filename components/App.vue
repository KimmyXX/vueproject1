<template>
  <div>
    <div>主页</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    let x = this.$http.get('http://192.168.1.105:10998/test');
    console.log(x);
  }
};
</script>

<style scoped>
</style> 