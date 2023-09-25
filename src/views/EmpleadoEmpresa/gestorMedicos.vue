<template>
    <v-container row wrap align-center>
      <v-slide-y-transition mode="out-in">
          <v-layout class="layout">
            <div>
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="344" variant="outlined">
                        <div class="pa-3">
                            Imagen button
                        </div>
                        <hr>
                        <v-card-actions>
                        <v-btn  variant="outlined" to="/listadoSolicitudesMedicoEE">Solicitudes de Medicos</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>

            <div>
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="344" variant="outlined">
                        <div class="pa-3">
                            Imagen button
                        </div>
                        <hr>
                        <v-card-actions>
                        <v-btn variant="outlined" to="/listadoMedicosEE">Lista de Medicos Asociados</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>
          </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>
import axios from 'axios'
export default{
    components:{
    },
    methods:{
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