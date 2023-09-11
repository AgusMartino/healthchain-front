<template>
    <form>
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
          v-if="this.jsonSolicitud.tipo_Solicitud = 1"
          disabled  
          v-model="userData.especialidad"
        ></v-text-field>

        <v-text-field
          v-if="this.jsonSolicitud.tipo_Solicitud = 2"
          disabled  
          v-model="jsonSolicitud.rolSolicitdado"
        ></v-text-field>
  
        <v-text-field
          label="Motivo de Solicitud"
          v-model="jsonSolicitud.descripcion"
        ></v-text-field>

        <v-select
          v-model="this.jsonSolicitud.estado"
          :items="this.jsonEstado"
          item-title="estado"
          item-value="id"
          label="Seleccionar Estado"
          @change="this.jsonSolicitud.estado"
        ></v-select>
  
        <div>
          <v-btn
          class="me-4"
          type="submit"
          @click="ModifySolicitud()"
        >
          Actualizar Estado Solicitud
        </v-btn>
        </div>  
      </form>
  </template>
    <script>
  import axios from 'axios';
      export default{
        props: {
        user: String
        },
        data(){
          return{
            jsonEstado: [
                {id: '1', estado: 'Pendiente'},
                {id: '2', estado: 'Aprobado'},
                {id: '3', estado: 'Rechazado'}
            ],
            userData: {
              nombre: "",
              apellido: "",
              especialidad: "",
            },
            jsonSolicitud:{
                id_solicitud: "string",
                cuit_empresa: "string",
                id_usuario: "string",
                rolseleccionado: "string",
                tipo_Solicitud: {
                    id: "string",
                    tipo: "string"
                },
                descripcion: "string",
                estado: "string",
                fecha_creacion: "2023-09-11T03:56:08.978Z",
                fecha_modificacion: "2023-09-11T03:56:08.978Z",
                user: "string",
                nombreEmpresa: "string"
            }
          }
          
        },
      mounted(){
        this.GetSolicitud()
      },
      methods: {
              ModifySolicitud(){
                  axios.post("https://localhost:7274/api/Solicitud/UpdateSolicitud", this.jsonSolicitud)
                  .then(response=>{
                    if(response.status == 200)
                      alert("Solicitud Actualizada con Exito")
                      router.replace('/homeEE')
                  })
                  .catch(err =>{
                    alert(err.data)
                  })
                },
                GetSolicitud(){
                const jsonSolicitudrequest = {
                    cuit: localStorage.getItem('cuit_empresa'),
                    usuario: this.user
                    }
                axios.get("https://localhost:7274/api/Solicitud/GetOneSolicitud" + jsonSolicitudrequest)
                        .then(response=>{
                            if(response.status == 200){
                                this.jsonSolicitud = response.data;
                                if(this.jsonSolicitud.tipo_Solicitud.id = "1"){
                                    this.userData = this.GetUserMedico()
                                }else if(this.jsonSolicitud.tipo_Solicitud.id = "2"){
                                    this.userData = this.GetUserUsuario()
                                }   
                            }
                          
                        })
                        .catch(err =>{
                          alert(err.data)
                        })
                },
                GetUserMedico(){
                    const jsonPayload = this.jsonSolicitud.user
                    axios.get("https://localhost:7227/api/Medico/GetMedico/" + jsonPayload)
                        .then(response=>{
                          this.userData = response.data;
                        })
                        .catch(err =>{
                          alert(err.data)
                        })
                },
                GetUserUsuario(){
                    const jsonPayload = this.jsonSolicitud.id_usuario
                    axios.get("https://localhost:7151/api/User/GetUser/" + jsonPayload)
                        .then(response=>{
                          this.userData = response.data;
                        })
                        .catch(err =>{
                          alert(err.data)
                        })
                },
            }
        }
    </script>