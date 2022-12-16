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
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
import Producto from '../models/model_producto';
export default{
    name: 'FormProducto',
    data(){
        return {
            Producto
    }
    },
    methods:{

        buscarProducto() {
            return axios
                .get(config.server + "/producto/id/" + this.Producto.id_product)
                .then((result) => {
                return (result.data.success && result.data.body.length > 0);
                });
        },

         async registrarProducto(){
            if( await this.buscarProducto()){
                Swal.fire({
                    icon: "info",
                    title: "producto ya registrado",
                    showConfirmButton: true
                  });
            }else{
                axios.post(config.server+"/producto", this.Producto)
            .then((result) => {
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "producto creado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        this.Producto.nombre_product ="";
                        this.Producto.categoria_product ="";
                        this.Producto.marca_product ="";
                        this.Producto.unidad_product ="";
                        this.Producto.cantidad_product ="";
                        this.Producto.precio_entrada ="";
                        this.Producto.precio_venta ="";
                        if(sessionStorage.getItem("Rol") == "Operador"){
                            this.$router.push({ path: '/MenuOp' });
                        }else{
                            this.$router.push({ path: '/Menu' });
                        }
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
    },
    mounted() {
        this.Producto.id_product = Number(this.$route.query.id) || "";
    }
    
}
</script>

