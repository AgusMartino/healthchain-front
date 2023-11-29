<template>
  <form class="form">
    <v-text-field
      disableb
      v-model="PostNFTBody.tokenNFTid"
    ></v-text-field>

    <v-text-field
      disableb
      v-model="this.PostNFTBody.nombre_paciente"
    ></v-text-field>
    
    <v-text-field
      disableb
      v-model="this.PostNFTBody.apellido_paciente"
    ></v-text-field>
  
    <v-text-field
      disableb
      v-model="this.PostNFTBody.dni"
    ></v-text-field>

    <v-text-field
      disableb
      v-model="this.PostNFTBody.cobertura"
    ></v-text-field>

    <v-text-field
      disableb
      v-model="this.PostNFTBody.consulta"
    ></v-text-field>

    <v-text-field
      disableb
      v-model="this.PostNFTBody.patologia"
    ></v-text-field>

    <v-text-field
      v-model="this.PostNFTBody.precio"
      label="Precio de la consulta"
    ></v-text-field>
    <div>
      <v-btn
      class="colorButton me-4 mt-4"
      @click="PublicarNFT()"
      >
      Publicar NFT
      </v-btn>

      <v-btn class="colorButton mt-4" @click="LimpiarCampos()">
        Limpiar campos modificables
      </v-btn>
    </div>  
    
  </form>
</template>
<script>
  import axios from 'axios'
  export default{
    props: {
            nft: String
        },
    data(){
      return {
          PostNFTBody: {
              id_user: "",
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
    mounted() {
      this.GetNFT()
    },
    methods:{
      PublicarNFT(){
        const BitacoraRequest={
          id_bitacora: "",
          id_usuario: this.$store.state.id_usuario,
          name: "",
          lastname: "",
          description: "Se modifica el nft con id:" + this.PostNFTBody.tokenNFTid,
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
        this.PostNFTBody.estado = "market"
        this.PostNFTBody.id_user = this.$store.state.id_usuario,
        this.PostNFTBody.id_user_Transfer = "",
        axios.post("https://healthchain-api-blockchain-02c3b0c377c2.herokuapp.com/api/NFT/SellNFT", this.PostNFTBody)
          .then(response=>{
                  if(response.status==200){
                      alert("publicado con exito!")
                  }
          })
          .catch(err =>{
              alert(err.data)
          })
          .finally(data =>{
            this.LimpiarCampos()
          })
      },
      GetNFT(){
          const BitacoraRequest = {
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtiene la informacion del NFT con id:" + this.nft ,
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
          axios.get("https://healthchain-api-blockchain-02c3b0c377c2.herokuapp.com/api/NFT/getNFT/" + this.nft.toString())
            .then(response=>{
              if(response.status==200){
                this.PostNFTBody = response.data;
              }
              })
              .catch(err =>{
                alert(err.data)
              })
      },
      LimpiarCampos(){
        this.PostNFTBody.precio = ""
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
  .colorButton{
    background-color: #CFD0CF;
  }
</style>