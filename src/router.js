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
  require.ensure(
    [],
    () => r(require("../components/rotateList.vue")),
    "mainPage"
  );

const movieListModule = r =>
  require.ensure(
    [],
    () => r(require("../components/movieListModule.vue")),
    "mainPage"
  );

const movieDetailPage = r => 
    require.ensure(
      [],
      () => r(require("../components/movieDetailPage.vue")),
      "movieDetailPage"
    )
//有问题
// const testVue = () => import(/* webpackChunkName: "testVue" */ '../components/testVue.vue' )

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: login },
    {
      path: "/mainPage",
      component: mainPage,
      children: [
        {
          path: "",
          components: { head: nav, main1: rotateList, main2: movieListModule }
        },
        {
          path: "movieDetailPage/:id",
          components: { head: nav, main1: movieDetailPage},
          props: {
            main1: true
          }
        }
      ]
    }
  ]
});
//路由守卫只有登录过的人才能进入其他路由
router.beforeEach((to, from, next) => {
  if (to.path != "/" && sessionStorage.getItem("login") != "true") {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
