<template>
    <v-table>
      <thead>
        <tr>
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
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
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
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtine el listado de medicos relacionados con la empresa con cuit:" + this.$store.state.cuit_empresa,
            type: "INFO",
            creation_date: "",
          }
          axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                    Console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          Console.log(err.data)
                        })            
            axios.get("https://localhost:7227/api/Medico/GetAllMedicosEmpresas/" + this.$store.state.cuit_empresa)
                      .then(response=>{
                        this.JsonMapper = response.data;
                        console.log(this.JsonMapper)
                      })
                      .catch(err =>{
                        alert(err.data)
                      })
        }
    }
  }
</script>