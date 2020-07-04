import Vue from 'vue'

import '@/styles/normalize.css';
import '@/styles/index.scss';
import '@/permission';
import ElementUI from 'element-ui';
// import Path from 'path';
import './icons';

import App from './App.vue'
import router from './router'
import store from './store'
import '@/registerServiceWorker';


Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.use(Path);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
