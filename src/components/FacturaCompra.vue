<template>
    <div>
        <h1 class="titular">REGISTRO FACTURA INGRESO</h1>
        <div class="ctn-registrarf">
            <div>           
                <div class="campos_registrarf">
                    <p>Id de la factura:</p>
                    <input type="text" required>
                </div>
                <div class="campos_registrarf">
                    <p>Empresa:</p>
                    <input type="text" required>
                </div>
                <div class="campos_registrarf">
                    <p>Cedula del Proveedor:</p>
                    <input type="number" min="100000" max="999999999999">
                </div>
                <div class="campos_registrarf">
                    <p>Codigo del producto:</p>
                    <input type="number" required min="0">  
                </div>
                <div class="campos_registrarf">
                        <p>producto no registrado</p>
                        <button class="btn">REGISTRAR</button>
                    </div>
                <div class="campos_registrarf" v-if="false">
                    <p>Precio entrada:</p>
                    <input type="number" required min="0">
                </div>   
                <div class="campos_registrarf"  v-if="false">
                    <p>Precio de venta:</p>
                    <input type="number" required min="0">
                </div>

               
                <div class="boton" v-if="false">
                    <button class="btn">AÑADIR</button>
                </div>
            </div>
            <div class="facturac">
                <div>
                    <h2>FACTURA COMPRA</h2>
                    <div class="cmp">
                        <div>
                            <label>Numero de factura: </label>
                            <label>{{}}</label>
                        </div>
                        <div>
                            <label>Empresa: </label>
                            <label>{{}}</label>
                        </div>
                        <div>
                            <label>Fecha de  la factura: </label>
                            <label>{{today.toLocaleDateString('en-US')}}</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>DATOS DEL NEGOCIO</h2>
                    <div class="cmp">
                        <div>
                            <label>Nombre: </label>
                            <label>Yalmecris</label>
                        </div>
                        <div>
                            <label>Telefono: </label>
                            <label>5782288</label>
                        </div>
                        <div>
                            <label>Dirección: </label>
                            <label>Av 12 entre 14 n an-08 villa nueva la isla</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>DATOS DEL PROVEEDOR</h2>
                    <div class="cmp">
                        <div>
                            <label>CC: </label>
                            <label>{{}}</label>
                        </div>
                        <div>
                            <label>Nombre: </label>
                            <label>{{}}</label>
                        </div>
                        <div>
                            <label>Telefono: </label>
                            <label>{{}}</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>DATOS DEL USUARIO</h2>
                    <div class="cmp">
                        <div>
                            <label>CC: </label>
                            <label>{{}}</label>
                        </div>
                        <div>
                            <label>Nombre: </label>
                            <label>{{}}</label>
                        </div>
                        <div>
                            <label>Rol: </label>
                            <label>{{}}</label>
                        </div>
                    </div>
                </div>
                <table class="tabla_venta">
                        <thead>
                            <tr>
                                <th>PRODUCTO</th>
                                <th>CODIGO</th>
                                <th>CAN</th>
                                <th>PRECIO UN</th>
                                <th>SUBTOTAL</th>
                                <th>ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="labeltotal">
                        <label>total: </label>
                    </div>
                    <div class="boton">
                        <button class="btn">REGISTRAR FACTURA</button>
                    </div>
            </div>
        </div> 
    </div>
</template>


<script>
export default{
    name: 'FacturaCompra',
    data(){
        return{
            today: new Date(),
        }
    }
}
</script>


<style>
.titular{
    padding-top: 30px;
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;

}

.ctn-registrarf{
    margin: auto;
    display: flex;
    background-color: #92DAD4;
    width: 1550px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 20px;
}

.ctn-registrarf h1{
    font-size: 55px;
    padding-top: 30px;
    padding-bottom: 30px;
}

.ctn-registrarf p{
    font-size: 48px;
}

.ctn-registrarf input{
    width: 300px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
    margin-left: 20px;
   
}

.campos_registrarf{
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0 20px 20px; 
}

.facturac{
        margin: auto;
        background-color: #ffffff;
        color: black;
        border-radius: 25px;

        padding: 20px; 
        font-size: 25px;
        width: 800px;
    }

    .facturac h2 {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
    }

</style>

