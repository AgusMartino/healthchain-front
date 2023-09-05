import { createStore } from 'vuex'
import auth0 from 'auth0-js'
import router from '../router'
import axios from 'axios'
import { validate } from 'vee-validate'

export default createStore({
  state: {
    userIsAuthorized:false,
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
          console.log(expiresAt)
          const userData = []
          userData = validateUser()
          //Condicional si ya tiene un tipo de usuario lo envio a su home correspondiente
          if(userData.user_type == 1){
            router.replace('/home')
          }
          else if(userData.user_type == 2){
            router.replace('/home')
          //si no tiene un home correspondiente lo envio a seleccionar su tipo de usuario
          }else if(userData.user_type == null){
            router.replace('/seleccionUsuario');
          }
        } 
        else if (err) {
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
    },
    validateUser(){
      const jsonPayload = decodeToken();
      const userData = [];
      axios.get("https://localhost:7151/api/User/ValidateUser/" + jsonPayload.email.toString())
              .then(response=>{
                this.userData = response.data;
              })
              .catch(err =>{
                alert(err.data)
              })
      return userData;
    }    
  },
  modules: {
  }
})
