import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const cargarProductos = (thisI)=>{
    axios.get(config.server+"/producto")
        .then((result) => {
            if (result.data.success) {
                thisI.productos = result.data.body;
                thisI.prods_pag = result.data.body;
            };
        }).catch((err) => {
            console.log(err)
        })
}

const buscarProductos = (thisI)=>{
    let url = "";
    if (thisI.filtro == "") url = config.server+"/producto";
    else if (thisI.filtro == "NOMBRE") url =config.server+"/producto/nombre/"+thisI.valor
    else if (thisI.filtro == "CODIGO") url = config.server+"/producto/id/"+thisI.valor
    else if (thisI.filtro == "CANTIDAD") url = config.server+"/producto/cantidad/"+thisI.valor
    axios.get(url)
        .then((result) => {
            if (result.data.success && result.data.body.length>0) {
                thisI.productos = result.data.body;
                thisI.prods_pag = result.data.body;
                thisI.pagina = 1;
                thisI.limite = 0;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se encontraron resultados",
                    showConfirmButton: false,
                    timer: 1200,
                });
            };

        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "No se encontraron resultados",
                showConfirmButton: false,
                timer: 1200,
            });
        })
}

export default {
    cargarProductos,
    buscarProductos
}