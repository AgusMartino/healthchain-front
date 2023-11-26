<template>
    <form class="form">
      <v-text-field
        v-model="PostNFTBody.tokenNFTid"
        label="Identificador NFT (Se recomienda colocar el DNI del Paciente)"
      ></v-text-field>
  
      <v-text-field
        v-model="PostNFTBody.nombre_paciente"
        label="Nombre del Paciente"
      ></v-text-field>
  
      <v-text-field
        v-model="PostNFTBody.apellido_paciente"
        label="Apellido del Paciente"
      ></v-text-field>

      <v-text-field
        v-model="PostNFTBody.dni"
        label="DNI del Paciente"
      ></v-text-field>

      <v-text-field
        v-model="PostNFTBody.cobertura"
        label="Cobertura del Paciente"
      ></v-text-field>
      <div>
        <v-btn
        class="me-4"
        @click="PostNFT()"
        >
        Crear NFT
        </v-btn>

        <v-btn @click="LimpiarCampos()">
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
            PostNFTBody: {
                id_user: this.$store.state.id_usuario,
                id_user_Transfer: "",
                tokenNFTid: "",
                nombre_paciente: "",
                apellido_paciente: "",
                dni: "",
                cobertura: "",
                consulta: "",
                patologia: "",
                estado: "",
                precio: ""
            }
        }
      },
      methods:{
        PostNFT(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se crea el nft con id:" + this.PostNFTBody.tokenNFTid,
            type: "INFO",
            creation_date: "",
          }
          axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                    console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          console.log(err.data)
                        })
          axios.post("https://localhost:7107/api/NFT/AddNFT", this.PostNFTBody)
            .then(response=>{
                    if(response.status==200){
                        alert("Revisar que se haya ejecutado la transaccion!")
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
          this.PostNFTBody.tokenNFTid = ""
          this.PostNFTBody.nombre_paciente = ""
          this.PostNFTBody.apellido_paciente = ""
          this.PostNFTBody.dni = ""
          this.PostNFTBody.cobertura = ""
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