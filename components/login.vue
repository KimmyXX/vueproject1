<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <div id="head"></div>
      <div id="login">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="login('form')">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="logo">
        <i class="el-icon-video-camera"></i>
        <span>Movie</span>
      </div>
      <div id="projector">
        <i class="el-icon-video-camera-solid"></i>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
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
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: { validator: usernamePass, trigger: "blur" },
        password: { validator: passwordPass, trigger: "blur" }
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginRequest();
        } else {
          this.$message({
              message: "账号或密码格式错误，请重新输入",
              type: 'warning'
          });
          return false;
        }
      });
    },
    loginRequest() {
      this.$http
        .post("login", this.form)
        .then(({ data }) => {
          if(data.loginSuccess) {
            this.$message({
              message: '登陆成功',
              type: 'success'
            });
          }
          else {
            this.$message.error('账号或密码错误，登陆失败');
          }
        })
        .catch(err => {
          this.$message.error('连接服务器错误');
        });
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
  position: relative;
  #head {
    width: 50%;
    height: 5%;
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
    margin-left: 40%;
  }
  #login {
    background-color: white;
    height: 50%;
    width: 40%;
    border: 10px solid black;
    margin-left: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 80%;
      margin-left: -13%;
      .el-form-item {
        text-align: center;
        .el-button {
          width: 50%;
        }
      }
    }
  }
  #logo {
    position: absolute;
    width: 30%;
    height: 40%;
    left: 10%;
    top: 10%;
    color: white;
    font-size: 80px;
  }
  #projector {
    position: absolute;
    width: 30%;
    height: 40%;
    left: 10%;
    bottom: 10%;
    i {
      color: black;
      font-size: 200px;
      transform: rotate(-20deg);
    }
  }
}
</style>