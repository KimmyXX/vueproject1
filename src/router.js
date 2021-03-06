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
  );

const searchPage = r =>
  require.ensure(
    [],
    () => r(require("../components/searchPage.vue")),
    "searchPage"
  );

const history = r =>
  require.ensure([], () => r(require("../components/history.vue")), "history");

// const player = r =>
//   require.ensure([], () => r(require("../components/player.vue")), "player");
//有问题
// const testVue = () => import(/* webpackChunkName: "testVue" */ '../components/testVue.vue' )

//方法2
// const login =  () => import(/* webpackChunkName: "login" */ "../components/login.vue");
// const mainPage =  () => import(/* webpackChunkName: "mainPage" */ "../components/main.vue");
// const nav =  () => import(/* webpackChunkName: "mainPage" */ "../components/nav.vue");
// const rotateList =  () => import(/* webpackChunkName: "mainPage" */ "../components/rotateList.vue");
// const movieListModule =  () => import(/* webpackChunkName: "mainPage" */ "../components/movieListModule.vue");
// const movieDetailPage=  () => import(/* webpackChunkName: "movieDetailPage" */ "../components/movieDetailPage.vue");
// const searchPage=  () => import(/* webpackChunkName: "searchPage" */ "../components/searchPage.vue");
// const history=  () => import(/* webpackChunkName: "history" */ "../components/history.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
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
          components: { head: nav, main1: movieDetailPage },
          props: {
            main1: true
          }
        },
        {
          path: "searchPage/:type",
          components: { head: nav, main1: searchPage },
          props: {
            main1: true
          }
        },
        {
          path: "history",
          components: { head: nav, main1: history }
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
    // 路由改变回到顶部
    window.scroll(0, 0);
  }
});

export default router;
