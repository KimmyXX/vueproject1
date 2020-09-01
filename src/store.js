import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    userInfo: {},
    // 静态资源位置，用于img等的src中
    sourcePath: 'http://127.0.0.1:10998/'
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

