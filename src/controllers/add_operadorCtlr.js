import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const buscarOperador = (thisO)=>{
    return axios
        .post(config.server + "/usuario/verificar" , {cedula_usu: thisO.user.cedula_usu, nick_usu: thisO.user.nick_usu, correo_usu: thisO.user.correo_usu })
        .then((result) => {
            if(result.data.success){
                return result.data.body
            }
        });
}

const registrarOperador = async (thisO)=>{
    let result = await thisO.buscarOperador();
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
        axios.post(config.server+"/usuario", thisO.user)
    .then((result) => {
            if (result.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Operador creado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });
                thisO.$router.push({ path: '/Menu' });
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

export default {
    buscarOperador,
    registrarOperador
}