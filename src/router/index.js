import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import Store from '../store'
import Callback from '../views/callback.vue'
import seleccionUsuario from '../views/seleccionUsuario.vue'
import seleccionEmpresaUser from '../views/seleccionEmpresaUser.vue'
import HomeEE from '../views/EmpleadoEmpresa/homeEmpleadoEmpresa.vue'
import aceptarRechazarSolicitudEE from '../views/EmpleadoEmpresa/aceptarRechazarSolicitud.vue'
import listadoMedicosEE from '../views/EmpleadoEmpresa/listadoMedicos.vue'
import listadoSolicitudesMedicoEE from '../views/EmpleadoEmpresa/listadoSolicitudesMedico.vue'
import listadoSolicitudesUsuariosEE from '../views/EmpleadoEmpresa/listadoSolicitudesUsuarios.vue'
import listadoUsuariosEE from '../views/EmpleadoEmpresa/listadoUsuarios.vue'
import modificarUsuarioEE from '../views/EmpleadoEmpresa/modificarUsuario.vue'
import gestorMedicosEE from '../views/EmpleadoEmpresa/modificarUsuario.vue'
import gestorNFTEE from '../views/EmpleadoEmpresa/modificarUsuario.vue'
import gestorUsuariosEE from '../views/EmpleadoEmpresa/modificarUsuario.vue'
import HomeM from '../views/Medico/homeMedico.vue'
import gestorNFTM from '../views/Medico/gestorNFT.vue'
import gestorSolicitudesM from '../views/Medico/gestorSolicitudes.vue'
import crearSolicitudesMedicoM from '../views/Medico/crearSolicitudes.vue'
import listadoEmpresasAsociadasM from '../views/Medico/listadoEmpresasAsociadas.vue'
import listadoSolicitudesRealizadasM from '../views/Medico/listadoSolicitudesRealizadas.vue'
import CrearEmpresaBO from '../views/Panel/CrearEmpresaBO.vue'
import loginBO from '../views/Panel/LoginBO.vue'
import crearUsuarioAdminEmpresaBO from '../views/Panel/crearUsuarioAdminEmpresa.vue'
import gestorEmpresaBO from '../views/Panel/gestorEmpresa.vue'
import gestorUsuariosAdminBO from '../views/Panel/gestorUsuariosAdmin.vue'

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
    path: '/gestorMedicosEE',
    name: 'gestorMedicosEE',
    component: gestorMedicosEE,
  },
  {
    path: '/gestorNFTEE',
    name: 'gestorNFTEE',
    component: gestorNFTEE,
  },
  {
    path: '/gestorUsuariosEE',
    name: 'gestorUsuariosEE',
    component: gestorUsuariosEE,
  },
  {
    path: '/aceptarRechazarSolicitudEE/:user',
    name: 'aceptarRechazarSolicitudEE',
    component: aceptarRechazarSolicitudEE,
    props: true
  },
  {
    path: '/listadoMedicosEE',
    name: 'listadoMedicosEE',
    component: listadoMedicosEE,
  },
  {
    path: '/listadoSolicitudesMedicoEE',
    name: 'listadoSolicitudesMedicoEE',
    component: listadoSolicitudesMedicoEE,
  },
  {
    path: '/listadoSolicitudesUsuariosEE',
    name: 'listadoSolicitudesUsuariosEE',
    component: listadoSolicitudesUsuariosEE,
  },
  {
    path: '/listadoUsuariosEE',
    name: 'listadoUsuariosEE',
    component: listadoUsuariosEE,
  },
  {
    path: '/modificarUsuarioEE/:id_user',
    name: 'modificarUsuarioEE',
    component: modificarUsuarioEE,
    props: true
  },
  {
    path: '/HomeM',
    name: 'HomeM',
    component: HomeM,
  },
  {
    path: '/gestorNFTM',
    name: 'gestorNFTM',
    component: gestorNFTM,
  },
  {
    path: '/gestorSolicitudesM',
    name: 'gestorSolicitudesM',
    component: gestorSolicitudesM,
  },
  {
    path: '/crearSolicitudesMedicoM',
    name: 'crearSolicitudesMedicoM',
    component: crearSolicitudesMedicoM,
  },
  {
    path: '/listadoEmpresasAsociadasM',
    name: 'listadoEmpresasAsociadasM',
    component: listadoEmpresasAsociadasM,
  },
  {
    path: '/listadoSolicitudesRealizadasM',
    name: 'listadoSolicitudesRealizadasM',
    component: listadoSolicitudesRealizadasM,
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
  {
    path: '/gestorEmpresaBO',
    name: 'gestorEmpresaBO',
    component: gestorEmpresaBO,
  },
  {
    path: '/gestorUsuariosAdminBO',
    name: 'gestorUsuariosAdminBO',
    component: HomeBO,
  },
  {
    path: '/CrearEmpresaBO',
    name: 'CrearEmpresaBO',
    component: CrearEmpresaBO,
  },
  {
    path: '/crearUsuarioAdminEmpresaBO',
    name: 'crearUsuarioAdminEmpresaBO',
    component: crearUsuarioAdminEmpresaBO,
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
