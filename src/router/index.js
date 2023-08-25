import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import about from '../views/About.vue'
import home from '../views/Home.vue'
import contact from '../views/Contact.vue'
import member from '../views/Members.vue'
import Store from '../store'
import Callback from '../views/callback.vue'


const routes = [
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact,
    meta: {requiresAuth: true }
  },
  {
    path: '/members',
    name: 'member',
    component: member,
    meta: {requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to,from,next)=>{
  //
  if(to.matched.some(record=>record.path == '/callback')){
    console.log('router.beforeEach found /callback url')
    Store.dispatch('auth0HandleAuthentication');
    next(false);
  }
  
  let routerAuthCheck = true;
  if(routerAuthCheck){
    Store.commit('setUserIsAuthenticated', true);
  }
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(routerAuthCheck){
      
      next();
    }
    else{
      router.replace('/login');
    }
  }
  else{
    next();
  }
});



export default router
