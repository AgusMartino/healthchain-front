<template>
    <v-container row wrap align-center>
      <v-slide-y-transition mode="out-in">
          <v-layout class="layout">
            <div>
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="344" variant="outlined">
                        <div class="pa-3">
                            Imagen empresa
                        </div>
                        <hr>
                        <v-card-actions>
                        <v-btn  variant="outlined" @click="">Soy empleado de obra social</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>

            <div>
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="344" variant="outlined">
                        <div class="pa-3">
                            Imagen medico
                        </div>
                        <hr>
                        <v-card-actions>
                        <v-btn variant="outlined" @click="parseJwt()">Soy medico</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>
          </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>
//import axios from 'axion'
export default{
    components:{
    },
    methods:{
        RegisterMedico(){
            
        },
        parseJwt () {
            const token = localStorage.getItem('id_token')
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            console.log(JSON.parse(jsonPayload))
        }
    }
}
</script>
<style>
.layout{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.container{
    justify-content: center;
    align-items: center;
}
.col-4{
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    padding-right: 30%;
    padding-left: 30%
}
</style>

