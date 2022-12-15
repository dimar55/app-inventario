<template>
     <div class="container-registro">
        <form class="ctn-registrar" v-on:submit.prevent="registrarProveedor">
            <h1>REGISTRAR PROVEEDOR</h1>
            <div class="campos_registrar">
                <img src="../assets/mensajero.png" alt="">
                <p>Nombre *</p>
                <input type="text" v-model="Proveedor.nombre_pro" required minlength="5">
            </div>
            <div class="campos_registrar">
                <p>Tipo de Documento *</p>
                <select  v-model="Proveedor.tipo_documento_pro" required>
                    <option>CC Cedula de Ciudadania</option>
                    <option>TT Tarjeta de Identidad</option>
                    <option>CE Cedula de Extranjeria</option>
                </select>
            </div>
            <div class="campos_registrar">
                <p>Numero de Documento *</p>
                <input type="number"  v-model="Proveedor.cedula_pro" required min="100000" max="999999999999">
            </div>
            <div class="campos_registrar">
                <p>Telefono *</p>
                <input type="number"  v-model="Proveedor.telefono_pro" required min="100000" max="999999999999">
            </div>
            <div class="campos_registrar">
                <p>Correo *</p>
                <input type="email"  v-model="Proveedor.correo_pro" required>
            </div>
            <div class="boton">
                <button type="submit" class="btn">REGISTRAR</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
import Proveedor from '../models/model_proveedor';
    export default{
        name: 'FormProveedores',
        data(){
        return {
            Proveedor,
        }
    },
    methods:{
        registrarProveedor(){
            axios.post(config.server+"/proveedor", this.Proveedor)
            .then((result) => {
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Proveedor creado exitosamente",
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
                            title: "No se ha podido crear el proveedor",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido crear el proveedor",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
        }
    }
    }
</script>