import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";


const registrarSaldo = async (clienteExiste, saldo , cliente, total_venta, abono )=> {
    console.log(clienteExiste);
    console.log(saldo);
    console.log(cliente);
    console.log(total);
    console.log(total_venta);
    console.log(abono);
    if(clienteExiste){
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
                this.$router.push({ path: '/RealizarVenta' });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se ha podido crear el saldo",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "No se ha podido crear el saldo",
                showConfirmButton: false,
                timer: 1200,
            });
        })
    }
}


export default {registrarSaldo}