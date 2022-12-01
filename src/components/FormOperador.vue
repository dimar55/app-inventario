<template>
    <div class="container-registro">
        <form class="ctn-registrar"  v-on:submit.prevent="registrarOperador">
            <h1>REGISTRAR OPERADOR</h1>
            <div class="campos_registrar">
                <img src="../assets/operador.png" alt="">
                <p>Nombre</p>
                <input type="text" v-model="user.nombre_usu">
            </div>
            <div class="campos_registrar">
                <p>Cedula:</p>
                <input type="number" v-model="user.cedula_usu">
            </div>
            <div class="campos_registrar">
                <p>Nick:</p>
                <input type="text" v-model="user.nick_usu">
            </div>
            <div class="campos_registrar">
                <p>Contraseña:</p>
                <input type="password" v-model="user.contra_usu">
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
export default{
    name: 'FormOperador',
    data(){
        return {
            user: {
               cedula_usu: "",
               nombre_usu: "",
               contra_usu: "",
               rol_usu: "Operador"
            }
        }
    },
    methods:{
        registrarOperador(){
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
                            icon: "error",
                            title: "No se ha podido crear el operador",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                      
                        icon: "error",
                        title: "No se ha podido crear el operador",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
        }
    }
}
</script>
