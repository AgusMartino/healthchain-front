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
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>
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
  <script setup>
    import { useField, useForm } from 'vee-validate'
  
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name (value) {
          if (value?.length >= 2) return true
  
          return 'Name needs to be at least 2 characters.'
        },
        phone (value) {
          if (value?.length > 8 && /[0-9-]+/.test(value)) return true
  
          return 'Phone number needs to be at least 9 digits.'
        },
        email (value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
  
          return 'Must be a valid e-mail.'
        },
        select (value) {
          if (value) return true
  
          return 'Select an item.'
        },
        checkbox (value) {
          if (value === '1') return true
  
          return 'Must be checked.'
        },
      },
    })
    const name = useField('name')
    const cuit = useField('cuit')
    const email = useField('email')
  
    const submit = handleSubmit(values => {
      alert(JSON.stringify(values, null, 2))
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