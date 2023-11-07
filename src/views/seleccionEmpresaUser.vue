<template>
  <form class="form">
      <v-text-field
        v-model="cuit"
        :counter="10"
        label="Cuit"
      ></v-text-field>

      <v-btn variant="outlined" @click="GetEmpresa()">Buscar empresa</v-btn>
  </form>

  <form class="form" v-if="validacionCuit">
      <v-text-field
        disableb
        v-model="this.jsonEmpresa.name"
      ></v-text-field>
  
      <v-text-field
        disableb
        v-model="this.jsonEmpresa.direccion"
      ></v-text-field>

      <v-select
          v-model="this.Rolselect"
          :items="this.jsonRol"
          item-title="Rol"
          item-value="id"
          label="Seleccionar Rol"
          @change="this.Rolselect"
        ></v-select>

      <v-text-field
        label="Motivo"
        v-model="this.jsonSolicitud.descripcion"
      ></v-text-field>
      <div>
        <v-btn
        class="me-4"
        @click="Solicitud()"
      >
        Enviar Solicitud
      </v-btn>
      </div>  
    </form>
</template>
  <script>
  import axios from 'axios'
  import router from '../router'
    export default{
      data(){
        return{
          userData: {},
          validacionCuit: false,
          cuit: null,
          Rolselect: null,
          jsonEmpresa: {},
          jsonRol: [
            {id: '1', Rol: 'Empleado Administrador'},
            {id: '2', Rol: 'Empleado Financiero'},
            {id: '3', Rol: 'Empleado Monitor'}
          ],
          jsonSolicitud:{
            id_solicitud: "",
            cuit_empresa: null,
            id_usuario: null,
            rolseleccionado: "",
            tipo_Solicitud: {
              id: "2",
              tipo: "",
            },
            descripcion: null,
            estado: "1",
            user: "",
            nombreEmpresa: ""
          }
        }
        
      },
    mounted(){
      this.GetUser()
    },
    methods: {
            Solicitud(){
              const BitacoraRequest = {
                  id_usuario: this.userData.id,
                  name: "",
                  lastname: "",
                  description: "Se busca la informacion de la empresa con cuit:" + this.cuit ,
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
                console.log(this.userData)
                this.jsonSolicitud.id_usuario = this.userData.id
                this.jsonSolicitud.cuit_empresa = this.cuit
                this.jsonSolicitud.rolseleccionado = this.Rolselect
                axios.post("https://localhost:7274/api/Solicitud/RegisterSolicitud", this.jsonSolicitud)
                .then(response=>{
                  if(response.status == 200)
                    alert("Solicitud enviado con exito")
                    router.replace('/homeEE')
                })
                .catch(err =>{
                  alert(err.data)
                })
              },
            GetUser(){
              const BitacoraRequest = {
                id_usuario: "084757d9-cbf3-4098-9374-b9e6563dcfb3",
                name: "",
                lastname: "",
                description: "Se realiza un getuser" ,
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
              const jsonPayload = this.parseJwt();
              console.log(jsonPayload)
              axios.get("https://localhost:7151/api/User/ValidateUser/" + jsonPayload.email)
                      .then(response=>{
                        if(response.status == 200){
                          this.userData = response.data
                        }
                      })
                      .catch(err =>{
                        alert(err.data)
                      })
            },
            GetEmpresa(){
              if(this.cuit == null){
                alert("Debe completar el cuit de la empresa a buscar")
              }
              else{
                const BitacoraRequest = {
                  id_usuario: this.userData.id,
                  name: "",
                  lastname: "",
                  description: "Se busca la informacion de la empresa con cuit:" + this.cuit ,
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
                axios.get("https://localhost:7227/api/Empresa/GetOneEmpresa/" + this.cuit.toString())
                .then(response=>{
                  if(response.status==200){
                    this.jsonEmpresa = response.data;
                    if(response.data.cuit == null){
                      this.validacionCuit = false;
                      alert("Empresa no encontrada, intentelo de nuevo")
                    }else if(response.data.cuit != null){
                      this.validacionCuit = true;
                    }
                  }
                })
                .catch(err =>{
                  alert(err.data)
                })
              }
            },
            setSelected(e){
              console.log(e)
              this.Rol = e
            },
            parseJwt() {
            const token = localStorage.getItem('id_token')
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload)
            },
          }
        }
  </script>
  <style>
    .form{
        margin-top: 20px;
        margin-left: 20%;
        margin-right: 20%;
        justify-content: space-around;
        align-items: center;
    }
  </style>
