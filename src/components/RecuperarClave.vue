<template>
    <div class="container">
        <div class="contenedor">
            <div class="imagen-logo">
                <img src="../assets/Yalmecris.png" alt="">
            </div>
            <div class="ctn-campos">
            <form  v-on:submit.prevent="recuperarClave" v-if="mostrarCorreo">
                <h1>RECUPERAR CONTRASEÑA</h1>
                <div class="campos" >
                    <p>CORREO:</p>
                    <input type="email" v-model="correo_usu" required>
                </div>
                <div class="boton">
                    <button class="btn" type="submit">OBTENER CODIGO</button>
                </div>
            </form>

            <form v-if="mostrarCodigo" v-on:submit.prevent="verifCodigo">
                <h1>VALIDAR CODIGO</h1>    
            <div class="campos" >
                    <p>CODIGO:</p>
                    <input type="text"  v-model="codigo" required>
                </div>
                <div class="boton">
                    <button class="btn" type="submit">VALIDAR</button>
                </div>
            </form>

            <form v-if="mostrarContra" v-on:submit.prevent="actualizarContra">
                <h1>CAMBIAR CONTRASEÑA</h1>
                <div class="campos">
                    <p>NUEVA CONTRASEÑA:</p>
                    <input type="password" v-model="contra_usu" required>
                </div>
                <div class="campos" >
                    <p>CONFIRMAR CONTRASEÑA:</p>
                    <input type="password"  v-model="contraVer" required>
                </div>
                <div class="boton">
                    <button class="btn" type="submit" >GUARDAR</button>
                </div>
            </form>
            
           
                    <div class="recuperar" v-if="!mostrarContra">
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
    name: 'RecuperarClave',
    data() {
        return{
            mostrarCorreo: true,
            mostrarCodigo: false,
            mostrarContra: false,
            correo_usu: "",
            codigo: "",
            code: "",
            contra_usu: "",
            contraVer: "",
        }
    },
    methods:{
        goLogin(){
            this.$emit('goLogin');
    },
    recuperarClave(){
        axios.post(config.server + "/usuario/recuperarContra", {correo_usu: this.correo_usu})
        .then((result)=>{
            if(result.data.success){
                Swal.fire({
                            icon: "success",
                            title: "Se ha enviado el codigo al correo",
                            showConfirmButton: true,
                        });

                        this.mostrarCorreo= false;
                        this.mostrarCodigo= true;
                        this.code = result.data.body.code;
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
    },
    verifCodigo(){
        if(this.codigo == this.code){
            Swal.fire({
                icon: "success",
                title: "Codigo correcto",
                showConfirmButton: false,
                timer: 1200
            });
            this.mostrarCodigo= false;
            this.mostrarContra= true;
        }else{
            Swal.fire({
                icon: "error",
                title: "Codigo incorrecto",
                showConfirmButton: true,

            });
        }
    },
    actualizarContra(){
        if(this.contra_usu == this.contraVer){
            axios.put( config.server+ "/usuario", { correo_usu: this.correo_usu, contra_usu: this.contra_usu })
            .then((result)=>{
                if(result.data.success){
                    Swal.fire({
                        icon: "success",
                        title: "Contraseña actualizada correctamente",
                        showConfirmButton: true,
                    });
                    this.goLogin();
                }else{
                    Swal.fire({
                        icon: "info",
                        title: "No se ha actualizado la contraseña",
                        showConfirmButton: true,
                    });
                }
                
            })
            .catch((err)=>{
                Swal.fire({
                        icon: "info",
                        title: "No se ha actualizado la contraseña",
                        showConfirmButton: true,
                    });
                })
        }else{
            Swal.fire({
                icon: "info",
                title: "No coinciden las contraseñas",
                showConfirmButton: true,
            });
        }
    }
        
    }
}
</script>