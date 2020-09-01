import Vue from "vue";
import VueRouter from "vue-router";

// 路由懒加载,还有一种import的有问题
const login = r =>
  require.ensure([], () => r(require("../components/login.vue")), "login");
const mainPage = r =>
  require.ensure([], () => r(require("../components/main.vue")), "mainPage");
const nav = r =>
  require.ensure([], () => r(require("../components/nav.vue")), "mainPage");
  
const rotateList = r =>
  require.ensure([], () => r(require("../components/rotateList.vue")), "mainPage");
const typeList = r =>
  require.ensure([], () =>  r(require("../components/typeList.vue")), "mainPage");
//有问题
// const testVue = () => import(/* webpackChunkName: "testVue" */ '../components/testVue.vue' )

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", component: login },
    {
      path: "/mainPage",
      component: mainPage,
      children: [{ path: "", components: { nav: nav, rotateList: rotateList, typeList: typeList }}]
    }
  ]
});
