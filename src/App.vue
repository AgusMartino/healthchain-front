<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn v-if="this.$store.state.user_type == null" to="/login" class="mr-2">HealthChain</v-btn>
        <v-btn v-if="this.$store.state.user_type == '1'" to="/HomeEE" class="mr-2">HealthChain</v-btn>
        <v-btn v-if="this.$store.state.user_type == '2'" to="/HomeM" class="mr-2">HealthChain</v-btn>
        <v-btn v-if="this.$store.state.user_type == '3'" to="/HomeBO" class="mr-2">HealthChain</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="this.$store.state.user_type == '1'" to="/gestorNFTEE" class="mr-2">Gestor NFT</v-btn>
      <v-btn v-if="this.$store.state.user_type == '1'" to="/gestorMedicosEE" class="mr-2">Gestor Medicos</v-btn>
      <v-btn v-if="this.$store.state.user_type == '1'" to="/gestorUsuariosEE" class="mr-2">Gestor Usuarios</v-btn>
      <v-btn v-if="this.$store.state.user_type == '2'" to="/gestorNFTM" class="mr-2">Gestor NFT</v-btn>
      <v-btn v-if="this.$store.state.user_type == '2'" to="/gestorSolicitudesM" class="mr-2">Gestor de solicitudes</v-btn>
      <v-btn v-if="this.$store.state.user_type == '2'" to="/listadoEmpresasAsociadasM" class="mr-2">Listado de empresas asociadas</v-btn>
      <v-btn v-if="this.$store.state.user_type == '3'" to="/gestorEmpresaBO" class="mr-2">Gestor de Empresas</v-btn>
      <v-btn v-if="this.$store.state.user_type == '3'" to="/gestorUsuariosAdminBO" class="mr-2">Gestor de Usuarios de Empresas</v-btn>
      <v-btn v-if="this.$store.state.user_type == '3'" to="/listadoTransaccionesBO" class="mr-2">Transacciones</v-btn>
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
      tipo_usuario: null,
      Rol: null,
      id_usuario: null,
      clientID: process.env.VUE_APP_Healtchain_AUTH0_CLIENTID,
      domain: process.env.VUE_APP_Healtchain_AUTH0_DOMAIN
    }
  },
  mounted(){
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
