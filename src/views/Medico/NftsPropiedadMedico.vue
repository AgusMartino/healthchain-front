<template>
    <div v-if="validacionFechas">
        <v-table>
        <thead>
            <tr>
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
            <td><v-btn variant="outlined" :to="{name:'modificarNFTMedico', params:{nft:item.tokenNFTid}}">Modificar NFT</v-btn></td>
            <td><v-btn variant="outlined" :to="{name:'publicarNFTMedico', params:{nft:item.tokenNFTid}}">Publicar NFT</v-btn></td>
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
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo los NFTs en propiedad",
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
          axios.post("https://localhost:7107/api/NFT/GetNFTUser/" + this.$store.state.id_usuario)
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