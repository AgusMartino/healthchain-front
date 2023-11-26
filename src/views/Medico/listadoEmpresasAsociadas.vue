<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Cuit
          </th>
          <th class="text-left">
            Empresa
          </th>
          <th class="text-left">
            Direccion
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in this.JsonMapper"
          :key="item.cuit"
        >
          <td>{{ item.cuit }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.direccion }}</td>
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
                cuit: "",
                id_empresa: "",
                name: "",
                direccion: "",
                fecha_creacion: "",
                fecha_modificacion: ""
            }
        ],
      }
    },
    mounted() {
        this.GetEmpresasAsociadas();
    },
    methods:{
        GetEmpresasAsociadas(){
          const BitacoraRequest={
            id_bitacora: "",
            id_usuario: this.$store.state.id_usuario,
            name: "",
            lastname: "",
            description: "Se obtienen todas las empresas relacionadas con el usuario:" + this.$store.state.id_usuario,
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
          const username = this.$store.state.id_usuario
          axios.get("https://healtchain-api-abms-4fd21ff66375.herokuapp.com/api/Empresa/GetAllEmpresaAsociadasMedico/" + username)
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