import { createStore } from 'vuex'
import auth0 from 'auth0-js'
import router from '../router'
import axios from 'axios'
import { validate } from 'vee-validate'

export default createStore({
  state: {
    user_type: null,
    rol: null,
    id_usuario: null,
    username: null,
    cuit_empresa: null,
    userIsAuthorized: false,
    auth0: new auth0.WebAuth({
      domain: process.env.VUE_APP_Healtchain_AUTH0_DOMAIN, 
      clientID: process.env.VUE_APP_Healtchain_AUTH0_CLIENTID,
      redirectUri: process.env.VUE_APP_DOMAINURL + '/callback',  
      responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
      scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE})
  },
  getters: {
  },
  mutations: {
    setUserIsAuthenticated(state, replacement){
      state.userIsAuthorized = replacement;
    }
  },
  actions: {
    auth0Login(context){
      context.state.auth0.authorize()
    },
    auth0HandleAuthentication (context) {
      context.state.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          // save the tokens locally
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('expires_at', expiresAt);  
          console.log(authResult.accessToken)
          console.log(authResult.idToken)
          console.log(expiresAt);
          const BitacoraRequest = {
            id_usuario: "084757d9-cbf3-4098-9374-b9e6563dcfb3",
            name: "",
            lastname: "",
            description: "Se realiza un login con Auth0 con el token:" + authResult.idToken,
            type: "INFO",
            creation_date: "",
          }
          axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                this.jsonSolicitud = response.data;
                                    Console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          Console.log(err.data)
                        })
          router.replace('/seleccionUsuario')
        } 
        else if (err) {
          const BitacoraRequestError = {
            id_usuario: "084757d9-cbf3-4098-9374-b9e6563dcfb3",
            name: "",
            lastname: "",
            description: "Se realiza un login con Auth0 y genero un login failed. Error #KJN838" + err,
            type: "ERROR",
            creation_date: "",
          }
          axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequestError)
                        .then(response=>{
                            if(response.status == 200){
                                this.jsonSolicitud = response.data;
                                    Console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          Console.log(err.data)
                        })
          alert('login failed. Error #KJN838');
          router.replace('/login');
          console.log(err);
        }
      })
    },
    auth0Logout (context) {
      // No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
      // Clear Access Token and ID Token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');

      // redirect to auth0 logout to completely log the user out
      window.location.href = process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL + "/v2/logout?returnTo=" + process.env.VUE_APP_DOMAINURL + "/login&client_id=" + process.env.VUE_APP_Healtchain_AUTH0_CLIENTID; 
    },
    decodeToken(){
      const token = localStorage.getItem('id_token')
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload)
    }   
  },
  modules: {
  }
})
