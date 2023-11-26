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
                            v-model="loginPostBody.usuario"
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
import router from '../../router'

export default{
    data(){
        return {
            loginPostBody: {
                usuario: "",
                password: ""
            }
        };
    },
    methods: {
            login(){
              const BitacoraRequest={
                id_bitacora: "",
                id_usuario: "084757d9-cbf3-4098-9374-b9e6563dcfb3",
                name: "",
                lastname: "",
                description: "Se realiza login del usuario:" + this.loginPostBody.usuario,
                type: "INFO",
                creation_date: "",
              }
              axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                            .then(response=>{
                                if(response.status == 200){
                                        console.log('bitacora ok')
                                }})
                            .catch(err =>{
                              console.log(err.data)
                            })
              console.log(this.loginPostBody.password)
              console.log(this.loginPostBody.usuario)
                axios.post("https://localhost:7151/api/User/LoginUserBO", this.loginPostBody)
                .then(response=> {
                    if(response.status==200){
                      if(response.data.id == null){
                        alert('Nombre de usuario o contraseña incorrecto')
                      }else if(response.data.id != null){
                        alert('Bienvenido!');
                        this.$store.state.id_usuario = response.data.id,
                        this.$store.state.username = response.data.user,
                        this.$store.state.user_type = response.data.user_type,
                        console.log(this.loginPostBody.usuario)
                        router.replace("/HomeBO")
                      }
                    }
                })
                .catch(err =>{
                    alert(err.Message)
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