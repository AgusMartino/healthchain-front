<template>
    <form @submit.prevent="submit" class="form">
      <v-text-field
        v-model="PostUsuarioBody.user"
        label="Usuario"
      ></v-text-field>

      <v-text-field
        v-model="PostUsuarioBody.name"
        label="Nombre"
      ></v-text-field>

      <v-text-field
        v-model="PostUsuarioBody.lastname"
        label="Apellido"
      ></v-text-field>
      
      Cuit de la empresa:
      <v-text-field
        v-model="PostUsuarioBody.cuit_empresa"
        label="Cuit"
      ></v-text-field>

      <div>
        <v-btn
        class="colorButton me-4 mt-4"
        @click="PostUsuario()"
      >
        Crear usuario Admin
      </v-btn>
  
      <v-btn class="colorButton me-4 mt-4" @click="LimpiarCampos()">
        Limpiar campos
      </v-btn>
      </div>  
      
    </form>
  </template>
  <script>
    import axios from 'axios'
    export default{
      data(){
        return {
            PostUsuarioBody: {
              id: "",
              password: "",
              user: "",
              name: "",
              lastname: "",
              cuit_empresa: "",
              user_type: "1",
              rol: {
                id: "2",
                rol: ""
              }
            }
          }
        },
      methods:{
        PostUsuario(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se crea el usuario Admin de la empresa con usuario:" + this.PostUsuarioBody.user,
            type: "INFO",
            creation_date: "",
          }
          axios.post("https://healthchain-api-bitacora-8ac3b5dd6f8a.herokuapp.com/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                    console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          console.log(err.data)
                        })
          axios.post("https://healthchain-api-usuarios-9e18a4d4a113.herokuapp.com/api/User/RegisterUser", this.PostUsuarioBody)
            .then(response=>{
                    if(response.status==200){
                        alert("registrado con exito!")
                    }
            })
            .catch(err =>{
                alert(err.data)
            })
            .finally(data =>{
              this.LimpiarCampos()
            })
        },
        LimpiarCampos(){
          this.PostUsuarioBody.user = ""
          this.PostUsuarioBody.name = ""
          this.PostUsuarioBody.lastname = ""
          this.PostUsuarioBody.cuit_empresa = ""
        }
      }
    }
   
  </script>
  <style>
    .form{
        margin-top: 20px;
        margin-left: 20%;
        margin-right: 20%;
        justify-content: space-around;
        align-items: center;
    }
  </style>