<template>
    <div class="container">
        <div class="contenedor">
            <div class="imagen-logo">
                <img src="../assets/Yalmecris.png" alt="">
            </div>
            <div class="ctn-campos">
            <form  v-on:submit.prevent="login">
                <h1>INICIAR SESIÓN</h1>
                <div class="campos">
                    <p>USUARIO:</p>
                    <input type="text" v-model="user.nick_usu" required>
                </div>
                <div class="campos">
                    <p>CONTRASEÑA:</p>
                    <input type="password" v-model="user.contra_usu" required>
                </div>
                <div class="boton">
                    <button class="btn" type="submit">INICIAR SESIÓN</button>
                </div>
            </form>
                    <div class="recuperar">
                        <a @click="go_recuperarUser()">Recuperar usuario</a>
                        <a  @click="go_recuperarClave()">Recuperar contraseña</a>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
import user from "../models/model_usuario";
export default{
    name: 'FormLogin',
    data(){
        return{
            user,
        }
    },
    methods: {
        login(){
            axios.post(config.server+"/usuario/auth", this.user)
                .then((result) => {
                    if (result.data.success) {
                        sessionStorage.setItem("jwt", result.data.body.token);
                        Swal.fire({
                            icon: "success",
                            title: "Sesion iniciada",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        let token = result.data.body.token;
                        axios.post(config.server+"/usuario/verifyToken", { token })
                            .then((result) => {
                                if(result.data.body.decoded.user.rol_usu == "Administrador"){
                                    this.$router.push({ path: '/Menu' });
                                }else{
                                    this.$router.push({ path: '/MenuOp' });
                                }
                            }).catch((err) => {
                                console.log("Error al verificar token: " + err)
                            });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Credenciales invalidas",
                            showConfirmButton: true,

                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Credenciales invalidas",
                        showConfirmButton: true,

                    });
                });
        },
        go_recuperarUser(){
            this.$emit('recuperar-usuario');
    },
    go_recuperarClave(){
            this.$emit('recuperar-clave');
    }
    },
    
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    
}

.container{
    display: flex;
    justify-content: center;
    height: 100vh;
}

.contenedor{
    display: flex;
    margin: auto;
}

.imagen-logo img{
    border-radius: 25px 0px 0px 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.ctn-campos{
    width: 500px;
    height: 500px;  
    background: #92DAD4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 25px 25px 0px;
}

.ctn-campos h1{
    padding: 10px;
    font-weight: 400;
    font-size: 48px;
    color: #194F5D;
    text-align: center;
}

.ctn-campos p{
    font-size: 48px;
    font-weight: 400;
    color: #FFFF;
    padding-left: 30px;
    padding-bottom: 10px;
    padding-top: 10px;
}

.ctn-campos input{
    width: 394px;
    height: 60px;
    font-size: 48px;
    font-weight: 400;
    padding-left: 20px;
    background: #FFFFFF;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-left: 30px;
}
.boton{
    padding-top: 15px;
    text-align: center;
}

.btn{
    font-size: 35px;
    font-weight: 400;
    width: 245px;
    height: 50px;
    color: #FFFF;
    background: #F58649;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
}

.recuperar a {
    display: block;
    font-size: 30px;
    color: #194F5D;
    font-weight: 400;
    padding-top: 5px;
    padding-left: 30px;
    cursor: pointer;
}


</style>