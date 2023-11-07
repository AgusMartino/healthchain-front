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
                Descripcion
            </th>
            <th class="text-left">
                Tipo de bitacora
            </th>
            <th class="text-left">
                Fecha de bitacora
            </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="item in this.JsonMapper"
            :key="item.id_solicitud"
            >
            <td>{{ item.cuit_empresa }}</td>
            <td>{{ item.nombreEmpresa }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.fecha_creacion }}</td>
            <td>{{ item.estado }}</td>
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
        }
      }
    },
    methods:{
        GetBitacoras(){
          const BitacoraRequest={
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo la bitacora de entre las fechas:" + this.fecha_incio + "y" + this.fecha_fin,
            type: "INFO",
            creation_date: "",
          }
          axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                        .then(response=>{
                            if(response.status == 200){
                                this.jsonSolicitud = response.data;
                                    Console.log('bitacora ok')
                            }})
                        .catch(err =>{
                          Console.log(err.data)
                        })
          axios.get("https://localhost:7182/api/Bitacora/GetBitacora", this.JsonFechas)
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