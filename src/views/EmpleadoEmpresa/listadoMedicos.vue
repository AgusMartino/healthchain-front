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
          v-for="item in JsonMapper"
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
  export default {
    data () {
      return {
        JsonMapper:[
            {
                nombre: "string",
                apellido: "string",
                usuario: "string",
                especialidad: "string"
            }
        ],
      }
    },
    mounted() {
        this.GetMedicos()
    },
    methods:{
        GetMedicos(){            
            axios.get("https://localhost:7227/api/Medico/GetAllMedicosEmpresas/" + localStorage.getItem('cuit_empresa'))
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