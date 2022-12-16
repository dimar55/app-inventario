import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";


const registrarSaldo = async (saldo, cliente, total_venta, abono )=> {
    saldo.cedula_cli = cliente.cedula_cli;
    saldo.saldo = total_venta - (abono=="" ? 0 : abono)
    if(saldo.saldo == 0){
        saldo.estado_saldo = "Pagado";
    }
    return await axios.post(config.server+"/saldo", saldo)
    .then((result)=>{
        if (result.data.success) {
            Swal.fire({
                icon: "success",
                title: "Saldo creado exitosamente",
                showConfirmButton: false,
                timer: 1000,
            });
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "No se ha podido crear el saldo",
                showConfirmButton: false,
                timer: 1200,
            });
            return false;
        }
    }).catch((err) => {
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "No se ha podido crear el saldo",
            showConfirmButton: false,
            timer: 1200,
        });
        return false;
    })
}

const buscarCliente = (cedula_cli)=>{
    return axios.get(config.server+"/cliente/cedula/"+cedula_cli)
    .then((result)=>{
        if(result.data.success && result.data.body.length > 0){
            return result.data.body[0];
        }
    }).catch((err)=>{
        console.log(err);
    })
}


export default {
    registrarSaldo,
    buscarCliente
}