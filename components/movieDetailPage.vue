<template>
  <div>
    <div class="movie">
      <div>xx</div>
      <div>
        <div>yy</div>
        <div>zz</div>
      </div>
    </div>
    <div class="comment">comment</div>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    created() {
      // console.log(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  .movie {
    width: 80%;
    min-height: 200px;
    background-color: #57606f;
    margin: 0 auto;
    border-radius: 10px;
  }
  .comment {
    width: 90%;
    min-height: 300px;
    background-color: #57606f;
    margin: 0 auto;
    margin-top: 20px;
  }

</style>