import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载,还有一种import的有问题
const testVue = r => require.ensure([], () => r(require('../components/testVue.vue')), 'testVue');
const login = r => require.ensure([], () => r(require('../components/login.vue')), 'login');

//有问题
// const testVue = () => import(/* webpackChunkName: "testVue" */ '../components/testVue.vue' )


Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: login },
    { path: '/testVue', component: testVue }
  ]
})