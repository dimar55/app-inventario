import axios from "axios";
import config from '../utils/utils';
import Proveedor from '../models/model_proveedor';
import Swal from "sweetalert2";

const buscarProveedor = (thisP)=>{
    return axios
        .get(config.server + "/proveedor/cedula/" + thisP.Proveedor.cedula_pro)
        .then((result) => {
        return (result.data.success && result.data.body.length > 0);
        });
}

const registrarProveedor = async (thisP)=>{
    if(await thisP.buscarProveedor()){
        Swal.fire({
            icon: "info",
            title: "Proveedor ya registrado",
            showConfirmButton: true
          });
    }else{
        axios.post(config.server+"/proveedor", thisP.Proveedor)
    .then((result) => {
            if (result.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Proveedor creado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });
                if(localStorage.getItem("Rol") == "Operador"){
                    thisP.$router.push({ path: '/MenuOp' });
                }else{
                    thisP.$router.push({ path: '/Menu' });
                }
                thisP.Proveedor = Object.assign({}, Proveedor);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se ha podido crear el proveedor",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "No se ha podido crear el proveedor",
                showConfirmButton: false,
                timer: 1200,
            });
        })
    }
    
}

export default {
    buscarProveedor,
    registrarProveedor
}