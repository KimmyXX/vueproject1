<template>
  <div class="out">
    <div class="leftBox">
      <div class="logo">
        <i class="el-icon-video-camera"></i>
        <span>Movie</span>
      </div>
      <el-menu
        mode="horizontal"
        background-color="black"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="defaultActive"
        :router="true"
      >
        <el-menu-item index="/mainPage">首页</el-menu-item>
        <!-- <el-menu-item index="/mainPage/searchPage/全部">电影</el-menu-item> -->
        <!-- <el-menu-item index="/222">历史记录</el-menu-item> -->
      </el-menu>
    </div>
    <div class="userBox">
      <span>{{ $store.state.userInfo.nickname }}</span>
      <el-dropdown size="small">
        <img :src="imgSrc" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout()">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: this.$store.state.sourcePath + this.$store.state.userInfo.photo,
      defaultActive: "/mainPage"
    };
  },
  methods: {
    logout() {
      this.$confirm("确认登出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("logout", {})
            .then(({ data }) => {
              if (data.success) {
                this.$message({
                  type: "success",
                  message: "登出成功"
                });
                sessionStorage.clear();
                this.$router.push("/");
              } else {
                this.$message.error("登出失败");
              }
            })
            .catch(err => {
              this.$message.error("连接服务器错误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin flexbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.out {
  width: 100%;
  height: 100%;
  background-color: black;
  @include flexbox;
}

.leftBox {
  @include flexbox;
}

.logo {
  color: white;
  font-size: 2rem;
  margin: 0 20px;
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

.el-menu {
  border: none !important;
}
.el-menu-item:hover {
  background: #4a4a4b !important;
}
</style>