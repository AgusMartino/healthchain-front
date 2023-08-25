<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" class="mr-2">Auth0 with Vue/Vuetify</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/home" class="mr-2">Home</v-btn>
      <v-btn to="/about" class="mr-2">About</v-btn>
      <v-btn to="/contact" class="mr-2">Contact</v-btn>
      <v-btn to="/members" class="mr-2">Members</v-btn>
      <v-btn @click="logout" v-if="!this.$store.state.userIsAuthorized">Logout</v-btn>
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
      clientID: process.env.VUE_APP_Healtchain_AUTH0_CLIENTID,
      domain: process.env.VUE_APP_Healtchain_AUTH0_DOMAIN
    }
  },
  methods:{
    logout(){
      console.log('logging out')
    }
  },
  beforeCreate(){

  }
}
</script>
