import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const login = async (thisL)=>{
    axios.post(config.server+"/usuario/auth", thisL.user)
    .then(async (result) => {
        if (result.data.success) {
            let resp = await axios.get(config.server + "/usuario/comprobar/" + thisL.user.nick_usu)
            .then((result)=>{
                if(result.data.success){
                    return result.data.body[0].estado;
                }
            })
            let resp2 = await axios.get(config.server + "/usuario/codigo/" + thisL.user.nick_usu)
            .then((result)=>{
                if(result.data.success){
                    return result.data.body[0].cambiocontra;
                }
            })
            if(resp || resp2){
                if(resp){
                    Swal.fire({
                        icon: "info",
                        title: "La sesion ya se encuentra iniciada",
                        showConfirmButton: true,
                    });
                }else if(resp2){
                    Swal.fire({
                        icon: "info",
                        title: "Debe cambiar la contraseña",
                        showConfirmButton: true,
                    });
                }
            }else{
                localStorage.setItem("jwt", result.data.body.token);
                Swal.fire({
                    icon: "success",
                    title: "Sesion iniciada",
                    showConfirmButton: false,
                    timer: 1500,
                });
                let token = result.data.body.token;
                axios.post(config.server+"/usuario/iniciar", {nick_usu: thisL.user.nick_usu});
                axios.post(config.server+"/usuario/verifyToken", { token })
                    .then((result) => {
                        if(result.data.body.decoded.user.rol_usu == "Administrador"){
                            thisL.$router.push({ path: '/Menu' });
                        }else{
                            thisL.$router.push({ path: '/MenuOp' });
                        }
                    }).catch((err) => {
                        console.log("Error al verificar token: " + err)
                    });
            }
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
    
}

export default {
    login
}