import './eleUi'
import Vue from 'vue'
import Router from './router'
import './vueResource'
import App from '../components/App.vue'



let div = document.createElement('div');
div.setAttribute('id','app');
document.querySelector('body').appendChild(div);

new Vue({
  render(h) {
    return h(App);
  },
  router: Router
}).$mount('#app');


