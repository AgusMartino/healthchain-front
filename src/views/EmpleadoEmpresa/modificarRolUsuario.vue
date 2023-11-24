<template>
    <form>
        Informacioncion del Usuario:
        <v-text-field
          disabled
          v-model="userData.user"
        ></v-text-field>

        <v-text-field
          disabled
          v-model="userData.name"
        ></v-text-field>
  
        <v-text-field
          disabled
          v-model="userData.lastname"
        ></v-text-field>

        <v-select
          v-model="this.userData.rol.id"
          :items="this.jsonRol"
          item-title="Rol"
          item-value="id"
          label="Seleccionar Rol"
          @change="this.userData.rol.id"
        ></v-select>
  
        <div>
          <v-btn
          class="me-4"
          @click="ModifyUsuario()"
        >
          Modificar Rol Usuario
        </v-btn>
        </div>  
      </form>
  </template>
    <script>
  import axios from 'axios';
  import router from '../../router'
      export default{
        props: {
        id_user: String
        },
        data(){
          return{
            jsonRol: [
                {id: '1', Rol: 'Empleado Administrador'},
                {id: '2', Rol: 'Empleado Financiero'},
                {id: '3', Rol: 'Empleado Monitor'}
            ],
            userData: {
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
                fecha_creacion: "2023-09-11T04:25:43.423Z",
                fecha_modificacion: "2023-09-11T04:25:43.423Z"
            },
          }
          
        },
      mounted(){
        this.GetUsuario()
      },
      methods: {
              ModifyUsuario(){
                  const BitacoraRequest={
                    id_usuario: this.$store.state.id_usuario,
                    name: "",
                    lastname: "",
                    description: "se modifico el rol del usuario:" + this.userData.id,
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
                  axios.put("https://localhost:7151/api/User/UpdateUser", this.userData)
                  .then(response=>{
                    if(response.status == 200)
                      alert("Usuario Modificado con Exito")
                  })
                  .catch(err =>{
                    alert(err.data)
                  })
                },
                GetUsuario(){
                    const jsonPayload = this.id_user
                    axios.get("https://localhost:7151/api/User/GetUser/" + jsonPayload)
                        .then(response=>{
                          this.userData = response.data;
                        })
                        .catch(err =>{
                          alert(err.data)
                        })
                },
            }
        }
    </script>