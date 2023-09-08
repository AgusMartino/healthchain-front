<template>
    <v-table>
      <thead>
        <tr>
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
          v-for="item in JsonMapper"
          :key="item.id_solicitud"
        >
          <td>{{ item.user }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.fecha_creacion }}</td>
          <td>{{ item.estado }}</td>
          <td><v-btn variant="outlined" to="/">Aceptar/Rechazar</v-btn></td>
        </tr>
      </tbody>
    </v-table>
</template>
<script>
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
            const JsonRequest = {
              cuit: localStorage.getItem('cuit_empresa'),
              tipo: "1"
            }
            axios.get("https://localhost:7274/api/Solicitud/GetAllSolicitudes", JsonRequest)
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