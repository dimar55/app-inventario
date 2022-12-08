<template>
    <div class="container-historial">
        <h1>HISTORIAL DE VENTAS</h1>
        <div class="ctn-ventas">
            <form class="filtro" v-on:submit.prevent="buscarVentas">
                <div>
                    <input type="date" required v-model="filtro.fecha_ini" :max ="today" >
                </div>
                <div>
                    <input type="date" required :max ="today" :min="filtro.fecha_ini" v-model="filtro.fecha_fin">
                </div>
                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Ventas</h1>
            </div>
            
            <div class="ctn-resultados">
                <div class="resultado" v-for="venta in ventas" :key="venta.fecha_venta">
                    <p style="color:#55B77E">{{venta.fecha_venta}}</p>
                    <p style="color:#555555"> {{venta.productos}}</p>
                    <p>total de la venta: {{venta.total_venta}}</p>
                   
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
    name: 'HistorialVentas',
    data(){
        return {
            today: new Date().toISOString().split('T')[0],
            filtro: {
                fecha_ini: "",
                fecha_fin: ""
            },
            valor: "",
            ventas: []

        }
    },
    methods:{
        cargarVentas(){
            axios.get(config.server+"/venta")
                .then((result) => {
                    if (result.data.success) {
                        this.ventas = result.data.body
                        this.ventas.productos = "";
                        for (let index = 0; index < this.ventas.length; index++) {
                            this.ventas[index].productos = []; 
                            for (let i = 0; i< this.ventas[index].prods.length; i++) {
                                this.ventas[index].productos  = this.ventas[index].productos + " " + this.ventas[index].prods[i]; 
                            }   
                        } 
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        buscarVentas() {
            axios.post(config.server +"/venta/filtro", this.filtro)
                .then((result) => {
                    if (result.data.success && result.data.body.length>0) {
                        this.ventas = result.data.body
                        this.ventas.productos = "";
                        for (let index = 0; index < this.ventas.length; index++) {
                            this.ventas[index].productos = []; 
                            for (let i = 0; i< this.ventas[index].prods.length; i++) {
                                this.ventas[index].productos  = this.ventas[index].productos + " " + this.ventas[index].prods[i]; 
                            }   
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se encontraron resultados",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    };

                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "info",
                        title: "No se encontraron resultados",
                        showConfirmButton: true,
                    });
                })
        },
        
    },
    mounted(){
        this.cargarVentas();
    }
}
</script>

<style>


.container-historial h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}


.ctn-ventas{
    margin: auto;
    background-color: #92DAD4;
    width: 1050px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
}

.ctn-ventas p{
    font-size: 32px;
}


.filtro{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.filtro input{
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
}
#check{
    display: flex;
    align-items: center;
}

#check input{
    height: 46px;
    width: 46px;
    border: none;
    padding-left: 20px;
}

.ctn-resultados{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    justify-items: center;
}

.resultado{
    background-color: #ffffff;
    border-radius: 20px;
    width: 450px;
    align-items: center;
    align-content: center;
    text-align: start;
    padding: 10px;
}

.botonI{
    padding-top: 10px;
    text-align: end;
}

.btnI{
    font-size: 35px;
    font-weight: 400;
    width: 180px;
    height: 50px;
    color: #FFFF;
    background: #F58649;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
    margin: 10px;
}

</style>