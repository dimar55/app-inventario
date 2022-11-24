<template>
    <div class="container">
        <div class="contenedor">
            <div class="imagen-logo">
                <img src="../assets/Yalmecris.png" alt="">
            </div>
            <form class="ctn-campos" v-on:submit.prevent="login">
                <h1>INICIAR SESIÓN</h1>
                <div class="campos">
                    <p>USUARIO:</p>
                    <input type="text" v-model="user.Usuario_usu">
                </div>
                <div class="campos">
                    <p>CONTRASEÑA:</p>
                    <input type="password" v-model="user.Contraseña_usu">
                </div>
                <div class="boton">
                    <button class="btn" type="submit">INICIAR SESIÓN</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default{
    name: 'FormLogin',
    data(){
        return{
            user: {
                Usuario_usu: "",
                Contraseña_usu: "",
            }
        }
    }
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
    padding: 20px;
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
    padding-top: 20px;
    text-align: center;
}

.btn{
    font-size: 40px;
    font-weight: 400;
    width: 245px;
    height: 60px;
    color: #FFFF;
    background: #F58649;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
}


</style>