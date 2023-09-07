import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import Store from '../store'
import Callback from '../views/callback.vue'
import seleccionUsuario from '../views/seleccionUsuario.vue'
import CrearEmpresaBO from '../views/Panel/CrearEmpresaBO.vue'
import loginBO from '../views/Panel/LoginBO.vue'
import HomeBO from '../views/Panel/HomeBO.vue'
import HomeEE from '../views/EmpleadoEmpresa/homeEmpleadoEmpresa.vue'
import HomeM from '../views/Medico/homeMedico.vue'
import seleccionEmpresaUser from '../views/seleccionEmpresaUser.vue'


const routes = [
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/seleccionUsuario',
    name: 'seleccionUsuario',
    component: seleccionUsuario,
  },
  {
    path: '/seleccionEmpresaUser',
    name: 'seleccionEmpresaUser',
    component: seleccionEmpresaUser,
  },
  {
    path: '/HomeEE',
    name: 'HomeEE',
    component: HomeEE,
  },
  {
    path: '/HomeM',
    name: 'HomeM',
    component: HomeM,
  },
  {
    path: '/CrearEmpresaBO',
    name: 'CrearEmpresaBO',
    component: CrearEmpresaBO,
  },
  {
    path: '/loginBO',
    name: 'loginBO',
    component: loginBO,
  },
  {
    path: '/HomeBO',
    name: 'HomeBO',
    component: HomeBO,
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
  
  let routerAuthCheck = false;
  if(localStorage.getItem('access_token')&& localStorage.getItem('id_token')&& localStorage.getItem('expires_at')){
    console.log('found local storage tokens')
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    routerAuthCheck = new Date().getDate() < expiresAt
  }
  Store.commit('setUserIsAuthenticated', routerAuthCheck);
  if(routerAuthCheck){
    Store.commit('setUserIsAuthenticated', true);
  }
  else{
    Store.commit('setUserIsAuthenticated', false);
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
