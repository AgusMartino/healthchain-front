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
      <p v-if="this.$store.state.user_type != null" class="mr-2"><b>Usuario:</b> {{ this.$store.state.username }}</p>
      <p v-if="this.$store.state.user_type == '1'" class="mr-2"><b>Tipo:</b> Empresa</p>
      <p v-if="this.$store.state.user_type == '2'" class="mr-2"><b>Tipo:</b> Medico</p>
      <p v-if="this.$store.state.user_type == '3'" class="mr-2"><b>Tipo:</b> BackOffice</p>
      <v-btn @click="logout" v-if="this.$store.state.userIsAuthorized">Logout</v-btn>
    </v-toolbar>
    <v-content class="Empresa" v-if="this.$store.state.user_type == '1'">
      <router-view></router-view>
    </v-content>
    <v-content class="Medico" v-if="this.$store.state.user_type == '2'">
      <router-view></router-view>
    </v-content>
    <v-content v-if="this.$store.state.user_type == '3'">
      <router-view></router-view>
    </v-content>
    <v-content v-if="this.$store.state.user_type == null">
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
<style>
.Medico {
  background-color: #A8F6B8;
  height: 100%;
  width: 100%;
}
.Empresa {
  background-color: #BBCECF;
  height: 100%;
  width: 100%;
}
</style>
