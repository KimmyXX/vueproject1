import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    userInfo: null,

    
    // // 静态资源位置，用于img等的src中
    // // 用户上传头像等位置
    sourcePath: 'http://127.0.0.1:10998/upload/',
    // 网页本身图片位置
    rotatePath: 'http://127.0.0.1:10998/img/',
    // 网页视频位置
    moviePath: 'http://127.0.0.1:10998/movie/' 

    //服务器测试版本
    // sourcePath: 'upload/',
    // rotatePath: 'img/',
    // moviePath: 'movie/'
  },
  mutations: {
    changeUserInfo(state,params) {
      if(params.userInfo) {
        state.userInfo = params.userInfo;
      }
    }
  }
});

export default store;

