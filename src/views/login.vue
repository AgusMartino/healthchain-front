<template>
    <v-container>
      <v-slide-y-transition mode="out-in">
          <v-layout row wrap align-center>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
              <v-card style="margin-bottom:200px;">
                <div class="imagen">
                  <img src="https://github.com/AgusMartino/images_Front/blob/45f4245150e4fb48790898382e17294ec26294eb/Logo_Empresa.png?raw=true" alt="">
                </div>
                <hr>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Bienvenido a HealthChain</h3>
                    <div>                        
                      <br><br>
                        Ingrese sesion mediante su cuenta de google
                      <br><br>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions class="conteiner">
                  <v-btn variant="outlined" @click="auth0Login()">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </v-container>

</template>
<script>
export default {
    data(){
        return {
            loginPostBody: {
                username: "",
                password: ""
            }
        };
    },
    name: 'Login',
    methods: {
        auth0Login(){
            this.$store.dispatch('auth0Login');
            console.log('we are in auth0Login');
        },
    },
    }
</script>
<style>
.loading {
  display: grid;
  place-items: center;
  height: 50%;
  width: 100%;
}
.imagen{
  display: grid;
  place-items: center;
}
</style>