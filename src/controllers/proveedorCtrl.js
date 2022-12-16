import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const cargarProveedores = (thisP)=>{
    axios.get(config.server+"/proveedor")
        .then((result) => {
            if (result.data.success) {
                thisP.proveedores = result.data.body;
                thisP.proveedores_pag =result.data.body;
                thisP.pagina = 1;
                thisP.limite = 0;
            }
        }).catch((err) => {
            console.log(err)
        })
}

const buscarProveedor = (thisP)=>{
    if(thisP.cedula_pro ==""){
        thisP.cargarProveedores();
    }else{
        axios.get(config.server + "/proveedor/cedula/" + thisP.cedula_pro)
    .then((result) => {
            if (result.data.success && result.data.body.length> 0 ) {
                thisP.proveedores = result.data.body;
                thisP.proveedores_pag = result.data.body;
                thisP.pagina = 1;
                thisP.limite = 0;
                thisP.cedula_pro = "";
            }else{
                Swal.fire({
                icon: "info",
                title: "No se encontro un proveedor",
                showConfirmButton: true,
            });  
            }
            
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "info",
                title: "No se encontraron resultados",
                showConfirmButton: true,
            }); 
        })

    }
}

export default {
    cargarProveedores,
    buscarProveedor
}