<template>
    <div class="container-historial">
        <h1>HISTORIAL DE SALDOS</h1>
        <div class="ctn-ventas">
            <form class="filtro" v-on:submit.prevent="buscarSaldos">
                <div class="ctn-select">
                        <select v-model="filtro.estado_saldo">
                            <option >Pagado</option>
                            <option >Pendiente</option>
                        </select>
                    </div>
                <input type="text" placeholder="Buscar Saldos"  v-model="filtro.cedula_cli">
                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Saldos</h1>
            </div>
            <div class="ctn-resultados">
                <div class="resultado" v-for="saldo in saldos" :key="saldo.cedula_cli">
                    <div class="ctn-re">
                        <p > {{saldo.cedula_cli}}</p>
                        <div v-if="saldo.estado_saldo == 'Pagado'">
                            <p style="color: #55B77E">{{saldo.estado_saldo}}</p>
                        </div>
                        <div v-if="saldo.estado_saldo == 'Pendiente'">
                            <p style="color: #F58649">{{saldo.estado_saldo}}</p>  
                        </div>
                    </div>
                    <div  class="ctn-re">
                        <p>total del saldo: ${{saldo.saldo}}</p>
                        <div  v-if="saldo.estado_saldo == 'Pendiente'">
                            <button class="btnI" @click="go_abonar(saldo)">Abonar</button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
export default{
    name: 'HistorialSaldos',
    data(){
        return{
            filtro:{
                cedula_cli: "",
                estado_saldo: ""
            },
            saldos: []
        }
    },
    methods:{
        cargarSaldos(){
            axios.get(config.server+"/saldo")
                .then((result) => {
                    if (result.data.success) this.saldos = result.data.body;
                }).catch((err) => {
                    console.log(err)
                })
        },
        buscarSaldos() {
            if (this.filtro.cedula_cli == "" && this.filtro.estado_saldo ==""){
                axios.get(config.server+"/saldo")
                .then((result) => {
                    if (result.data.success) this.saldos = result.data.body;
                }).catch((err) => {
                    console.log(err)
                })
            }else {
                axios.post(config.server+"/saldo/filter", this.filtro)
            .then((result)=>{
                if(result.data.success && result.data.body.length>0){
                    this.saldos = result.data.body;
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "No se encontraron resultados",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                }
            }).catch((err)=>{
                console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "No se encontraron resultados",
                        showConfirmButton: false,
                        timer: 1200,
                    });
            })
            }
        },
        go_abonar(saldo){
            this.$router.push({ path: '/Abonar', query: { id: saldo.id_saldo ,saldo: saldo.saldo , cedula: saldo.cedula_cli}});  
        }
    },
    mounted(){
        this.cargarSaldos();

  } 
}
</script>

<style>
 .ctn-re{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
 }

 .ctn-select select{
    width: 150px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 25px;
    padding-left: 20px;
}
</style>