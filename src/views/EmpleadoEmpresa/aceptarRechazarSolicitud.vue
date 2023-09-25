<template>
    <form>
        Informacioncion del solicitante:
        <v-text-field
          disabled
          v-model="this.userData.nombre"
        ></v-text-field>
  
        <v-text-field
          disabled
          v-model="this.userData.apellido"
        ></v-text-field>
  
        <v-text-field
          v-if="this.jsonSolicitud.tipo_Solicitud == 1"
          disabled  
          v-model="this.userData.especialidad"
        ></v-text-field>

        <v-text-field
          v-if="this.jsonSolicitud.tipo_Solicitud == 2"
          disabled  
          v-model="this.jsonSolicitud.rolSolicitdado"
        ></v-text-field>
  
        <v-text-field
          label="Motivo de Solicitud"
          v-model="this.jsonSolicitud.descripcion"
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
          @click="ModifySolicitud()"
        >
          Actualizar Estado Solicitud
        </v-btn>
        </div>  
      </form>
  </template>
    <script>
  import axios from 'axios';
  import router from '../../router';
      export default{
        props: {
          user: String
        },
        data(){
          return{
            jsonSolicitudrequest: {
                    cuit: this.$store.state.cuit_empresa,
                    usuario: this.user
            },
            jsonEstado: [
                {id: '1', estado: 'Pendiente'},
                {id: '2', estado: 'Aprobado'},
                {id: '3', estado: 'Rechazado'}
            ],
            userData: {
                nombre: "string",
                apellido: "string",
                usuario: "string",
                especialidad: "Nutricionista"
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
                  const Json = {
                    id_solicitud: this.jsonSolicitud.id_solicitud,
                    cuit_empresa: this.jsonSolicitud.cuit_empresa,
                    id_usuario: this.jsonSolicitud.id_usuario,
                    rolseleccionado: this.jsonSolicitud.rolseleccionado,
                    tipo_Solicitud: {
                      id: "1",
                      tipo: ""
                    },
                    descripcion: this.jsonSolicitud.descripcion,
                    estado: this.jsonSolicitud.estado,
                    user: this.jsonSolicitud.user,
                    nombreEmpresa: this.jsonSolicitud.nombreEmpresa
                  }
                  console.log(Json)
                  axios.put("https://localhost:7274/api/Solicitud/UpdateSolicitud", Json)
                  .then(response=>{
                    if(response.status == 200)
                      alert("Solicitud Actualizada con Exito")
                  })
                  .catch(err =>{
                    alert(err.data)
                  })
                },
                GetSolicitud(){
                console.log(this.user)
                console.log(this.jsonSolicitudrequest)
                axios.post("https://localhost:7274/api/Solicitud/GetOneSolicitud", this.jsonSolicitudrequest)
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
                    const jsonPayload = this.jsonSolicitud.id_usuario
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
                          this.userData.nombre = response.data.name;
                          this.userData.apellido = response.data.lastname;
                          this.userData.usuario = response.data.user;
                        })
                        .catch(err =>{
                          alert(err.data)
                        })
                },
            }
        }
    </script>