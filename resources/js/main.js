import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Terminal from './components/Terminal/Terminal.vue';
import About from './components/About.vue';

const routes = [
  {
    path: '/',
    component: Terminal,
  },
  {
    path: '/about',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).mount('#app');
