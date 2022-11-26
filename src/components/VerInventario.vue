<template>
        <div class="container-historial">
        <h1>INVENTARIO</h1>
        <div class="ctn-ventas" >
            <form class="filtro" v-on:submit.prevent="buscarProductos">
                <div class="ctn-select">
                    <select  v-model="filtro">
                        <option ></option>
                        <option>NOMBRE</option>
                        <option>CODIGO</option>
                        <option>CANTIDAD</option>
                    </select>
                </div>
                <input type="text" placeholder="Buscar Producto" v-model="valor">

                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Productos</h1>
            </div>
            
            <div class="ctn-resultados" >
                <div class="resultado" v-for="producto in productos">
                    <div class="ctn-re">
                        <p >{{producto.nombre_product}} {{producto.marca_product}} {{producto.cantidad_product}} {{producto.unidad_poduct}}</p>
                        <p style="color: #55B77E">{{producto.id_product}} </p>
                    </div>
                 
                    <p>Disponibles {{producto.cantidad_lote}}</p>
                    <div  class="ctn-re">
                        <p>Precio $ {{producto.precio_venta}}</p>
                            <button class="btnI">VER DETALLES</button>
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
    name: 'VerInventario',
    data(){
        return {
            filtro: "",
            valor: "",
            productos: []
        }
    },
    methods:{
        cargarProductos(){
            axios.get(config.server+"/loteP")
                .then((result) => {
                    if (result.data.success) this.productos = result.data.body;
                }).catch((err) => {
                    console.log(err)
                })
        },
        buscarProductos() {
            let url = "";
            if (this.filtro == "") url = config.server+"/loteP";
            else if (this.filtro == "NOMBRE") url =config.server+"/loteP/nombre/"
            else if (this.filtro == "CODIGO") url = config.server+"/loteP/id/"
            else if (this.filtro == "CANTIDAD") url = config.server+"/loteP/cantidad/"
            axios.get(url + this.valor)
                .then((result) => {
                    if (result.data.success) {

                        this.productos = result.data.body

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
                        icon: "error",
                        title: "No se encontraron resultados",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
        },
    },
    mounted(){
        this.cargarProductos();
    }
}
</script>