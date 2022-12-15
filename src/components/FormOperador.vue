<template>
    <div class="container-registro">
        <form class="ctn-registrar"  v-on:submit.prevent="registrarOperador">
            <h1>REGISTRAR OPERADOR</h1>
            <div class="campos_registrar">
                <img src="../assets/operador.png" alt="">
                <p>Nombre *</p>
                <input type="text" v-model="user.nombre_usu" required>
            </div>
            <div class="campos_registrar">
                <p>Cedula *</p>
                <input type="number" v-model="user.cedula_usu" required min="100000" max="9999999999">
            </div>
            <div class="campos_registrar">
                <p>Correo *</p>
                <input type="email" v-model="user.correo_usu" required>
            </div>
            <div class="campos_registrar">
                <p>Nick *</p>
                <input type="text" v-model="user.nick_usu" required minlength= "5">
            </div>
            <div class="campos_registrar">
                <p>Contraseña *</p>
                <input type="password" v-model="user.contra_usu" required>
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
import user from '../models/model_operador';
export default{
    name: 'FormOperador',
    data(){
        return {
            user,
        }
    },
    methods:{
        buscarOperador(){
            return axios
                .post(config.server + "/usuario/verificar" , {cedula_usu: this.user.cedula_usu, nick_usu: this.user.nick_usu, correo_usu: this.user.correo_usu })
                .then((result) => {
                    if(result.data.success){
                        return result.data.body
                    }
                });
        },

         async registrarOperador(){
            let result = await this.buscarOperador();
            console.log(result);
            if(result.cedula  || result.nick || result.correo){
                if(result.cedula){
                Swal.fire({
                            icon: "info",
                            title: "Cedula ya registrada",
                            showConfirmButton: true,
                        });
                }
                if(result.nick){
                    Swal.fire({
                                icon: "info",
                                title: "Nick ya registrado",
                                showConfirmButton: true,
                            });
                }
                if(result.correo){
                    Swal.fire({
                                icon: "info",
                                title: "Correo ya registrado",
                                showConfirmButton: true,
                            });
                }
            }else{
                axios.post(config.server+"/usuario", this.user)
            .then((result) => {
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Operador creado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        this.$router.push({ path: '/Menu' });
                    } else {
                        Swal.fire({
                            icon: "info",
                            title: "No se ha podido crear el operador",
                            showConfirmButton: true,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: "info",
                        title: "No se ha podido crear el operador",
                        showConfirmButton: true,

                    });
                })
            }   
        }
    }
}
</script>
