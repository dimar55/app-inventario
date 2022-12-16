import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';

const cargarcliente = async (cedula) =>{
     return await axios.get(config.server+"/cliente/cedula/"+cedula)
    .then((result)=>{
        if(result.data.success && result.data.body.length > 0){
            return result.data.body[0];
        }else{
            return 0;
        }
    }).catch((err)=>{
        console.log(err);
    })
} 

const update_abono = async (abono, id)=>{
    const updateAbono = {
        saldo: Number(abono),
        id_saldo: id
    }
    return axios.post(config.server+"/saldo/abono", updateAbono) 
    .then((result)=>{
        if(result.data.success){
            Swal.fire({
                    icon: "success",
                    title: "Abono realizado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });
                return true;
        }else{
            console.log(result);
            Swal.fire({
                    icon: "error",
                    title: "No se ha realizado el abono",
                    showConfirmButton: false,
                    timer: 1200,
                });
                return false;
        }
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

const formatoMoneda = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: 'COP'
    }) 
    return formatter.format(valor)
}  


export default {
    cargarcliente,
    update_abono,
    formatoMoneda
}