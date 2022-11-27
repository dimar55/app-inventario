<template>
    <div class="ctn-saldo">
        <h1>Añadir Saldo</h1>
        <div class="ctn-registrar-saldo">
            <form class="filtro" v-on:submit.prevent="buscarCliente">
                <input type="number" placeholder="Cedula cliente" v-model="saldo.cedula_cli">
                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <br>
            <div class="ctn-pro" v-show="clienteExiste2">
                <p>Cliente no registrado</p>
                <button class="btn" @click="goCliente()">REGISTRAR</button>
            </div>
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
                        <tr v-if="clienteExiste">
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
                <button class="btn" @click="registrarSaldo">Registrar Saldo</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
export default{
    name: 'AnadirSaldo',
    data(){
        return {
            clienteExiste: false,
            clienteExiste2: false,
            cliente: {
                cedula_cli: "",
                nombre_cli: "",
                telefono_cli: ""
            },
            total_venta: Number(this.$route.query.total_venta) || 0,
            abono: "",
            saldo: {
                estado_saldo: "Pendiente",
                id_venta: Number(this.$route.query.id_venta) || "",
                cedula_cli: "",
                saldo: 0
            },
            
        }
    },
    methods: {
        changeAbono(event){
            if(this.abono>this.total_venta){
                this.abono = this.total_venta
            }
        },
        buscarCliente(){
            axios.get(config.server+"/cliente/cedula/"+this.saldo.cedula_cli)
            .then((result)=>{
                if(result.data.success && result.data.body.length > 0){
                    this.cliente = result.data.body[0];
                    this.clienteExiste = true;
                    this.clienteExiste2 = false;
                }else{
                    this.clienteExiste2 = true;
                    this.clienteExiste = false;
                }
            }).catch((err)=>{
                console.log(err);
                this.clienteExiste2 = true;
                this.clienteExiste = false;
            })
        },
        goCliente(){

        },
        registrarSaldo(){
            if(this.clienteExiste){
                this.saldo.cedula_cli = this.cliente.cedula_cli;
                this.saldo.saldo = this.total_venta - (this.abono=="" ? 0 : this.abono)
                axios.post(config.server+"/saldo", this.saldo)
                .then((result)=>{
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Saldo creado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        this.$router.push({ path: '/RealizarVenta' });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido crear el saldo",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido crear el saldo",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
            }
            
        }
    }
}
</script>

<style>
.ctn-saldo h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}

.ctn-registrar-saldo{
    margin: auto;
    background-color: #92DAD4;
    width: 800px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
    font-size: 40px;
}

table.tablita {
  background-color: #FFFFFF;
  width: 350px;
  text-align: center;
  border-collapse: collapse;
}
table.tablita td, table.tablita th {
 
  border: 1px solid #000000;
  padding: 5px 2px;
}
table.tablita tbody td {
  font-size: 40px;
  font-weight: 400;
  color: #000000;
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