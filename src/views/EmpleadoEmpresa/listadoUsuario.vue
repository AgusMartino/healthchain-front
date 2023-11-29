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
          <td><v-btn variant="outlined" class="colorButton" :to="{name:'modificarUsuarioEE', params:{id_user:item.id}}">Modificar Rol</v-btn></td>
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
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtine el listado de usarios Empresa relacionados con la empresa con cuit:" + this.$store.state.cuit_empresa,
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
            axios.get("https://healthchain-api-usuarios-9e18a4d4a113.herokuapp.com/api/User/GetUsersEmpresas/" + this.$store.state.cuit_empresa)
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