<template>
    <div class="container">
        <div class="contenedor">
            <div class="imagen-logo">
                <img src="../assets/Yalmecris.png" alt="">
            </div>
            <div class="ctn-campos">
            <form  v-on:submit.prevent="recuperarUser">
                <h1>RECUPERAR USUARIO</h1>
                <div class="campos">
                    <p>CORREO:</p>
                    <input type="email" v-model="correo_usu" required>
                </div>
                <div class="boton">
                    <button class="btn" type="submit">RECUPERAR USUARIO</button>
                </div>
            </form>
                    <div class="recuperar">
                        <a @click="goLogin">Ir a Inicio de sesión</a>
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
    name: 'RecuperarUsuario',
    data(){
        return {
            correo_usu: ''
        }
    },
    methods:{
        goLogin(){
            this.$emit('goLogin');
    },
    recuperarUser(){
        axios.post(config.server + "/usuario/recuperarUsuario", {correo_usu: this.correo_usu})
        .then((result)=>{
            if(result.data.success){
                Swal.fire({
                            icon: "success",
                            title: "Se ha enviado el usuario al correo",
                            showConfirmButton: true,
                        });
                        this.goLogin();
            }else{
                Swal.fire({
                            icon: "error",
                            title: "El correo ingresado no existe",
                            showConfirmButton: true,
                        });
            }
        }) 
        .catch((err)=>{
            console.log(err);
            Swal.fire({
                            icon: "error",
                            title: "El correo ingresado no existe",
                            showConfirmButton: true,
                        });
        })
    }
    }
}
</script>