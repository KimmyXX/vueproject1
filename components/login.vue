<template>
  <el-container ref="rootContainer">
    <el-header></el-header>
    <el-main>
      <div id="head"></div>

      <div id="loginContainer">
        <transition name="loginxx" mode="out-in"> 
          <!-- 登陆模块 -->
          <div id="login" v-if="loginShow" key="login">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
              <el-form-item>
                <div class="topHead">Login</div>
              </el-form-item>
              <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="default" @click="login('form')">登陆</el-button>
                <el-button type="info" @click="loginShow ? loginShow = false : loginShow = true">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 注册模块 -->
          <div id="register" v-else key="register">
            <el-form
              ref="registerForm"
              :rules="registerRules"
              :model="registerForm"
              label-width="80px"
            >
              <el-form-item>
                <div class="topHead">Register</div>
              </el-form-item>

              <el-form-item label="账号" prop="username">
                <el-input v-model="registerForm.username" placeholder="请输入账号"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  type="password"
                  v-model="registerForm.confirmPassword"
                  placeholder="请再次输入密码"
                ></el-input>
              </el-form-item>

              <el-form-item label="昵称" prop="nickname">
                <el-input type="text" v-model="registerForm.nickname" placeholder="请输入昵称"></el-input>
              </el-form-item>

              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action
                  :on-change="createImgUrl"
                  :auto-upload="false"
                  :limit="1"
                  :show-file-list="false"
                  :file-list="fileList"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" @click="handleRemove()" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="default" @click="register('registerForm')">注册</el-button>
                <el-button type="info" @click="loginShow ? loginShow = false : loginShow = true">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </transition>
      </div> 
      <!-- logo模块 -->
      <div id="logo">
        <i class="el-icon-video-camera"></i>
        <span>Movie</span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    //用vm引用this
    var vm = this;

    //表单验证
    var usernamePass = function(rule, value, callback) {
      var pattern = /^\d{10}$/;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!pattern.test(value)) {
        callback(new Error("账号由10位数字组成"));
      } else {
        callback();
      }
    };
    var passwordPass = function(rule, value, callback) {
      var pattern = /^[a-zA-Z0-9]+$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pattern.test(value)) {
        callback(new Error("请输入由字母或数字组成的密码"));
      } else {
        callback();
      }
    };
    var confirmPasswordPass = function(rule, value, callback) {
      // 此处引用vm
      if (value !== vm.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var nicknamePass = function(rule, value, callback) {
      var pattern = /\s/;
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else if (pattern.test(value)) {
        callback(new Error("昵称不能包含空格"));
      } else {
        callback();
      }
    };

    return {
      loginShow: true,
      // 登陆表单
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: { validator: usernamePass, trigger: "blur" },
        password: { validator: passwordPass, trigger: "blur" }
      },
      // 注册表单
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        nickname: "",
        userPicture: null
      },
      registerRules: {
        username: { validator: usernamePass, trigger: "blur" },
        password: { validator: passwordPass, trigger: "blur" },
        confirmPassword: { validator: confirmPasswordPass, trigger: "blur" },
        nickname: { validator: nicknamePass, trigger: "blur" }
      },
      // 上传图片
      imageUrl: "",
      fileList: []
    };
  },
  methods: {
    // 登陆判断
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginRequest();
        } else {
          this.$message({
            message: "账号或密码格式错误，请重新输入",
            type: "warning"
          });
          return false;
        }
      });
    },
    // 登陆请求
    loginRequest() {
      let vm = this;
      this.$http
        .post("login", this.form)
        .then(({ data }) => {
          if (data.loginSuccess) {
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            // 保存用户信息到vuex的state中的userInfo
            this.$store.commit('changeUserInfo',{ userInfo: data.userInfo });
            // 记录用户已登录
            sessionStorage.setItem('login',true);
            // 导航到主页
            this.$router.push('/mainPage');
          } else {
            this.$message.error("账号或密码错误，登陆失败");
          }
        })
        .catch(err => {
          this.$message.error("连接服务器错误");
        });
    },
    // 生成图片缩略图地址
    createImgUrl(res, file) {
      this.imageUrl = URL.createObjectURL(file[0].raw);
      // 添加到注册表单信息的文件中
      this.registerForm.userPicture = file[0].raw;
    },
    // 处理移除
    handleRemove() {
      this.imageUrl = "";
      this.registerForm.userPicture = null;
      this.fileList = [];
    },
    // 注册判断输入是否符合要求
    register(formName) {
      var vm = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (vm.imgPass()) {
            this.registerRequest();
          }
          return false;
        } else {
          this.$message({
            message: "注册信息错误，请重新输入",
            type: "warning"
          });
          return false;
        }
      });
    },
    // 注册请求
    registerRequest() {
      let registerData = new FormData();
      registerData.append("username", this.registerForm.username);
      registerData.append("password", this.registerForm.password);
      registerData.append("nickname", this.registerForm.nickname);
      registerData.append("userPicture", this.registerForm.userPicture);

      this.$http
        .post("register", registerData)
        .then(({ data }) => {
          if (data.registerSuccess) {
            this.$message({
              type: 'success',
              message: '注册成功'
            });
            this.form.username = this.registerForm.username;
            this.form.password = this.registerForm.password;
            this.$refs['registerForm'].resetFields();
            this.imageUrl = "";
            this.registerForm.userPicture = null;
            this.fileList = [];
            this.loginShow = true;
          }
          else {
            this.$message.error("账号重复,注册失败");
          }
        })
        .catch(err => {
          this.$message.error("连接服务器错误");
        });
    },
    // 判断图片是否符合要求
    imgPass() {
      if (this.registerForm.userPicture == null) {
        this.$message.error("请添加头像图片");
        return false;
      }
      const isJPG = this.registerForm.userPicture.type === "image/jpeg" || this.registerForm.userPicture.type === "image/png";
      const isLt2M = this.registerForm.userPicture.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
// 占满全屏
.el-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: black;
}
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(48, 47, 47);

  background-size: cover;
  position: relative;
  #head {
    width: 50%;
    height: 5%;
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
    margin-left: 40%;
  }
  #loginContainer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #login,
    #register {
      background-color: white;
      height: 60%;
      width: 40%;
      border: 10px solid black;
      margin-left: 49%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-form {
        width: 80%;
        margin-left: -13%;
        .el-form-item {
          text-align: center;
          .topHead {
            font-size: 1rem;
            font-weight: bolder;
          }
          .el-button {
            width: 40%;
          }
        }
      }
    }
    #register {
      height: 95%;
    }
  }

  #logo {
    position: absolute;
    width: 40%;
    height: 40%;
    left: 10%;
    top: 30%;
    color: white;
    font-size: 6rem;
  }

}






// 过渡动画
.loginxx-enter,
.loginxx-leave-to {
  transform: translate(0px, -100%);
}
.loginxx-enter-active,
.loginxx-leave-active {
  transition: all 2s;
}

//上传图片
.avatar-uploader {
  text-align: center;
  font-size: 0;
  margin: 0;
  padding: 0;
}
.avatar-uploader-icon {
  font-size: 3rem;
  color: #8c939d;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}
.avatar {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0;
  padding: 0;
  border-radius: 50%;
}
</style>