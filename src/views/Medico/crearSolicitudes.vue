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

  <form v-if="this.selectEmpresa">

      Cuit de empresa Seleccionada:
      <v-text-field
        disabled
        v-model="this.EmpresaSelect"
      ></v-text-field>

      Informacioncion del solicitante:

      <v-text-field
        disabled
        v-model="userData.nombre"
      ></v-text-field>

      <v-text-field
        disabled
        v-model="userData.apellido"
      ></v-text-field>

      <v-text-field
        disabled  
        v-model="userData.especialidad"
      ></v-text-field>

      <v-text-field
        label="Motivo de Solicitud"
        v-model="jsonSolicitud.descripcion"
      ></v-text-field>

      <div>
        <v-btn
        class="me-4"
        type="submit"
        @click="Solicitud()"
      >
        Enviar Solicitud
      </v-btn>
      </div>  
    </form>
</template>
  <script>
import axios from 'axios';
    export default{
      data(){
        return{
          selectEmpresa: false,
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
          userData: {
            nombre: "",
            apellido: "",
            especialidad: "",
          },
          jsonSolicitud:{
            cuit_empresa: null,
            id_usuario: null,
            rolSolicitdado: null,
            tipo_Solicitud: {
              id: "1",
            },
            descripcion: null,
            estado: "1",
          }
        }
        
      },
    mounted(){
      this.GetUser(),
      this.GetEmpresas()
    },
    methods: {
            Solicitud(){
                this.jsonSolicitud.id_usuario = localStorage.getItem('id_usuario').toString()
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
              const jsonPayload = localStorage.get('username')
              axios.get("https://localhost:7227/api/Medico/GetMedico/" + jsonPayload)
                      .then(response=>{
                        this.userData = response.data;
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