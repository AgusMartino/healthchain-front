<template>
    <v-container row wrap align-center>
      <v-slide-y-transition mode="out-in">
          <v-layout class="layout">
            <div class="colorButton">
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                    <v-card class="mx-auto" max-width="1500" variant="outlined">
                        <v-card-actions>
                        <div class="imagen">
                            <i class="fa-solid fa-building-ngo fa-2xl"></i>
                        </div>
                        <v-btn to="/CrearEmpresaBO">Crear Empresa</v-btn>
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
                        <v-btn to="/listadoEmpresasBO">Lista de Empresas</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </div>
          </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>
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