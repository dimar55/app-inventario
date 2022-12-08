const  ingreso= {
    precio_entrada: "", 
    precio_venta: "",
    cantidad_lote: "", 
    fecha_vencimiento: null,
    cedula_pro: "", 
    cedula_usu: Number(sessionStorage.getItem("Cedula"))
}

export default ingreso;