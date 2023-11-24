<template>
    <form class="form">
        <v-select
            v-model="this.MedicoSelect"
            :items="this.Medicos"
            item-title="usuario"
            item-value="usuario"
            label="Seleccionar Medico"
            @change="this.MedicoSelect"
          ></v-select>

        <v-text-field
            v-model="nft"
            label="Identificador NFT"
          ></v-text-field>

      <v-btn variant="outlined" @click="GetNFT()">Buscar NFT</v-btn>
    </form>
  
    <form class="form" v-if="validacionNFT">
        <v-text-field
          disableb
          v-model="this.PostNFTBody.nombre_paciente"
        ></v-text-field>
    
        <v-text-field
          disableb
          v-model="this.PostNFTBody.apellido_paciente"
        ></v-text-field>
  
        <v-text-field
          disableb
          v-model="this.PostNFTBody.dni"
        ></v-text-field>

        <v-text-field
          disableb
          v-model="this.PostNFTBody.cobertura"
        ></v-text-field>
        <div>
          <v-btn
          class="me-4"
          @click="Transaferir()"
        >
          Transferir NFT
        </v-btn>
        </div>  
      </form>
  </template>
    <script>
    import axios from 'axios'
    import router from '../router'
      export default{
        data(){
          return{
            validacionNFT: false,
            nft: null,
            MedicoSelect: null,
            Medicos: [
                {
                    nombre: "string",
                    apellido: "string",
                    usuario: "string",
                    especialidad: "string"
                }
            ],
            PostNFTBody: {
                id_user: this.$store.state.id_usuario,
                id_user_Transfer: "",
                tokenNFTid: "",
                nombre_paciente: "",
                apellido_paciente: "",
                dni: "",
                cobertura: "",
                consulta: "",
                patologia: "",
                estado: "",
                precio: ""
            }
          }
        },
      mounted(){
        this.GetMedicosEmpresa()
      },
      methods: {
              Transaferir(){
                const BitacoraRequest = {
                    id_usuario: this.$store.state.id_usuario,
                    name: "",
                    lastname: "",
                    description: "Se invoca la funcion de generar la transferencia del NFT con id:" + this.nft ,
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
                          }),
                  this.PostNFTBody.id_user_Transfer = MedicoSelect
                  if(this.PostNFTBody.id_user_Transfer != ""){
                    axios.post("https://localhost:7107/api/NFT/TransaferNFT", this.PostNFTBody)
                        .then(response=>{
                            if(response.status == 200)
                            alert("Solicitud enviado con exito")
                            router.replace('/homeEE')
                        })
                        .catch(err =>{
                            alert(err.data)
                        })
                  }
                  else{
                    alert("Seleccione un medico")
                  }
                },
              GetMedicosEmpresa(){
                const BitacoraRequest = {
                  id_usuario: this.$store.state.id_usuario,
                  name: "",
                  lastname: "",
                  description: "Se Obtienen los medicos de la empresa del user:" + this.$store.state.id_usuario,
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
                axios.get("https://localhost:7227/api/Medico/GetAllMedicosEmpresas/" + this.$store.state.cuit_empresa)
                        .then(response=>{
                          if(response.status == 200){
                            this.Medicos = response.data
                          }
                        })
                        .catch(err =>{
                          alert(err.data)
                        })
              },
              GetNFT(){
                if(this.nft == null){
                  alert("Debe completar el identificador del nft a buscar")
                }
                else{
                  const BitacoraRequest = {
                    id_usuario: this.$store.state.id_usuario,
                    name: "",
                    lastname: "",
                    description: "Se obtiene la informacion del NFT con id:" + this.nft ,
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
                  axios.get("https://localhost:7107/api/NFT/getNFT/" + this.nft.toString())
                  .then(response=>{
                    if(response.status==200){
                      this.jsonEmpresa = response.data;
                      if(response.data.tokenNFTid == null){
                        this.validacionNFT = false;
                        alert("NFT no encontrado, intentelo de nuevo")
                      }else if(response.data.tokenNFTid != null){
                        this.validacionNFT = true;
                        this.PostNFTBody = response.data
                      }
                    }
                  })
                  .catch(err =>{
                    alert(err.data)
                  })
                }
              },
              setSelected(e){
                console.log(e)
                this.nft = e
              }
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
  