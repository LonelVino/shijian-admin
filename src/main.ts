import Vue from 'vue';

import '@/styles/normalize.css';
import '@/styles/index.scss';
import '@/styles/dist/quill.core.css';
import '@/styles/dist/quill.snow.css';
import '@/styles/dist/quill.bubble.css';

import '@/permission';
import ElementUI from 'element-ui';
// import Path from 'path';
import './icons';
// dialog可拖动与调整大小
import '@/utils/directives.js';

import App from './App.vue';
import router from './router';
import store from './store';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(Path);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
