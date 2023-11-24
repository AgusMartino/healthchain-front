<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="fecha_incio"
                        label="Seleccionar fecha de incio"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="fecha_incio" no-title scrollable>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="fecha_fin"
                        label="Seleccionar fecha de fin"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="fecha_fin" no-title scrollable>
                    </v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>
        <v-btn @click="GetTransacciones()">
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
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
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
            fecha_de_incio:"",
            fecha_de_fin:"",
            user:""
        }
      }
    },
    methods:{
        GetTransacciones(){
          const BitacoraRequest={
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo las transacciones de entre las fechas:" + this.fecha_incio + "y" + this.fecha_fin,
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
          this.JsonFechas.user = this.$store.state.id_usuario,
          axios.post("https://localhost:7107/api/Transaccion/getListTransaccionFechasCompany", this.JsonFechas)
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