<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                    <v-text-field
                        v-model="this.JsonFechas.fecha_de_incio"
                        label="Seleccionar fecha de incio"
                        v-on="on"
                        type="datetime-local"
                    ></v-text-field>
            </v-flex>                  
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                    <v-text-field
                        v-model="this.JsonFechas.fecha_de_fin"
                        label="Seleccionar fecha de fin"
                        v-on="on"
                        type="datetime-local"
                    ></v-text-field>
            </v-flex>
        </v-layout>
        <v-btn @click="GetBitacoras()">
          Obtener Bitacoras
        </v-btn>
    </div>
    <div v-if="validacionFechas">
        <v-table>
        <thead>
            <tr>
            <th class="text-left">
                Nombre
            </th>
            <th class="text-left">
                Apellido
            </th>
            <th class="text-left">
                Tipo de log
            </th>
            <th class="text-left">
                Fecha
            </th>
            <th class="text-left">
                Detalle
            </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="item in this.JsonMapper"
            :key="item.id_log"
            >
            <td>{{ item.name }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.creation_date }}</td>
            <td>{{ item.description }}</td>
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
        JsonMapper:[
            {
                id_bitacora: "string",
                id_usuario: "string",
                name: "string",
                lastname: "string",
                description: "string",
                type: "string",
                creation_date: "2023-09-07T02:37:36.502Z"
            }
        ],
        JsonFechas:{
            fecha_de_incio:"",
            fecha_de_fin:""
        },
      }
    },
    methods:{
        GetBitacoras(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo la bitacora de entre las fechas:" + this.JsonFechas.fecha_de_incio + "y" + this.JsonFechas.fecha_de_fin,
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
          axios.post("https://healthchain-api-bitacora-8ac3b5dd6f8a.herokuapp.com/api/Bitacora/GetBitacora", this.JsonFechas)
                        .then(response=>{
                            if(response.status == 200){
                                this.JsonMapper = response.data;
                                this.validacionFechas = true
                                console.log("Se obtuvo info")
                                console.log(response.data)
                            }
                        })
                        .catch(err =>{
                            alert(err.data)
                        })
        }
    }
  }
</script>