import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../components/App.vue'
import testVue from '../components/testVue.vue'
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: testVue }
  ]
})