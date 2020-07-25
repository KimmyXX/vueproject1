import './eleUi'
import Vue from 'vue'
import App from '../components/App.vue'
import Router from './router'

let div = document.createElement('div');
div.setAttribute('id','app');
document.querySelector('body').appendChild(div);

new Vue({
  render(h) {
    return h(App);
  },
  router: Router
}).$mount('#app');


