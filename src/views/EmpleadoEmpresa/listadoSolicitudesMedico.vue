<template>
  <div class="loading" v-if="loading">
      <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      ></v-progress-circular>
  </div>
  <div v-if="!loading">
    <v-table class="colorTableEmpresa" variant="outlined">
      <thead variant="outlined">
        <tr variant="outlined">
          <th class="text-left">
            Usuario Medico
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fecha de Solicitud
          </th>
          <th class="text-left">
            Estado
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in this.JsonMapper"
          :key="item.id_solicitud"
        >
          <td>{{ item.user }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.fecha_creacion }}</td>
          <td>{{ item.estado }}</td>
          <td><v-btn variant="outlined" class="colorButton" :to="{name:'aceptarRechazarSolicitudEE', params:{user:item.id_usuario}}">Aceptar/Rechazar</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
        loading: false,
        JsonMapper:[
            {
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
                fecha_creacion: "2023-09-07T02:37:36.502Z",
                fecha_modificacion: "2023-09-07T02:37:36.502Z",
                user: "string",
                nombreEmpresa: "string"
            }
        ],
      }
    },
    mounted() {
        this.GetSolicitudes();
    },
    methods:{
        GetSolicitudes(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtine el listado de solicitudes de medicos relacionados con la empresa con cuit:" + this.$store.state.cuit_empresa,
            type: "INFO",
            creation_date: "",
          }
          this.loading = true
          axios.post("https://healthchain-api-bitacora-8ac3b5dd6f8a.herokuapp.com/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                    console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          console.log(err.data)
                        })
            const JsonRequest = {
              cuit: this.$store.state.cuit_empresa,
              tipo: "1"
            }
            axios.post("https://healthchain-api-solicitudes-b793d42c9fb5.herokuapp.com/api/Solicitud/GetAllSolicitudes", JsonRequest)
                      .then(response=>{
                        this.JsonMapper = response.data;
                      })
                      .catch(err =>{
                        alert(err.data)
                      })
                      .finally(data =>{ 
                        this.loading = false
                      })
        }
    }
  }
</script>