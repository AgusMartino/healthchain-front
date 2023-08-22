import { createApp } from 'vue'
import App from './index.vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


const routes = [
  {
    path:'/',
    name:'login',
    component: () => import('./views/Login.vue')
  },
  {
    path:'/menuPrincipal',
    name:'menuPrincipal',
    component: () => import('./views/menuPrincipal.vue')
  }

]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

createApp(App).use(router).mount('#app')