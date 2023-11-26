<template>
    <form class="form">
        <v-select
            v-model="this.especialidadSelect"
            :items="this.especialidad"
            item-title="especialidad"
            item-value="id"
            label="Seleccionar Especialidad"
          ></v-select>

      <v-btn variant="outlined" @click="AddEespecialidad()">Seleccionar Especialidad</v-btn>
    </form>
  </template>
    <script>
    import axios from 'axios'
      export default{
        data(){
          return{
            especialidadSelect: null,
            especialidad:[
                {id:"1", especialidad:"Radiologo"},
                {id:"2", especialidad:"Nutricionista"},
                {id:"3", especialidad:"Clinico"},
                {id:"4", especialidad:"Oftalmologo"},
                {id:"5", especialidad:"Kinesiologo"}
            ],
            Medicos:{
                nombre: "",
                apellido: "",
                usuario: this.$store.state.id_usuario,
                especialidad: ""
            }
          }
        },
        methods: {
            AddEespecialidad(){
                console.log(this.especialidadSelect)
                const BitacoraRequest = {
                    id_bitacora: "",
                    id_usuario: this.$store.state.id_usuario,
                    name: "",
                    lastname: "",
                    description: "Se registra la especialidad del medico",
                    type: "INFO",
                    creation_date: "",
                  }
                  axios.post("https://localhost:7182/api/Bitacora/AddBitacora", BitacoraRequest)
                          .then(response=>{
                              if(response.status == 200){
                                      console.log('bitacora ok')
                              }})
                          .catch(err =>{
                            console.log(err.data)
                          })
                    console.log(this.Medicos)
                    this.Medicos.especialidad = this.especialidadSelect
                    if(this.especialidadSelect != ""){
                    axios.post("https://localhost:7227/api/Medico/AddEspecialidad", this.Medicos)
                        .then(response=>{
                            if(response.status == 200)
                            alert("Se registro la especialidad")
                            router.replace('/HomeM')
                        })
                        .catch(err =>{
                            alert(err.data)
                        })
                  }
                  else{
                    alert("Seleccione una Especialidad")
                  }
                },
            }
          }
    </script>
    <style>
      .form{
          margin-top: 20px;
          margin-left: 20%;
          margin-right: 20%;
          justify-content: space-around;
          align-items: center;
      }
</style>
  