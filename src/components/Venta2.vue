<template>
    <div class="ctn-venta">
        <div class="titulo">
            <h1> VENTA</h1>
            <form class="filtro"  v-on:submit.prevent="buscarProducto">
                <input type="text" placeholder="Buscar Producto">
            </form>
        </div>
        <div class="ctn-venta">
            <div class="ctn-registrar-saldo">
                <form class="filtro" v-on:submit.prevent="buscarCliente">
                    <input type="number" placeholder="Cedula cliente"  required>
                    <button class="btn" type="submit">BUSCAR</button>
                </form>
                <br>
                <div class="ctn-pro" v-show="clienteExiste2">
                    <p>Cliente no registrado</p>
                    <button class="btn" @click="goCliente()">REGISTRAR</button>
                </div>

                <div class="factura">
                    <div>
                        <h2>FACTURA VENTA</h2>
                        <div class="cmp">
                            <div>
                                <label>Numero de Venta: </label>
                                <label>1</label>
                            </div>

                            <div>
                                <label>Fecha de Venta: </label>
                                <label>2022/12/09</label>
                            </div>

                            <div>
                                <label>Hora: </label>
                                <label>02:00 pm</label>
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
                        <h2>DATOS DEL VENDEDOR</h2>
                        <div class="cmp">
                            <div>
                                <label>CC: </label>
                                <label>1193235212</label>
                            </div>

                            <div>
                                <label>Nombre: </label>
                                <label>Dimar David Galvan Bayona</label>
                            </div>

                            <div>
                                <label>Cargo: </label>
                                <label>Operador</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>DATOS DEL CLIENTE</h2>
                        <div class="cmp">
                            <div>
                                <label>CC: </label>
                                <label>1190234210</label>
                            </div>

                            <div>
                                <label>Nombre: </label>
                                <label>Juna Alberto Ramirez Posada</label>
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
                            <tr>
                                <td>Harina Arepasan 1 KG</td>
                                <td>1123123</td>
                                <td>-3+</td>
                                <td>3.000</td>
                                <td>9.000</td>
                                <td>X</td>
                            </tr>
                        </tbody>
                    </table>
                   <label>total: 9.000</label>
                </div>
                <button class="btn" type="submit">REGISTRAR VENTA</button>
                <button class="btn" type="submit">ABRIR SALDO</button>
            </div>
        </div>
    </div>  
</template>

<script>
export default{
    name: 'Venta2'
}
</script>

<style>
    .factura{
        margin: auto;
        background-color: #ffffff;
        color: black;
        border-radius: 25px;
        margin-top: 40px;
        padding: 20px; 
        font-size: 25px;
    }

    .factura h2 {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .cmp{
        display: flex;
        justify-content: space-evenly;
    }

 
.tabla_venta{
    margin-top: 20px;
}
    table.tabla_venta {
  border: 1px solid #1C6EA4;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
table.tabla_venta td, table.tabla_venta th {
  border: 1px solid #AAAAAA;
  padding: 3px 2px;
}
table.tabla_venta tbody td {
  font-size: 25px;
  font-weight: 400;
}
table.tabla_venta thead {
  background: #55B77E;
}
table.tabla_venta thead th {
  font-size: 25px;
  font-weight: 400;
  color: #FFFFFF;
  text-align: center;
}
table.tabla_venta tfoot td {
  font-size: 14px;
}
table.tabla_venta tfoot .links {
  text-align: right;
}
table.tabla_venta tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>