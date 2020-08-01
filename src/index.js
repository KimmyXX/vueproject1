import './eleUi'
import Vue from 'vue'
import Router from './router'
import './vueResource'
import App from '../components/App.vue'


//  移动端适配,以原稿宽度750px适配
(function () {
  const width = document.body.clientWidth || window.innerWidth
  const scale = width / 750
  const content = 'width=750, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', viewport-fit=cover'
  document.querySelector('meta[name="viewport"]').content = content
})()


let div = document.createElement('div');
div.setAttribute('id','app');
document.querySelector('body').appendChild(div);

new Vue({
  render(h) {
    return h(App);
  },
  router: Router
}).$mount('#app');


