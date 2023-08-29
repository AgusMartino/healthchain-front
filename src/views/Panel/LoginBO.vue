<template>
    <v-container class="conteiner">
      <v-slide-y-transition mode="out-in">
          <v-layout class="conteiner">
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
              <v-card style="margin-bottom:200px;">
                <div class="pa-3">
                    LOGO GOES HERE
                </div>
                <hr>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Bienvenido al BO de HealthChain</h3>
                    <div>                        
                      <br><br>
                        <v-text-field
                            v-model="loginPostBody.username"
                            label="Usuario"
                        ></v-text-field>
                    
                        <v-text-field
                            v-model="loginPostBody.password"
                            type="password"
                            label="Contraseña"
                        ></v-text-field>
                      <br><br>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions class="conteiner">
                  <v-btn variant="outlined" @click="login()">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </v-container>

</template>

<script>
import axios from "axios"

export default{
    data(){
        return {
            loginPostBody: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
            login(){
                this.loading = true
                axios.post("https://localhost:44398/User/Login", this.loginPostBody)
                .then(response=> {
                    if(response.status==200) {
                    alert('Bienvenido!');
                    localStorage.setItem("username", response.data.user.Nombre_Usuario)
                    localStorage.setItem("userid", response.data.user.Id_usuario)
                    this.$router.push("/")
                    }
                })
                .catch(err =>{
                    alert(err.Message)
                })
                .finally(data =>{
                this.loading = false
                })
            }
        }
    }
</script>
<style>
.conteiner{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>