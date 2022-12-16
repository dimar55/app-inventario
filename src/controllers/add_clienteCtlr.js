import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const buscarCliente = (thisC)=>{
    return axios
        .get(config.server + "/cliente/cedula/" + thisC.Cliente.cedula_cli)
        .then((result) => {
        return (result.data.success && result.data.body.length > 0);
        });
}

const registrarCliente = async (thisC)=>{
    if(await thisC.buscarCliente()){
        Swal.fire({
            icon: "info",
            title: "Cliente ya registrado",
            showConfirmButton: true
          });
    }else{
    axios.post(config.server+"/cliente", thisC.Cliente)
    .then((result) => {
            if (result.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Cliente creado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });
                thisC.$router.push({ path: '/Menu' });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se ha podido crear el cliente",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                title: "El Cliente ya esta registrado",
                showConfirmButton: true,
            });
        })
    }
}

export default {
    buscarCliente,
    registrarCliente
}