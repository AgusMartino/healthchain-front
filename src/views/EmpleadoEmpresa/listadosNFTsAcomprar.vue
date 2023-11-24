<template>
    <v-container>
      <v-row align-content="center" justify="center">
        <v-col
          v-for="item in JsonMapper"
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
                </div>
                <div class="text-caption">
                    Precio: {{ item.precio }} ETH
                </div>
              </div>
            </v-card-item>
  
            <v-card-actions>
              <v-btn variant="outlined" :to="{name:'comprarNFT', params:{nft:item.tokenNFTid}}">
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
  export default {
    data () {
      return {
        JsonMapper:[
            {
                tokenNFTid: "string",
                id_user: "string",
                id_user_Transfer: "string",
                nombre_paciente: "string",
                apellido_paciente: "string",
                dni: "string",
                cobertura: "string",
                consulta: "string",
                patologia: "string",
                estado: "string",
                precio: "string"
            }
        ],
      }
    },
    mounted() {
        this.GetNftPublicados()
    },
    methods:{
        GetNftPublicados(){
          const BitacoraRequest={
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtine el listado de los nfts publicados de los medicos asociados a la empresa",
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
            axios.get("https://localhost:7107/api/NFT/GetNFTMarketplace/" + this.$store.state.cuit_empresa)
                      .then(response=>{
                        this.JsonMapper = response.data;
                        console.log(this.JsonMapper)
                      })
                      .catch(err =>{
                        alert(err.data)
                      })
        }
    }
  }
</script>
