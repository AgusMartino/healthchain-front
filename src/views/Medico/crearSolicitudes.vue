<template>
  <form class="form">
    <v-select
          v-model="this.EmpresaSelect"
          :items="this.jsonEmpresa"
          item-title="name"
          item-value="cuit"
          label="Seleccionar Empresa"
          @change="selectEmpresa"
    ></v-select>
  </form>

  <form>

      Cuit de empresa Seleccionada:
      <v-text-field
        disabled
        v-model="this.EmpresaSelect"
      ></v-text-field>

      Informacioncion del solicitante:

      <v-text-field
        v-model="this.userData.nombre"
        disabled
      ></v-text-field>

      <v-text-field
        v-model="this.userData.apellido"
        disabled
      ></v-text-field>

      <v-text-field
        v-model="this.userData.especialidad"
        disabled
      ></v-text-field>

      <v-text-field
        label="Motivo de Solicitud"
        v-model="jsonSolicitud.descripcion"
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
import axios from 'axios';
import router from '../../router';
    export default{
      data(){
        return{
          selectEmpresa: null,
          EmpresaSelect: "",
          jsonEmpresa:[
              {
                cuit: "string",
                id_empresa: "string",
                name: "string",
                direccion: "string",
                fecha_creacion: "2023-09-09T22:21:57.610Z",
                fecha_modificacion: "2023-09-09T22:21:57.610Z"
              }
          ],
          userData: [],
          jsonSolicitud:{
            id_solicitud: "",
            cuit_empresa: null,
            id_usuario: null,
            rolseleccionado: null,
            tipo_Solicitud: {
              id: "1",
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
      this.GetEmpresas(),
      this.GetUser()
    },
    methods: {
            Solicitud(){
                this.jsonSolicitud.id_usuario = this.$store.state.id_usuario;
                this.jsonSolicitud.cuit_empresa = this.EmpresaSelect.toString()
                axios.post("https://localhost:7274/api/Solicitud/RegisterSolicitud", this.jsonSolicitud)
                .then(response=>{
                  if(response.status == 200)
                    alert("Solicitud enviado con exito")
                    router.replace('/homeM')
                })
                .catch(err =>{
                  alert(err.data)
                })
              },
            GetUser(){
              console.log(this.$store.state.id_usuario)
              const jsonPayload = this.$store.state.id_usuario
                    axios.get("https://localhost:7227/api/Medico/GetMedico/" + jsonPayload)
                        .then(response=>{
                          this.userData = response.data;
                          console.log(this.userData)
                        })
                        .catch(err =>{
                          alert(err.data)
                        })
            },
            GetEmpresas(){
                axios.get("https://localhost:7227/api/Empresa/GetAllEmpresa")
                .then(response=>{
                  if(response.status==200){
                    this.jsonEmpresa = response.data;
                  }
                })
                .catch(err =>{
                  alert(err.data)
                })
              }
          }
        }
  </script>