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
import router from '../router'
export default{
    data(){
        return {
            entradasJSON: [],
        };
    },
    components:{
    },
    mounted() {
        this.validateUser()
    },
    methods:{
        validateUser(){
              const jsonPayload = this.parseJwt();
              console.log(jsonPayload.email.toString())
              axios.get("https://localhost:7151/api/User/ValidateUser/" + jsonPayload.email.toString())
                .then(response=>{
                    if(response.status == 200){
                        console.log(response.data.user)
                        this.entradasJSON = response.data;
                        console.log("Comenzado validacion")
                        if(this.entradasJSON.id != null){
                            this.$store.state.id_usuario = this.entradasJSON.id;
                            this.$store.state.username = this.entradasJSON.user;
                            this.$store.state.cuit_empresa = this.entradasJSON.cuit_empresa;
                            this.$store.state.rol = this.entradasJSON.rol.rol;
                            this.$store.state.user_type = this.entradasJSON.user_type;
                            if(this.entradasJSON.user_type == 1){
                            if(this.entradasJSON.rol.id == null || this.entradasJSON.rol.id == ''){
                                router.replace('/seleccionEmpresaUser')
                            }else if(this.entradasJSON.rol.id != null || this.entradasJSON.rol.id != ''){
                                    router.replace('/homeEE')
                                }
                            }else if(this.entradasJSON.user_type == 2){
                            router.replace('/homeM')
                            }
                            }else if(this.entradasJSON.user_type == null){
                            router.replace('/seleccionUsuario')}
                    } 
                })
                .catch(err =>{
                  alert(err.data)
                })
                console.log(this)
              
            },
        RegisterMedico(){
            const BitacoraRequest = {
                id_usuario: "084757d9-cbf3-4098-9374-b9e6563dcfb3",
                name: "",
                lastname: "",
                description: "Se realiza un registro de medico",
                type: "INFO",
                creation_date: "",
            }
            axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                this.jsonSolicitud = response.data;
                                    Console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          Console.log(err.data)
                        })
            const userdata = this.parseJwt()
            const JsonRegister = {
                id: "",
                user: userdata.email.toString(),
                password: "",
                name: userdata.given_name.toString(),
                lastname: userdata.family_name.toString(),
                user_type: "2",
                cuit_empresa: "",
                rol: {
                    id: "4",
                    rol: ""
                }
            }
            axios.post("https://localhost:7151/api/User/RegisterUser", JsonRegister)
            .then(response=>{
                    if(response.status==200){
                        alert("registrado con exito!")
                        axios.get("https://localhost:7151/api/User/ValidateUser/" + userdata.email.toString())
                            .then(response=>{
                            if(response.status == 200){
                            console.log(response.data.user)
                            this.entradasJSON = response.data;
                            if(this.entradasJSON.id != null){
                                this.$store.state.id_usuario = this.entradasJSON.id;
                                this.$store.state.username = this.entradasJSON.user;
                                this.$store.state.cuit_empresa = this.entradasJSON.cuit_empresa;
                                this.$store.state.rol = this.entradasJSON.rol.rol;
                                this.$store.state.user_type = this.entradasJSON.user_type;
                                }
                            router.replace('/homeM')
                            }
                        })
                    }
                })
            .catch(err =>{
                alert(err.data)
            })
        },
        RegisterUsuarioEmpresa(){
            const BitacoraRequest = {
                id_usuario: "084757d9-cbf3-4098-9374-b9e6563dcfb3",
                name: "",
                lastname: "",
                description: "Se realiza un registro de usario de empresa",
                type: "INFO",
                creation_date: ""
            }
            axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                this.jsonSolicitud = response.data;
                                    Console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          Console.log(err.data)
                        })
            const userdata = this.parseJwt()
            const JsonRegister = {
                id: "",
                user: userdata.email.toString(),
                password: "",
                name: userdata.given_name.toString(),
                lastname: userdata.family_name.toString(),
                user_type: "1",
                cuit_empresa: "",
                rol: {
                    id: "",
                    rol: ""
                }
              }
              axios.post("https://localhost:7151/api/User/RegisterUser", JsonRegister)
              .then(response=>{
                if(response.status==200){
                        alert("registrado con exito!")
                        axios.get("https://localhost:7151/api/User/ValidateUser/" + userdata.email.toString())
                            .then(response=>{
                            if(response.status == 200){
                            console.log(response.data.user)
                            this.entradasJSON = response.data;
                            if(this.entradasJSON.id != null){
                                this.$store.state.id_usuario = this.entradasJSON.id;
                                this.$store.state.username = this.entradasJSON.user;
                                this.$store.state.cuit_empresa = this.entradasJSON.cuit_empresa;
                                this.$store.state.rol = this.entradasJSON.rol.rol;
                                this.$store.state.user_type = this.entradasJSON.user_type;
                                }
                            router.replace('/homeM')
                            }
                        })
                        router.replace('/seleccionEmpresaUser')
                    }
              })
              .catch(err =>{
                alert(err.data)
              })
              .finally(data =>{
                //agregar guardado de datos en state
              })
            },
        parseJwt() {
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

