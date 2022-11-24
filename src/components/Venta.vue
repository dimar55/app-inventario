<template>
    <div class="ctn-venta">
        <div class="titulo">
            <h1> VENTA</h1>
        </div>
    <div class="contenedores">
        <div class="ctn-buscar">
            <div class="filtro">
                <input type="text" placeholder="Buscar Producto">
                <div class="ctn-select">
                    <select name="" id="">
                    <option value="">ASEO</option>
                    <option value="">ASEO PERSONAL</option>
                    <option value="">ALIMENTOS</option>
                    <option value="">ETC</option>
                </select>
                </div>
                <button class="btn-b">BUSCAR</button>
            </div>
            <div class="products-venta">
                <div class="product">
                    <p>Harina arepasan 1 KG</p>
                    <p>$10.000</p>
                    <div class="ctn-text">
                        <p style="color:#555555"> Disponilbles: 12</p>
                        <button class="btn"> Añadir</button>
                    </div>
                </div>
                <div class="product">
                    <p>Harina arepasan 1 KG</p>
                    <p>$10.000</p>
                    <div class="ctn-text">
                        <p style="color:#555555"> Disponilbles: 12</p>
                        <button class="btn"> Añadir</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="lista-venta">
            <div class="producto-select">
                <div class="ctn-text">
                    <p>Harina arepasan 1kg</p>
                    <img src="../assets/icon_delete.png" alt="">
                </div>
                <div>
                    <p>$10.000</p>
                </div>
                <div>
                    <div class="ctn-text">
                        <p>Disponibles: 4</p>
                        <img src="../assets/icon_plus.png" alt="">
                        <p style="color: #55B77E">2</p>
                        <img src="../assets/icon_minus.png" alt="">
                        <p>2*10.000 = 20.000</p>
                    </div>
                </div>  
            </div>
            <div class="producto-select">
                <div class="ctn-text">
                    <p>Harina arepasan 1kg</p>
                    <img src="../assets/icon_delete.png" alt="">
                </div>
                <div>
                    <p>$10.000</p>
                </div>
                <div>
                    <div class="ctn-text">
                        <p>Disponibles: 4</p>
                        <img src="../assets/icon_plus.png" alt="">
                        <p style="color: #55B77E">2</p>
                        <img src="../assets/icon_minus.png" alt="">
                        <p>2*10.000 = 20.000</p>
                    </div>
                </div>  
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default{
    name: 'Venta'
}
</script>


<style>
.ctn-venta{
    height: 100vh;
}
.titulo h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}
.contenedores{
    display: flex;
    font-size: 40px;
}

.ctn-buscar{
    margin: auto;
    background-color: #92DAD4;
    color: black;
    width:  600px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px; 
}

.lista-venta{
    margin: auto;
    background-color: #92DAD4;
    color: black;
    width:  600px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px; 
}

.ctn-text{
    display: flex;
    justify-content: space-between;
}
.ctn-text img{
    cursor: pointer;
}
.product{
    background-color: #ffffff;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
}

.producto-select{
    background-color: #ffffff;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
}
.btn-b{
    font-size: 40px;
    font-weight: 400;
    width: 145px;
    height: 50px;
    color: #FFFF;
    background: #F58649;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
}

</style>