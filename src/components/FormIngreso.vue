<template>
    <div class="container-registro">    
        <div class="ctn-registrar">
            <h1>REGISTRAR INGRESO</h1>
            <form class="campos_registrar" v-on:submit.prevent="buscarProducto">
                <img src="../assets/entrada.png" alt="">
                <p>Codigo:</p>
                <input type="number" v-model="producto" required>  
            </form>
            <div class="ctn-pro" v-show="prod_no_existe">
                <p>Producto no registrado</p>
                <button class="btn" @click="goProducto">REGISTRAR</button>
            </div>
            <form  v-on:submit.prevent="registrarIngreso">
            <div class="campos_registrar">
                <p>Precio Entrada:</p>
                <input type="text" v-model="prod.precio_entrada" required>
            </div>
            <div class="campos_registrar">
                <p>Precio de Venta:</p>
                <input type="text" v-model="prod.precio_venta" required>
            </div>
            <div class="campos_registrar">
                <p>Cantidad:</p>
                <input type="text" v-model="prod.cantidad_disp" required>
            </div>
            <div class="campos_registrar">
                    <p>Codigo proveedor:</p>
                    <input type="number" v-model="ingreso.cedula_pro" required>
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
import ingreso from '../models/model_ingreso';
import controlers from '../controllers/ingresoCtrl';
export default{
    name: 'FormIngreso',
    data(){
        return {
            prod_no_existe: false,
            producto: "",
            prod: {
                precio_entrada: "",
                precio_venta: "",
                cantidad_disp: ""
            },
            ingreso,
        }
    },
    methods: {
        goProducto(){
            this.$router.push({ path: '/RegistrarProducto', query: {id: this.producto}});
        },
        buscarProducto(){
            controlers.buscarProducto(this);
        },
        async registrarIngreso(){
            let res = await axios.post(config.server+"/lote", this.ingreso)
            .then((result)=>{
                if(result.data.success){
                    return result.data.body.producto.id_lote;
                   
                }else{
                    return 0;
                }
            }).catch(err=>{
                Swal.fire({
                            icon: "error",
                            title: "No se ha registrar el ingreso",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                console.log(err);
                return 0;
            })
            if(res!=0){
                axios.post(config.server+"/loteP", {id_lote: res , id_product: this.producto})
                .then((result)=>{
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Ingreso creado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        if(sessionStorage.getItem("Rol") == "Operador"){
                            this.$router.push({ path: '/MenuOp' });
                        }else{
                            this.$router.push({ path: '/Menu' });
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido crear el ingreso",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido crear el ingreso",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
            }
        }
    },
    mounted(){
        this.ingreso.cedula_usu = sessionStorage.getItem("Cedula");
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