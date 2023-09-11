<template>
    <form @submit.prevent="submit" class="form">
      <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Nombre"
      ></v-text-field>
  
      <v-text-field
        v-model="cuit.value.value"
        :counter="7"
        :error-messages="cuit.errorMessage.value"
        label="Cuit"
      ></v-text-field>
  
      <v-text-field
        v-model="direccion.value.value"
        :error-messages="direccion.errorMessage.value"
        label="direccion"
      ></v-text-field>
      <div>
        <v-btn
        class="me-4"
        type="submit"
      >
        Crear Empresa
      </v-btn>
  
      <v-btn @click="handleReset">
        Limpiar campos
      </v-btn>
      </div>  
      
    </form>
  </template>
  <script setup>
    import { useField, useForm } from 'vee-validate'
  
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name (value) {
          if (value?.length >= 2) return true
  
          return 'Nombre tiene que tener mas de 2 caracteres.'
        },
        cuit (value) {
          if (value?.length > 8 && /[0-9-]+/.test(value)) return true
  
          return 'Cuit tiene que tener 9 digitos.'
        },
        direccion (value) {
          if (value?.length >= 7) return true
  
          return 'Tiene que tener al menos 7 caracteres la direccion.'
        },
      },
    })
    const name = useField('name')
    const cuit = useField('cuit')
    const direccion = useField('direccion')
  
    const submit = handleSubmit(values => {
      const Json = {
        cuit: cuit.toString(),
        name: name.toString(),
        direccion: direccion.toString(),
      }
      axios.post("https://localhost:7227/api/Empresa/RegisterEmpresa", Json)
            .then(response=>{
                    if(response.status==200){
                        alert("registrado con exito!")
                    }
            })
            .catch(err =>{
                alert(err.data)
            })
            .finally(data =>{
              location.reload()
            })
    })
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