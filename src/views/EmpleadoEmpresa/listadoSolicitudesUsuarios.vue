<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Usuario
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Rol solicitado
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
          <td>{{ item.rolseleccionado }}</td>
          <td>{{ item.fecha_creacion }}</td>
          <td>{{ item.estado }}</td>
          <td><v-btn variant="outlined" :to="{name:'aceptarRechazarSolicitudEE', params:{user:item.id_usuario}}">Aceptar/Rechazar</v-btn></td>
        </tr>
      </tbody>
    </v-table>
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
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
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtine el listado de Solicitudes de usarios de Empresa relacionados con la empresa con cuit:" + this.$store.state.cuit_empresa,
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
            const JsonRequest = {
              cuit: this.$store.state.cuit_empresa,
              tipo: "2"
            }
            axios.post("https://localhost:7274/api/Solicitud/GetAllSolicitudes", JsonRequest)
                      .then(response=>{
                        this.JsonMapper = response.data;
                      })
                      .catch(err =>{
                        alert(err.data)
                      })
        }
    }
  }
</script>