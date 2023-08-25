<template>
    <v-container>
      <v-slide-y-transition mode="out-in">
          <v-layout row wrap align-center>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
              <v-card style="margin-bottom:200px;">
                <div class="pa-3">
                    LOGO GOES HERE
                </div>
                <hr>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Bienvenido a HealthChain</h3>
                    <div>                        
                      <br><br>
                        Login to connect. 
                      <br><br>
                      <div class="row mt-2">
                        <div id="validationException"></div>
                            <div class="col">
                                <label for="user">
                                    <span>Usuario:</span>
                                    <input class="border" type="text" name="user" id="user" v-model="loginPostBody.username">
                                </label>
                            </div>
                        </div>
                        <div id="userException"></div>
                        <div class="row mt-2">
                            <div class="col">
                                <label for="password">
                                    <span>Contraseña:</span>
                                    <input class="border" type="password" name="password" id="password" v-model="loginPostBody.password">
                                </label>
                            </div>
                        </div>
                        <div id="passwordException"></div>
                        <div class="row mt-2">
                            <div class="col">
                                <router-link style="text-decoration:underline" to="/resetPassword" target="_blank">Olvide mi contraseña</router-link>
                            </div>
                        </div>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn  @click="auth0Login()">Login</v-btn>
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