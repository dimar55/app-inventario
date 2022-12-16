<template>
    <div class="ctn-saldo">
        <h1>Ver Clientes</h1>
        <div class="ctn-registrar-saldo">
            <form class="filtro" v-on:submit.prevent="buscarCliente">
                    <input type="number" placeholder="Cedula cliente" v-model="cedula_cli">
                    <button class="btn" type="submit">BUSCAR</button>
            </form>
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
                    <tr v-for="cliente in clientes_pag" :key="cliente.cedula_cli">
                        <td>{{cliente.nombre_cli}}</td>
                        <td>{{cliente.cedula_cli}}</td>
                        <td>{{cliente.telefono_cli}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="ctn-pag">
                <div class="paginacion">
                <label for="select_pag">Limitar clientes</label>
                <select v-model="limite" @change="paginar">
                    <option value="0">Todo</option>
                    <option value="1">1</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                </div>
                <div class="paginacion">
                <ul>
                    <li><a style="cursor: pointer;" @click="backpag">&lt</a></li>
                    <li><a style="cursor: pointer;">{{pagina}}</a></li>
                    <li><a style="cursor: pointer;" @click="nextpag">></a></li>
                </ul>
            </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import cliente from '../models/model_verCliente';
import controlers from '../controllers/ver_clientesCtlr';
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
export default{
    name: 'VerClientes',
    data(){
        return {
            cedula_cli: "",
            cliente, 
            clientes:[],
            clientes_pag: [],
            limite: 0,
            pagina: 1,
        }
    },
    methods:{
       async buscarCliente(){
            if(this.cedula_cli == ""){
                this.clientes =  await controlers.cargarClientes();
                this.clientes_pag = await controlers.cargarClientes();
                this.pagina = 1;
                this.limite = 0;
            }else{
                axios.get(config.server+"/cliente/cedula/"+this.cedula_cli)
            .then((result)=>{
                if(result.data.success && result.data.body.length > 0){
                    this.clientes = result.data.body;
                    this.clientes_pag = result.data.body;
                    this.pagina = 1;
                    this.limite = 0;
                    this.cedula_cli = "";
                }else{
                    Swal.fire({
                            icon: "info",
                            title: "Cliente no encontrado",
                            showConfirmButton: true,
                        });
                }
            }).catch((err)=>{
                Swal.fire({
                            icon: "error",
                            title: "Ha ocurrido un error buscando el cliente",
                            showConfirmButton: true,
                        });
            })
            }
            
        },
        obtenerPaginas(offset){
            this.clientes_pag = [];
            for (let index = offset; index < this.clientes.length && index < Number(Number(this.limite) + Number(offset)); index++) {
                const element = this.clientes[index];
                this.clientes_pag.push(element)
            }
        },
        paginar(){
            if(this.limite!=0){
                this.pagina = 1;
                this.obtenerPaginas((this.pagina-1)*this.limite);
            }else{
                this.clientes_pag = this.clientes;
            }
        },
        nextpag(){
            if(this.limite!=0){
            if(this.pagina!=Math.ceil(this.clientes.length/Number(this.limite))){
                this.pagina++;
                this.obtenerPaginas((this.pagina-1)*this.limite);
            }
            }
        },
        backpag(){
            if(this.pagina!=1){
            this.pagina--;
            this.obtenerPaginas((this.pagina-1)*this.limite);
            }
        },
    },
   async mounted(){
    this.clientes =  await controlers.cargarClientes();
    this.clientes_pag = await controlers.cargarClientes();
    this.pagina = 1;
    this.limite = 0;
    }
}
</script>