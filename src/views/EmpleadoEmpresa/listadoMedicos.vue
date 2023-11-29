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
            Nombre
          </th>
          <th class="text-left">
            Apellido
          </th>
          <th class="text-left">
            Especialidad
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in this.JsonMapper"
          :key="item.usuario"
        >
          <td>{{ item.usuario }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.apellido }}</td>
          <td>{{ item.especialidad }}</td>
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
        JsonMapper:{
                nombre: "string",
                apellido: "string",
                usuario: "string",
                especialidad: "string"
            }
        ,
      }
    },
    mounted() {
        this.GetMedicos()
    },
    methods:{
        GetMedicos(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtine el listado de medicos relacionados con la empresa con cuit:" + this.$store.state.cuit_empresa,
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
            axios.get("https://healtchain-api-abms-4fd21ff66375.herokuapp.com/api/Medico/GetAllMedicosEmpresas/" + this.$store.state.cuit_empresa)
                      .then(response=>{
                        this.JsonMapper = response.data;
                        console.log(this.JsonMapper)
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