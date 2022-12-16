import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const buscarProducto = (thisP)=>{
    return axios
        .get(config.server + "/producto/id/" + thisP.Producto.id_product)
        .then((result) => {
        return (result.data.success && result.data.body.length > 0);
        });
}

const registrarProducto = async (thisP)=>{
    if( await thisP.buscarProducto()){
        Swal.fire({
            icon: "info",
            title: "producto ya registrado",
            showConfirmButton: true
          });
    }else{
        axios.post(config.server+"/producto", thisP.Producto)
    .then((result) => {
            if (result.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Producto creado exitosamente",
                    showConfirmButton: true,
                });
                thisP.Producto.nombre_product ="";
                thisP.Producto.categoria_product ="";
                thisP.Producto.marca_product ="";
                thisP.Producto.unidad_product ="";
                thisP.Producto.cantidad_product ="";
                thisP.Producto.precio_entrada ="";
                thisP.Producto.precio_venta ="";
                if(sessionStorage.getItem("Rol") == "Operador"){
                    thisP.$router.push({ path: '/MenuOp' });
                }else{
                    thisP.$router.push({ path: '/Menu' });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se ha podido crear el producto",
                    showConfirmButton: true,
                });
            }
        }).catch((err) => {
            //console.log(err);
            Swal.fire({
                icon: "error",
                title: "No se ha podido crear el producto",
                showConfirmButton: true,
            });
        })
    }
}

export default {
    buscarProducto,
    registrarProducto
}