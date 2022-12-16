import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const cargarSaldos = (thisS)=>{
    axios.get(config.server+"/saldo")
        .then((result) => {
            if (result.data.success) {
                thisS.saldos = result.data.body;
                thisS.saldos_pag = result.data.body;
            };
        }).catch((err) => {
            console.log(err)
        })
}

const buscarSaldos = (thisS)=>{
    if (thisS.filtro.cedula_cli == "" || thisS.filtro.estado_saldo ==""){
        axios.get(config.server+"/saldo")
        .then((result) => {
            if (result.data.success) {
                thisS.saldos = result.data.body;
                thisS.saldos_pag = result.data.body;
                thisS.pagina = 1;
                thisS.limite = 0;
            };
        }).catch((err) => {
            console.log(err)
        })
    }else {
        axios.post(config.server+"/saldo/filter", thisS.filtro)
    .then((result)=>{
        if(result.data.success && result.data.body.length>0){
            thisS.saldos = result.data.body;
            thisS.saldos_pag = result.data.body;
            thisS.pagina = 1;
            thisS.limite = 0;
        }else{
            Swal.fire({
                icon: "error",
                title: "No se encontraron resultados",
                showConfirmButton: false,
                timer: 1200,
            });
        }
    }).catch((err)=>{
        console.log(err);
            Swal.fire({
                icon: "error",
                title: "No se encontraron resultados",
                showConfirmButton: false,
                timer: 1200,
            });
    })
    }
}

const detalles = (thisS,saldo)=>{
    axios.get(config.server + "/saldo/abono/" + saldo.id_saldo)
    .then((result)=>{
        if(result.data.success){
            saldo.abonos = result.data.body;
            thisS.detalle = saldo;
            thisS.showModal = true;
        }else{
            console.log(result)
        }
    }).catch((err)=>{
        console.log(err);
    })
}

export default {
    cargarSaldos,
    buscarSaldos,
    detalles
}