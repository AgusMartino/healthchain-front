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
          v-for="item in this.JsonMapper"
          :key="item.usuario"
        >
          <td>{{ item.user }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.rol.rol }}</td>
          <td><v-btn variant="outlined" :to="{name:'modificarUsuarioEE', params:{id_user:item.id}}">Modificar Rol</v-btn></td>
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
        this.GetUsuarios()
    },
    methods:{
        GetUsuarios(){
          const BitacoraRequest={
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtine el listado de usarios Empresa relacionados con la empresa con cuit:" + this.$store.state.cuit_empresa,
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
            axios.get("https://localhost:7151/api/User/GetUsersEmpresas/" + this.$store.state.cuit_empresa)
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