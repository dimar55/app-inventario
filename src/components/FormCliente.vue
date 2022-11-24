<template>
    <div class="container-registro">
        <div class="ctn-registrar">
            <h1>REGISTRAR CLIENTE</h1>
            <div class="campos_registrar">
                <img src="../assets/cliente.png" alt="">
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
                <p>Dirección:</p>
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
    name: 'FormCliente'
}
</script>


<style>
.container-registro{
    color: #ffffff;
    font-weight: 400;
    text-align: center;
    display: flex;
    padding-bottom: 30px;
}

.campos_registrar{
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    padding: 10px 8% 20px; 
}

.ctn-registrar{
    margin: auto;
    background-color: #92DAD4;
    width: 1050px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
}

.ctn-registrar h1{
    font-size: 55px;
    padding-top: 50px;
    padding-bottom: 50px;
}

.ctn-registrar p{
    font-size: 48px;
}

.ctn-registrar input{
    width: 505px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
   
}

.ctn-registrar select{
    width: 505px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
}




</style>