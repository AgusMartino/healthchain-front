<template>
    <v-container row wrap align-center>
      <v-slide-y-transition mode="out-in">
          <v-layout class="layout">
            <div class="colorButton">
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="1500" variant="outlined">
                        <v-card-actions>
                        <div class="imagen">
                            <i class="fa-brands fa-hive fa-2xl"></i>
                        </div>
                        <v-btn to="/gestorNFTEE">Gestor de NFTs</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>

            <div class="colorButton">
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="1500" variant="outlined">
                        <v-card-actions>
                        <div class="imagen">
                            <i class="fa-solid fa-bars fa-2xl"></i>
                        </div>
                        <v-btn to="/listadoTransaccionesEE">Visualizar transacciones</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>
          </v-layout>
        </v-slide-y-transition>
        <v-slide-y-transition mode="out-in">
          <v-layout class="layout">
            <div class="colorButton">
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="1500" variant="outlined">
                        <v-card-actions>
                        <div class="imagen">
                            <i class="fa-solid fa-kit-medical fa-2xl"></i>
                        </div>
                        <v-btn to="/gestorMedicosEE">Gestor Medicos</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>

            <div class="colorButton">
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="1500" variant="outlined">
                        <v-card-actions>
                        <div class="imagen">
                            <i class="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <v-btn to="/gestorUsuariosEE">Gestor de Usuarios</v-btn>
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
    margin-bottom: 20px;
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

