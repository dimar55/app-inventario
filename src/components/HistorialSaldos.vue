<template>
    <div class="container-historial">
        <h1>HISTORIAL DE SALDOS</h1>
        <div class="ctn-ventas">
            <div class="filtro">
                <div class="ctn-select">
                    <select name="" id="">
                        <option value="">NOMBRE</option>
                        <option value="">CODIGO</option>
                    </select>
                </div>
                <div class="ctn-select">
                        <select name="" id="">
                            <option >PAGADO</option>
                            <option >PENDIENTE</option>
                        </select>
                    </div>
                <input type="text" placeholder="Buscar Saldos">
                <div>
                    <input type="date">
                </div>
                
                <button class="btn">BUSCAR</button>
            </div>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Saldos</h1>
            </div>
            <div class="ctn-resultados">
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
                    </div>
                </div>
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
                    </div>
                </div>
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
                    </div>
                </div>
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
                    </div>
                </div>
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
                    </div>
                </div>
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
                    </div>
                </div>
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
                    </div>
                </div>
                <div class="resultado">
                    <div class="ctn-re">
                        <p >14/11/2022 10:00 am</p>
                        <p style="color: #55B77E">PAGADO</p>
                    </div>
                 
                    <p style="color:#555555">Leche, Arroz, Aceite</p>
                    <div  class="ctn-re">
                        <p>total de la venta $18.500</p>
                        <div class="botonI">
                            <button class="btnI">VER DETALLES</button>
                        </div>
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
    name: 'HistorialSaldos'
}
</script>

<style>
 .ctn-re{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
 }

 .ctn-select select{
    width: 150px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 25px;
    padding-left: 20px;
}
</style>