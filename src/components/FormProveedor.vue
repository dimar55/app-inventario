<template>
     <div class="container-registro">
        <div class="ctn-registrar">
            <h1>REGISTRAR PROVEEDOR</h1>
            <div class="campos_registrar">
                <img src="../assets/mensajero.png" alt="">
                <p>Nombre</p>
                <input type="text">
            </div>
            <div class="campos_registrar">
                <p>Tipo de Documento</p>
                <select name="" id="">
                    <option>CC Cedula de Ciudadania</option>
                    <option>TT Tarjeta de Identidad</option>
                    <option>CE Cedula de Extranjeria</option>
                </select>
            </div>
            <div class="campos_registrar">
                <p>Numero de Documento:</p>
                <input type="number">
            </div>
            <div class="campos_registrar">
                <p>Telefono:</p>
                <input type="number">
            </div>
            <div class="campos_registrar">
                <p>Correo:</p>
                <input type="email">
            </div>
            <div class="campos_registrar">
                <p>Empresa:</p>
                <input type="text">
            </div>  
            <div class="boton">
                <button class="btn">REGISTRAR</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'FormProveedores'
    }
</script>