<template>
    <v-container row wrap align-center>
      <v-slide-y-transition mode="out-in">
          <v-layout class="layout">
            <div>
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="344" variant="outlined">
                        <div class="pa-3">
                            Imagen empresa
                        </div>
                        <hr>
                        <v-card-actions>
                        <v-btn  variant="outlined" @click="RegisterUsuarioEmpresa()">Soy empleado de obra social</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>

            <div>
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="344" variant="outlined">
                        <div class="pa-3">
                            Imagen medico
                        </div>
                        <hr>
                        <v-card-actions>
                        <v-btn variant="outlined" @click="RegisterMedico()">Soy medico</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>
          </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>
import axios from 'axios'
export default{
    components:{
    },
    methods:{
        RegisterMedico(){
            const userdata = parseJwt()
            const JsonRegister = {
                user: userdata.email.toString(),
                name: userdata.given_name.toString(),
                lastname: userdata.family_name.toString(),
                user_type: "1",
                rol: {
                    id: "4",
                }
            }
            axios.post("https://localhost:7151/api/User/RegisterUser", JsonRegister)
            .then(response=>{
                    if(response.status==200){
                        alert("registrado con exito!")
                        router.replace('/homeM')
                    }
            })
            .catch(err =>{
                alert(err.data)
            })
        },
        RegisterUsuarioEmpresa(){
              const userdata = parseJwt()
              const JsonRegister = {
                user: userdata.email.toString(),
                name: userdata.given_name.toString(),
                lastname: userdata.family_name.toString(),
                user_type: "2"
              }
              axios.post("https://localhost:7151/api/User/RegisterUser", JsonRegister)
              .then(response=>{
                if(response.status==200){
                        alert("registrado con exito!")
                        router.replace('/seleccionEmpresaUser')
                    }
              })
              .catch(err =>{
                alert(err.data)
              })
            },
        parseJwt () {
            const token = localStorage.getItem('id_token')
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload)
        }
    }
}
</script>
<style>
.layout{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.container{
    justify-content: center;
    align-items: center;
}
.col-4{
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    padding-right: 30%;
    padding-left: 30%
}
</style>

