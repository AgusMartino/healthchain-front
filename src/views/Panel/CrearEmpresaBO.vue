<template>
    <form class="form">
      <v-text-field
        v-model="PostEmpresaBody.name"
        label="Nombre"
      ></v-text-field>
  
      <v-text-field
        v-model="PostEmpresaBody.cuit"
        label="Cuit"
      ></v-text-field>
  
      <v-text-field
        v-model="PostEmpresaBody.direccion"
        label="direccion"
      ></v-text-field>
      <div>
        <v-btn
        class="colorButton me-4 mt-4"
        @click="PostEmpresa()"
        >
        Crear Empresa
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
            PostEmpresaBody: {
              id_empresa: "",
              cuit: "",
              name: "",
              direccion: ""
            }
        }
      },
      methods:{
        PostEmpresa(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se crea la empresa con cuit:" + this.PostEmpresaBody.cuit,
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
          axios.post("https://healtchain-api-abms-4fd21ff66375.herokuapp.com/api/Empresa/RegisterEmpresa", this.PostEmpresaBody)
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
          this.PostEmpresaBody.cuit = ""
          this.PostEmpresaBody.name = ""
          this.PostEmpresaBody.direccion = ""
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