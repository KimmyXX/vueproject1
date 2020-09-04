var Promise = require('es6-promise').Promise
import './eleUi'
import Vue from 'vue'
import Router from './router'
import './vueResource'
import App from '../components/App.vue'
import './style/init.css'
import store from './store'


// 导入阿里图标库的icon
import './icon/iconfont'

//  移动端适配,以原稿宽度1360px适配

(function () {
  const width = document.body.clientWidth || window.innerWidth
  const scale = width / 1360
  const content = 'width=1360, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', viewport-fit=cover'
  document.querySelector('meta[name="viewport"]').content = content
})()



let div = document.createElement('div');
div.setAttribute('id','app');
document.querySelector('body').appendChild(div);

new Vue({
  render(h) {
    return h(App);
  },
  router: Router,
  store: store
}).$mount('#app');


