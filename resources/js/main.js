import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Boot from './components/Boot.vue';
import Terminal from './components/Terminal.vue';

const routes = [
  {
    path: '/',
    component: Boot,
  },
  {
    path: '/terminal',
    component: Terminal,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).mount('#app');
