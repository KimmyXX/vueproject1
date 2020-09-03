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



const router = new VueRouter({
  routes: [
    { path: "/", component: login },
    {
      path: "/mainPage",
      component: mainPage,
      children: [{ path: "", components: { nav: nav, rotateList: rotateList, typeList: typeList }}]
    }
  ]
});
//路由守卫只有登录过的人才能进入其他路由
router.beforeEach((to,from,next) => {
  if(to.path != "/" && sessionStorage.getItem('login') != "true") {
    next({ path: '/' });
  }
  else {
    next();
  }
})

export default router;
