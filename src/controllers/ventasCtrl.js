import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const cargarVentas = (thisV)=>{
    axios.get(config.server+"/venta")
        .then((result) => {
            if (result.data.success) {
                thisV.ventas = result.data.body
                thisV.ventas_pag = result.data.body;
            }
        }).catch((err) => {
            console.log(err)
        })
}

const buscarVentas = (thisV)=>{
    axios.post(config.server +"/venta/filtro", thisV.filtro)
        .then((result) => {
            if (result.data.success && result.data.body.length>0) {
                thisV.ventas = result.data.body
                thisV.ventas_pag = result.data.body;
                thisV.pagina = 1;
                thisV.limite = 0;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se encontraron resultados",
                    showConfirmButton: true,
                });
            };

        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "info",
                title: "No se encontraron resultados",
                showConfirmButton: true,
            });
        })
}

export default {
    cargarVentas,
    buscarVentas
}