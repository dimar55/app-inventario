<template>
    <div class="container-historial">
        <h1>HISTORIAL DE VENTAS</h1>
        <div class="ctn-ventas">
            <div class="filtro">
                <div class="ctn-select">
                    <select name="" id="">
                        <option value="">NOMBRE</option>
                        <option value="">CODIGO</option>
                    </select>
                </div>
                <input type="text" placeholder="Buscar Venta">
                <div>
                    <input type="date">
                </div>
                <button class="btn">BUSCAR</button>
            </div>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Ventas</h1>
            </div>
            
            <div class="ctn-resultados">
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                   
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
                <div class="resultado">
                    <p style="color:#55B77E">14/11/2022 10:00 am</p>
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <p>total de la venta $18.500</p>
                    <div class="botonI">
                        <button class="btnI">VER DETALLES</button>
                    </div>
                </div>
            </div>
        </div>
        <p >Ventas del Dia $450.000</p>
        <p>Ventas de la Seman $890.000</p>
        <p>Ventas del Mes 1'450.000</p>
    </div>
</template>

<script>
export default{
    name: 'HistorialVentas'
}
</script>

<style>
.container-historial h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}


.ctn-ventas{
    margin: auto;
    background-color: #92DAD4;
    width: 1050px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
}

.ctn-ventas p{
    font-size: 32px;
}


.filtro{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.filtro input{
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
}
#check{
    display: flex;
    align-items: center;
}

#check input{
    height: 46px;
    width: 46px;
    border: none;
    padding-left: 20px;
}

.ctn-resultados{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    justify-items: center;
}

.resultado{
    background-color: #ffffff;
    border-radius: 20px;
    width: 450px;
    align-items: center;
    align-content: center;
    text-align: start;
    padding: 10px;
}

.botonI{
    padding-top: 10px;
    text-align: end;
}

.btnI{
    font-size: 35px;
    font-weight: 400;
    width: 180px;
    height: 50px;
    color: #FFFF;
    background: #F58649;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
    margin: 10px;
}

</style>