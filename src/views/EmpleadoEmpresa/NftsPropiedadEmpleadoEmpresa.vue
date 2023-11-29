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
            <tr variant="outlined">
            <th class="text-left">
                Identificador Token
            </th>
            <th class="text-left">
                Nombre Paciente
            </th>
            <th class="text-left">
                Apellido Paciente
            </th>
            <th class="text-left">
                Cobertura
            </th>
            <th class="text-left">
                Consulta
            </th>
            <th class="text-left">
                Patologia
            </th>
            <th class="text-left">
                Estado
            </th>
            <th class="text-left">
                Precio
            </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="item in this.JsonMapper"
            :key="item.tokenNFTid"
            >
            <td>{{ item.tokenNFTid }}</td>
            <td>{{ item.nombre_paciente }}</td>
            <td>{{ item.apellido_paciente }}</td>
            <td>{{ item.cobertura }}</td>
            <td>{{ item.consulta }}</td>
            <td>{{ item.patologia }}</td>
            <td>{{ item.estado }}</td>
            <td>{{ item.precio }}</td>
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
        ]
      }
    },
    mounted(){
        this.GetNft()
    },
    methods:{
        GetNft(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo los NFTs en propiedad",
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
          axios.get("https://healthchain-api-blockchain-02c3b0c377c2.herokuapp.com/api/NFT/GetNFTCompany/" + this.$store.state.id_usuario)
                        .then(response=>{
                            if(response.status == 200){
                                this.JsonMapper = response.data;
                            }
                            
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
<style>
.loading {
    display: grid;
    place-items: center;
    height: 50%;
    width: 100%;
  }
.colorTableEmpresa{
    background-color: #BBCECF;
}
</style>
