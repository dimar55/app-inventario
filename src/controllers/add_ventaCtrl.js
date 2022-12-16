import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const obtenerIdVenta = (thisV)=>{
    axios.get(config.server+"/venta/last")
    .then((result)=>{
        if(result.data.success){
            thisV.id_venta = result.data.body[0].id_venta + 1;
        }
    }).catch((err)=>{
        console.log(err)
    })
}

const buscarProducto = (thisV)=>{
    axios.get(config.server+"/producto/id/"+thisV.id_producto)
    .then((result)=>{
        if(result.data.success && result.data.body.length>0){
            if(result.data.body[0].cantidad_disp>0){
                const pd = thisV.prods_venta.find(ele => ele.id_product == result.data.body[0].id_product);
                if(pd){
                    if(pd.cant_venta<pd.cantidad_disp){
                        pd.cant_venta++;
                    }
                }else{
                    let prod = Object.assign({cant_venta: 1}, result.data.body[0]);
                    thisV.prods_venta.push(prod);
                }
                thisV.calcularTotal();
                thisV.id_producto = "";
            }else{
                Swal.fire({
                    icon: "info",
                    title: "El producto esta agotado",
                    showConfirmButton: true,
                });
                thisV.id_producto = "";
            }
            
        }else{
            Swal.fire({
                icon: "info",
                title: "Producto no encontrado",
                showConfirmButton: true,
            });
        }
    }).catch((err)=>{
        console.log(err);
        Swal.fire({
            icon: "info",
            title: "Producto no encontrado",
            showConfirmButton: true,
        });
    })
}

const registrarVenta = (thisV, saldo)=>{
    if(thisV.prods_venta.length>0 && thisV.cliente.cedula_cli != ''){
        let productos = [];
        for (let index = 0; index < thisV.prods_venta.length; index++) {
            const element = thisV.prods_venta[index];
            productos.push([element.id_product, element.cant_venta, element.precio_venta]);
        }
        let ced = thisV.cliente.cedula_cli;
        let form = {
            productos,
            cedula_cli: ced
        }
        console.log(form);
        axios.post(config.server+"/venta", form)
        .then((result)=>{
            if (result.data.success) {
                if(saldo){
                    thisV.$router.push({ path: '/RegistrarSaldo', query: {id_venta: result.data.body.id_venta, total_venta: result.data.body.total_venta, cedula_cli: thisV.cliente.cedula_cli}});
                }else{
                    Swal.fire({
                    icon: "success",
                    title: "Venta realizada exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });
                }
                thisV.prods_venta = [];
                thisV.filtrado = false;
                thisV.id_producto = ""; 
                thisV.cedula_cli = "";
                thisV.cliente = {
                    cedula_cli: '',
                    nombre_cli: ''
                }
                thisV.calcularTotal();
                thisV.obtenerIdVenta();
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
        
    }else{
        if(thisV.cliente.cedula_cli==''){
            Swal.fire({
                icon: "info",
                title: "No se ha agregado un cliente",
                showConfirmButton: true,
            });
        }
        if(!(thisV.prods_venta.length>0)){
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

const buscarCliente = (thisV)=>{
    axios.get(config.server+"/cliente/cedula/"+thisV.cedula_cli)
    .then((result)=>{
        if(result.data.success && result.data.body.length > 0){
            thisV.cliente = result.data.body[0];
            thisV.clienteExiste = false;
        }else{
            thisV.cliente = {
                cedula_cli: '',
                nombre_cli: ''
            }
            thisV.clienteExiste = true;
        }
    }).catch((err)=>{
        console.log(err);
        thisV.cliente = {
                cedula_cli: '',
                nombre_cli: ''
            }
        thisV.clienteExiste = true;
    })
}

const registrarCliente = (thisV)=>{
    axios.post(config.server+"/cliente", thisV.ClienteForm)
    .then((result) => {
            if (result.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Cliente creado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });
                thisV.showModal = false;
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
                title: "No se ha podido crear el cliente",
                showConfirmButton: false,
                timer: 1200,
            });
        })
}

export default {
    obtenerIdVenta,
    buscarProducto,
    registrarVenta,
    formatoMoneda,
    buscarCliente,
    registrarCliente
}