<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Cuit
          </th>
          <th class="text-left">
            Nombre empresa
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
          <td>{{ item.cuit_empresa }}</td>
          <td>{{ item.nombreEmpresa }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.fecha_creacion }}</td>
          <td>{{ item.estado }}</td>
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
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo todas las solicitudes generadas por el mismo",
            type: "INFO",
            creation_date: "",
          }
          axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                    console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          console.log(err.data)
                        })
            const username = this.$store.state.id_usuario;
            axios.get("https://localhost:7274/api/Solicitud/GetAllSolicitudesUsuario/" + username)
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