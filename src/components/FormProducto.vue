<template>
        <div class="container-registro">
            <div class="ctn-registrar">
                <h1>REGISTRAR PRODUCTO</h1>
                <div class="campos_registrar" >
                    <img src="../assets/carrito-de-supermercado.png" alt="">
                    <p>Codigo *</p>
                    <input type="number" v-model="Producto.id_product" required>
                </div> 
                <form v-on:submit.prevent="registrarProducto">
            <div class="campos_registrar">
                <p> Categoria *</p>
                <select  v-model="Producto.categoria_product" required>
                    <option>ASEO</option>
                    <option>ENLATADOS</option>
                    <option>CANASTA BASICA</option>
                    <option>BEBIDAS</option>
                    <option>CONFITERIA</option>
                    <option>OTRO</option>
                </select>
            </div>
            <div class="campos_registrar">
                <p>Nombre *</p>
                <input type="text"  v-model="Producto.nombre_product" required>
            </div>
            <div class="campos_registrar">
                <p>Marca *</p>
                <input type="text"  v-model="Producto.marca_product" required>
            </div>
            <div class="campos_registrar">
                <p>Unidad de medida *</p>
                <select type="text"  v-model="Producto.unidad_product" required>
                    <option></option>
                    <option>KG</option>
                    <option>g</option>
                    <option>Lb</option>
                    <option>L</option>
                    <option>mL</option>
                    <option>cm3</option>
                </select>
            </div>
            <div class="campos_registrar">
                <p>Cantidad de medida </p>
                <input type="number"  v-model="Producto.cantidad_product" min="1" max="10000">
            </div>  
            <div class="campos_registrar">
                <p>Precio entrada *</p>
                <input type="number"  v-model="Producto.precio_entrada" required min="0">
            </div>
            <div class="campos_registrar">
                <p>Precio venta *</p>
                <input type="number"  v-model="Producto.precio_venta" required min="0">
            </div> 
            <div class="boton">
                <button class="btn" type="submit">REGISTRAR</button>
            </div>
        </form>
            </div>
        
    </div>
</template>

<script>
import Producto from '../models/model_producto';
import controlers from '../controllers/add_productoCtrl';

export default{
    name: 'FormProducto',
    data(){
        return {
            Producto
    }
    },
    methods:{
        async buscarProducto() {
            return await controlers.buscarProducto(this);
        },

        registrarProducto(){
            controlers.registrarProducto(this);
        }
    },
    mounted() {
        this.Producto.id_product = Number(this.$route.query.id) || "";
    }
    
}
</script>

