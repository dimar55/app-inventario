<template>
    <div class="container-registro">
        <form class="ctn-registrar" v-on:submit.prevent="registrarIngreso">
            <h1>REGISTRAR INGRESO</h1>
            <form class="campos_registrar" v-on:submit.prevent="buscarProducto">
                <img src="../assets/carrito-de-supermercado.png" alt="">
                <p>Codigo:</p>
                <input type="number" v-model="producto">  
                <button type="submit" hidden></button>            
            </form>
            <div class="ctn-pro" v-show="prod_no_existe">
                <p>Producto no registrado</p>
                <button class="btn">REGISTRAR</button>
            </div>
            <div class="campos_registrar">
                <p>Precio Entrada:</p>
                <input type="text" v-model="ingreso.precio_entrada">
            </div>
            <div class="campos_registrar">
                <p>Precio de Venta:</p>
                <input type="text" v-model="ingreso.precio_venta">
            </div>
            <div class="campos_registrar">
                <p>Cantidad:</p>
                <input type="text" v-model="ingreso.cantidad_lote">
            </div>
            <div class="campos_registrar">
                <p>Fecha de Vencimiento:</p>
                <input type="date" v-model="ingreso.fecha_vencimiento">
            </div>

            <div class="campos_registrar">
                    <p>Codigo proveedor:</p>
                    <input type="number" v-model="ingreso.cedula_pro">
            </div>
            <div class="boton">
                <button class="btn">REGISTRAR</button>
            </div>
        </form>
    </div>
</template>


<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
export default{
    name: 'FormIngreso',
    data(){
        return {
            prod_no_existe: false,
            producto: "",
            ingreso: {
                precio_entrada: "", 
                precio_venta: "",
                cantidad_lote: "", 
                fecha_vencimiento: "", 
                cedula_pro: "", 
                cedula_usu: Number(sessionStorage.getItem("Cedula"))
            }
        }
    },
    methods: {
        buscarProducto(){
            axios.get(config.server+"/producto/id/"+this.producto)
            .then((result)=>{
                if(result.data.success){
                    this.prod_no_existe = false;
                }else{
                    this.prod_no_existe = true;
                }
            })
        }
    }
}
</script>


<style>
.buscar-proveedor{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.ctn-pro{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

</style>