<template>
    <div class="ctn-saldo">
        <h1>Ver Proveedores</h1>
        
        <div class="ctn-registrar-saldo">
            <form class="filtro" v-on:submit.prevent="buscarProveedor">
                <input type="text" placeholder="Buscar Cedula" v-model="cedula_pro">
                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <div class="ctn-tablita">
            <table class="tablita">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>CODIGO</th>
                        <th>TELEFONO</th>
                        <th>CORREO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="proveedor in proveedores_pag" :key="proveedor.nombre_pro">
                        <td>{{proveedor.nombre_pro}}</td>
                        <td>{{proveedor.cedula_pro}}</td>
                        <td>{{proveedor.telefono_pro}}</td>
                        <td>{{proveedor.correo_pro}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="ctn-pag">
                <div class="paginacion">
                <label for="select_pag">Limitar proveedores</label>
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
import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";
import controlers from '../controllers/proveedorCtrl';
export default{
    name: 'VerProveedores',
    data(){
        return { 
            proveedores:[],
            cedula_pro: "",
            proveedores_pag: [],
            limite: 0,
            pagina: 1,
        }
    },
    methods: { 
        cargarProveedores(){
            controlers.cargarProveedores(this);
        },
        buscarProveedor(){
            controlers.buscarProveedor(this);
        },
        obtenerPaginas(offset){
            this.proveedores_pag = [];
            for (let index = offset; index < this.proveedores.length && index < Number(Number(this.limite) + Number(offset)); index++) {
                const element = this.proveedores[index];
                this.proveedores_pag.push(element)
            }
        },
        paginar(){
            if(this.limite!=0){
                this.pagina = 1;
                this.obtenerPaginas((this.pagina-1)*this.limite);
            }else{
                this.proveedores_pag = this.proveedores;
            }
        },
        nextpag(){
            if(this.limite!=0){
            if(this.pagina!=Math.ceil(this.proveedores.length/Number(this.limite))){
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
    mounted(){
        this.cargarProveedores();
    }
 

}
</script>