import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const login = (thisL)=>{
    axios.post(config.server+"/usuario/auth", thisL.user)
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
                            thisL.$router.push({ path: '/Menu' });
                        }else{
                            thisL.$router.push({ path: '/MenuOp' });
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
}

export default {
    login
}