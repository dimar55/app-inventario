<template>
        <div class="container-historial">
        <h1>INVENTARIO</h1>
        <div class="ctn-ventas" >
            <form class="filtro" v-on:submit.prevent="buscarProductos">
                <div class="ctn-select">
                    <select  v-model="filtro">
                        <option ></option>
                        <option>NOMBRE</option>
                        <option>CODIGO</option>
                        <option>CANTIDAD</option>
                    </select>
                </div>
                <input type="text" placeholder="Buscar Producto" v-model="valor">

                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Productos</h1>
            </div>
            
            <div class="ctn-resultados" >
                <div class="resultado" v-for="producto in prods_pag" :key="producto.nombre_product">
                    <div class="ctn-re">
                        <p >{{producto.nombre_product}} {{producto.marca_product}} {{producto.cantidad_product}} {{producto.unidad_product}}</p>
                        <p style="color: #55B77E">{{producto.id_product}} </p>
                    </div>
                    <p>Disponibles: {{producto.cantidad_disp}}</p>
                    <p>Precio Venta: $ {{producto.precio_venta}}</p>
                    <p>Precio de entrada: $ {{producto.precio_entrada}}</p>
                    <div v-if="(producto.cantidad_disp==0)">
                        <p style="color: rgb(248, 40, 40);">AGOTADO</p>
                    </div>
                </div>
            </div>
            <div class="ctn-pag">
                <div class="paginacion">
                <label for="select_pag">Limitar productos</label>
                <select v-model="limite" @change="paginar">
                    <option value="0">Todo</option>
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
import Swal from "sweetalert2";
import config from '../utils/utils';
export default{
    name: 'VerInventario',
    data(){
        return {
            filtro: "",
            valor: "",
            productos: [],
            prods_pag: [],
            limite: 0,
            pagina: 1
        }
    },
    methods:{
        cargarProductos(){
            axios.get(config.server+"/producto")
                .then((result) => {
                    if (result.data.success) {
                        this.productos = result.data.body;
                        this.prods_pag = result.data.body;
                    };
                }).catch((err) => {
                    console.log(err)
                })
        },
        buscarProductos() {
            let url = "";
            if (this.filtro == "") url = config.server+"/producto";
            else if (this.filtro == "NOMBRE") url =config.server+"/producto/nombre/"+this.valor
            else if (this.filtro == "CODIGO") url = config.server+"/producto/id/"+this.valor
            else if (this.filtro == "CANTIDAD") url = config.server+"/producto/cantidad/"+this.valor
            axios.get(url)
                .then((result) => {
                    if (result.data.success && result.data.body.length>0) {
                        this.productos = result.data.body;
                        this.prods_pag = result.data.body;
                        this.pagina = 1;
                        this.limite = 0;
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se encontraron resultados",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    };

                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "No se encontraron resultados",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
        },
        obtenerPaginas(offset){
            this.prods_pag = [];
            for (let index = offset; index < this.productos.length && index < Number(Number(this.limite) + Number(offset)); index++) {
                const element = this.productos[index];
                this.prods_pag.push(element)
            }
        },
        paginar(){
            if(this.limite!=0){
                this.pagina = 1;
                this.obtenerPaginas((this.pagina-1)*this.limite);
            }else{
                this.prods_pag = this.productos;
            }
        },
        nextpag(){
            if(this.limite!=0){
            if(this.pagina!=Math.ceil(this.productos.length/Number(this.limite))){
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
        this.cargarProductos();
    }
}
</script>

