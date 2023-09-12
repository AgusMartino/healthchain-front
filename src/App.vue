<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link v-if="this.tipo_usuario != null" to="/login" class="mr-2">HealthChain</router-link>
        <router-link v-if="this.tipo_usuario = '1'" to="/HomeEE" class="mr-2">HealthChain</router-link>
        <router-link v-if="this.tipo_usuario = '2'" to="/HomeM" class="mr-2">HealthChain</router-link>
        <router-link v-if="this.tipo_usuario = '3'" to="/HomeBO" class="mr-2">HealthChain</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="this.tipo_usuario = '1'" to="/HomeEE" class="mr-2">Gestor NFT</v-btn>
      <v-btn v-if="this.tipo_usuario = '1'" to="/home" class="mr-2">Gestor Medicos</v-btn>
      <v-btn v-if="this.tipo_usuario = '1'" to="/home" class="mr-2">Gestor Usuarios</v-btn>
      <v-btn v-if="this.tipo_usuario = '2'" to="/gestorNFTM" class="mr-2">Gestor NFT</v-btn>
      <v-btn v-if="this.tipo_usuario = '2'" to="/gestorSolicitudesM" class="mr-2">Gestor de solicitudes</v-btn>
      <v-btn v-if="this.tipo_usuario = '2'" to="/listadoEmpresasAsociadasM" class="mr-2">Listado de empresas asociadas</v-btn>
      <v-btn v-if="this.tipo_usuario = '3'" to="/home" class="mr-2">Gestor de Empresas</v-btn>
      <v-btn v-if="this.tipo_usuario = '3'" to="/home" class="mr-2">Gestor de Usuarios de Empresas</v-btn>
      <v-btn @click="logout" v-if="this.$store.state.userIsAuthorized">Logout</v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data (){
    return{
      tipo_usuario: localStorage.getItem('user_type'),
      Rol: localStorage.getItem('rol'),
      id_usuario: localStorage.getItem('id_usuario'),
      clientID: process.env.VUE_APP_Healtchain_AUTH0_CLIENTID,
      domain: process.env.VUE_APP_Healtchain_AUTH0_DOMAIN
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth0Logout')
      console.log('logging out')
    }
  },
  beforeCreate(){

  }
}
</script>
