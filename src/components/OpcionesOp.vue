<template>
    <div class="opciones">
            <div class="ctn_opciones">
                <h1>REGISTRAR PROVEEDORES</h1>
                <img src="../assets/mensajero.png" alt="">
                <button class="boton-opciones" @click="go_RegistrarProveedores" >REGISTRAR</button>
            </div>
            <div class="ctn_opciones">
                <h1>REGISTRAR CLIENTE</h1>
                <img src="../assets/cliente.png" alt="">
                <button class="boton-opciones" @click="go_RegistrarCliente" >REGISTRAR</button>
            </div>
            <div class="ctn_opciones">
                <h1>REGISTRAR PRODUCTO</h1>
                <img src="../assets/carrito-de-supermercado.png" alt="">
                <button class="boton-opciones" @click="go_RegistrarProducto">REGISTRAR</button>
            </div>

            <div class="ctn_opciones">
                <h1>REGISTRAR FACTURA INGRESO</h1>
                <img src="../assets/entrada.png" alt="">
                <button class="boton-opciones" @click="go_RegistrarEntrada">REGISTRAR</button>
            </div>

            <div class="ctn_opciones">
                <h1>VER INVENTARIO</h1>
                <img src="../assets/inventario.png" alt="">
                <button class="boton-opciones" @click="go_Inventario">VER</button>
            </div>
            <div class="ctn_opciones">
                <h1>VER CLIENTES</h1>
                <img src="../assets/clientes.png" alt="">
                <button class="boton-opciones" @click="go_Clientes">VER</button>
            </div>
            <div class="ctn_opciones">
                <h1>VER PROVEEDORES</h1>
                <img src="../assets/buscar.png" alt="">
                <button class="boton-opciones" @click="go_Proveedores">VER</button>
            </div> 
            <div class="ctn_opciones">
                <h1>REGISTRAR VENTA</h1>
                <img src="../assets/venta.png" alt="">
                <button class="boton-opciones" @click="go_RegistrarVenta">REGISTRAR</button>
            </div>

            <div class="ctn_opciones">
                <h1>HISTORIAL DE VENTAS</h1>
                <img src="../assets/compras.png" alt="">
                <button class="boton-opciones" @click="go_Ventas">VER</button>
            </div>

            <div class="ctn_opciones">
                <h1>HISTORIAL DE SALDOS</h1>
                <img src="../assets/moneda.png" alt="">
                <button class="boton-opciones" @click="go_Saldos">VER</button>
            </div>

        </div>
</template>

<script>
    export default {
    name: 'OpcionesOp',
    methods:{
        go_RegistrarProveedores(){
            this.$router.push({ path: '/RegistrarProveedor' });
        },
        go_RegistrarCliente(){
            this.$router.push({ path: '/RegistrarCliente' });
        },
        go_RegistrarOperador(){
            this.$router.push({ path: '/RegistrarOperador' });
        },
        go_RegistrarProducto(){
            this.$router.push({ path: '/RegistrarProducto' });
        },
        go_RegistrarEntrada(){
            this.$router.push({ path: '/RegistrarIngreso' });
        },
        go_RegistrarVenta(){
            this.$router.push({ path: '/RealizarVenta' });
        },
        go_Inventario(){
            this.$router.push({ path: '/Inventario' });
        },
        go_Proveedores(){
            this.$router.push({ path: '/RegistrarIngreso' });
        },
        go_Clientes(){
            this.$router.push({ path: '/RegistrarIngreso' });
        },
        go_Ventas(){
            this.$router.push({ path: '/Ventas' });
        },
        go_Saldos(){
            this.$router.push({ path: '/Saldos' });
        },
    }
   
    }


</script>