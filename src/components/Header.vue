<template>
    <div class="container-Header">
    <div class="ctn-header">
        <div>
            <img src="../assets/Menu.png" @click="show_barra = true" alt="">
        </div>
        <div>
            <p>YALMECRIS</p>
        </div>
       <div>
        <img src="../assets/Logout.png" alt="">
       </div>
    </div>

    <div class="container-menu" v-show="show_barra">
            <div class="cont-menu">
                <div class="logo_user">
                    <img src="../assets/Hombre.png" alt="">
                    <p>DIMAR</p>
                </div>
                
                <nav>
                    <a>Registrar Proveedores</a>
                    <a>Registrar Cliente</a>
                    <a>Registrar Producto</a>
                    <a>Registrar Entrada</a>
                    <a>Ver Inventario</a>
                    <a>Registrar venta</a>
                    <a>Historial Ventas</a>
                    <a >Historial Saldos</a>
                </nav>
            <label  @click="show_barra = false"><img src="../assets/icon_X.png" alt=""></label>
            </div>
        </div>
    
</div>
</template>

<script>
export default{
    name: 'Header',
    data(){
        return{
            show_barra: false
        }
}
}
</script>


<style>

.ctn-header{
    background-color:  #55B77E;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: #FFEAD1;
    font-weight: 400;
    font-size: 80px;
}

.ctn-header img{
    cursor: pointer;
}

.container-menu{
        position: fixed;
        text-align: center;
        font-size: 22px;
        background:  rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100vh;
        top: 0; left: 0;
        transition: all 500ms ease;
    }

.logo_user{
   padding-top: 30px;
   color: #ffffff;
}

    .cont-menu{
        width: 100%;
        max-width: 250px;
        background: #1c1c1c;
        height: 100vh;
        position: relative;
        transition: all 500ms ease;
    }

    .cont-menu nav{
        transform: translateY(8%);
    }
    .cont-menu nav a{
        display: block;
        text-decoration: none;
        text-align: center;
        padding-top: 20px;
        color: #c7c7c7;
        border-left: 5px solid transparent;
        transition: all 400ms ease;
    }

    .cont-menu nav a:hover{
        border-left: 5px solid #c7c7c7;
        background: #1f1f1f;

    }

    .cont-menu label{
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
    }

</style>