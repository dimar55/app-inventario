<template>
<div>
    <div class="ctn-saldo">
        <h1>Añadir Saldo</h1>
        <div class="ctn-registrar-saldo">
            <div class="ctn-tablita">
                <table class="tablita">
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>CODIGO</th>
                            <th>TELEFONO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{this.cliente.nombre_cli}}</td>
                            <td>{{this.cliente.cedula_cli}}</td>
                            <td>{{this.cliente.telefono_cli}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="abono">
                <p>Abono:</p>
                <input type="number" v-model="abono" @keyup="changeAbono" placeholder="0">
            </div>
            <div class="totales">
                <p> Total: ${{this.total_venta}}</p>
                <p> Abono: ${{this.abono}}</p>
                <p> Total: ${{this.total_venta - this.abono}}</p>
            </div>
            <div class="btn-registrar"> 
                <button class="btn" @click="registrar()">Registrar Saldo</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import saldo from '../models/model_saldo';
import cliente from '../models/model_verCliente';
import controlers from '../controllers/add_saldoCtlr';
export default{
    name: 'AnadirSaldo',
    data(){
        return {
            respuesta: "",
            cliente,
            total_venta: Number(this.$route.query.total_venta) || 0,
            abono: "",
            saldo
        }
    },
    methods: {
        async registrar(){
            let registro = await controlers.registrarSaldo(this.saldo , this.cliente, this.total_venta, this.abono);
            if(registro){
                this.$router.push({ path: '/RealizarVenta' });
            }
        },
        changeAbono(event){
            if(this.abono>this.total_venta){
                this.abono = this.total_venta
            }
        },
        async buscarCliente(){
            this.cliente = await controlers.buscarCliente(this.saldo.cedula_cli);
        },
    },
    mounted(){
        this.saldo.id_venta = Number(this.$route.query.id_venta) || "";
        this.saldo.cedula_cli = Number(this.$route.query.cedula_cli) || "";
        this.buscarCliente();
    }
}
</script>

<style>
.modal-overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
    
}
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
}
.modal-container {
    background: #A6E8FA;
    padding: 2rem;
    border-radius: 25px;
}
.modal-container p{
    font-size: 30px;
    padding-right: 10px;
}

.container-flex {
    display: flex;
    justify-content: space-between;
}
.container-flex h1{
    margin-left: 30px;
    font-size: 30px;
    font-weight: bolder;
}

.ctn-saldo{
    height: 100vh;
}

.ctn-saldo h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}

.ctn-registrar-saldo{
    margin: auto;
    background-color: #92DAD4;
    width: 850px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
    font-size: 40px;
}

table.tablita {
  background-color: #ffffff;
  width: 350px;
  text-align: center;
  border-collapse: collapse;
  margin: 10px;
 
}
table.tablita td, table.tablita th {
  border: 1px solid #000000;
  padding: 10px 10px;
}
table.tablita tbody td {
  font-size: 40px;
  font-weight: 400;
  color: #000000;
  white-space: pre;
}
table.tablita thead {
  background: #55B77E;

}
table.tablita thead th {

  font-size: 40px;
  font-weight: 400;
  color: #FFFFFF;
  text-align: center;
}
table.tablita tfoot td {
  font-size: 40px;
}
table.tablita tfoot .links {
  text-align: right;
}
table.tablita tfoot .links a{
  display: inline-block;
  background: #792396;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}

.ctn-tablita{
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.abono{
    display: flex;
    font-size: 40px;
    justify-content: center;
    padding-top: 20px;
   
}

.abono input{
    width: 200px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
    margin-left: 15px;
}

.totales{
    text-align: start;
}

.btn-registrar{
display: flex;
justify-content: center;
}

</style>