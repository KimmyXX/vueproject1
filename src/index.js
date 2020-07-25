import '../style/test.css';
import '../style/eleUi'
import Vue from 'vue';
import testVue from '../components/testVue.vue';


let div = document.createElement('div');
div.setAttribute('id','app');
document.querySelector('body').appendChild(div);

new Vue({
  render(h) {
    return h(testVue);
  }
}).$mount('#app');


