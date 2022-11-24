<template>
    <div class="container-registro">
        <div class="ctn-registrar">
            <h1>REGISTRAR INGRESO</h1>
            <div class="campos_registrar">
                <img src="../assets/carrito-de-supermercado.png" alt="">
                <p>Codigo:</p>
                <input type="text">
                
            </div>
            <div class="ctn-pro">
                <p>producto registrado o no registrado</p>
                <button class="btn">REGISTRAR</button>

            </div>
            <div class="campos_registrar">
                <p>Precio Entrada:</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Precio de Venta:</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Cantidad:</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Fecha de Vencimiento:</p>
                <input type="date">
            </div>
            <h1>ASOCIAR PROVEEDOR</h1>
            <div class="buscar-proveedor">
                    <p>Codigo</p>
                    <input type="text">
                        <button class="btn">BUSCAR</button>
            </div>
            <div class="boton">
                <button class="btn">REGISTRAR</button>
            </div>
        </div>
    </div>
</template>


<script>
export default{
    name: 'FormIngreso'
}
</script>


<style>
.buscar-proveedor{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.ctn-pro{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

</style>