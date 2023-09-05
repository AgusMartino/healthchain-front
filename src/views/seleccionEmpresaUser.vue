<template>
  <form class="form">
      <v-text-field
        v-model="cuit"
        :counter="10"
        label="Cuit"
      ></v-text-field>

      <v-btn variant="outlined" @click="validateField()">Buscar empresa</v-btn>
  </form>

  <form class="form" v-if="validacionCuit">
      <v-text-field
        v-model="jsonEmpresa.nombre_empresa"
      ></v-text-field>
  
      <v-text-field
        v-model="jsonEmpresa.direccion_empresa"
      ></v-text-field>

      <v-select
          v-model="this.Rolselect"
          :items="this.jsonRol"
          item-title="Rol"
          item-value="id"
          label="Seleccionar Rol"
          @change="this.Rolselect"
        ></v-select>
      <div>
        <v-btn
        class="me-4"
        type="submit"
      >
        submit
      </v-btn>
  
      <v-btn @click="handleReset">
        clear
      </v-btn>
      </div>  
    </form>
</template>
  <script>
    export default{
      data(){
        return{
          validacionCuit: false,
          cuit: "",
          Rolselect: null,
          jsonEmpresa: {
            nombre_empresa:"",
            direccion_empresa: "",
          },
          jsonRol: [
            {id: '1', Rol: 'Empleado Administrador'},
            {id: '2', Rol: 'Empleado Financiero'},
            {id: '3', Rol: 'Empleado Monitor'}
          ]
        }
        
      },
    methods: {
            RegisterEmployee(){
                
            },
            validateField(){
              
            },
            setSelected(e){
              console.log(e)
              this.Rol = e
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
