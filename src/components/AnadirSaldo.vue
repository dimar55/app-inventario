<template>
<div>
    <transition name="fade">
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <transition name="fade">
        <div class="container-registro modal" v-if="showModal">
            <form class="ctn-registrar"  v-on:submit.prevent="registrarCliente">
                <div class="container-flex">
                    <div>
                    </div>  
                    <div>
                        <img src="../assets/icon_X.png" alt="" @click="showModal = false">
                    </div>    
            </div>
            <h1>Registrar cliente</h1>
                <div class="campos_registrar">
                    <img src="../assets/cliente.png" alt="">
                    <p>Nombre</p>
                    <input type="text" v-model="ClienteForm.nombre_cli" required>
                </div>
                <div class="campos_registrar">
                    <p>Tipo de Documento</p>
                    <select v-model="ClienteForm.tipo_documento_cli" required>
                        <option>CC Cedula de Ciudadania</option>
                        <option>TT Tarjeta de Identidad</option>
                        <option>CE Cedula de Extranjeria</option>
                    </select>
                </div>
                <div class="campos_registrar">
                    <p>Numero de Documento:</p>
                    <input type="number" v-model="ClienteForm.cedula_cli" required>
                </div>
                <div class="campos_registrar">
                    <p>Telefono:</p>
                    <input type="number" v-model="ClienteForm.telefono_cli" required>
                </div>
                <div class="campos_registrar">
                    <p>Dirección:</p>
                    <input type="text" v-model="ClienteForm.direccion_cli" required>
                </div>  
                <div class="boton">
                    <button type="submit" class="btn">REGISTRAR</button>
                </div>
            </form>
        </div>
    </transition>

    <div class="ctn-saldo">
        <h1>Añadir Saldo</h1>
        <div class="ctn-registrar-saldo">
            <form class="filtro" v-on:submit.prevent="buscarCliente">
                <input type="number" placeholder="Cedula cliente" v-model="saldo.cedula_cli" required>
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
                <button class="btn" @click="registrar()">Registrar Saldo</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { tsThisType } from "@babel/types";
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
import saldo from '../models/model_saldo';
import cliente from '../models/model_verCliente';
import controlers from '../controllers/add_saldoCtlr';
export default{
    name: 'AnadirSaldo',
    data(){
        return {
            showModal: false,
            clienteExiste: false,
            clienteExiste2: false,
            respuesta: "",
            cliente,
            total_venta: Number(this.$route.query.total_venta) || 0,
            abono: "",
            saldo,
            ClienteForm: {
               cedula_cli: "",
               nombre_cli: "",
               tipo_documento_cli: "",
               telefono_cli: "",
               direccion_cli: ""
            }
            
        }
    },
    methods: {

         async registrar(){
            this.respuesta  = await  controlers.registrarSaldo(this.clienteExiste, this.saldo , this.cliente, this.total_venta, this.abono);
        },
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
            this.ClienteForm.cedula_cli = this.saldo.cedula_cli;
            this.showModal = true;
        },
        
        registrarCliente(){
            axios.post(config.server+"/cliente", this.ClienteForm)
            .then((result) => {
                    if (result.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Cliente creado exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        this.showModal = false;
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido crear el cliente",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido crear el cliente",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
        }
    },
    mounted(){
        this.saldo.id_venta = Number(this.$route.query.id_venta) || "";
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