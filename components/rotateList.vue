<template>
  <el-carousel :interval="4000" type="card">
    <template v-if="getImgSuccess">
      <el-carousel-item v-for="item in rotateImgs" :key="item.imgname">
        <el-image
          style="width: 100%; height: 100%"
          :src="$store.state.rotatePath + item.imgname"
          fit="fill"
        >
          <!-- 图片加载失败显示 -->
          <div slot="error" class="image-slot">
            <h3 class="medium">获取图片失败</h3>
          </div>
        </el-image>
      </el-carousel-item>
    </template>
    <!-- 加载轮播图失败显示 -->
    <template v-else>
      <el-carousel-item v-for="item in 8" :key="item">
        <h3 class="medium">获取图片失败</h3>
      </el-carousel-item>
    </template>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      rotateImgs: [],
      getImgSuccess: false
    };
  },
  created() {
    this.$http
      .get("getRotateList")
      .then(({ data }) => {
        if (data.success) {
          this.rotateImgs = data.rotateList;
          this.getImgSuccess = true;
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
};
</script>

<style lang="scss" scoped>
.el-carousel {
  width: 80%;
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>