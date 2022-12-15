<template>
    <div class="container-registro">
        <form class="ctn-registrar"  v-on:submit.prevent="registrarCliente">
            <h1>REGISTRAR CLIENTE</h1>
            <div class="campos_registrar">
                <img src="../assets/cliente.png" alt="">
                <p>Nombre *</p>
                <input type="text" v-model="Cliente.nombre_cli" required minlength="5">
            </div>
            <div class="campos_registrar">
                <p>Tipo de Documento *</p>
                <select v-model="Cliente.tipo_documento_cli" required>
                    <option>CC Cedula de Ciudadania</option>
                    <option>TT Tarjeta de Identidad</option>
                    <option>CE Cedula de Extranjeria</option>
                </select>
            </div>
            <div class="campos_registrar">
                <p>Numero de Documento *</p>
                <input type="number" v-model="Cliente.cedula_cli" required min="100000" max="9999999999">
            </div>
            <div class="campos_registrar">
                <p>Telefono *</p>
                <input type="number" v-model="Cliente.telefono_cli" required min="100000" max="999999999999">
            </div>
            <div class="campos_registrar">
                <p>Dirección *</p>
                <input type="text" v-model="Cliente.direccion_cli" required minlength="5">
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
import Cliente from '../models/model_cliente';
export default{
    name: 'FormCliente',
    data(){
        return {
            Cliente: Object.assign({}, Cliente),
        }
    },
    methods:{
        buscarCliente() {
            return axios
                .get(config.server + "/cliente/cedula/" + this.Cliente.cedula_cli)
                .then((result) => {
                return (result.data.success && result.data.body.length > 0);
                });
        },
        async registrarCliente(){
            if(await this.buscarCliente()){
                Swal.fire({
                    icon: "info",
                    title: "Cliente ya registrado",
                    showConfirmButton: true
                  });
            }else{
            axios.post(config.server+"/cliente", this.Cliente)
            .then((result) => {
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Cliente creado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        this.$router.push({ path: '/Menu' });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido crear el cliente",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "El Cliente ya esta registrado",
                        showConfirmButton: true,
                    });
                })
            }
        }
    }
}
</script>


<style>
.container-registro{
    color: #ffffff;
    font-weight: 400;
    text-align: center;
    display: flex;
}

.campos_registrar{
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    padding: 10px 8% 20px; 
}

.ctn-registrar{
    margin: auto;
    background-color: #92DAD4;
    width: 1050px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
}

.ctn-registrar h1{
    font-size: 55px;
    padding-top: 50px;
    padding-bottom: 50px;
}

.ctn-registrar p{
    font-size: 48px;
}

.ctn-registrar input{
    width: 505px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
   
}

.ctn-registrar select{
    width: 505px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
}




</style>