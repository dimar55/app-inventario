<template>
    <div>
<transition name="fade">
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <transition name="fade">
        <div class="container-registro modal" v-if="showModal">
            <form class="ctn-registrar"  v-on:submit.prevent="">
                <div class="container-flex">
                    <div>
                    </div>  
                    <div>
                        <img src="../assets/icon_X.png" alt="" @click="showModal = false">
                    </div>    
                </div>
                <div class="factura">
                    <div>
                        <h2>FACTURA VENTA</h2>
                        <div class="cmp">
                            <div>
                                <label>Numero de Venta: </label>
                                <label>{{detalle.id_venta}}</label>
                            </div>

                            <div>
                                <label>Fecha de Venta: </label>
                                <label>{{detalle.fecha_venta}}</label>
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
                        <h2>DATOS DEL CLIENTE</h2>
                        <div class="cmp">
                            <div>
                                <label>CC: </label>
                                <label>{{detalle.cedula_cli}}</label>
                            </div>
                            <div>
                                <label>Nombre: </label>
                                <label>{{detalle.nombre_cli}}</label>
                            </div>
                        </div>
                    </div>

                    <table class="tabla_venta">
                        <thead>
                            <tr>
                                <th>PRODUCTO</th>
                                <th>CODIGO</th>
                                <th>CANTIDAD</th>
                                <th>SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(prod, index) in detalle.prods" :key="prod.nombre_product">
                                <td>{{prod.nombre_product}} {{prod.marca_product}} {{prod.cantidad_product}} {{prod.unidad_product}}</td>
                                <td>{{prod.id_product}}</td>
                                <td>{{prod.cantidad_venta}}</td>
                                <td>{{prod.subtotal_venta}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="labeltotal">
                        <label>total: {{detalle.total_venta}}</label>
                    </div>
                </div>
            </form>
        </div>
    </transition>

    <div class="container-historial">
        <h1>HISTORIAL DE VENTAS</h1>
        <div class="ctn-ventas">
            <form class="filtro" v-on:submit.prevent="buscarVentas">
                <div>
                    <input type="date" required v-model="filtro.fecha_ini" :max ="today" >
                </div>
                <div>
                    <input type="date" required :max ="today" :min="filtro.fecha_ini" v-model="filtro.fecha_fin">
                </div>
                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Ventas</h1>
            </div>
            
            <div class="ctn-resultados">
                <div class="resultado" v-for="venta in ventas_pag" :key="venta.fecha_venta">
                    <p style="color:#55B77E">{{venta.fecha_venta}}</p>
                    <p style="color:#555555"> {{venta.prod_nombres}}</p>
                    <p>Total de la venta: {{venta.total_venta}}</p>
                    <div class="boton">
                        <button class="btn" @click="detalles(venta)">Ver detalles</button>
                    </div>
                </div>
            </div>
            <div class="ctn-pag">
                <div class="paginacion">
                <label for="select_pag">Limitar ventas</label>
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
</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import config from '../utils/utils';
import controlers from '../controllers/ventasCtrl';

export default{
    name: 'HistorialVentas',
    data(){
        return {
            showModal: false,
            today: new Date().toISOString().split('T')[0],
            filtro: {
                fecha_ini: "",
                fecha_fin: ""
            },
            valor: "",
            ventas: [],
            ventas_pag: [],
            limite: 0,
            pagina: 1,
            detalle: {}
        }
    },
    methods:{
        cargarVentas(){
            controlers.cargarVentas(this);
        },
        buscarVentas() {
            controlers.buscarVentas(this);
        },
        obtenerPaginas(offset){
            this.ventas_pag = [];
            for (let index = offset; index < this.ventas.length && index < Number(Number(this.limite) + Number(offset)); index++) {
                const element = this.ventas[index];
                this.ventas_pag.push(element)
            }
        },
        paginar(){
            if(this.limite!=0){
                this.pagina = 1;
                this.obtenerPaginas((this.pagina-1)*this.limite);
            }else{
                this.ventas_pag = this.ventas;
            }
        },
        nextpag(){
            if(this.limite!=0){
            if(this.pagina!=Math.ceil(this.ventas.length/Number(this.limite))){
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
        detalles(venta){
            this.detalle = venta;
            this.showModal = true;
        }
        
    },
    mounted(){
        this.cargarVentas();
    }
}
</script>

<style>


.container-historial h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}


.ctn-ventas{
    margin: auto;
    background-color: #92DAD4;
    width: 1050px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
}

.ctn-ventas p{
    font-size: 32px;
}


.filtro{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.filtro input{
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
}
#check{
    display: flex;
    align-items: center;
}

#check input{
    height: 46px;
    width: 46px;
    border: none;
    padding-left: 20px;
}

.ctn-resultados{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    justify-items: center;
}

.resultado{
    background-color: #ffffff;
    border-radius: 20px;
    width: 450px;
    align-items: center;
    align-content: center;
    text-align: start;
    padding: 10px;
}

.botonI{
    padding-top: 10px;
    text-align: end;
}

.btnI{
    font-size: 35px;
    font-weight: 400;
    width: 180px;
    height: 50px;
    color: #FFFF;
    background: #F58649;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
    margin: 10px;
}

.paginacion{
    margin-top:20px;
    font-size: 35px;
    justify-content: center;
}

.paginacion select{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    width: 100px;
    text-align: center;
    margin-left: 20px;
}
.paginacion ul{
    display: flex;
    justify-content: center;
   
}
.paginacion li{
    list-style: none;
    padding-left: 10px;
    padding-right: 10px;
}

.ctn-pag{
    text-align: center;
    justify-content: center;
}

</style>