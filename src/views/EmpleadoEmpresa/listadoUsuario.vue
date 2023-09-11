<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Usuario
          </th>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Apellido
          </th>
          <th class="text-left">
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in JsonMapper"
          :key="item.usuario"
        >
          <td>{{ item.user }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.rol.rol }}</td>
          <td><v-btn variant="outlined" to="/">Modificar Rol</v-btn></td>
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
                id: "string",
                user: "string",
                password: "string",
                name: "string",
                lastname: "string",
                user_type: "string",
                cuit_empresa: "string",
                rol: {
                id: "string",
                rol: "string"
                },
                fecha_creacion: "2023-09-08T00:04:45.447Z",
                fecha_modificacion: "2023-09-08T00:04:45.447Z"
            }
        ],
      }
    },
    mounted() {
        this.GetMedicos()
    },
    methods:{
        GetUsuarios(){            
            axios.get("https://localhost:7151/api/User/GetUsersEmpresas/" + localStorage.getItem('cuit_empresa'))
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