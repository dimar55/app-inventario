<template>
        <div class="container-registro">
        <form class="ctn-registrar"  v-on:submit.prevent="registrarProducto">
            <h1>REGISTRAR PRODUCTO</h1>
            <div class="campos_registrar" >
                <img src="../assets/carrito-de-supermercado.png" alt="">
                <p>Codigo</p>
                <input type="text" v-model="Producto.id_product">
            </div>
            <div class="campos_registrar">
                <p>Categoria</p>
                <select  v-model="Producto.categoria_product">
                    <option>ASEO</option>
                    <option>ENLATADOS</option>
                    <option>CANASTA BASICA</option>
                </select>
            </div>
            <div class="campos_registrar">
                <p>Nombre:</p>
                <input type="text"  v-model="Producto.nombre_product">
            </div>
            <div class="campos_registrar">
                <p>Marca:</p>
                <input type="text"  v-model="Producto.marca_product">
            </div>
            <div class="campos_registrar">
                <p>Unidad:</p>
                <input type="text"  v-model="Producto.unidad_poduct">
            </div>
            <div class="campos_registrar">
                <p>Cantidad:</p>
                <input type="number"  v-model="Producto.cantidad_product">
            </div>  
            <div class="boton">
                <button class="btn" type="submit">REGISTRAR</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
export default{
    name: 'FormProducto',
    data(){
        return {
            Producto: {
                id_product: Number(this.$route.query.id) || "",
                nombre_product: "",
                marca_product: "",
                categoria_product: "",
                unidad_poduct: "",
                cantidad_product: ""
            }
        }
    },
    methods:{
        registrarProducto(){
            axios.post(config.server+"/producto", this.Producto)
            .then((result) => {
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "producto creado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        this.$router.push({ path: '/Menu' });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido crear el producto",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    //console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido crear el producto",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
        }
    }
}
</script>