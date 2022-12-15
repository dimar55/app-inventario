<template>
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
    <div class="ctn-venta">
        <div class="titulo">
            <h1> VENTA</h1>
            <form class="filtro"  v-on:submit.prevent="buscarProducto">
                <input type="text" placeholder="Buscar Producto" v-model="id_producto">
            </form>
        </div>
        <div class="ctn-venta">
            <div class="ctn-registrar-saldo">
                <form class="filtro" v-on:submit.prevent="buscarCliente">
                    <input type="number" placeholder="Cedula cliente" v-model="cedula_cli" required>
                    <button class="btn" type="submit">BUSCAR</button>
                </form>
                <br>
                <div class="ctn-pro" v-show="clienteExiste">
                    <p>Cliente no registrado</p>
                    <button class="btn" @click="goCliente()">REGISTRAR</button>
                </div>

                <div class="factura">
                    <div>
                        <h2>FACTURA VENTA</h2>
                        <div class="cmp">
                            <div>
                                <label>Numero de Venta: </label>
                                <label>{{this.id_venta}}</label>
                            </div>

                            <div>
                                <label>Fecha de Venta: </label>
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
                        <h2>DATOS DEL VENDEDOR</h2>
                        <div class="cmp">
                            <div>
                                <label>CC: </label>
                                <label>{{this.vendedor.cedula}}</label>
                            </div>

                            <div>
                                <label>Nombre: </label>
                                <label>{{this.vendedor.nombre}}</label>
                            </div>

                            <div>
                                <label>Cargo: </label>
                                <label>{{this.vendedor.cargo}}</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>DATOS DEL CLIENTE</h2>
                        <div class="cmp">
                            <div>
                                <label>CC: </label>
                                <label>{{this.cliente.cedula_cli}}</label>
                            </div>
                            <div>
                                <label>Nombre: </label>
                                <label>{{this.cliente.nombre_cli}}</label>
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
                            <tr v-for="(prod, index) in prods_venta" :key="prod.nombre_product">
                                <td>{{prod.nombre_product}} {{prod.marca_product}} {{prod.cantidad_product}} {{prod.unidad_product}}</td>
                                <td>{{prod.id_product}}</td>
                                <td><span class="cursor" @click="resCantidad(prod.id_product)">-</span> {{prod.cant_venta}} <span class="cursor" @click="sumCantidad(prod.id_product)">+</span></td>
                                <td>{{prod.precio_venta}}</td>
                                <td>{{prod.cant_venta*prod.precio_venta}}</td>
                                <td><span class="cursor" @click="eliminarProd(index)">X</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="labeltotal">
                        <label>total: {{formatoMoneda(this.total)}}</label>
                    </div>
                 
                </div>
                <div class="botones">
                    <button class="btn" @click="registrarVenta(false)">REGISTRAR VENTA</button>
                    <button class="btn" @click="registrarVenta(true)">ABRIR SALDO</button>
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
    name: 'Venta2',
    data(){
        return {
            id_venta: "",
            showModal: false,
            filtrado: false,
            id_producto: "",
            total:  0,
            prods_filtro: [],
            prods_venta: [],
            cedula_cli: '',
            clienteExiste: false,
            today: new Date(),
            cliente: {
                cedula_cli: '',
                nombre_cli: ''
            },
            ClienteForm: {
               cedula_cli: "",
               nombre_cli: "",
               tipo_documento_cli: "",
               telefono_cli: "",
               direccion_cli: ""
            },
            vendedor: {
                cedula: sessionStorage.getItem("Cedula"),
                nombre: sessionStorage.getItem("Nombre"),
                cargo: sessionStorage.getItem("Rol")
            }

        }
    },
    methods: {
        obtenerIdVenta(){
            axios.get(config.server+"/venta/last")
            .then((result)=>{
                if(result.data.success){
                    this.id_venta = result.data.body[0].id_venta + 1;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        buscarProducto(){
            axios.get(config.server+"/producto/id/"+this.id_producto)
            .then((result)=>{
                if(result.data.success && result.data.body.length>0){
                    if(result.data.body[0].cantidad_disp>0){
                        const pd = this.prods_venta.find(ele => ele.id_product == result.data.body[0].id_product);
                        if(pd){
                            if(pd.cant_venta<pd.cantidad_disp){
                                pd.cant_venta++;
                            }
                        }else{
                            let prod = Object.assign({cant_venta: 1}, result.data.body[0]);
                            this.prods_venta.push(prod);
                        }
                        this.calcularTotal();
                        this.id_producto = "";
                    }else{
                        Swal.fire({
                            icon: "info",
                            title: "El producto esta agotado",
                            showConfirmButton: true,
                        });
                        this.id_producto = "";
                    }
                    
                }else{
                    Swal.fire({
                        icon: "info",
                        title: "Producto no encontrado",
                        showConfirmButton: true,
                    });
                }
            }).catch((err)=>{
                console.log(err);
                Swal.fire({
                    icon: "info",
                    title: "Producto no encontrado",
                    showConfirmButton: true,
                });
            })
        },
        agregarProd(i){
            const pd = this.prods_venta.find(ele => ele.id_product == this.prods_filtro[i].id_product);
            if(pd){
                if(pd.cant_venta<pd.cantidad_disp){
                    pd.cant_venta++;
                }
            }else{
                let prod = Object.assign({cant_venta: 1}, this.prods_filtro[i]);
                this.prods_venta.push(prod);
            }
            this.calcularTotal();
            this.id_producto = "";
            this.filtrado = false;
        },
        sumCantidad(id){
            console.log(id);
            console.log(this.prods_venta);
            const pd = this.prods_venta.find(ele => ele.id_product == id);
            if(pd.cant_venta<pd.cantidad_disp){
                pd.cant_venta++;
                this.calcularTotal()
            }
        },
        resCantidad(id){
            const pd = this.prods_venta.find(ele => ele.id_product == id);
            if(pd.cant_venta>1){
                pd.cant_venta--;
                this.calcularTotal()
            }
        },
        eliminarProd(id){
            this.prods_venta.splice(id, 1);
            this.calcularTotal()
        },
        calcularTotal(){
            let total = 0;
            for (let index = 0; index < this.prods_venta.length; index++) {
                const element = this.prods_venta[index];
                total+=element.precio_venta*element.cant_venta
            }
            this.total = total;
        },
        registrarVenta(saldo){
            if(this.prods_venta.length>0 && this.cliente.cedula_cli != ''){
                let productos = [];
                for (let index = 0; index < this.prods_venta.length; index++) {
                    const element = this.prods_venta[index];
                    productos.push([element.id_product, element.cant_venta, element.precio_venta]);
                }
                let ced = this.cliente.cedula_cli;
                let form = {
                    productos,
                    cedula_cli: ced
                }
                console.log(form);
                axios.post(config.server+"/venta", form)
                .then((result)=>{
                    if (result.data.success) {
                        if(saldo){
                            console.log(this.cliente);
                            console.log({id_venta: result.data.body.id_venta, total_venta: result.data.body.total_venta, cedula_cli: this.cliente.cedula_cli})
                            this.$router.push({ path: '/RegistrarSaldo', query: {id_venta: result.data.body.id_venta, total_venta: result.data.body.total_venta, cedula_cli: this.cliente.cedula_cli}});
                        }else{
                            Swal.fire({
                            icon: "success",
                            title: "Venta realizada exitosamente",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        }
                        this.prods_venta = [];
                        this.filtrado = false;
                        this.id_producto = ""; 
                        this.cedula_cli = "";
                        this.cliente = {
                            cedula_cli: '',
                            nombre_cli: ''
                        }
                        this.calcularTotal();
                        this.obtenerIdVenta();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido realizar la venta",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "No se ha podido realizar la venta",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
                
            }else{
                if(this.cliente.cedula_cli==''){
                    Swal.fire({
                        icon: "info",
                        title: "No se ha agregado un cliente",
                        showConfirmButton: true,
                    });
                }
                if(!(this.prods_venta.length>0)){
                    Swal.fire({
                        icon: "info",
                        title: "No se han agregado productos",
                        showConfirmButton: true,
                    });
                }
            }
        },
        formatoMoneda(valor) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency: 'COP'
        }) 
        return formatter.format(valor)
        },
        buscarCliente(){
            axios.get(config.server+"/cliente/cedula/"+this.cedula_cli)
            .then((result)=>{
                if(result.data.success && result.data.body.length > 0){
                    this.cliente = result.data.body[0];
                    this.clienteExiste = false;
                }else{
                    this.cliente = {
                        cedula_cli: '',
                        nombre_cli: ''
                    }
                    this.clienteExiste = true;
                }
            }).catch((err)=>{
                console.log(err);
                this.cliente = {
                        cedula_cli: '',
                        nombre_cli: ''
                    }
                this.clienteExiste = true;
            })
        },
        goCliente(){
            this.ClienteForm.cedula_cli = this.cedula_cli;
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
        this.obtenerIdVenta();
    }
}
</script>

<style>

.ctn-venta h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}
.botones{
    display: flex;
    justify-content: space-evenly;
    margin: 30px;
}

.cursor{
    cursor: pointer;
}
.labeltotal{
    text-align: end;
    margin-top: 20px;
}
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