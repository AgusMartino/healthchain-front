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
        v-model="jsonEmpresa.nombre_empresa"
      ></v-text-field>
  
      <v-text-field
        v-model="jsonEmpresa.direccion_empresa"
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
        v-model="jsonSolicitud.descripcion"
      ></v-text-field>
      <div>
        <v-btn
        class="me-4"
        type="submit"
        @click="Solicitud()"
      >
        submit
      </v-btn>
      </div>  
    </form>
</template>
  <script>
import axios from 'axios';
    export default{
      data(){
        return{
          validacionCuit: false,
          cuit: null,
          Rolselect: null,
          jsonEmpresa: {
            nombre_empresa:"",
            direccion_empresa: "",
          },
          jsonRol: [
            {id: '1', Rol: 'Empleado Administrador'},
            {id: '2', Rol: 'Empleado Financiero'},
            {id: '3', Rol: 'Empleado Monitor'}
          ],
          jsonSolicitud:{
            cuit_empresa: null,
            id_usuario: null,
            tipo_Solicitud: {
              id: "2",
            },
            descripcion: null,
            estado: "1",
          }
        }
        
      },
    methods: {
            Solicitud(){
                const userdata = GetUser()
                this.jsonSolicitud.id_usuario = userdata.id_usuario.toString()
                this.jsonSolicitud.cuit_empresa = this.cuit.toString()
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
              const jsonPayload = decodeToken();
              const userData = [];
              axios.get("https://localhost:7151/api/User/ValidateUser/" + jsonPayload.email.toString())
                      .then(response=>{
                        this.userData = response.data;
                      })
                      .catch(err =>{
                        alert(err.data)
                      })
              return userData;
            },
            GetEmpresa(){
              val = false;
              if(this.cuit == null){
                alert("Debe completar el cuit de la empresa a buscar")
              }
              else{
                axios.get("https://localhost:7227/api/Empresa/GetOneEmpresa/" + this.cuit.toString())
                .then(response=>{
                  this.jsonEmpresa = response.data;
                  if(response.status==200){
                    val = true;
                  }else{
                    val = false;
                  }
                })
                .catch(err =>{
                  alert(err.data)
                  val = false;
                })
                .finally(data =>{
                  this.validacionCuit = val;
                })
              }
            },
            setSelected(e){
              console.log(e)
              this.Rol = e
            },
            parseJwt () {
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
