import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const buscarProducto = (id_product)=>{
    return axios
      .get(config.server + "/producto/id/" + id_product)
      .then((result) => {
        if (result.data.success && result.data.body.length > 0) {
            return {
                success: true,
                prod_no_existe: false,
                add_prod: true,
                prod: result.data.body[0]
            }
        } else {
            return {
                success: false,
                prod_no_existe: true,
                add_prod: false,
            }
        }
      });
  }

const buscarProveedor = (id_prov)=>{
    return axios
      .get(config.server + "/proveedor/cedula/" + id_prov)
      .then((result) => {
        if (result.data.success && result.data.body.length > 0) {
            return {
                success: true,
                proveedor: result.data.body[0],
                prov_no_existe: false
            }
        } else {
          return {prov_no_existe: true}
        }
      });
}

const buscarFactura = (id_fact)=>{
    return axios
      .get(config.server + "/factura/id/" + id_fact)
      .then((result) => {
        return (result.data.success && result.data.body.length > 0);
      });
  }

const registrarFactura = async (thisF)=>{
    if(thisF.prods_compra.length>0 && thisF.factura.id_fact!='' && thisF.factura.empresa!='' && thisF.factura.cedula_pro!=''){
            if(await thisF.buscarFactura()){
              Swal.fire({
                icon: "info",
                title: "Id de factura ya registrada",
                showConfirmButton: true
              });
            }else{
              let productos = [];
            for (let index = 0; index < thisF.prods_compra.length; index++) {
                const element = thisF.prods_compra[index];
                productos.push([element.id_product, element.precio_entrada, element.precio_venta, element.cantidad]);
            }
            thisF.factura.productos = productos;
            axios.post(config.server+"/factura", thisF.factura)
            .then((result)=>{
                if (result.data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Factura registrada exitosamente",
                        showConfirmButton: true,
                    });
                    thisF.prods_compra = [];
                    thisF.id_producto = ""; 
                    thisF.factura = {
                        id_fact: "",
                        empresa: "",
                        cedula_pro: "", 
                        cedula_usu: Number(sessionStorage.getItem("Cedula")),
                    };
                    thisF.proveedor = {
                      cedula_pro: "",
                      nombre_pro: "",
                      telefono_pro: ""
                    }
                    thisF.id_prov = "";
                    thisF.calcularTotal();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido realizar la venta",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                }
            }).catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "No se ha podido realizar la venta",
                    showConfirmButton: false,
                    timer: 1200,
                });
            })
            
            }
        }else{
           if(thisF.factura.id_fact==''){
                Swal.fire({
                    icon: "info",
                    title: "No ha agregado un id de factura",
                    showConfirmButton: true,
                });
            }
            if(thisF.factura.empresa==''){
                Swal.fire({
                    icon: "info",
                    title: "No ha agregado un nombre de empresa",
                    showConfirmButton: true,
                });
            }
            if(thisF.factura.cedula_pro==''){
                Swal.fire({
                    icon: "info",
                    title: "No ha agregado un proveedor",
                    showConfirmButton: true,
                });
            }
            if(!(thisF.prods_compra.length>0)){
                Swal.fire({
                    icon: "info",
                    title: "No se han agregado productos",
                    showConfirmButton: true,
                });
            }
        }
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
    buscarProducto,
    buscarProveedor,
    buscarFactura,
    registrarFactura,
    formatoMoneda
}