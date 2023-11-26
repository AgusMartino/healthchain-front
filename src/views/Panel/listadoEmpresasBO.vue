<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Cuit
          </th>
          <th class="text-left">
            Nombre empresa
          </th>
          <th class="text-left">
            Direccion
          </th>
          <th class="text-left">
            Fecha de creacion
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in this.JsonMapper"
          :key="item.id_empresa"
        >
          <td>{{ item.cuit }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.direccion }}</td>
          <td>{{ item.fecha_creacion }}</td>
        </tr>
      </tbody>
    </v-table>
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
        JsonMapper:[
            {
                cuit: "string",
                id_empresa: "string",
                name: "string",
                direccion: "string",
                fecha_creacion: "string",
                fecha_modificacion: "string"
            }
        ],
      }
    },
    mounted() {
        this.GetEmpresas();
    },
    methods:{
        GetEmpresas(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "El usuario:" + this.$store.state.id_usuario + "Esta obteniendo todas las empresas que se crearon",
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
            axios.get("https://healtchain-api-abms-4fd21ff66375.herokuapp.com/api/Empresa/GetAllEmpresa")
                      .then(response=>{
                        if(response.status == 200){
                            this.JsonMapper = response.data;
                        }
                      })
                      .catch(err =>{
                        alert(err.data)
                      })
        }
    }
  }
</script>