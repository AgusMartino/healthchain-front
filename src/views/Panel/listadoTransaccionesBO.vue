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
        <div>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="this.JsonFechas.fechaInicio"
                            label="Seleccionar fecha de incio"
                            v-on="on"
                            type="datetime-local"
                        ></v-text-field>
                </v-flex>                  
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="this.JsonFechas.fechaFin"
                            label="Seleccionar fecha de fin"
                            v-on="on"
                            type="datetime-local"
                        ></v-text-field>
                </v-flex>
            </v-layout>
            <v-btn class="colorButton me-4 mt-4" @click="GetTransacciones()">
            Obtener Transacciones
            </v-btn>
        </div>
        <div v-if="validacionFechas">
            <v-table>
            <thead>
                <tr>
                <th class="text-left">
                    Identificador EtherScan
                </th>
                <th class="text-left">
                    Identificador Token
                </th>
                <th class="text-left">
                    Nombre de Usuario
                </th>
                <th class="text-left">
                    Billetera Origen
                </th>
                <th class="text-left">
                    Billetera Destino
                </th>
                <th class="text-left">
                    Fecha de Transaccion
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in this.JsonMapper"
                :key="item.id_etherscan"
                >
                <td>{{ item.id_etherscan }}</td>
                <td>{{ item.tokenIdNFT }}</td>
                <td>{{ item.usuario }}</td>
                <td>{{ item.billetera_origen }}</td>
                <td>{{ item.billetera_destino }}</td>
                <td>{{ item.fecha_transaccion }}</td>
                </tr>
            </tbody>
            </v-table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
        loading: false,
        validacionFechas: false,
        fecha_incio: "",
        fecha_fin: "",
        JsonMapper:[
            {
                id_etherscan: "string",
                tokenIdNFT: "string",
                usuario: "string",
                billetera_origen: "string",
                billetera_destino: "string",
                fecha_transaccion: "string"
            }
        ],
        JsonFechas:{
            fechaInicio:"",
            fechaFin:"",
            user:""
        }
      }
    },
    methods:{
        GetTransacciones(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo las transacciones de entre las fechas:" + this.fecha_incio + "y" + this.fecha_fin,
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
          axios.post("https://healthchain-api-blockchain-02c3b0c377c2.herokuapp.com/api/Transaccion/getListTransaccionFechas", this.JsonFechas)
                        .then(response=>{
                            if(response.status == 200){
                                this.JsonMapper = response.data;
                                this.validacionFechas = true
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