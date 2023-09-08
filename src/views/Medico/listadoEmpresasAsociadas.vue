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
          v-for="item in JsonMapper"
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
  export default {
    data () {
      return {
        JsonMapper:[
            {
                cuit: "2043013181",
                id_empresa: "e55aba6e-72c4-4390-be1e-d8b3058a382d",
                name: "TEST",
                direccion: "TEST",
                fecha_creacion: "2023-09-02T19:56:13",
                fecha_modificacion: "2023-09-02T19:56:13"
            }
        ],
      }
    },
    mounted() {
        this.GetEmpresasAsociadas();
    },
    methods:{
        GetEmpresasAsociadas(){
            const username = localStorage.getItem('username')
            axios.get("https://localhost:7227/api/Empresa/GetAllEmpresaAsociadasMedico/" + username)
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