<template>
  <div style="text-align:center;">
    <video name="media" autoplay controls width="60%;">
      <source :src="this.$store.state.moviePath + this.moviesource" type="video/mp4"> 
    </video>
  </div>
</template>

<script>
export default {
  props: ['moviesource']
}
</script> 

<style lang="scss" scoped>

</style>