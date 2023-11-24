<template>
    <v-container>
      <v-row align-content="center" justify="center">
        <v-col
          v-for="item in PostNFTBody"
          :key="item.tokenNFTid"
          cols="auto"
        >
          <v-card
            class="mx-auto"
            max-width="344"
            variant="tonal"
          >
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                    {{ item.tokenNFTid }}
                </div>
                <div class="text-overline mb-1">
                    Nombre: {{ item.nombre_paciente }}
                    Apellido: {{ item.apellido_paciente }}
                    Dni: {{ item.dni }}
                    Cobertura: {{ item.cobertura }}
                    Consulta: {{ item.consulta }}
                    Patologia: {{ item.patologia }}
                </div>
                <div class="text-caption">
                    Precio: {{ item.precio }} ETH
                </div>
              </div>
            </v-card-item>
  
            <v-card-actions>
              <v-btn variant="outlined">
                Comprar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
    <script>
    import axios from 'axios'
    import router from '../router'
      export default{
        props: {
            nft: String
        },
        data(){
          return{
            PostNFTBody: [
                {
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
            ]
          }
        },
      mounted(){
        this.GetNFT()
      },
      methods: {
              Comprar(){
                const BitacoraRequest = {
                    id_usuario: this.$store.state.id_usuario,
                    name: "",
                    lastname: "",
                    description: "Se invoca la funcion de comprar el NFT con id:" + this.nft ,
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
                          }),
                  this.PostNFTBody.id_user_Transfer = this.$store.state.id_usuario
                  axios.post("https://localhost:7107/api/NFT/TransaferNFTWithETH", this.PostNFTBody)
                        .then(response=>{
                            if(response.status == 200)
                            alert("Compra realizada con exito")
                            router.replace('/homeEE')
                        })
                        .catch(err =>{
                            alert(err.data)
                        })
                },
              GetNFT(){
                  const BitacoraRequest = {
                    id_usuario: this.$store.state.id_usuario,
                    name: "",
                    lastname: "",
                    description: "Se obtiene la informacion del NFT con id:" + this.nft ,
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
                  axios.get("https://localhost:7107/api/NFT/getNFT/" + this.nft.toString())
                  .then(response=>{
                    if(response.status==200){
                      this.PostNFTBody = response.data;
                    }
                  })
                  .catch(err =>{
                    alert(err.data)
                  })
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