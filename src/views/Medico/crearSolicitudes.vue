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

  <form class="form">

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
        class="colorButton me-4"
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
            rolseleccionado: "",
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
      this.GetEmpresasAndUser()
    },
    methods: {
            Solicitud(){
              const BitacoraRequest={
                id_bitacora: "",
                id_usuario: this.$store.state.id_usuario,
                name: "",
                lastname: "",
                description: "El usuario:" + this.$store.state.id_usuario + "genera una solicitud para la empresa con cuit:" + this.EmpresaSelect,
                type: "INFO",
                creation_date: "",
              }
              axios.post("https://healthchain-api-bitacora-8ac3b5dd6f8a.herokuapp.com/api/Bitacora/AddBitacora", BitacoraRequest)
                            .then(response=>{
                                if(response.status == 200){
                                        console.log('bitacora ok')
                                }})
                            .catch(err =>{
                              console.log(err.data)
                            })
              this.jsonSolicitud.id_usuario = this.$store.state.id_usuario;
              this.jsonSolicitud.cuit_empresa = this.EmpresaSelect
              console.log(this.jsonSolicitud)
              axios.post("https://healthchain-api-solicitudes-b793d42c9fb5.herokuapp.com/api/Solicitud/RegisterSolicitud", this.jsonSolicitud)
                .then(response=>{
                  if(response.status == 200)
                    alert("Solicitud enviado con exito")
                    router.replace('/homeM')
                })
                .catch(err =>{
                  alert(err.data)
                })
              },
            GetEmpresasAndUser(){
                axios.get("https://healtchain-api-abms-4fd21ff66375.herokuapp.com/api/Empresa/GetAllEmpresa")
                  .then(response=>{
                    if(response.status==200){
                      this.jsonEmpresa = response.data;
                    }
                  })
                  .catch(err =>{
                    alert(err.data)
                  })
                const BitacoraRequest={
                  id_bitacora: "",
                  id_usuario: this.$store.state.id_usuario,
                  name: "",
                  lastname: "",
                  description: "Se obtiene informacion del usuario con id:" + this.$store.state.id_usuario,
                  type: "INFO",
                  creation_date: "",
                }
                axios.post("https://healthchain-api-bitacora-8ac3b5dd6f8a.herokuapp.com/api/Bitacora/AddBitacora", BitacoraRequest)
                            .then(response=>{
                                if(response.status == 200){
                                        console.log('bitacora ok')
                                }})
                            .catch(err =>{
                              console.log(err.data)
                            })
                console.log(this.$store.state.id_usuario)
                const jsonPayload = this.$store.state.id_usuario
                axios.get("https://healtchain-api-abms-4fd21ff66375.herokuapp.com/api/Medico/GetMedico/" + jsonPayload)
                  .then(response=>{
                    if(response.status == 200){
                    this.userData = response.data;
                    console.log(this.userData)
                    }
                  })
                  .catch(err =>{
                    alert(err.data)
                  })
              }
          }
        }
  </script>
<style>
.colorTable{
    background-color: #A8F6B8;
}
.colorButton{
    background-color: #CFD0CF;
}
</style>