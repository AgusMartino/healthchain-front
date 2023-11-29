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
    <v-table class="colorTable" variant="outlined">
      <thead variant="outlined">
        <tr variant="outlined">
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
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo todas las solicitudes generadas por el mismo",
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
            const username = this.$store.state.id_usuario;
            axios.get("https://healthchain-api-solicitudes-b793d42c9fb5.herokuapp.com/api/Solicitud/GetAllSolicitudesUsuario/" + username)
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
<style>
.colorTable{
    background-color: #A8F6B8;
}
.colorButton{
    background-color: #CFD0CF;
}
.loading {
  display: grid;
  place-items: center;
  height: 50%;
  width: 100%;
}
</style>