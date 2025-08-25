import { createApp } from 'vue';
import App from './App.vue';

import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import router from '@/app/router';

const app = createApp(App);
app.use(Antd);
app.use(createPinia());
app.use(router);
app.mount('#app');
