import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/css/style.css';
import 'ant-design-vue/dist/antd.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import Antd from 'ant-design-vue';

createApp(App).use(Antd).use(router).mount('#app');