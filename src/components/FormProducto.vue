<template>
        <div class="container-registro">
        <div class="ctn-registrar">
            <h1>REGISTRAR PRODUCTO</h1>
            <div class="campos_registrar">
                <img src="../assets/carrito-de-supermercado.png" alt="">
                <p>Codigo</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Categoria</p>
                <select name="" id="">
                    <option>ASEO</option>
                    <option>ENLATADOS</option>
                    <option>CANASTA BASICA</option>
                </select>
            </div>
            <div class="campos_registrar">
                <p>Nombre:</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Marca:</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Unidad:</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Cantidad:</p>
                <input type="number">
            </div>  
            <div class="boton">
                <button class="btn">REGISTRAR</button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'FormProducto',
}
</script>