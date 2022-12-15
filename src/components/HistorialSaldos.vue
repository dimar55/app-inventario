<template>
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
                        <h2>DETALLES</h2>
                        <div class="cmp">
                            <div>
                                <label>Numero de Venta: </label>
                                <label>{{}}</label>
                            </div>

                            <div>
                                <label>Fecha de Venta: </label>
                                <label>{{}}</label>
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
                                <label>{{}}</label>
                            </div>
                            <div>
                                <label>Nombre: </label>
                                <label>{{}}</label>
                            </div>
                        </diV>
                    </div>

                    <table class="tabla_venta">
                        <thead>
                            <tr>
                                <th>ABONO</th>
                                <th>FECHA ABONO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    </transition>
    <div class="container-historial">
        <h1>HISTORIAL DE SALDOS</h1>
        <div class="ctn-ventas">
            <form class="filtro" v-on:submit.prevent="buscarSaldos">
                <div class="ctn-select">
                        <select v-model="filtro.estado_saldo">
                            <option >Pagado</option>
                            <option >Pendiente</option>
                        </select>
                    </div>
                <input type="text" placeholder="Buscar Saldos"  v-model="filtro.cedula_cli">
                <button class="btn" type="submit">BUSCAR</button>
            </form>
            <div class="text">
                <h1 style="color:#194F5D">Lista de Saldos</h1>
            </div>
            <div class="ctn-resultados">
                <div class="resultado" v-for="saldo in saldos_pag" :key="saldo.cedula_cli">
                    <div class="ctn-re">
                        <p > {{saldo.cedula_cli}}</p>
                        <div v-if="saldo.estado_saldo == 'Pagado'">
                            <p style="color: #55B77E">{{saldo.estado_saldo}}</p>
                        </div>
                        <div v-if="saldo.estado_saldo == 'Pendiente'">
                            <p style="color: #F58649">{{saldo.estado_saldo}}</p>  
                        </div>
                    </div>
                    <div  class="ctn-re">
                        <p>Total del saldo ${{saldo.saldo_total}}</p>
                        <p>Saldo actual ${{saldo.saldo_actual}}</p>
                        <div  v-if="saldo.estado_saldo == 'Pendiente'">
                            <button class="btnI" @click="go_abonar(saldo)">Abonar</button>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="ctn-pag">
                <div class="paginacion">
                <label for="select_pag">Limitar saldos</label>
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
    name: 'HistorialSaldos',
    data(){
        return{
            filtro:{
                cedula_cli: "",
                estado_saldo: ""
            },
            saldos: [],
            saldos_pag: [],
            limite: 0,
            pagina: 1
        }
    },
    methods:{
        cargarSaldos(){
            axios.get(config.server+"/saldo")
                .then((result) => {
                    if (result.data.success) {
                        this.saldos = result.data.body;
                        this.saldos_pag = result.data.body;
                    };
                }).catch((err) => {
                    console.log(err)
                })
        },
        buscarSaldos() {
            if (this.filtro.cedula_cli == "" && this.filtro.estado_saldo ==""){
                axios.get(config.server+"/saldo")
                .then((result) => {
                    if (result.data.success) {
                        this.saldos = result.data.body;
                        this.saldos_pag = result.data.body;
                        this.pagina = 1;
                        this.limite = 0;
                    };
                }).catch((err) => {
                    console.log(err)
                })
            }else {
                axios.post(config.server+"/saldo/filter", this.filtro)
            .then((result)=>{
                if(result.data.success && result.data.body.length>0){
                    this.saldos = result.data.body;
                    this.saldos_pag = result.data.body;
                    this.pagina = 1;
                    this.limite = 0;
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "No se encontraron resultados",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                }
            }).catch((err)=>{
                console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "No se encontraron resultados",
                        showConfirmButton: false,
                        timer: 1200,
                    });
            })
            }
        },
        go_abonar(saldo){
            this.$router.push({ path: '/Abonar', query: { id: saldo.id_saldo ,saldo: saldo.saldo_actual , cedula: saldo.cedula_cli}});  
        },
        obtenerPaginas(offset){
            this.saldos_pag = [];
            for (let index = offset; index < this.saldos.length && index < Number(Number(this.limite) + Number(offset)); index++) {
                const element = this.saldos[index];
                this.saldos_pag.push(element)
            }
        },
        paginar(){
            if(this.limite!=0){
                this.pagina = 1;
                this.obtenerPaginas((this.pagina-1)*this.limite);
            }else{
                this.saldos_pag = this.saldos;
            }
        },
        nextpag(){
            if(this.limite!=0){
            if(this.pagina!=Math.ceil(this.saldos.length/Number(this.limite))){
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
        this.cargarSaldos();

  } 
}
</script>

<style>
 .ctn-re{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
 }

 .ctn-select select{
    width: 150px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 25px;
    padding-left: 20px;
}
</style>