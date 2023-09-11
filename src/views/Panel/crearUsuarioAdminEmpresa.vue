<template>
    <form @submit.prevent="submit" class="form">
      <v-text-field
        v-model="usuario.value.value"
        :error-messages="usuario.errorMessage.value"
        label="Usuario"
      ></v-text-field>

      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        label="Nombre"
      ></v-text-field>

      <v-text-field
        v-model="lastname.value.value"
        :error-messages="lastname.errorMessage.value"
        label="Apellido"
      ></v-text-field>
      
      Cuit de la empresa:
      <v-text-field
        v-model="cuit.value.value"
        :error-messages="cuit.errorMessage.value"
        label="Cuit"
      ></v-text-field>

      <div>
        <v-btn
        class="me-4"
        type="submit"
      >
        Crear usuario Admin
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
        usuario (value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
  
            return 'Debe ser un email valido.'
        },
        name (value) {
          if (value?.length >= 2) return true
  
          return 'Nombre tiene que tener mas de 2 caracteres.'
        },
        lastname (value) {
          if (value?.length >= 2) return true
  
          return 'Nombre tiene que tener mas de 2 caracteres.'
        },
        cuit (value) {
          if (value?.length > 8 && /[0-9-]+/.test(value)) return true
  
          return 'Cuit tiene que tener 9 digitos.'
        },
      },
    })
    const usuario = useField('usuario')
    const name = useField('name')
    const lastname = useField('lastname')
    const cuit = useField('cuit')
  
    const submit = handleSubmit(values => {
      const Json = {
        user: usuario.toString(),
        name: name.toString(),
        lastname: lastname.toString(),
        cuit_empresa: cuit.toString(),
        user_type: "1",
        rol: {
            id: "2"
            }
      }
      axios.post("https://localhost:7151/api/User/RegisterUser", Json)
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