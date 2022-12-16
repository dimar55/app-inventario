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
                <input type="number"  min="100000" max="9999999999"  v-model="Proveedor.cedula_pro" required >
            </div>
            <div class="campos_registrar">
                <p>Telefono *</p>
                <input type="number"  v-model="Proveedor.telefono_pro" required min="100000" max="9999999999">
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
import Proveedor from '../models/model_proveedor';
import controlers from '../controllers/add_proveedorCtlr';

    export default{
        name: 'FormProveedores',
        data(){
        return {
            Proveedor: Object.assign({}, Proveedor),
        }
    },
    methods:{
        async buscarProveedor() {
            return await controlers.buscarProveedor(this);
        },
        registrarProveedor(){
            controlers.registrarProveedor(this);
        }
    },
    mounted() {
        this.Proveedor.cedula_pro = Number(this.$route.query.id) || "";
    }
    }
</script>