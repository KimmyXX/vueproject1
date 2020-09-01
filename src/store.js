import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    changeUsername(state,params) {
      if(params.userInfo) {
        state.userInfo = params.userInfo;
      }
    }
  }
});

export default store;

