<template>
    <div class="opciones">
            <div class="ctn_opciones">
                <h1>REGISTRAR PROVEEDORES</h1>
                <img src="../assets/mensajero.png" alt="">
                <button class="boton-opciones" >REGISTRAR</button>
            </div>
            <div class="ctn_opciones">
                <h1>REGISTRAR CLIENTE</h1>
                <img src="../assets/cliente.png" alt="">
                <button class="boton-opciones" >REGISTRAR</button>
            </div>
            <div class="ctn_opciones">
                <h1>REGISTRAR PRODUCTO</h1>
                <img src="../assets/carrito-de-supermercado.png" alt="">
                <button class="boton-opciones" >REGISTRAR</button>
            </div>

            <div class="ctn_opciones">
                <h1>REGISTRAR ENTRADA</h1>
                <img src="../assets/carrito-de-supermercado.png" alt="">
                <button class="boton-opciones" >VER</button>
            </div>

            <div class="ctn_opciones">
                <h1>VER INVENTARIO</h1>
                <img src="../assets/inventario.png" alt="">
                <button class="boton-opciones" >AJUSTAR</button>
            </div>

            <div class="ctn_opciones">
                <h1>REGISTRAR VENTA</h1>
                <img src="../assets/compras.png" alt="">
                <button class="boton-opciones" >CREAR</button>
            </div>

            <div class="ctn_opciones">
                <h1>HISTORIAL DE VENTAS</h1>
                <img src="../assets/compras.png" alt="">
                <button class="boton-opciones" >CREAR</button>
            </div>

            <div class="ctn_opciones">
                <h1>HISTORIAL DE SALDOS</h1>
                <img src="../assets/moneda.png" alt="">
                <button class="boton-opciones" >CREAR</button>
            </div>

        </div>
</template>

<script>
    export default {
    name: 'Opciones',
   
    }


</script>

<style>
.opciones{
        margin-top: 100px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 30px;
        align-content: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
        text-align: center;
    }

    .opciones h1 {
        font-size: 40px;
        font-weight: 400;
    }

    .ctn_opciones{
        color: white;
        width: 320px;
        height: 380px;
        background-color: #92DAD4;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: 36px;
    }

    .ctn_opciones img {
        margin: 30px;
    }

    .ctn_opciones h1 {
        margin-top: 20px;
    }

    .boton-opciones{
        height: 55px;
        width: 250px;
        border-radius: 25px;
        background-color: #F58649;
        border: none;
        font-size: 25px;
        color: white;
        font-weight: 400;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-top: 20px;
    }

</style>